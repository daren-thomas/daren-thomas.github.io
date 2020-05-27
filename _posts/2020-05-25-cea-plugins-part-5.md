---
layout: post
published: true
title: "CEA Plugins - Part 5: How to add your own plots to the CEA"
---

This article goes into the details of the `plots.yml` file used in CEA plugins.

<!--more-->

This is part 4 in a series of articles on CEA plugins:

- [Part 1: Introduction to core CEA concepts](/2020-05-25-cea-plugins-part-1)

- [Part 2: Anatomy of a CEA plugin](/2020-05-25-cea-plugins-part-2) 

- [Part 3: Introduction to the CEA plugin template](/2020-05-25-cea-plugins-part-3) 

- Part 4: How to add your own tools to the CEA (this article)

- [Part 5: How to add your own plots to the CEA](/2020-05-25-cea-plugins-part-5)

- [Part 6: Publish your plugin and claim your T-Shirt](/2020-05-25-cea-plugins-part-6)

## plots.yml

The `plots.yml` file describes a list of plots to add to the CEA Dashboard. As with the `scripts.yml` file, the plots are listed _by category_. In the template, the category is named "Demand Summary", the same as the category name used for the tools - It's a good idea to keep these two names in sync.

```yaml
Demand Summary:
  - label: Total System Demand
    data:
      location: demand_summary
      index: Name
      fields:
        - QC_sys_MWhyr
        - QH_sys_MWhyr
    layout:
      kind: bar
      title: Total System Demand
      yTitle: "Energy Demand [MWh/yr]"
      xTitle: Building Name
```

Each plot has a `label`: This is the name of the plot to display in the GUI when you add a plot / change a plot type:

![Adding a plot in CEA GUI](../images/2020-05-25-cea-plugins/add-plot.png)

The rest of the plot is divided into a `data` asection and a `layout` section.

The `data` part of a plot definition specifies:

- `location`: the locator method to use for retrieving the data to plot - in the case of the template, `demand_summary` which is defined in `schemas.yml`.
  
  - NOTE: the fields `description` and `plot-color` in the description of the data columns in `schemas.yml` are used to define the text in the legend and the color of each series respectively.

- `index`: the field to use as the index - if missing, no index is set on the data

- `fields`: a list of field names to use - if missing, all the fields in the data are used

The `layout` part specifies how the plot is to be shown. The contents are passed off to the `iplot` method from the [cufflinks library](https://github.com/santosjorge/cufflinks). Check the [documentation on the `iplot` method](https://nbviewer.ipython.org/gist/santosjorge/f3b07b2be8094deea8c6) for more information on valid parameters.

The class `cea.plugin.PluginPlotBase` simplifies plot creation _a lot_ compared to how the CEA core creates plots. This comes at the expense of flexibility. If you need more fine-grained controll over your plots, you can override the `plots` property in your plugin (check `cea.plugin.CeaPlugin` for the original definition) to return your own plot classes (possibly derived from `cea.plots.base.PlotBase`) - See [CEA Plots - the Gory Details](https://daren-thomas.github.io/cea-plots-the-gory-details/) for more information on how to do that.

## Publishing your plugin

While developing your plugin, you can use the command `pip -e .` in the repository folder to install your plugin to python in "editable mode": This tells Python to check that folder for the current version of the source code.

Once you've finished testing and debugging you can [deploy the plugin to PyP](https://realpython.com/pypi-publish-python-package/)I. This is not a requirement - you might not want to share the source with the rest of the world - but it _does_ make installation on another computer a bit easier: Your user will then just do a `pip install <yourplugin>`.

Regardless of how you'll be deploying your plugin, please note that it needs to be installed in the _same_ python environment that the CEA uses. Using the `pip` method above, that means running it form the CEA Console.

## Registering a CEA plugin with the CEA

The CEA config file maintains a list of CEA plugins - by default it's an empty list. You can view that list from the CEA Console with `cea-config read general:plugins`:

```
λ cea-config read general:plugins
- general:plugins = []
  (default: [])
```

BTW: You can use this command to read any parameter in the user config file (`cea.config` in your user profile folder).

To add a plugin to that list, you can do something like this:

```
λ cea-config write --general:plugins {general:plugins}, cea_plugin_template.DemandSummaryPlugin
```

A short explaination: `cea-config` is a tool for working with the config file. You guessed that already. `write` means: write to the config file. `--general:plugins` denotes the secion and parameter the following text is to be written to. Since the plugins list is a, well, a list, it's encoded as a string with commas separating them. We have two values here: `{general:plugins}` and `cea_plugin_template.DemandSummaryPlugin`. `{general:plugins}` will be expanded to the previous list of plugins.

Note: You'll need to run that in the CEA Console or an equivalent environment - either by instructing your users or writing an installer.

It's also possible to manually edit the `cea.config` file located in your user folder - 
