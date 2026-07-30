from pathlib import Path
import sys

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT, TA_RIGHT
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    KeepTogether,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = Path(sys.argv[1]).resolve() if len(sys.argv) > 1 else ROOT / "public" / "joey-alvarado-resume.pdf"


def paragraph(text: str, style: ParagraphStyle) -> Paragraph:
    return Paragraph(text, style)


def bullet(text: str, style: ParagraphStyle) -> Paragraph:
    return Paragraph(f"- {text}", style)


def section_heading(title: str, style: ParagraphStyle) -> list:
    rule = Table([[""]], colWidths=[7.5 * inch], rowHeights=[1])
    rule.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#b7b1aa"))]))
    return [rule, Spacer(1, 7), paragraph(title.upper(), style), Spacer(1, 5)]


def experience_heading(role: str, company: str, dates: str, styles: dict) -> Table:
    left = paragraph(f"<b>{role}</b><br/><font color='#55514d'>{company}</font>", styles["job"])
    right = paragraph(dates, styles["date"])
    table = Table([[left, right]], colWidths=[5.7 * inch, 1.8 * inch], hAlign="LEFT")
    table.setStyle(
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
    return table


def build_resume() -> None:
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)

    doc = SimpleDocTemplate(
        str(OUTPUT),
        pagesize=LETTER,
        rightMargin=0.5 * inch,
        leftMargin=0.5 * inch,
        topMargin=0.42 * inch,
        bottomMargin=0.42 * inch,
        title="Joey Alvarado - Software Developer Resume",
        author="Joey Alvarado",
        subject="Software development resume",
    )

    base = getSampleStyleSheet()
    styles = {
        "name": ParagraphStyle(
            "Name",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=23,
            leading=25,
            textColor=colors.HexColor("#171615"),
            spaceAfter=1,
        ),
        "title": ParagraphStyle(
            "Title",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=10.5,
            leading=13,
            textColor=colors.HexColor("#55514d"),
        ),
        "contact": ParagraphStyle(
            "Contact",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=8.2,
            leading=11,
            textColor=colors.HexColor("#55514d"),
            alignment=TA_RIGHT,
        ),
        "section": ParagraphStyle(
            "Section",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=9.5,
            leading=10.5,
            textColor=colors.HexColor("#171615"),
            tracking=0.6,
        ),
        "body": ParagraphStyle(
            "Body",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=9.3,
            leading=12.2,
            textColor=colors.HexColor("#2f2d2b"),
            spaceAfter=3,
        ),
        "bullet": ParagraphStyle(
            "Bullet",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=8.9,
            leading=11.5,
            leftIndent=10,
            firstLineIndent=-8,
            textColor=colors.HexColor("#2f2d2b"),
            spaceAfter=2.2,
        ),
        "job": ParagraphStyle(
            "Job",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=9.6,
            leading=11.8,
            textColor=colors.HexColor("#171615"),
        ),
        "date": ParagraphStyle(
            "Date",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=8.7,
            leading=10.8,
            textColor=colors.HexColor("#55514d"),
            alignment=TA_RIGHT,
        ),
        "project": ParagraphStyle(
            "Project",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=8.95,
            leading=11.5,
            textColor=colors.HexColor("#2f2d2b"),
            spaceAfter=4,
        ),
        "skills": ParagraphStyle(
            "Skills",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=8.7,
            leading=11,
            textColor=colors.HexColor("#2f2d2b"),
            spaceAfter=2,
        ),
    }

    header_left = [
        paragraph("JOEY ALVARADO", styles["name"]),
        paragraph("Software Developer", styles["title"]),
    ]
    header_right = [
        paragraph(
            "Chicago area<br/>"
            "<link href='mailto:joeynalvarado@gmail.com' color='#55514d'>joeynalvarado@gmail.com</link><br/>"
            "<link href='https://www.joeyalvarado.dev' color='#55514d'>joeyalvarado.dev</link>",
            styles["contact"],
        )
    ]
    header = Table([[header_left, header_right]], colWidths=[4.6 * inch, 2.9 * inch])
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

    story = [header, Spacer(1, 10)]

    story += section_heading("Summary", styles["section"])
    story.append(
        paragraph(
            "Software developer with experience shipping websites and internal tools for small businesses. "
            "Background in web development and project delivery, with current work in Rust, backend systems, "
            "and focused software projects.",
            styles["body"],
        )
    )
    story.append(Spacer(1, 6))

    story += section_heading("Experience", styles["section"])
    story.append(
        KeepTogether(
            [
                experience_heading("Freelance Web Developer", "Digital Outbreak", "May 2025 - Present", styles),
                Spacer(1, 5),
                bullet("Build and maintain websites and internal tools for small businesses.", styles["bullet"]),
                bullet(
                    "Own projects from discovery through launch, including design, implementation, revisions, and ongoing fixes.",
                    styles["bullet"],
                ),
                bullet(
                    "Develop dashboards and CRM workflows that support lead management and day-to-day operations.",
                    styles["bullet"],
                ),
            ]
        )
    )
    story.append(Spacer(1, 7))
    story.append(
        KeepTogether(
            [
                experience_heading("Web Developer & Project Manager", "SEOLEVELUP", "Sep 2022 - May 2025", styles),
                Spacer(1, 5),
                bullet(
                    "Built responsive marketing websites and landing pages with WordPress, Webflow, Framer, and custom CSS.",
                    styles["bullet"],
                ),
                bullet(
                    "Turned Figma mockups into finished pages and coordinated requirements, revisions, and launches.",
                    styles["bullet"],
                ),
                bullet("Used Python for small internal tools and workflow experiments.", styles["bullet"]),
            ]
        )
    )
    story.append(Spacer(1, 8))

    story += section_heading("Selected Projects", styles["section"])
    projects = [
        (
            "Solbook Core",
            "Rust, Axum, matching engines",
            "Built a deterministic matching engine with exact decimal validation, FIFO price-time priority, structured events, replay tests, and a web learning terminal.",
            "https://www.joeyalvarado.dev/projects/solbook-core",
        ),
        (
            "Local Web Clipper",
            "TypeScript, browser extensions",
            "Added local-folder, Downloads, and Clipboard destinations while preserving the upstream extraction and template pipeline.",
            "https://github.com/DigitalOutbreak/local-web-clipper",
        ),
        (
            "CramForge",
            "Next.js, TypeScript, EPUB",
            "Built a local-first starter that imports DRM-free EPUBs and creates portable Markdown study packs.",
            "https://github.com/DigitalOutbreak/cramforge",
        ),
        (
            "World of Doors",
            "Astro, client work, internal tools",
            "Maintain a production service-business website and work on dashboards and CRM workflows around lead and job operations.",
            "https://worldofdoors.org",
        ),
    ]
    for name, stack, description, url in projects:
        story.append(
            paragraph(
                f"<b><link href='{url}' color='#171615'>{name}</link></b> "
                f"<font color='#6f6964'>| {stack}</font><br/>{description}",
                styles["project"],
            )
        )
    story.append(Spacer(1, 5))

    story += section_heading("Skills", styles["section"])
    story.extend(
        [
            paragraph("<b>Languages:</b> Rust, TypeScript, JavaScript, Python, HTML, CSS", styles["skills"]),
            paragraph("<b>Web:</b> React, Next.js, Astro, WordPress, Webflow, Framer", styles["skills"]),
            paragraph("<b>Tools:</b> Git, GitHub, Figma, SQLite", styles["skills"]),
        ]
    )
    story.append(Spacer(1, 6))
    story.append(
        paragraph(
            "<link href='https://github.com/DigitalOutbreak' color='#55514d'>github.com/DigitalOutbreak</link>"
            "  |  "
            "<link href='https://www.linkedin.com/in/joeyalvarado' color='#55514d'>linkedin.com/in/joeyalvarado</link>",
            styles["contact"],
        )
    )

    doc.build(story)


if __name__ == "__main__":
    build_resume()
