---
published: false
---
## Introducing the CEA Workflow system

The `cea workflow` command was added to the City Energy Analyst a while ago silently. It serves two purposes:

- a way to run the default workflow for the heating and cooling reference cases shipped with the CEA (this helps us test the whole suit of scripts)
- a way to set up repeatable simulation workflows with the CEA (this helps you with your research)

This post details the concepts you need to set up your own repeatable simulation workflows with the CEA.

### Usage

The workflow script is currently only available from the CEA Console:

```
λ cea --help workflow

Run a workflow.yml file - this is like a cea-aware "batch" file for running multiple cea scripts including parameters.
``cea workflow`` can also pick up from previous (failed?) runs, which can help in debugging.


OPTIONS for workflow:
--workflow: c:\users\darthoma\documents\github\cityenergyanalyst\cea\workflows\district_cooling_system.yml
    Either a built-in workflow (district-heating-system / district-cooling-system) OR a path to a user-specified workflow YAML file
    (default: c:\users\darthoma\documents\github\cityenergyanalyst\cea\workflows\district_heating_system.yml)
--resume: False
    Turn this parameter on to resume the workflow from the last successful step
    (default: False)
--resume-file: C:\Users\darthoma\Documents\CityEnergyAnalyst\projects\reference-case-cooling/../resume-workflow.yml
    Path to a file to store information on how to resume a workflow in case it doesn't run through
    (default: {general:project}/../resume-workflow.yml)
```

To run the default workflows, you can run either

- `cea workflow --workflow district-heating-system` or
- `cea workflow --workflow district-cooling-system`

This will create a `reference-case-open` or `reference-case-cooling` respectively project in your project root and run the standard CEA workflow.

If you 



