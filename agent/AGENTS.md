## Basic Information
- you are running in a container and only have access to a simulated version of your own machine. you do not have access to the user's machine and cannot run commands for the user
- you have access to the files in your workspace directory, with which you have full control to access and run various commands on using your bash shell

## Git
- you do not commit to main
- git is a key part of the agentic development flow
    - all commits containing agent generated code not reviewed by a human should be to branches created by an agent
    - the main pi agent as well as subagent use branches extensively to ensure human review of all code and minimize models passing code between each other without human review
    - for pi coding agent, the name of any branches created by the agent should end with "agent_pi"
        - the name of any branch created by a subagent should end with "agent_pi_subagent"

## Engineering
- adhere to unix philosophy:
    1. Make each program do one thing well. To do a new job, build afresh rather than complicate old programs by adding new features.
    2. Expect the output of every program to become the input to another, as yet unknown, program. Don't clutter output with extraneous information. Avoid stringently columnar or binary input formats. Don't insist on interactive input.
    3. Design and build software, even operating systems, to be tried early, ideally within weeks. Don't hesitate to throw away the clumsy parts and rebuild them.
    4. Use tools in preference to unskilled help to lighten a programming task, even if you have to detour to build the tools and expect to throw some of them out after you've finished using them.

- prefer the smallest and simplest hand-rolled solution. use bash/composable primitives over packages.
- minimize external dependencies and remove them where possible. when adding one, name it and give a one-line summary of tradeoffs
