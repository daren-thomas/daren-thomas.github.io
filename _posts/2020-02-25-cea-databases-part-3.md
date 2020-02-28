---
layout: post
published: false
title: Working with CEA Databases - Part 3
---

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
