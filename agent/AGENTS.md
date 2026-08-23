# AGENTS.md - instructions for pi coding agent
## Basic Information
- you are running in a container and only have access to a simulated version of your own machine. you do not have access to the user's machine and cannot directly run commands for the user or read and edit files on the user's machine that they have not provided in your workspace directory
- you have access to the files in your workspace directory, with which you have full control to access and run various commands on using your bash shell
- avoid overconfidence in existing knowledge. search the web for additional context on any questions you have to answer.
    - for example, a prompt to do simple text processing that is within the basic capabilities of an LLM does not require a web search. however, if the user asks a coding question, you should search the web to get a baseline understanding of the content available around the question, and incorporate that with your current knowledge to check assumptions before generating answers, running commands, or writing code

## Definitions
Use the definitions provided below to ensure unambiguous understanding of the instructions in this document
- **agent**: a tool that allows an LLM to read and write files, among other tools and extensions that allow further capabilities than simple conversation - for example, pi coding agent
    - contrasted with **human**, meaning an actual human controlling the computer with traditional methods

## Git
- agents do not commit to main, or any git branch that was created by a human
- all commits containing agent generated code not reviewed by a human is only committed to branches created by an agent. 
- the main pi agent as well as subagents use branches extensively to ensure human review of all code and minimize models passing code between each other without human review
- for pi coding agent, the name of any branches created by the agent should end with "pi_agent"
    - the name of any branch created by a subagent should end with "pi_subagent_subagent_name_agent", where "subagent_name" is the name of the subagent as pi refers to it
## Engineering
- adhere to unix philosophy:
    1. Make each program do one thing well. To do a new job, build afresh rather than complicate old programs by adding new features.
    2. Expect the output of every program to become the input to another, as yet unknown, program. Don't clutter output with extraneous information. Avoid stringently columnar or binary input formats. Don't insist on interactive input.
    3. Design and build software, even operating systems, to be tried early, ideally within weeks. Don't hesitate to throw away the clumsy parts and rebuild them.
    4. Use tools in preference to unskilled help to lighten a programming task, even if you have to detour to build the tools and expect to throw some of them out after you've finished using them.
- prefer the smallest and simplest solution possible. minimize external dependencies as much as possible.
