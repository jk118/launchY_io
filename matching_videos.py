"""
Match user video criteria against a catalog of reference videos.

Ranking: videos with the most matching criteria first.
Only videos with at least 2 matching criteria are recommended.
Returns the best 3 matches.

Use an LLM only to parse freeform user input into structured criteria.
Matching and ranking stay deterministic so results are fast and consistent.
"""

from __future__ import annotations

import json
import os
from dataclasses import dataclass
from typing import Any

# ---------------------------------------------------------------------------
# Criteria schema
# ---------------------------------------------------------------------------

CRITERIA_OPTIONS: dict[str, list[str]] = {
    "target": ["B2B", "B2C"],
    "tone": ["Bold", "Minimal", "Emotional", "Technical", "Playful"],
    "subject": ["Product", "Person", "Story"],
    "focus": ["Product", "Person", "Story"],
    "category": ["SaaS", "Consumer", "Hardware", "Marketplace", "Dev Tools", "Other"],
}

MIN_MATCHES = 2
TOP_N = 3
NO_MATCH_MESSAGE = "We couldn't find any matching videos."


@dataclass
class UserCriteria:
    target: str | None = None
    tone: str | None = None
    subject: str | None = None
    focus: str | None = None
    category: str | None = None

    def provided(self) -> dict[str, str]:
        """Return only criteria the user actually specified."""
        fields = {
            "target": self.target,
            "tone": self.tone,
            "subject": self.subject,
            "focus": self.focus,
            "category": self.category,
        }
        return {key: value for key, value in fields.items() if value is not None}


@dataclass
class Video:
    id: str
    title: str
    tags: dict[str, str]


@dataclass
class MatchResult:
    video: Video
    match_count: int
    matched_criteria: list[str]


def _normalize(value: str) -> str:
    return value.strip().lower()


def _validate_criteria(criteria: UserCriteria) -> UserCriteria:
    """Ensure user values are valid enum options."""
    validated: dict[str, str | None] = {}
    for field, allowed in CRITERIA_OPTIONS.items():
        value = getattr(criteria, field)
        if value is None:
            validated[field] = None
            continue

        normalized_allowed = {_normalize(option): option for option in allowed}
        normalized_value = _normalize(value)
        if normalized_value not in normalized_allowed:
            raise ValueError(
                f"Invalid {field}: '{value}'. "
                f"Allowed values: {', '.join(allowed)}"
            )
        validated[field] = normalized_allowed[normalized_value]

    return UserCriteria(**validated)


def count_matches(user: UserCriteria, video: Video) -> tuple[int, list[str]]:
    """Count how many user-provided criteria match a video's tags."""
    provided = user.provided()
    matched: list[str] = []

    for field, user_value in provided.items():
        video_value = video.tags.get(field)
        if video_value and _normalize(video_value) == _normalize(user_value):
            matched.append(field)

    return len(matched), matched


def match_videos(
    user_criteria: UserCriteria,
    videos: list[Video],
    *,
    min_matches: int = MIN_MATCHES,
    limit: int = TOP_N,
) -> list[MatchResult]:
    """
    Rank videos by number of matching criteria (highest first).
    Returns up to `limit` videos with at least `min_matches` criteria matched.
    """
    user_criteria = _validate_criteria(user_criteria)
    results: list[MatchResult] = []

    for video in videos:
        match_count, matched_criteria = count_matches(user_criteria, video)
        if match_count >= min_matches:
            results.append(
                MatchResult(
                    video=video,
                    match_count=match_count,
                    matched_criteria=matched_criteria,
                )
            )

    results.sort(
        key=lambda result: (
            -result.match_count,
            result.video.title.lower(),
        )
    )
    return results[:limit]


def format_recommendations(results: list[MatchResult]) -> str:
    if not results:
        return NO_MATCH_MESSAGE

    count = min(len(results), TOP_N)
    label = "video" if count == 1 else "videos"
    lines = [f"Here are the best {count} matching reference {label}:"]
    for index, result in enumerate(results, start=1):
        matched = ", ".join(result.matched_criteria)
        lines.append(
            f"{index}. {result.video.title} "
            f"({result.match_count} matches: {matched})"
        )
    return "\n".join(lines)


# ---------------------------------------------------------------------------
# LLM: parse freeform user input into structured criteria
# ---------------------------------------------------------------------------

PARSE_SYSTEM_PROMPT = f"""You extract video search criteria from user input.

Return JSON only, with this shape:
{{
  "target": "B2B" | "B2C" | null,
  "tone": "Bold" | "Minimal" | "Emotional" | "Technical" | "Playful" | null,
  "subject": "Product" | "Person" | "Story" | null,
  "focus": "Product" | "Person" | "Story" | null,
  "category": "SaaS" | "Consumer" | "Hardware" | "Marketplace" | "Dev Tools" | "Other" | null
}}

Rules:
- Use only the allowed values listed above.
- Set a field to null if the user did not specify it.
- Map synonyms to the closest allowed value (e.g. "enterprise" -> "B2B").
- Do not invent criteria the user did not imply.
"""


