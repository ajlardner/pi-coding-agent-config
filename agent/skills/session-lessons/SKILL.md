---
name: session-lessons
description: Summarize commands used and practical Linux or development lessons from a particular session, separating actual actions from suggestions and untested ideas.
---

# Session lessons

When asked what can be learned from a session, or invoked as `/skill:session-lessons`:

1. Use only the visible conversation and available evidence. If the full shell history is not available, say this is a record of commands discussed or reported, not a complete audit of everything run. Do not request, print, or rely on shell history containing secrets.
2. Group commands by purpose, in approximate order. Mark each as **confirmed run**, **reported run**, **suggested only**, or **unclear**, as evidence allows. Avoid pretending that Pi executed commands the user ran remotely. Do not repeat passwords, tokens, key material, private hostnames or IPs.
3. For each group, explain briefly what the commands did, what the observed result was, and the generalizable concept (e.g., privilege separation, SSH host keys versus login keys, account group membership and reconnecting, package candidates versus installed packages, testing before reload). Include any command error and its cause if known; mark uncertain causes explicitly.
4. Separate lessons that are verified for this system from general practices, caveats, and follow-up questions. Explain commands in plain language and keep the recap proportional to what happened.
5. Don't modify or install anything while summarizing. If a saved study note is requested, write it to a specified or clearly identified local path, and identify whether that path is in a container or on the target host.
