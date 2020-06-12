---
layout: post
published: true
title: "CEA Plugins - Part 3: Introduction to the CEA plugin template"
---

The easiest was to get started creating your own plugin is to start with the CEA plugin template. In this article, we'll get you started with your own plugin based on the [CEA plugin template on GitHub](https://github.com/architecture-building-systems/cea-plugin-template).

<!--more-->

This is part 3 in a series of articles on CEA plugins:

- [Part 1: Introduction to core CEA concepts](/cea-plugins-part-1)

- [Part 2: Anatomy of a CEA plugin](/cea-plugins-part-2) 

- Part 3: Introduction to the CEA plugin template (this article)

- [Part 4: How to add your own tools to the CEA](/cea-plugins-part-4)

- [Part 5: How to add your own plots to the CEA](/cea-plugins-part-5)

- [Part 6: Publish your plugin and claim your T-Shirt](/cea-plugins-part-6)

## Introduction to the CEA plugin template

We've set up a [repository with a sample CEA plugin on GitHub](https://github.com/architecture-building-systems/cea-plugin-template). When installed, it adds a new tool called "Demand Summary" to the CEA:

![Demand Summary tool in GUI](../images/2020-05-25-cea-plugins/cea-tools-menu-demand-summary.png)

This tool defines a parameter `fudge-factor`:

![Demand Summary Parameters](../images/2020-05-25-cea-plugins/demand-summary-parameters.png)

It also includes a new plot "Total System Demand":

![Total System Demand plot](../images/2020-05-25-cea-plugins/total-system-demand-plot.png)

I realize this is all a bit simplistic. That's on purpose: The template is supposed to give you a starting point for your very own awesome - and not distract you with a ton of code you'll need to go and delete.

## Create a repository based on the CEA plugin template

