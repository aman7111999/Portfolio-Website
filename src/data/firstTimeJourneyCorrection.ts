const FIRST_TIME_JOURNEY_COPY = {
  short_description:
    "Helping first-time users become active investors or traders by making their progress visible, showing Motilal Oswal's research value early, and nudging the next action that moves them forward.",
  overview:
    "<p>The goal of the first-time user journey was not to make users complete a fixed onboarding sequence. It was to help a new RIISE user become an <strong>active investor or trader</strong> on the platform.</p><p>A first-time user can arrive with different things already completed. KYC may still be pending, funds may not be added yet, or the account may be ready but the first trade has not happened. Instead of treating everyone the same, the experience shows users their progress, what is already complete, and what still needs attention.</p><p>At the same time, we did not want the first session to feel like a list of account tasks. Motilal Oswal is strongly known for its research, so the journey also introduces that value from the beginning. Users can see a research call upfront, while deeper research access becomes part of what they unlock as they complete activation milestones.</p>",
  problem_statement:
    "<p>The business goal was to convert first-time users into active customers, but simply asking people to complete KYC, add funds, and place a trade would make the experience feel transactional.</p><p>Users needed clarity about their progress and a reason to keep moving.</p><ul><li>A new user may not know what is already complete and what is still required before they can start investing or trading.</li><li>KYC, funding, and first trade are important business milestones, but showing all of them as equal tasks creates noise.</li><li>If the homepage focuses only on setup, users do not experience the strongest reasons to use RIISE.</li><li>Motilal Oswal's research is a major product strength, but its value needs to be visible before users are fully active.</li><li>Every nudge has to respond to the user's current progress rather than forcing everyone through the same sequence.</li></ul><p>The challenge was to combine <strong>progress, product value, and contextual nudges</strong> in one first-time experience.</p>",
  research:
    "<p>I framed the journey around activation rather than around screens or backend account states.</p><p>The experience needed to answer three questions whenever a first-time user returned:</p><ol><li><strong>Where am I right now?</strong> Show what has already been completed and what is still pending.</li><li><strong>Why should I continue?</strong> Surface valuable product capabilities, especially Motilal Oswal's research, instead of turning the homepage into a setup checklist.</li><li><strong>What should I do next?</strong> Prioritise the single pending action that moves the user closer to becoming active.</li></ol><p>This led to a progress-led model. KYC, add funds, and first trade are activation milestones, not five artificial steps that every user must experience in the same way.</p>",
  design_process:
    "<p>I designed the journey so the homepage changes with the user's progress while still feeling like the same RIISE product.</p><ol><li><strong>Make progress visible.</strong> Users can see which activation milestones are complete and what is still remaining.</li><li><strong>Nudge the next relevant action.</strong> If KYC is pending, KYC gets priority. Once that is complete, the experience can shift attention to adding funds or placing the first trade based on what remains.</li><li><strong>Show value alongside the nudge.</strong> The page continues to surface RIISE's useful features instead of becoming an onboarding-only surface.</li><li><strong>Use research as the activation hook.</strong> One research call is visible early so users understand the quality of insight available on the platform, while additional calls and richer research resources remain restricted.</li><li><strong>Unlock more as commitment increases.</strong> Completing KYC gives users broader access to Motilal Oswal's research, making the benefit of progressing tangible.</li><li><strong>Keep moving toward meaningful activity.</strong> After account setup, the journey continues nudging funding and the first trade so activation does not stop at KYC completion.</li></ol>",
  solution:
    "<p>The final experience is a <strong>progress-led activation journey</strong> built into the RIISE homepage.</p><ul><li><strong>Progress tracking</strong> shows completed and remaining activation milestones so users always understand where they stand.</li><li><strong>Contextual nudges</strong> bring the most relevant pending action forward instead of presenting KYC, funds, and first trade as competing tasks.</li><li><strong>Research preview</strong> lets first-time users experience one of Motilal Oswal's strongest product advantages before they are fully active.</li><li><strong>Progressive research access</strong> reveals more research calls and richer resources as users complete required activation milestones such as KYC.</li><li><strong>Product discovery remains visible</strong> so the first-time homepage still communicates what RIISE can do beyond account setup.</li><li><strong>The journey continues through the first meaningful action</strong>, using funding and first-trade nudges to move a new customer toward active investing or trading.</li></ul><p>The experience does not ask users to finish a sequence for the sake of completion. Each nudge connects progress to something useful they can do on RIISE.</p>",
  outcome:
    "<p>The project gives RIISE a clearer way to move first-time users from account creation toward active investing or trading.</p><p>For users, progress is visible and the next action is easier to understand. They can also experience real product value through research instead of seeing a homepage dominated by setup requirements.</p><p>For the business, the journey connects the key activation milestones, KYC, funding, and first trade, to Motilal Oswal's strongest differentiator: its research ecosystem. That creates a more purposeful path from a new user to an active customer while continuing to expose the wider value of the platform.</p><p>I am not attaching an unverified conversion number to this case study. The impact shown here is the activation model, product logic, and experience designed to support those business outcomes.</p>",
  learnings:
    "<p>The biggest learning was that activation should not be designed as a checklist. Users are more likely to move forward when they can see both <strong>their progress</strong> and <strong>the value that progress unlocks</strong>.</p><p>Research became more than homepage content in this journey. It became a reason to complete KYC, stay engaged, and eventually take the first meaningful investing action on the platform.</p>",
  metrics: [
    {
      value: "3 milestones",
      label: "Activation focus",
      hint: "KYC, add funds, and first trade",
    },
    {
      value: "Research-led",
      label: "Value before activation",
      hint: "A research preview shows why progressing is worthwhile",
    },
    {
      value: "Progress visible",
      label: "Contextual nudging",
      hint: "Completed and pending actions stay clear to the user",
    },
  ],
};

