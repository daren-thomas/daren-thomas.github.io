---
layout: post
published: false
title: Writing your own CEA plugins
---

The CityEnergyAnalyst consists of a core set of tools and visualizations of the output of those tools. This article is about extending that set with your own tools and your own visualizations. To do that, you'll need to write a CEA plugin.

## Anatomy of a CEA plugin

A CEA plugin is made up of the following elements:

- a description of tools and the parameters they accept (`scripts.yml`)

- a definition of those parameters - default values, descriptions, types etc. (`default.config`)

- a definition of the input and output files defined by the plugin (`schemas.yml`)

- a description of the plots (`plots.yml`)

## A Walkthrough of the CEA plugin template

We've set up a [repository with a sample CEA plugin on GitHub](https://github.com/architecture-building-systems/cea-plugin-template). It implements a script called `demand-summary` as well as a plot called "Total System Demand". Both are located under "Demand Summary". Let's take a look at the files in the template:

```
cea-plugin-template
│   .gitignore
│   LICENSE
│   README.md
│   setup.py
│
\---cea_plugin_template
        demand_summary.py
        plots.yml
        plugin.config
        schemas.yml
        scripts.yml
        __init__.py
```

Let's go through each of these, one by one:

### .gitignore, LICENSE and README.md

These three files are not specific to CEA plugins at all - the `cea-plugin-template` is a GitHub repository and these files have meaning to `git` and GitHub:

- `.gitignore` tells `git` to ignore certain files when commiting code to the repository

- `LICENSE` describes the license of the plugin - `cea-plugin-template` uses the open source [MIT License](https://opensource.org/licenses/MIT), the same license under which the CEA is published. It's a good idea to specify the license of your plugin - especially if you post the code anywhere. Your plugin does not _have_ to be open source - that is up to you.

- `README.md` contains the documentation that is shown when you [visit the repository on GitHub](https://github.com/architecture-building-systems/cea-plugin-template).

### setup.py

The `setup.py` file is used by python to install the plugin and to publish it to the [Python Package Index (PyPI)](https://pypi.org/). The example in the template should be enough to get you up and running. Open it in your editor of choice and replace the contents of all strings to match your project - this includes information about the author, package name etc...

### \_\_init\_\_.py

Python uses this file to mark the folder `cea_plugin_template` as a package. Often, this file is empty but in this template, we include the following code:

```python
class DemandSummaryPlugin(cea.plugin.CeaPlugin):
    pass
```

This doesn't _have_ to be in `__init__.py` - you could have added it to `demand_summary.py` - but it _does_ affect the name of your plugin: This template creates a plugin `cea_plugin_template.DemandSummaryPlugin`. If you had added the class definition to the file `demand_summary.py`, then the plugin would be called `cea_plugin_template.demand_summary.DemandSummaryPlugin`. Potayto, potahto.

Now... this definition `class DemandSummaryPlugin(cea.plugin.CeaPlugin)` does some "magic", in that by inheriting from `cea.plugin.CeaPlugin`, most of the work of creating a CEA plugin is already done - you only need to edit some yaml files.

Theoretically, a CEA plugin could be any class that supports the same interface as `cea.plugin.CeaPlugin` and it's possible to override how certain parts work. For example, you could replace how plots are defined in your plugin and avoid (or augment) the `plots.yml` feature to gain more flexibility. Let's stick to the beaten path here and just keep in mind that if you _do_ need more flexibility, it's there.

### demand_summary.py

This file contains the `demand-summary` script exposed by the plugin. It follows some conventions used in the CEA project:

The `main` function that accepts a single argument of type `cea.config.Configuration`. This function needs to be called `main` to be picked up by the CEA. Normally, it's job is to read the arguments from the `config` object and then call a function to compute the results - in this case `summarize`. Asside from the `main` function, how you actually organize your code is up to you.

Note that having the following code at the bottom of your file will help you debug it easily from the code editor - you just need to run the current file to run your script with the current configuration:

```python
# (it's not necessary to have this in your script - 
# it has just proven practical)
if __name__ == "__main__":
   main(cea.config.Configuration())
```

### scripts.yml

The `scripts.yml` file declares the list of tools defined in your plugin. This is how the CEA knows where to find the `demand-summary` script. Let's look at the contents of this file:

```yaml
Demand Summary:

  - name: demand-summary
    label: Demand Summary
    description: Creates a simple summary of the demand totals from the cea demand script.
    interfaces: [cli, dashboard]
    module: cea_plugin_template.demand_summary
    parameters: ["general:scenario", "demand-summary:fudge-factor"]
    input-files:
      - [get_total_demand]
```

The `scripts.yml` file is a mapping of category names to a sequence of tool dictionaries. You might want to look up a tutorial of YAML if the syntax seems confusing.

In this example, the category name "Demand Summary" contains a single tool. Each tool contains the following fields:

- `name`: the tool's name - as used on the command line interface (CLI). The convention is to use hyphens (`-`) to connect words. The `name`  should only use lowercase letters and hyphens.

- `label`: This is the name to display the tool as in the GUI in the Tools menu.

- `description`: Use this field to give a short description of what your tool does and how to use it.

- `interfaces`: A list of interfaces to show this tool in. For the purposes of CEA plugins, `[cli, dashboard]` should be used - you can omit `dashboard` to hide your script from the GUI.

- `module`: this is the fully qualified name of your script - the module containing the `main` function to call. This module should be importable by the `python` provided by the CEA Console. Open up the CEA Console and type `python -m cea_plugin_template.demand_summary`. If you get an Error message like `No module named cea_plugin_template.demand_summary` then you haven't installed the plugin yet.

- `parameters`: This is a list of the parameters to be made available to your plugin - each parameter is written in the form `section:parameter` as it appears in the config file. Note you can add your own parameters - see `default.config` below.

- `input-files`: 

### plots.yml





## Publishing your plugin

## Registering a CEA plugin with the CEA

---

- overview

- what can be changed / added / extended?

- the plugin template
  
  * subclassing CeaPlugin
  - scripts.yml
  - schemas.yml
  - plots.yml
  - default.config

- how does all this stuff relate to the CEA itself?

- the nitty gritty (what to do if the simple plugin is not enough?)

Building a CEA plugin includes getting into the mindset of how the CEA itself is built.

- Explain how the underscores work

Anatomy of a CEA Plugin

Overview of what a CEA Plugin can do

- note: it doesn't have to do all!
