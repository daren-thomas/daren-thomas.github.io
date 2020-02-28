---
layout: post
published: false
title: Working with CEA Databases - Part 3
---

It's time to wrap up the series on working with CEA Databases - in this post we'll examine the role of Components for the CEA simulations as well as assigning and exporting databases for your scenarios.

<!--more-->

This is part 3 in our little series on working with CEA Databases - see [part 1](/cea-databases-part-1) for information on Archetypes and [part 2](/cea-databases-part-2) for information on Assemblies.

## Components

By now we've covered Archetypes and Assemblies. To recap: Archetypes group collections of Assemblies. Archetypes are first set in the typology input table and the Assemblies get mapped to the other input tables using the Archetypes Mapper Tool. Assemblies group core physical properties of various systems under meaningful names. Archetypes and Assemblies are both used in the input tables of the Input Editor.

The last section of the Database Editor is concerned with Components. Components describe Feedstocks, Conversion and Distribution of energy in our models.

You might have noticed that the Supply Assemblies (HEATING, HOT_WATER, COOLING and ELECTRICITY) reference the FEEDSTOCK Components. These Components are used in all the scripts, starting from the Life Cycle scripts all the way to the Optimization scripts.

The other components are used by the CEA scripts, but are not currently linked directly to the assemblies: CONVERSION components are used by all the scripts from Energy Potentials to Optimization. The DISTRIBUTION components are used Networks and Optimization scripts and describe thermal grid properties. A future version of the CEA will clean up the connection between Supply Assemblies and the Components.  

## Exporting Databases

The CEA comes with two default databases - one for Switzerland (CH) and one for Singapore (SG). You can use the Database Editor to customize your database to your specific region - either by implementing the code of your region or adding specific Assemblies tailored to the site you're working on.

Let's say you're conducting analysis for a larger building cooperative - e.g. [FGZ Zürich](https://fgzzh.ch/) - the "kleinalbis" scenario we created in [part 1 of this series](/cea-databases-part-1) is part of the FGZ.

![FGZ overview](https://fgzzh.ch/zh/assets/uploads/2019/10/fgz_siedlungen1.jpg)

Many buildings will share common construction types and systems. You'll also have much more detailed information at hand than generic regional codes, so it makes sense to spend some time 
