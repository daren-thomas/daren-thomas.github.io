---
layout: post
title: CEA Workflow - how to automate simulations
published: false

---

Hold on - we're in for a bumpy ride! Today, we're going to explore a feature of the [City Energy Analyst](https://cityenergyanalyst.com/) that is slightly hidden: The `cea workflow` command.

The `cea workflow` command executes a series of CEA scripts in sequence. That's it. That's all it does.

## Syntax

```
λ cea --help workflow

Run a workflow.yml file - this is like a cea-aware "batch" file for running multiple cea scripts including parameters.
``cea workflow`` can also pick up from previous (failed?) runs, which can help in debugging.


OPTIONS for workflow:
--workflow: [...]/cea/workflows/district_cooling_system.yml

    Either a built-in workflow (district-heating-system / district-cooling-system) OR a path to a user-specified workflow YAML file
    (default: [...]/cea/workflows/district_heating_system.yml)

--resume: True
    Turn this parameter on to resume the workflow from the last successful step
    (default: False)
--resume-file: [...]\reference-case-cooling/../resume-workflow.yml

    Path to a file to store information on how to resume a workflow in case it doesn't run through
    (default: {general:project}/../resume-workflow.yml)
```



## The workflow YAML file



## Script steps

## Config steps

## The built-in workflows

## Resuming workflows
