---
layout: post
published: false
title: Working with CEA Databases
---

Version 2.30.0 of the City Energy Analyst (CEA) introduced a new feature: The Database editor. 

![The Database Editor]({{site.baseurl}}/images/2020-02-24-cea-databases/database-editor-screenshot.png)

There's a lot going on here and it will take some time to explain it all so bear with me:

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
    
    	- Occ_m2pax	Qs_Wpax	X_ghpax	Ea_Wm2	El_Wm2	Epro_Wm2	Ed_Wm2	Vww_lpdpax	Vw_lpdpax	Qcre_Wm2	Qhpro_Wm2	Qcpro_Wm2	Ev_kWveh
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
