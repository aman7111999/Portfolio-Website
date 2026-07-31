import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth, useIsAdmin } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

export default function AdminLogin() {
  const {
    user,
    loading,
    passwordRecovery,
    signIn,
    requestPasswordReset,
    updatePassword,
    finishPasswordRecovery,
  } = useAuth();
  const { data: isAdmin, isLoading: roleLoading } = useIsAdmin();
  const nav = useNavigate();
  const [mode, setMode] = useState<"sign-in" | "forgot">("sign-in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [resetSent, setResetSent] = useState(false);
  const [busy, setBusy] = useState(false);

  if (loading) return <FullscreenSpinner />;
  if (user && !passwordRecovery && !roleLoading) {
    if (isAdmin) return <Navigate to="/admin/overview" replace />;
    return (
      <div className="min-h-screen grid place-items-center bg-[var(--color-paper)] p-6">
        <div className="max-w-md text-center space-y-4">
          <h1 className="font-display text-3xl">Not an admin</h1>
          <p className="text-[var(--color-muted)]">
            You're signed in as <strong>{user.email}</strong> but this account has no admin role.
          </p>
          <p className="text-sm text-[var(--color-muted)]">
            Ask an existing admin to grant the <code>admin</code> role to your user in the{" "}
            <code>user_roles</code> table.
          </p>
        </div>
      </div>
    );
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    const result = await signIn(email.trim(), password);
    setBusy(false);
    if (result.error) {
      const message = result.error.toLowerCase().includes("invalid login credentials")
        ? "Email or password is incorrect. Try again or reset your password."
        : result.error;
      setError(message);
      toast.error(message);
    } else {
      toast.success("Signed in");
      nav("/admin/overview");
    }
  };

  const onRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    const result = await requestPasswordReset(email.trim());
    setBusy(false);
    if (result.error) {
      setError(result.error);
      return;
    }
    setResetSent(true);
  };

  const onUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password.length < 8) {
      setError("Use at least 8 characters for your new password.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setBusy(true);
    const result = await updatePassword(password);
    setBusy(false);
    if (result.error) {
      setError(result.error);
      return;
    }
    finishPasswordRecovery();
    toast.success("Password updated");
    nav("/admin/overview", { replace: true });
  };

  if (passwordRecovery) {
    return (
      <AdminAuthShell
        title="Set a new password"
        description="Choose a password for your portfolio CMS."
      >
        <form onSubmit={onUpdatePassword} className="space-y-4">
          <div>
            <Label htmlFor="new-password">New password</Label>
            <Input
              id="new-password"
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="confirm-password">Confirm password</Label>
            <Input
              id="confirm-password"
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <InlineError message={error} />
          <Button type="submit" disabled={busy} className="w-full">
            {busy ? <Loader2 className="animate-spin" /> : "Update password"}
          </Button>
        </form>
      </AdminAuthShell>
    );
  }

  if (mode === "forgot") {
    return (
      <AdminAuthShell title="Reset password" description="We'll email you a secure recovery link.">
        {resetSent ? (
          <div className="space-y-4">
            <p
              className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800"
              role="status"
            >
              Recovery link sent. Check your inbox, then open the link to choose a new password.
            </p>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => setMode("sign-in")}
            >
              Back to sign in
            </Button>
          </div>
        ) : (
          <form onSubmit={onRequestReset} className="space-y-4">
            <div>
              <Label htmlFor="reset-email">Email</Label>
              <Input
                id="reset-email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <InlineError message={error} />
            <Button type="submit" disabled={busy} className="w-full">
              {busy ? <Loader2 className="animate-spin" /> : "Send recovery link"}
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="w-full"
              onClick={() => setMode("sign-in")}
            >
              Back to sign in
            </Button>
          </form>
        )}
      </AdminAuthShell>
    );
  }

  return (
    <AdminAuthShell title="Sign in" description="Access the portfolio CMS.">
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <InlineError message={error} />
          <Button type="submit" disabled={busy} className="w-full">
            {busy ? <Loader2 className="animate-spin" /> : "Sign in"}
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="w-full"
            onClick={() => {
              setError("");
              setMode("forgot");
            }}
          >
            Forgot password?
          </Button>
        </div>
      </form>
    </AdminAuthShell>
  );
}

function AdminAuthShell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid place-items-center bg-[var(--color-paper)] p-6">
      <div className="w-full max-w-sm rounded-xl border border-hairline bg-white p-8 shadow-sm">
        <div className="mb-6">
          <div className="mb-2 flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
            <span className="text-xs uppercase tracking-widest text-[var(--color-muted)]">
              Admin
            </span>
          </div>
          <h1 className="font-display text-3xl">{title}</h1>
          <p className="mt-2 text-sm text-[var(--color-muted)]">{description}</p>
        </div>
        {children}
      </div>
    </div>
  );
}

function InlineError({ message }: { message: string }) {
  if (!message) return null;
  return (
    <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700" role="alert">
      {message}
    </p>
  );
}

function FullscreenSpinner() {
  return (
    <div className="min-h-screen grid place-items-center">
      <Loader2 className="animate-spin text-[var(--color-muted)]" />
    </div>
  );
}