def parse_user_input_with_llm(user_input: str) -> UserCriteria:
    """
    Use an LLM to turn freeform text into structured criteria.

    Requires OPENAI_API_KEY in the environment.
    """
    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        raise RuntimeError("OPENAI_API_KEY is not set.")

    try:
        from openai import OpenAI
    except ImportError as exc:
        raise RuntimeError(
            "Install the OpenAI SDK: pip install openai"
        ) from exc

    client = OpenAI(api_key=api_key)
    response = client.chat.completions.create(
        model=os.environ.get("OPENAI_MODEL", "gpt-4o-mini"),
        temperature=0,
        response_format={"type": "json_object"},
        messages=[
            {"role": "system", "content": PARSE_SYSTEM_PROMPT},
            {"role": "user", "content": user_input},
        ],
    )

    content = response.choices[0].message.content
    if not content:
        raise RuntimeError("LLM returned an empty response.")

    parsed: dict[str, Any] = json.loads(content)
    return _validate_criteria(
        UserCriteria(
            target=parsed.get("target"),
            tone=parsed.get("tone"),
            subject=parsed.get("subject"),
            focus=parsed.get("focus"),
            category=parsed.get("category"),
        )
    )


def recommend_videos(
    user_input: str | UserCriteria,
    videos: list[Video],
    *,
    use_llm: bool = False,
) -> dict[str, Any]:
    """
    End-to-end recommendation.

    - If `user_input` is a string and `use_llm=True`, parse it with an LLM.
    - Otherwise treat `user_input` as structured criteria (or parse manually).
    """
    if isinstance(user_input, str):
        if use_llm:
            criteria = parse_user_input_with_llm(user_input)
        else:
            raise ValueError(
                "Pass a UserCriteria object, or set use_llm=True for freeform text."
            )
    else:
        criteria = user_input

    results = match_videos(criteria, videos)
    return {
        "criteria": criteria.provided(),
        "message": format_recommendations(results),
        "matches": [
            {
                "id": result.video.id,
                "title": result.video.title,
                "match_count": result.match_count,
                "matched_criteria": result.matched_criteria,
                "tags": result.video.tags,
            }
            for result in results
        ],
    }


# ---------------------------------------------------------------------------
# Example catalog
# ---------------------------------------------------------------------------

SAMPLE_VIDEOS: list[Video] = [
    Video(
        id="v1",
        title="Acme SaaS Launch",
        tags={
            "target": "B2B",
            "tone": "Technical",
            "subject": "Product",
            "focus": "Product",
            "category": "SaaS",
        },
    ),
    Video(
        id="v2",
        title="Founder Story — BrightApps",
        tags={
            "target": "B2C",
            "tone": "Emotional",
            "subject": "Story",
            "focus": "Story",
            "category": "Consumer",
        },
    ),
    Video(
        id="v3",
        title="Smart Speaker Demo",
        tags={
            "target": "B2C",
            "tone": "Playful",
            "subject": "Product",
            "focus": "Product",
            "category": "Hardware",
        },
    ),
    Video(
        id="v4",
        title="Enterprise Security Overview",
        tags={
            "target": "B2B",
            "tone": "Minimal",
            "subject": "Product",
            "focus": "Product",
            "category": "SaaS",
        },
    ),
    Video(
        id="v5",
        title="CTO Interview — DataFlow",
        tags={
            "target": "B2B",
            "tone": "Bold",
            "subject": "Person",
            "focus": "Person",
            "category": "Dev Tools",
        },
    ),
]


if __name__ == "__main__":
    # Structured input (no LLM needed)
    criteria = UserCriteria(
        target="B2B",
        tone="Technical",
        focus="Product",
        category="SaaS",
    )

    output = recommend_videos(criteria, SAMPLE_VIDEOS)
    print("Criteria:", output["criteria"])
    print(output["message"])
    print()

    # Example with no matches
    no_match = UserCriteria(
        target="B2C",
        tone="Minimal",
        subject="Story",
        category="Other",
    )
    print(recommend_videos(no_match, SAMPLE_VIDEOS)["message"])

    # Freeform input via LLM (uncomment when OPENAI_API_KEY is set):
    # output = recommend_videos(
    #     "I need a bold B2B software video featuring a person",
    #     SAMPLE_VIDEOS,
    #     use_llm=True,
    # )
    # print(output["message"])
