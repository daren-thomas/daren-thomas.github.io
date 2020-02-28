---
layout: post
published: true
title: Working with CEA Databases
---

Version 2.30.0 of the City Energy Analyst (CEA) introduced a new feature: The Database Editor.

![The Database Editor]({{site.baseurl}}/images/2020-02-24-cea-databases/database-editor-screenshot.png)

![The Database Editor]({{site.baseurl}}/images/2020-02-24-cea-databases/database-editor-screenshot.png)

There's a lot going on here and it will take some time to explain it all.

## tl;dr

The Database Editor allows you to edit region-specific data about your scenario.

One of the problems of building simulation is the vast amount of variables that need to be set. The CEA solves this by providing _archetypes_. An archetype is a template for building properties and schedules.

When you create a new scenario, you're asked to specify the Database to use. This should normally be either "CH" (for Swiss standards) or "SG" (for Singaporean standards), but you _do_ have the option to "Create your own database later" or "Browse for databases path". These last two options play together with the new Database Editor functionality and by the end of this article you should understand how.

## Creating a new scenario with a standard Database (CH)

![Create New Scenario]({{site.baseurl}}/images/2020-02-24-cea-databases/create-new-scenario.png)

Let's start by creating a scenario with the standard workflow:

- in the Project Overview, click "Create Project" and enter a name (e.g. "working-with-databases")
- click "Create New Scenario"
- name the scenario "kleinalbis"
- choose the "CH" database for Switzerland
- select "Generate new input files using tools"
- select all the Data Management tools (select them in sequence, as their availability is dependant on previous selections)
- click the settings button for the Weather tool and choose "Zuerich_Kloten_1990_2010_TMY"
- enter "kleinalbis" in the location search bar and click "Go"
- use the "Draw" tool on the map to select some buildings (e.g. Kleinalbis 79-83)
- click "Create" and wait a bit while the CEA does it's magic and routes you to the Input Editor

![Selecting an area in the map for the zone file]({{site.baseurl}}/images/2020-02-24-cea-databases/select-an-area-in-the-map-for-the-zone-file.png)

This will create the basic input files for your scenario: _zone_, _typology_ and _surroundings_.

