import json
import re
import logging
from app.services.ai.orchestrator import orchestrator

logger = logging.getLogger(__name__)


def _parse(raw: str) -> dict:
    # Remove markdown code blocks if present
    cleaned = re.sub(r"```(?:json)?|```", "", raw).strip()
    try:
        return json.loads(cleaned)
    except json.JSONDecodeError as e:
        logger.error(f"Failed to parse JSON: {e}. Raw content: {raw[:100]}...")
        # Emergency recovery: try to find a JSON block manually or return partial
        raise ValueError("AI returned invalid JSON format")


async def generate_resume(resume_text: str, jd: str) -> dict:
    prompt = f"""
You are a senior technical resume writer. 
If a specific Job Description is provided, rewrite the resume below so it is optimised for that role.
If the Job Description is missing or generic (e.g. "General", "Software Engineer"), perform a "General Professional Polish" by strengthening all bullet points and professionalising the summary without targeting a specific company.

Rules:
- Only use facts that already exist in the resume — never fabricate.
- FORMAT: Rewrite each bullet point using the formula: [Strong Action Verb] + [Impact/Contribution] + [Measurable Result/Metric].
- If a metric is missing, use specific scope or scale (e.g. "team of 10", "15+ modules", "enterprise-scale").
- Inject relevant keywords from the job description naturally throughout.
- NEVER include the name of the target company, hiring entity, or specific brand you are applying to in the summary or experience.
- Focus on the "Role Function" (e.g., "Full Stack Developer") rather than a specific destination (e.g., "Developer at Google").
- Prioritise sections and skills that are most relevant to the role.

Resume:
{resume_text}

Job description:
{jd}

Return only valid JSON with no markdown fences:
{{
  "name": "",
  "email": "",
  "phone": "",
  "linkedin": "",
  "github": "",
  "location": "",
  "summary": "",
  "skills": {{ "technical": [], "soft": [] }},
  "experience": [{{ "title": "", "company": "", "duration": "", "location": "", "bullets": [] }}],
  "education": [{{ "degree": "", "institution": "", "year": "", "gpa": "", "relevant_courses": [] }}],
  "projects": [{{ "name": "", "description": "", "tech_stack": [] }}],
  "certifications": [],
  "keywords_injected": []
}}
"""
    response = await orchestrator.generate(prompt)
    if response.status == "error":
        raise Exception(response.message)
    
    return _parse(response.content)


async def generate_cover_letter(resume_text: str, jd: str, name: str = "") -> str:
    prompt = f"""
Write a cover letter for {name or "this applicant"}.

Resume:
{resume_text}

Job description:
{jd}

Three paragraphs. Confident, specific, no filler phrases. Return only the letter text.
"""
    response = await orchestrator.generate(prompt)
    if response.status == "error":
        raise Exception(response.message)
        
    return response.content.strip()
