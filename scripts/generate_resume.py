#!/usr/bin/env python3
"""Generate the public, ATS-friendly one-page resume PDF."""

from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    HRFlowable,
    KeepTogether,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "Aman_Mishra_Senior_Product_Designer_Resume.pdf"

INK = colors.HexColor("#17171A")
MUTED = colors.HexColor("#55545E")
ACCENT = colors.HexColor("#5B47E0")
HAIRLINE = colors.HexColor("#DAD8E3")

pdfmetrics.registerFont(TTFont("DejaVuSans", "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"))
pdfmetrics.registerFont(TTFont("DejaVuSans-Bold", "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"))


def paragraph(text, style):
    return Paragraph(text, style)


def role_block(styles, role, company, dates, location, bullets):
    header = Table(
        [[paragraph(f"<b>{role}</b>", styles["role"]), paragraph(dates, styles["date"])]],
        colWidths=[130 * mm, 40 * mm],
        hAlign="LEFT",
    )
    header.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
            ]
        )
    )
    story = [
        header,
        paragraph(f"<font color='#5B47E0'><b>{company}</b></font>  |  {location}", styles["company"]),
        Spacer(1, 1.6 * mm),
    ]
    for bullet in bullets:
        story.append(paragraph(f"&bull;&nbsp; {bullet}", styles["bullet"]))
    story.append(Spacer(1, 2.2 * mm))
    return KeepTogether(story)