const FIRST_TIME_JOURNEY_PRESENTATION = {
  card: {
    eyebrow: "Activation journey",
    image_alt: "RIISE first-time user journey with progress, research and activation nudges",
  },
  hero: {
    image_alt:
      "RIISE first-time user experience showing progress, research access, funding and first-trade nudges",
  },
  seo: {
    title: "RIISE First-Time User Journey",
    description:
      "How Aman Mishra designed a progress-led activation journey that uses research, contextual nudges, KYC, funding and first trade to move new users toward active investing.",
  },
  cta: {
    eyebrow: "More product work",
    title: "Turn progress into active investing.",
    label: "View more work",
    url: "/work",
  },
  sections: {
    overview: {
      visible: true,
      label: "Overview",
      eyebrow: "The activation goal",
      title: "From first-time user to active investor",
    },
    problem: {
      visible: true,
      label: "Challenge",
      eyebrow: "The tension",
      title: "Users need more than a setup checklist",
    },
    research: {
      visible: true,
      label: "Direction",
      eyebrow: "The activation logic",
      title: "Show progress, prove value, guide what comes next",
    },
    process: {
      visible: true,
      label: "Approach",
      eyebrow: "How it works",
      title: "Nudge what remains. Unlock what matters.",
    },
    solution: {
      visible: true,
      label: "Solution",
      eyebrow: "The experience",
      title: "A homepage that moves with the user's progress",
    },
    impact: {
      visible: true,
      label: "Outcome",
      eyebrow: "User and business value",
      title: "A clearer path toward active investing",
    },
    reflection: {
      visible: true,
      label: "Learning",
      eyebrow: "What stayed with me",
      title: "Activation works when progress unlocks visible value",
    },
  },
};

export function applyFirstTimeJourneyCorrection<T extends { slug: string }>(project: T): T {
  if (project.slug !== "riise-first-time-user-journey") return project;

  const base = project as T & { presentation?: any };
  const presentation = base.presentation ?? {};

  return {
    ...project,
    ...FIRST_TIME_JOURNEY_COPY,
    presentation: {
      ...presentation,
      ...FIRST_TIME_JOURNEY_PRESENTATION,
      card: {
        ...(presentation.card ?? {}),
        ...FIRST_TIME_JOURNEY_PRESENTATION.card,
      },
      hero: {
        ...(presentation.hero ?? {}),
        ...FIRST_TIME_JOURNEY_PRESENTATION.hero,
      },
      seo: {
        ...(presentation.seo ?? {}),
        ...FIRST_TIME_JOURNEY_PRESENTATION.seo,
      },
      cta: {
        ...(presentation.cta ?? {}),
        ...FIRST_TIME_JOURNEY_PRESENTATION.cta,
      },
      sections: {
        ...(presentation.sections ?? {}),
        ...FIRST_TIME_JOURNEY_PRESENTATION.sections,
      },
    },
  } as T;
}
