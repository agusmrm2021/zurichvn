# Workflow Orchestration

## 1. Default to Plan Mode

- Use plan mode for any non-trivial task (3+ steps or architectural decisions)
- If things go wrong, stop immediately and re-plan — don’t push forward blindly
- Use planning not just for building, but also for verification steps
- Write detailed specifications upfront to reduce ambiguity

## 2. Subagent Strategy

- Use subagents frequently to keep the main context clean
- Delegate research, exploration, and parallel work to subagents
- For complex problems, scale effort via multiple subagents
- Assign one focused task per subagent

## 3. Self-Improvement Loop

- After any user correction, update `tasks/lessons.md`
- Create rules to prevent repeating the same mistakes
- Continuously refine these rules until error rates drop
- Review relevant lessons at the start of each session

## 4. Verify Before Completion

- Never mark work complete without proving it works
- Compare behavior before and after changes when relevant
- Ask: “Would a staff engineer approve this?”
- Run tests, inspect logs, and validate correctness

## 5. Balanced Elegance

- For non-trivial changes, pause and ask: “Is there a more elegant solution?”
- If a solution feels hacky, rethink it with full context
- Avoid over-engineering simple fixes
- Critically review your own work before presenting it

## 6. Autonomous Bug Fixing

- When given a bug, fix it directly — don’t wait for guidance
- Use logs, errors, and failing tests to identify issues
- Minimize the need for user context switching
- Resolve failing CI issues proactively

---

## Task Management

1. **Plan First**: Write a clear plan in `tasks/todo.md` with actionable items
2. **Verify Plan**: Confirm the plan before starting implementation
3. **Track Progress**: Update tasks as you complete them
4. **Explain Changes**: Provide high-level summaries at each step
5. **Document Results**: Add a review section to `tasks/todo.md`
6. **Capture Lessons**: Update `tasks/lessons.md` after corrections

---

## Core Principles

- **Simplicity First**: Keep solutions minimal and focused
- **No Laziness**: Solve root causes — avoid temporary fixes
- **Minimal Impact**: Only change what’s necessary; don’t introduce new issues