def build_resume():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    doc = SimpleDocTemplate(
        str(OUTPUT),
        pagesize=A4,
        leftMargin=18 * mm,
        rightMargin=18 * mm,
        topMargin=13 * mm,
        bottomMargin=12 * mm,
        title="Aman Mishra - Senior Product Designer",
        author="Aman Mishra",
        subject="Senior Product Designer resume",
    )

    base = getSampleStyleSheet()
    styles = {
        "name": ParagraphStyle(
            "Name",
            parent=base["Normal"],
            fontName="DejaVuSans-Bold",
            fontSize=22,
            leading=24,
            textColor=INK,
            alignment=TA_CENTER,
            spaceAfter=2,
        ),
        "title": ParagraphStyle(
            "Title",
            parent=base["Normal"],
            fontName="DejaVuSans-Bold",
            fontSize=10.8,
            leading=13,
            textColor=ACCENT,
            alignment=TA_CENTER,
            spaceAfter=2,
        ),
        "contact": ParagraphStyle(
            "Contact",
            parent=base["Normal"],
            fontName="DejaVuSans",
            fontSize=8.2,
            leading=10,
            textColor=MUTED,
            alignment=TA_CENTER,
        ),
        "section": ParagraphStyle(
            "Section",
            parent=base["Normal"],
            fontName="DejaVuSans-Bold",
            fontSize=9.3,
            leading=11,
            textColor=ACCENT,
            spaceBefore=2,
            spaceAfter=2,
        ),
        "summary": ParagraphStyle(
            "Summary",
            parent=base["Normal"],
            fontName="DejaVuSans",
            fontSize=8.4,
            leading=10.8,
            textColor=INK,
            alignment=TA_LEFT,
        ),
        "role": ParagraphStyle(
            "Role",
            parent=base["Normal"],
            fontName="DejaVuSans",
            fontSize=8.7,
            leading=10.2,
            textColor=INK,
        ),
        "date": ParagraphStyle(
            "Date",
            parent=base["Normal"],
            fontName="DejaVuSans",
            fontSize=7.8,
            leading=9.6,
            textColor=MUTED,
            alignment=TA_LEFT,
        ),
        "company": ParagraphStyle(
            "Company",
            parent=base["Normal"],
            fontName="DejaVuSans",
            fontSize=8.2,
            leading=10,
            textColor=MUTED,
        ),
        "bullet": ParagraphStyle(
            "Bullet",
            parent=base["Normal"],
            fontName="DejaVuSans",
            fontSize=7.8,
            leading=9.7,
            leftIndent=3 * mm,
            firstLineIndent=-3 * mm,
            textColor=INK,
            spaceAfter=0.6 * mm,
        ),
        "skills": ParagraphStyle(
            "Skills",
            parent=base["Normal"],
            fontName="DejaVuSans",
            fontSize=7.8,
            leading=9.8,
            textColor=INK,
            spaceAfter=1.1 * mm,
        ),
        "edu": ParagraphStyle(
            "Education",
            parent=base["Normal"],
            fontName="DejaVuSans",
            fontSize=7.9,
            leading=9.8,
            textColor=INK,
        ),
    }

    story = [
        paragraph("AMAN MISHRA", styles["name"]),
        paragraph("Senior Product Designer | Fintech, AI &amp; 0-to-1 Products", styles["title"]),
        paragraph(
            "+91 81047 49291&nbsp;&nbsp; | &nbsp;&nbsp;aman755559@gmail.com&nbsp;&nbsp; | &nbsp;&nbsp;Mumbai, India",
            styles["contact"],
        ),
        paragraph(
            "<link href='https://www.linkedin.com/in/amanmishra7' color='#5B47E0'>linkedin.com/in/amanmishra7</link>"
            "&nbsp;&nbsp; | &nbsp;&nbsp;"
            "<link href='https://amanux.vercel.app' color='#5B47E0'>amanux.vercel.app</link>",
            styles["contact"],
        ),
        Spacer(1, 3.5 * mm),
        paragraph("PROFESSIONAL SUMMARY", styles["section"]),
        HRFlowable(width="100%", thickness=0.8, color=ACCENT, spaceAfter=2.5 * mm),
        paragraph(
            "Product Designer with 4.5+ years of experience designing fintech and investment products across Motilal Oswal and Trinkerr. I lead ambiguous, high-impact initiatives from problem framing to launch, including 0-to-1 product discovery, hyper-personalisation, AI-assisted investing, and scalable design systems. Known for simplifying dense financial workflows, aligning product, engineering, and compliance, and connecting design decisions to user and business outcomes.",
            styles["summary"],
        ),
        Spacer(1, 3 * mm),
        paragraph("PROFESSIONAL EXPERIENCE", styles["section"]),
        HRFlowable(width="100%", thickness=0.8, color=ACCENT, spaceAfter=2.5 * mm),
        role_block(
            styles,
            "Assistant Manager, Product Design",
            "Motilal Oswal Financial Services",
            "Aug 2025 - Present",
            "Mumbai, India",
            [
                "Lead product design across Riise initiatives spanning homepage personalisation, stock discovery, AI-assisted investing, and scalable platform experiences.",
                "Re-architected the homepage to prioritise relevant financial products using behaviour, lifecycle, and portfolio signals, reducing structural complexity and strengthening discoverability.",
                "Led the 0-to-1 product definition of Screener across discovery, filters, comparison, saved workflows, and AI-assisted decisions from concept through developer handoff.",
                "Shape Mira AI as a unified layer across support, research, portfolio analysis, market briefs, and actionable recommendations while partnering with product, engineering, and compliance.",
            ],
        ),
        role_block(
            styles,
            "Product Designer",
            "Trinkerr",
            "Feb 2023 - Apr 2025",
            "Bengaluru, India",
            [
                "Turned portfolio import into an insight-led Portfolio Health Report, contributing to a 9x increase in imports after launch; a demo report contributed a further 1.2x lift.",
                "Designed data-rich portfolio and advisory experiences covering performance, valuation, risk, allocation, red flags, entry, exit, and stop-loss information.",
                "Contributed to TIQS 2.0 across tokens, reusable components, accessibility, documentation, and design-engineering alignment for iOS and Android.",
            ],
        ),
        role_block(
            styles,
            "Associate Product Designer",
            "Trinkerr",
            "Jan 2022 - Feb 2023",
            "Bengaluru, India",
            [
                "Owned foundational investing experiences across portfolio tracking, watchlists, stock details, and transaction flows for mobile users.",
                "Used user interviews, usability testing, heuristic reviews, and close developer collaboration to simplify complex information and improve cross-platform consistency.",
            ],
        ),
        paragraph("CORE CAPABILITIES", styles["section"]),
        HRFlowable(width="100%", thickness=0.8, color=ACCENT, spaceAfter=2.2 * mm),
        paragraph(
            "<b>Product strategy:</b> 0-to-1 Product Design, Problem Framing, Information Architecture, Product Discovery, Data-informed Design, Stakeholder Alignment",
            styles["skills"],
        ),
        paragraph(
            "<b>Research &amp; execution:</b> User Interviews, Usability Testing, Rapid Prototyping, Interaction Design, Visual Design, Developer Handoff",
            styles["skills"],
        ),
        paragraph(
            "<b>Fintech &amp; systems:</b> WealthTech, Stock Broking, SEBI-aware UX, Hyper-personalisation, AI Integration, Design Systems",
            styles["skills"],
        ),
        paragraph(
            "<b>Tools:</b> Figma, Framer, ProtoPie, Figma AI, Adobe After Effects, Maze",
            styles["skills"],
        ),
        Spacer(1, 1.5 * mm),
        paragraph("EDUCATION", styles["section"]),
        HRFlowable(width="100%", thickness=0.8, color=ACCENT, spaceAfter=2.2 * mm),
        Table(
            [
                [
                    paragraph("<b>Masai School</b><br/>Full Stack UI/UX Designer", styles["edu"]),
                    paragraph("Jun 2021 - Jan 2022", styles["date"]),
                ],
                [
                    paragraph("<b>Thakur College of Engineering &amp; Technology</b><br/>Bachelor of Engineering, Mechanical", styles["edu"]),
                    paragraph("2018 - 2022", styles["date"]),
                ],
            ],
            colWidths=[140 * mm, 30 * mm],
            style=TableStyle(
                [
                    ("VALIGN", (0, 0), (-1, -1), "TOP"),
                    ("LEFTPADDING", (0, 0), (-1, -1), 0),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                    ("TOPPADDING", (0, 0), (-1, -1), 0),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 1.5 * mm),
                ]
            ),
        ),
    ]

    doc.build(story)
    print(OUTPUT)


if __name__ == "__main__":
    build_resume()
