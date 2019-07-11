---
layout: post
title: CEA Plots - the Gory Details
published: false
---

This post goes into the gory details of plotting with the CEA Dashboard interface. It should help understand existing code as well as creating new plots for the CEA.

## Requirements

## PlotBase

- layout property (also intro to @property decorator)
- calc_graph
- calc_table
- plot parameters (expected_parameters)

## Cache

- Caching (@cached decorator)

Let’s discuss the plotting system of the Dashboard:

-	base plotting class (PlotBase)
o	
o	
o	
-	
-	Categories
o	base classes per category
o	cached data used by multiple plots in category
-	how to run from PyCharm
-	where to find examples
