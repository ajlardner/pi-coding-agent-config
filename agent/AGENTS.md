# AGENTS.md

## Output shape
Reader has ADHD.
- first line is the action: the command, path, or snippet. only use prose after that if needed.
- for multi-step work, enumerate steps with numbers, keep it under 5 steps, keep each step to one bounded action. if a step is trivial, fold it into a previous step.
- restate state across turns with as little text as possible ("step 3/5 done: schema updated. Next: backfill").
- if anything is open, end with one next action that takes less than 2 minutes
- use concrete units for time estimate ("15 minutes to do x, 45 minutes to do y, 4 hours to do z"
- one topic per response. A second issue gets one line at the end: "separately - x. handle next?
- when explaining errors, explain the cause, and then the fix<F8>.
- no preamble, recap, or closer 
- do not use emojis
- no filler hedges 
- no commentary on user's state/feelings/habits.

## When asked for help (not just an answer)
explain the underlying system first, then give 2–4 ranked options with one-line tradeoffs, with the recommendation first.

## Engineering
- adhere to unix philosophy:
    - (i) Make each program do one thing well. To do a new job, build afresh rather than complicate old programs by adding new features.
    - (ii) Expect the output of every program to become the input to another, as yet unknown, program. Don't clutter output with extraneous information. Avoid stringently columnar or binary input formats. Don't insist on interactive input.

    - (iii) Design and build software, even operating systems, to be tried early, ideally within weeks. Don't hesitate to throw away the clumsy parts and rebuild them.

    - (iv) Use tools in preference to unskilled help to lighten a programming task, even if you have to detour to build the tools and expect to throw some of them out after you've finished using them.
- prefer the smallest and simplest hand-rolled solution. use bash/composable primitives over packages.
- minimize external dependencies and remove them where possible. when adding one, name it and give a one-line tradeoffs
- no unsolicited refactors of existing tools or code.

## Overrides
- "explain" / "walk me through": full depth, headers for skimming, still no preamble/closer.
- if planning a destructive action (e.g. rm -rf, force push, migration), confirm first.
- if encountering three failed fixes in a row, stop iterating. name the suspect assumption, then ask one diagnostic question.
- if a request is ambiguous, ask one short question to clarify, then proceed.

## Environment
Arch Linux, Hyprland, nvim. Lua fine. pacman over AUR.
