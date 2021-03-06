---
layout: post
published: true
title: Working with CEA Databases - Part 2
---

The Archetypes Mapper mentioned in [part 1 of this series](/cea-databases-part-1) sets up basic properties for your scenario. In this post, I'll go into more detail on how to fine-tune your scenario using the Assemblies defined in the database.

<!--more-->

## Configuring your scenario with Assmeblies

The input tables reference the database to provide detailed information about the physical properties of your buildings.

![The relationship between inputs and databases](../images/2020-02-24-cea-databases/inputs-databases.png)

Check the _architecture_ tab in the Input Editor. The fields `type_cons`, `type_leak`, `type_roof`, `type_shade`, `type_wall`, `type_floor`, `type_base` and `type_win` refer to Assemblies defined in the database. Hovering over the column header will show you a description of the field.

Click on the `type_cons` entry for the building "B1000" - you can choose from a list of construction assemblies. The Archetype Mapper auto-assigned these based on the construction year, but you can change these values to reflect your scenario.

Let's assume none of the provided construction assemblies match your building. We'll need to create our own construction assembly. Head over to the Database Editor. From the Assemblies menu, choose "Envelope". You can now edit the assemblies for construction, tightness, windows, roofs, walls, floors and shading systems.

The construction assembly defines the following fields: `Description`, `code`, `Cm_Af`. Hover over the `Cm_Af` column header to see the description of this field: 

> **Cm_Af** : Internal heat capacity per unit of air conditioned area. Defined according to ISO 13790. / UNIT: \[J/Km2]

Click the "Add Row" button to add a new construction assembly and fill some information:

![Adding a Construction Assembly](../images/2020-02-24-cea-databases/adding-construction-assembly.png)

Make sure to click the "Save Databases" button when you are satisfied with your changes.

You can now use this construction assembly with your scenario in the input editor.

The Envelope Assemblies all specify properties of a building's envelope. They are referenced from the _architecture_ input table.

The other two Assembly types are HVAC and Supply.

The _air-conditioning-systems_ input table references the HVAC Assemblies. The _supply-systems_ input table references the Supply Assemblies. As with the Envelope Assemblies, these are first mapped to your scenario when you run the Archetypes Mapper, based on the _typology_ input table. You can, of course, edit each building's HVAC and supply systems individually in the Input Editor. Refer back to the Database Editor to see what values each Assembly defines.

As with the Archetypes defined in the database - if you manually edit the Assemblies, you'll want to export the database for use in other scenarios. See [part 3](/cea-databases-part-3) for information about exporting and assigning databases.
