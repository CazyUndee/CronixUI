# MEMORY.md

Agent memory is organized under `FOR_AGENTS/memory/` and works like a mailbox plus task notes.

## Main Agent

- `FOR_AGENTS/memory/main/inbox/`: Subagents send task progress updates here.
- `FOR_AGENTS/memory/main/goals/`: Main agent writes useful durable notes here.

## Subagents

- `FOR_AGENTS/memory/subagent/inbox/`: Orchestrator writes updates/instructions here (email style).
- `FOR_AGENTS/memory/subagent/task/`: Subagent writes task-specific details needed to complete work.

## Temp Memory

- `FOR_AGENTS/memory/temp/compact_mem/`: Compacted memory written after context compaction.
- `FOR_AGENTS/memory/temp/filetree/`: Project file tree snapshots.
- `FOR_AGENTS/memory/temp/issues/`: Auditor agents write issue reports as markdown files.
- `FOR_AGENTS/memory/temp/prev_tasks/`: Subagents write details of completed tasks.
