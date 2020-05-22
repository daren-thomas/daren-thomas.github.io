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
