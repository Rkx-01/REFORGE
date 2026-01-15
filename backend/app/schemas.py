from pydantic import BaseModel
from typing import List, Optional


class Skills(BaseModel):
    technical: List[str] = []
    soft: List[str] = []


class Experience(BaseModel):
    title: str
    company: str
    duration: str
    location: Optional[str] = ""
    bullets: List[str] = []


class Education(BaseModel):
    degree: str
    institution: str
    year: str
    gpa: Optional[str] = ""
    relevant_courses: List[str] = []


class Project(BaseModel):
    name: str
    description: str
    tech_stack: List[str] = []


class GeneratedResume(BaseModel):
    name: str
    email: Optional[str] = ""
    phone: Optional[str] = ""
    linkedin: Optional[str] = ""
    github: Optional[str] = ""
    location: Optional[str] = ""
    summary: str
    skills: Skills
    experience: List[Experience] = []
    education: List[Education] = []
    projects: List[Project] = []
    certifications: List[str] = []
    keywords_injected: List[str] = []


class CoverLetterResult(BaseModel):
    cover_letter: str
