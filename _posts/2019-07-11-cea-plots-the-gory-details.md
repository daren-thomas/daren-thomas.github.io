---
layout: post
title: CEA Plots - the Gory Details
published: true
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

A plot is instantiated with the `__init__(project, parameters, cache)` constructor. The `project` parameter is the full path to the project being plotted, the `parameters` parameter is a dictionary of parameters specific to the plot - `expected_parameters` lists the parameters and relates them to the equivalent section in the `cea.config` file). The `cache` parameter is a `cea.plots.cache.PlotCache` used to avoid re-calculating plots - we'll discuss that in a separate chapter.

When a plot is initialized, it's expected to instantiate an attribute called `input_files` which is a list of input files the plot depends on - this is used to figure out if a plot can be plotted (e.g. if all the input files are present) but also to figure out if a plot needs to be re-calculated (e.g. if at least one of the input files is newer than the cached plot). An input file is specified as a tuple `(locator_method, [*args])`. See the method `missing_input_files(self)` for an example of how they are used:

```
def missing_input_files(self):
    """Return the list of missing input files for this plot"""
    result = []
    for locator_method, args in self.input_files:
        if not os.path.exists(locator_method(*args)):
            result.append((locator_method, args))
    return result
```

The `PlotBase` class implements plotting using [Plotly](https://plot.ly/python/getting-started/). By overriding the `plot_div` and (optionally) `table_div` methods in subclasses, other plotting interfaces could be used - e.g. to produce maps etc. For the Plotly-based plots, `calc_graph()` and `layout` provides the data and the layout - so for most plots, you'll be customizing these.

Each plot has a `name` - this is the name shown in the CEA Dashboard when adding a new plot. The `id()` class method creates a "scripting friendly" version of this name which is used for identifying the plot in URLs and in the `dashboard.yml` file.

A good example of a minimal subclass is `cea.plots.solar_technology_potentials.pv_monthly.PhotovoltaicMonthlyPlot` which overrides the following attributes, inheriting the rest:

- `name`
- `__init__(project, parameters, cache)`
- `layout`
- `calc_graph`
- `calc_table`

## Cache

The `plot_div()` and `table_div()` methods are cached to a subfolder of the project called `.cache` using the `PlotCache` class. The cache basically compares the timestamp of the last cached version to the newest input file of a plot and if it's newer, reads in that file instead of re-creating the plot.

Since the same plot can be used with different parameters (e.g. the "Energy Demand / Comfort Chart" can be shown for different buildings or scenarios in the project), the parameter values are used as part of the "key" to the cache. 

The cache can also be used to store pre-computed `Dataframe`s or any other object that can `to_pickle()` itself. This is used for data that is used by multiple plots inside a category, especially, when computing the data is time-intensive.

The module `cea.plots.cache` includes a decorator `@cached` that makes caching properties and methods without arguments easy to cache: As long as the property or method belongs to a plot class (ultimately derived from `cea.plots.base.PlotBase`), just sticking the `@cached` decorator above the method/property automatically sets it up to be cached. For an example, see `cea.plots.thermal_networks.ThermalNetworksPlotBase`:

```python
class ThermalNetworksPlotBase(cea.plots.PlotBase):
    # ...
    @property
    @cea.plots.cache.cached
    def hourly_loads(self):
        hourly_loads = pd.DataFrame(self.buildings_hourly.sum(axis=1))
        if self.network_type == 'DH':
            hourly_loads.columns = ['Q_dem_heat']
        else:
            hourly_loads.columns = ['Q_dem_cool']
        return hourly_loads
    # ...
```

This allows all plots in the Thermal Networks category to do `df = myplot.hourly_loads` and get back the hourly loads for the buildings this plot is set up for - without recalculating them each time.

There is a class `MemoryPlotCache` which takes the caching one step further and keeps the results of previously looked-up caches in memory for even faster access. Tests on my local machine have not shown much improvement, though, so I haven't set this as the default for the CEA Dashboard.

## Categories

Each plot belongs to a category (e.g. "Energy Demand"). Since these categories collect plots that work on the same data, so it's natural to have them all based off a common base class. This is defined in the `__init__.py` file for each category:

```
cea/plots
|   base.py
|   cache.py
|   categories.py
|   __init__.py
|
+---demand
|       comfort_chart.py
|       energy_balance.py
|       energy_demand.py
|       energy_supply.py
|       energy_supply_intensity.py
|       energy_use_intensity.py
|       heating_reset_schedule.py
|       load_curve.py
|       load_curve_supply.py
|       load_duration_curve.py
|       load_duration_curve_supply.py
|       peak_load.py
|       peak_load_supply.py
|       __init__.py
|
+---...
```

The `cea/plots/demand/__init__.py` module implements the `DemandPlotBase` class which is used for the plots in this category. It defines all the stuff that is the _same_ for Energy Demand plots.

A "Category" is defined as a module in the `cea.plots.*` namespace that has a module-level variable called `name` - this is the name shown in the CEA Dashboard for the category when adding a new plot. See the `cea.plots.categories` module for more information on how the categories work - and how they find all the plots.

## Developing plots

The easiest way to develop a plot is to follow the existing examples. Create a category by creating a subdirectory of `cea/plots` with an `__init__.py` modules that has a `name = "The user-visible name of your category"` as well as a base class for plots in this category. Add (ideally) one module per plot, deriving from the category base plot and implement `name`, `__init__(project, parameters, cache)`, `layout` and `calc_graph`.

You can test a plot from PyCharm by adding something similar to this at the bottom of the plot module:

```
def main():
    """Test this plot"""
    import cea.config
    import cea.inputlocator
    import cea.plots.cache
    config = cea.config.Configuration()
    locator = cea.inputlocator.InputLocator(config.scenario)
    cache = cea.plots.cache.PlotCache(config.project)
    # cache = cea.plots.cache.NullPlotCache()
    PvtMonthlyPlot(config.project, {'buildings': None,
                                    'scenario-name': config.scenario_name,
                                    'weather': config.weather},
                   cache).plot(auto_open=True)
    PvtMonthlyPlot(config.project, {'buildings': locator.get_zone_building_names()[0:2],
                                    'scenario-name': config.scenario_name,
                                    'weather': config.weather},
                   cache).plot(auto_open=True)
    PvtMonthlyPlot(config.project, {'buildings': [locator.get_zone_building_names()[0]],
                                    'scenario-name': config.scenario_name,
                                    'weather': config.weather},
                   cache).plot(auto_open=True)


if __name__ == '__main__':
    main()
```

Note, depending on your plot, you might need to specify other parameters - or you could use `YourPlotClass.get_default_parameters()`. Also, the `cache` object can be set to `NullPlotCache` to avoid re-using pre-computed `<div/>`s.