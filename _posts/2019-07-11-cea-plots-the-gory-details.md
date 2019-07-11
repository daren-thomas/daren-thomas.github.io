---
layout: post
title: CEA Plots - the Gory Details
published: false
---

This post goes into the gory details of plotting with the CEA Dashboard interface. It should help understand existing code as well as creating new plots for the CEA.

Early 2018, the CEA introduced a system for creating plots based on the output of various CEA scripts. This system was itself a CEA script, `cea plots`, and was soon augmented with `plots-optimization`,
`plots-scenario-comparisons` and `plots-supply-system`. These scripts were designed to create a bunch of scripts with each invocation, with a `--categories` parameter to restrict plot creation to a subset for each of the plotting scripts.

At the same time, we started the development of the CEA Dashboard, a browser-based interface to the CEA as a replacement for the ArcGIS toolbox.

This interface also allows viewing results by creating "Dashboards" - collections of plots, that can be customized by the user. The requirements for this plotting system were sufficiently different to warant a rewrite.

## Requirements

The plotting system for the CEA Dashboard should be able to:

- make it easy to add new plots to the CEA
- visualize the plots fast, only re-calculate a plot when input files or parameters have changed
- store plot parameters together with the plot
- have an offline export (to `.html` files) like the old plotting system
- have an online version, exporting `<div/>`s for inclusion in the frontend


## PlotBase

The class `cea.plots.PlotBase` is the basic building block of the CEA plotting system. `PlotBase` defines what it means to _be_ a CEA Plot.

![PlotBase Class Diagram]({{site.baseurl}}/images/2019-07-11-cea-plots-the-gory-details/plotbase.png)

Being a plot in CEA mainly means responding to these two methods:

- `plot.plot(auto_open=True)` - plot the plot to disk as an html file to a location specified by the `plot.output_path` property.
- `plot.plot_div()` - return a `<div/>` for the plot. The CEA Dashboard will use this to display the plot inside the interface.

A plot is instantiated with the `__init__(project, parameters, cache)` constructor. The `project` parameter is the full path to the project being plotted, the `parameters` parameter is a dictionary of parameters specific to the plot - `expected_parameters` lists the parameters and relates them to the equivalent section in the `cea.config` file). The `cache` parameter is a `cea.plots.cache.PlotCache` used to avoid re-calculating plots

- layout property (also intro to @property decorator)
- calc_graph
- calc_table
- plot parameters (expected_parameters, see also `dashboard.yml`)

## Cache

- Caching (@cached decorator)
- cached data used by multiple plots in category

## Categories

- base classes per category
- cached 

## Developing plots

-	how to run from PyCharm
-	where to find examples