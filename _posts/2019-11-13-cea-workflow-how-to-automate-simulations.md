---
layout: post
title: CEA Workflow - how to automate simulations
published: true

---

Hold on - we're in for a bumpy ride! Today, we're going to explore a feature of the [City Energy Analyst](https://cityenergyanalyst.com/) that is slightly hidden: The `cea workflow` command.

The `cea workflow` command executes a series of CEA scripts in sequence. That's it. That's all it does.

Now... why should you care? Because you can use this command to run a predefined set of CEA commands in sequence and go for a coffee while the computer does the work for you.

## Syntax

You can use the `cea --help workflow` command in the CEA Console to view help for the workflow script:

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

So, to run the tool, type `cea workflow --workflow C:\path\to\my-workflow.yml` in the CEA Console.

## The workflow YAML file

The workflow YAML file is where the magic happens. This is a file _you're_ supposed to write. The format used by `cea workflow` is a sequence of steps. Here's an example:

```yaml
- script: water-body-potential
- script: sewage-potential
- script: shallow-geothermal-potential
```

The above workflow YAML file will run the three scripts in sequence, similar to typing the following three commands in the CEA Console:

```
cea water-body-potential
cea sewage-potential
cea shallow-geothermal-potential
```

Except you don't have to wait for each script to finish before typing the next one.

Each step is defined as a sequence item (a line that starts with a dash `-`) of either a _script step_ or a _config step_.

## Script steps

Script steps have a key `script` in them specifying the script to run:

```yaml
- script: water-body-potential
```

Additionally, you can specify parameters to a script. Example:

```yaml
- script: network-layout
  parameters:
    network-type: DC
    allow-looped-networks: false
    consider-only-buildings-with-demand: true
```

This is equivalent to the command `cea network-layout --network-type DC --allow-looped-networks false --consider-only-buildings-with-demand true`.

You can find a complete list of valid script names by typing `cea --help` in the CEA Console:

```
λ cea --help
usage: cea SCRIPT [OPTIONS]
       to run a specific script
usage: cea --help SCRIPT
       to get additional help specific to a script

SCRIPT can be one of:
[Analysis]:  emissions, multi-criteria-analysis, operation-costs,
    sensitivity-demand-analyze, sensitivity-demand-samples,
    sensitivity-demand-simulate
[Data Management]:  data-helper, streets-helper, surroundings-helper,
    terrain-helper, weather-helper
[Demand forecasting]:  demand, radiation
[Energy potentials]:  photovoltaic, photovoltaic-thermal,
    sewage-potential, shallow-geothermal-potential, solar-collector,
    water-body-potential
[Networks]:  network-layout, thermal-network
[Optimization]:  decentralized, optimization,
    thermal-network-optimization
[Utilities]:  dbf-to-excel-to-dbf, rename-building, test
[default]:  compile, dashboard, excel-to-shapefile,
    extract-reference-case, install-arcgis, install-grasshopper,
    list-demand-graphs-fields, plots, shapefile-to-excel,
    trace-inputlocator, workflow, zone-helper
```

For each such script name, typing `cea --help SCRIPT` will show you the list of valid parameters:

```
λ cea --help water-body-potential

Sewage source heat exchanger


OPTIONS for water-body-potential:
--scenario: C:\Users\darthoma\Documents\CityEnergyAnalyst\projects\reference-case-cooling\baseline
    Select the scenario you're working on.
    (default: {general:project}\{general:scenario-name})
--max-water-volume-withdrawal: 1000.0
    max water volume that can be withdrawn in m3/h
    (default: 1000.0)
--max-delta-temperature-withdrawal: 8.0
    max delta of temperature that can be withdrawn in C
    (default: 8.0)
--temperature-max: 6.0
    maximum temperature of the water body during the year at the extraction point in C
    (default: 6.0)
--temperature-min: 4.0
    = average temperature of the water body during the year at the extraction point (it can be 30m) in C
    (default: 4.0)
```

That's it! That's all you need to know to cobble together your own workflow YAML files.

### Substitution of config file values

Check the help output for `water-body-potential` in the previous section again... especially the default value for the `--scenario` option... What's this `{general:project}\{general:scenario-name}` thingy?

These are references to the [Configuration file](https://city-energy-analyst.readthedocs.io/en/latest/the-configuration-file.html). The file `cea.config` is located in your home directory. It contains the options used to run the scripts, unless you override those options when running the script in the GUI or from the CEA Console.

When specifying a value for a parameter, you can use the curly braces to specify a substitution in the form: `{section:parameter}`.

## Config steps

The script sections above work by using a configuration file for specifying default parameter values. A special type of step, config steps, can be used to specify the configuration file to use and also allows overriding some of those values.

Config steps have a key `config` with a value specifying either

- the path to a CEA config file

- `default` (use the `default.config` file from the CEA source, this is the same file used to originally populate the `cea.config` file the first time the CEA is used)

- `user` (use the `cea.config` file from the user's home directory - this is the same file used when using the CEA Console to run scripts)

- `.` (the current configuration being used)

All other keys in a config step are of the form `section:parameter` and can be used to set values for that part of the configuration file - these changes are not saved to the configuration file, but they are passed on to any subsequent script steps.

The values of such assignments can include references to environment variables by using the syntax `${variable_name}`. As a special case, at startup, the workflow script creates a copy of the current user configuration file (`cea.config`), with a variable for each parameter, named `${CEA_section_parameter}`. So the current scenario could be assigned with `${CEA_general_scenario}`.

## The built-in workflows

There are two built-in workflows shipped with the CEA, `district-heating-system` and `district-cooling-system`: 

- `cea workflow --workflow district-heating-system`

- `cea workflow --workflow district-cooling-system`

These workflows run the standard CEA workflow. We use that for testing that all the scripts work. Reading the corresponding YAML files can be instructive.

## Resuming workflows

Obviously you assume your workflows are just going to run through - but... especially when using `cea workflow` as a testing tool for the whole suite of CEA scripts, sometimes a workflow will stop because of an error. The `cea workflow` script keeps a file called `{general:project}/../resume-workflow.yml` that stores a dictionary mapping the workflow to the last successful step. If you run `cea workflow --resume on --workflow YOUR_WORKFLOW_HERE`, it will resume that workflow where it last crashed. 