Head over to the [CEA plugin template repository on GitHub](https://github.com/architecture-building-systems/cea-plugin-template). You'll see a green button above the file list called "Use this template":

![GitHub use this template](../images/2020-05-25-cea-plugins/github-use-this-template.png)

When you click this button, GitHub will let you create a new repository based on the files in this template - choose a name for your new plugin:

![GitHub create repository from template](../images/2020-05-25-cea-plugins/github-create-repo-from-template.png)

There. You're up and running! You'll need to figure out how to clone that repository to your local computer and start messing around - I'm sure the [folks at GitHub](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository) can explain this better than I ever could.

## CEA plugin template walkthrough

Let's take a look at the files in the template:

```
my-awesome-plugin
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

Note that you'll want to rename the package`cea_plugin_template` to something more meaningful to your plugin - this will form the first part of the fully qualified name of your plugin. You'll also want to come up with a new name for `demand_summary.py`. And give the rest of the files a quick look too...

In this article, we'll quickly discuss `.gitignore`, `LICENSE`, `README.md` and `setup.py` as well as `_cea_plugin_template`.

The files `scripts.yml`, `demand_summary.py`, `schemas.yml`,  and`plugin.config` will be discussed in [Part 4: How to add your own tools to the CEA](/cea-plugins-part-4).

The file `plots.yml` get's it's own article: [Part 5: How to add your own plots to the CEA](/cea-plugins-part-5)

### .gitignore, LICENSE and README.md

These three files are not specific to CEA plugins at all - the `cea-plugin-template` is a GitHub repository and these files have meaning to `git` and GitHub:

- `.gitignore` tells `git` to ignore certain files when commiting code to the repository

- `LICENSE` describes the license of the plugin - `cea-plugin-template` uses the open source [MIT License](https://opensource.org/licenses/MIT), the same license under which the CEA is published. It's a good idea to specify the license of your plugin - especially if you post the code anywhere. Your plugin does not _have_ to be open source - that is up to you.

- `README.md` contains the documentation that is shown when you [visit the repository on GitHub](https://github.com/architecture-building-systems/cea-plugin-template).

### setup.py

The `setup.py` file is used by python to install the plugin and to publish it to the [Python Package Index (PyPI)](https://pypi.org/). The example in the template should be enough to get you up and running. Open it in your editor of choice and replace the contents of all strings to match your project - this includes information about the author, package name etc...

### \_\_init\_\_.py

Python uses this file to mark the folder `cea_plugin_template` as a package. Normally, this file is empty. Remember: You'll be renaming `cea_plugin_template` to a package name more suitable to your plugin.

# 

### plots.yml

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

### schemas.yml

The file `schemas.yml` defines the shape of input files and output files used by scripts (and plots) in the CEA as well as their location inside a scenario.  The CEA core uses exact same mechanism for definining it's own data files - each entry in the `schemas.yml` defines a *locator method*,  a method of the `cea.inputlocator.InputLocator` class that is used throughout the CEA to locate data files.  

These _locator methods_ are used in places like the `input-files` key in `scripts.yml` as well as the `location` part of `plots.yml`. They're also used for reading Dataframes from (and writing them to) disk.

When the CEA creates an `InputLocator` object, the information from your plugin is appended to the list of known locator methods.

Each entry in the `schemas.yml` file is the name of a locator method. Here's the example from the CEA plugin template:

```yaml
demand_summary:
  created_by:
  - demand-summary
  file_path: outputs/data/demand-summary/demand-summary.csv
  file_type: csv
  schema:
    columns:
      Name:
        description: Unique building ID. It must start with a letter.
        type: string
        unit: NA
        values: alphanumeric
      GFA_m2:
        description: Gross floor area
        type: float
        unit: '[m2]'
        min: 0.0
        values: '{0.0...n}'
      QC_sys_MWhyr:
        description: Total system cooling demand
        type: float
        min: 0.0
        unit: '[MWh/yr]'
        values: '{0.0...n}'
        plot-color: blue
      QH_sys_MWhyr:
        description: Total system heating demand
        type: float
        min: 0.0
        unit: '[MWh/yr]'
        values: '{0.0...n}'
        plot-color: red
  used_by: []
```

There's quite a lot going on here, so let's take it apart piece by piece:

- `demand_summary` the first line defines the name of a locator method - the CEA adds this to the `cea.inputlocator.InputLocator` instances at runtime. This means you can do things like `locator.demand_sumary()` to get the path to the file `outputs/data/demand-summary/demand-summary.csv` located in the current scenario.

- `created_by`: A list of script names (entries in `scripts.yml` - either the one defined in your plugin or the one defined by CEA) that produce this file.

- `file_path`: The path to the file, relative to the scenario path. This path may include variable references in the form `{variable_name}`. When calling a locator method, you can pass in additional keywords, like this: `locator.demand_summary(variable_name="abc")` and the result will have the replacement. Note that with `read()` and `write()` you'll also need to pass in these variables.

- `file_type`: The type of file this locator method points to. Currently, for plugins, we suggest using `csv` files. The class `cea.schemas.CsvSchemaIo` has some nice features - like reading and writing DataFrames as well as validation of the schema on reading / writing. This functionality will be extended for the other file types known to the CEA at a later stage.

- `schema`: For "flat" file types like `csv`, `dbf` and `shp` files, the contents of the `schema` dictionary is just `columns`, which itself is a dictionary of columns contained inside the data file.

A column definition contains the following keys:

- `description`: A description of the contents of the column. This is also used for the legend in columns that are plotted.

- `type`: The type of the data in the column. The CEA knows about `string`, `int` ,  `float`, `date` and `boolean` column types. Files with `file_type: shp` (shapefiles) also can have `Point`, `Polygon` and `LineString`.

- `unit`: Describes the unit of a column - especially for columns of type `float`, this is usually the physical unit of measurment. By convention, we place the unit inside square brackets - see the example for `QH_sys_MWhyr`: `unit: "[[MWh/yr]]"`. If a unit is not available / does not apply, use `NA` instead.

- `values`: This is a short description for the user of the type of values to be found in here and ignored by the CEA.

- `min` / `max`: Columns with types `int` or `float` can optionally specify minimum and maximum values for the range of data in the column. E.g. set `min` to `0.0` to specify that only positive values are to be found in the column.

- `plot-color` : Optional. If a column is used in a plot, this color will be used to plot that series. This is either a color in the format `"rgb(255, 255, 255)"` or a color taken from the list in `cea/plots/colors.py` like "red", "blue" etc.

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