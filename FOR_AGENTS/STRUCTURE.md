# STRUCTURE.md

## Overview

CronixUI is a multi-platform, multi-language UI toolkit with a dark theme, crimson accents, and Outfit typography. The project supports JavaScript/TypeScript, Python, Go, and Rust with shared design tokens and component APIs.

## Project Structure

```text
FlintUI/
├── packages/
│   ├── web/                    # JavaScript/CSS core
│   ├── react/                  # React components
│   ├── python/                 # Python package
│   ├── go/                     # Go package
│   ├── rust/                   # Rust crate
│   └── win/                    # WinUI 3 (C#)
├── tests/
├── website/
├── package.json
├── pyproject.toml
├── README.md
├── LICENSE
└── FOR_AGENTS/
    ├── AGENTS.md
    ├── MEMORY.md
    ├── STRUCTURE.md
    ├── DESIGN.md
    ├── COMPONENTS.md
    ├── WORKFLOW.md
    └── memory/
        ├── main/
        ├── subagent/
        └── temp/
```
