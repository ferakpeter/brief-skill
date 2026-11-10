"""Hermes plugin for brief: registers the bundled skills."""

from __future__ import annotations

from pathlib import Path
from typing import Any

SKILLS_DIR = Path(__file__).resolve().parent / "skills"


def register(ctx: Any) -> None:
    for child in sorted(SKILLS_DIR.iterdir() if SKILLS_DIR.exists() else []):
        skill_md = child / "SKILL.md"
        if child.is_dir() and skill_md.exists():
            ctx.register_skill(child.name, skill_md)