The [zone input file](https://city-energy-analyst.readthedocs.io/en/latest/input_methods.html#get-zone-geometry) is a [shapefile](https://en.wikipedia.org/wiki/Shapefile). It contains the polygons representing the buildings on the map and defines building names and building heights.

The [surroundings input file](https://city-energy-analyst.readthedocs.io/en/latest/input_methods.html#get-surroundings-geometry) describes building geometries that are not part of the scenario itself, but might cast shadows on the zone buildings.

The [typology input file](https://city-energy-analyst.readthedocs.io/en/latest/input_methods.html#get_building_typology) links the building to a construction standard, a construction year and a 1st, 2nd and 3rd "use". This information is pre-populated from the [OSM](https://en.wikipedia.org/wiki/OpenStreetMap) data in a best-effort manner. This data is used to "guess" the physical properties of the buildings in your scenario. And this exactly where the databases come in.

## The Archetypes Mapper and the remaining input tables

You might have noticed that the other tables in the Input Editor (_architecture_, _internal-loads_, _indoor-comfort_, _air-conditioning-systems_, _supply-systems_ and _schedules_) are empty. Instead, you're directed to use the "Archetype Mapper" tool. Click on the link and run the tool for all the input databases. This will produce the remaining input tables.

![The Archetypes Mapper]({{site.baseurl}}/images/2020-02-24-cea-databases/archetypes-mapper.png)

As you can see in the diagram above, we're already using the databases. The Archetypes Mapper uses information stored in the databases to produce the remaining input files.

If you check the Database Editor, you'll see it's divided into three main categories:

- Archetypes
- Assemblies
- Components

The Archetypes Mapper uses the information stored in the Archetypes category: Construction-Standards and Use-Types. It works like this:

The "STANDARD" field in the _typology_ input table is used to look up construction standards in the database (`inputs/technology/archetypes/CONSTRUCTION_STANDARD.xlsx`). The section "ENVELOPE_ASSEMBLIES" is used to create the _architecture_ input table. "HVAC_ASSEMBLIES" and "SUPPLY_ASSEMBLIES" are used for _air-conditioning-systems_ and _supply-systems_ respectively.

The remaining fields ("1ST_USE", "2ND_USE", "3RD_USE") in the _typology_ input table are used to create a weighted average of the occupancy type information in the database. The fields "1ST_USE_R", "2ND_USE_R", "3RD_USE_R" give the respective ratios of that occupancy type in the building. This is used to produce the _internal-loads_, _indoor-comfort_ and _schedules_ tables.

You can run the Archetypes Mapper multiple times and also selectively overwrite only a part of the input tables - each time, the tables are overwritten with the information taken from the Databases. Try changing the STANDARD values as well as setting the occupancy uses in the _typology_ input table for some of your buildings and run the Archetypes Mapper again.

The Archetypes Mapper helps you get your scenario up and running with minimal input. Often, you'll have more information about your buildings and you'll want to manually edit the information in the input tables.

## Configuring your scenario with Assmeblies

The input tables reference the database to provide detailed information about the physical properties of your buildings.

![The relationship between inputs and databases]({{site.baseurl}}/images/2020-02-24-cea-databases/inputs-databases.png)

Check the _architecture_ tab in the Input Editor. The fields `type_cons`, `type_leak`, `type_roof`, `type_shade`, `type_wall`, `type_floor`, `type_base` and `type_win` refer to _assemblies_ defined in the database. Hovering over the column header will show you a description of the field.

Click on the `type_cons` entry for the building "B1000" - you can choose from a list of construction assemblies. The Archetype Mapper auto-assigned these based on the construction year, but you can change these values to reflect your scenario.

Let's assume none of the provided construction assemblies match your building. We'll need to create our own construction assembly. Head over to the Database Editor. From the Assemblies menu, choose "Envelope". You can now edit the assemblies for construction, tightness, windows, roofs, walls, floors and shading systems.

The construction assembly defines the following fields: `Description`, `code`, `Cm_Af`. Hover over the `Cm_Af` column header to see the description of this field: 

> **Cm_Af** : Internal heat capacity per unit of air conditioned area. Defined according to ISO 13790. / UNIT: \[J/Km2]

Click the "Add Row" button to add a new construction assembly and fill some information:

![Adding a Construction Assembly]({{site.baseurl}}/images/2020-02-24-cea-databases/adding-construction-assembly.png)

You can now use this construction assembly with your scenario in the input editor.

## Components

So by now we've covered Archetypes and Assemblies. To recap: Archetypes group collections of Assemblies. Archetypes are first set in the typology input table and the Assemblies get mapped to the other input tables using the Archetypes Mapper Tool. Assemblies 

----

yes. definatelly. So the components/CONVERSION are used by all the scripts form energy potentials to optimization
08:59
the components/DISTRIBUTION are used by all the script from tehermal networks to optimization
08:59
the components/feedstocks are used by all the scripts from life cycle, to optimization
08:59
now, in regards to databases:
09:03
As rey said: Components/FEEDSTOCKS are referenced directly and part of the assemblies/SUPPLY.
But also, Components/CONVERSION and Coponents/DISTRUBTION are part of assemblies/SUPPLY. However in an abstract way.
You see, an assembly/SUPPLY should be represented by a combination of at least one Components/FEEDSTOCKS, one Components/CONVERSION, and one Components/DISTRUBTION. This si how a supply system work. In the near future we could include some validation so the user of assemblies/SUPPLY locate one feedstock, one conversion, and one distribution or more. But for now (since we do not have the models behind), it does not make too much sense to do it.

----

- you can submit your databses to our repository for inclusion in future releases of the CEA.

- List of files that are involved

- schema showing how the tables relate to each other?

- what is an "assembly"? where is it used?

- what is a "component"? where is it used?

- Exporting a database for future use / Assigning a database previously exported
  
  - importing only parts of a database

- Break this up into a multi-part blog
  
  - how to use the database editor
  
  - how to create your own databases
  
  - details and stuff
