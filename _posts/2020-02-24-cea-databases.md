---
layout: post
published: false
title: Working with CEA Databases
---

Version 2.30.0 of the City Energy Analyst (CEA) introduced a new feature: The Database Editor.

![The Database Editor]({{site.baseurl}}/images/2020-02-24-cea-databases/database-editor-screenshot.png)

There's a lot going on here and it will take some time to explain it all.

**tl;dr**: The Database Editor allows you to edit region-specific data about your scenario.

One of the problems of building simulation is the vast amount of variables that need to be set. The CEA solves this by providing _archetypes_ - typical configurations for a region.

When you create a new scenario, you're asked to specify the Database to use. This should normally be either "CH" (for Swiss standards) or "SG" (for Singaporean standards), but you _do_ have the option to "Create your own database later" or "Browse for databases path". These last two options play together with the new Database Editor functionality and by the end of this article you should understand how.

![Create New Scenario]({{site.baseurl}}/images/2020-02-24-cea-databases/inputs-databases.png)

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

![The relationship between inputs and databases]({{site.baseurl}}/images/2020-02-24-cea-databases/inputs-databases.png)

- cea databases work in conjunction with the archetypes mapper and the input editor.

- cea ships with two sets of databases, one for Switzerland (CH) and one for Singapore (SG)

- when you create a new scenario, you choose the database to use (special case: opting out)

- you can create your own databases!

- you can submit your databses to our repository for inclusion in future releases of the CEA.
  
  - or should there be some kind of community site for this?

- The Database Editor manages
  
  - Archetypes
    
    - Construction-Standards
      
      - the archetypes-mapper uses these to set data for the input tables
      - the input tables????
      - does this get done in a first step when creating a scenario??? who knows???
    
    - Use-Types
      
      - Occ_m2pax    Qs_Wpax    X_ghpax    Ea_Wm2    El_Wm2    Epro_Wm2    Ed_Wm2    Vww_lpdpax    Vw_lpdpax    Qcre_Wm2    Qhpro_Wm2    Qcpro_Wm2    Ev_kWveh
      - schedules
    
    - WHAT ARE ARCHETYPES ANYWAY????
  
  - Assemblies
  
  - Components

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
