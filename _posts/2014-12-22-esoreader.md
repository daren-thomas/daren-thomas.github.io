---
layout: post
published: true
title: A short tutorial on the esoreader module
---

This post explains how to use the [`esoreader`](https://github.com/daren-thomas/esoreader), a python module for parsing the `.eso` file produced by [EnergyPlus](http://apps1.eere.energy.gov/buildings/energyplus/). It also includes a small (incomplete) reverse engineering of the `.eso` file format.

<!--more-->

EnergyPlus is a whole building simulation tool EnergyPlus is a whole building energy simulation program that engineers, architects, and researchers use to model energy and water use in buildings. The `.eso` file is the main output file produced by EnergyPlus and is normally parsed by tools that come with the EnergyPlus suit of tools. The `esoreader` module lets you read in the time series data in python scripts, which for my research is quite useful. I published the module thinking other people might want to do so too.

Last week I got an email about how the documentation on the [pypi page for the `esoreader` module](https://pypi.python.org/pypi/esoreader) is rather... terse. So I went to check the `esoreader` page and yes, there is not a lot of documentation. The example code I published was this:

```python
import esoreader
PATH_TO_ESO = r'/Path/To/EnergyPlus/Output/eplusout.eso'
dd, data = esoreader.read(PATH_TO_ESO)
frequency, key, variable = dd.find_variable(
    'Zone Ventilation Total Heat Loss Energy')[0]
idx = dd.index[frequency, key, variable]
time_series = data[idx] 
```

What can I say? There is not much more you can do with `esoreader`. I think the best way to understand the module is to look at the .eso file format:

The eso file format starts of with a header section called the "data dictionary" (I used the variable `dd` in the example code for that). The first few lines of a sample eso file look something like this:

    Program Version,EnergyPlus-Windows-32 8.1.0.009, YMD=2014.03.20 14:18
    1,5,Environment Title[],Latitude[deg],Longitude[deg],Time Zone[],Elevation[m]
    2,6,Day of Simulation[],Month[],Day of Month[],DST Indicator[1=yes 0=no],Hour[],StartMinute[],EndMinute[],DayType
    3,3,Cumulative Day of Simulation[],Month[],Day of Month[],DST Indicator[1=yes 0=no],DayType  ! When Daily Report Variables Requested
    4,2,Cumulative Days of Simulation[],Month[]  ! When Monthly Report Variables Requested
    5,1,Cumulative Days of Simulation[] ! When Run Period Report Variables Requested
    6,1,DEFAULT_ZONE,Zone Outdoor Air Drybulb Temperature [C] !TimeStep
    99,1,DPVWALL:1157026,Surface Outside Face Temperature [C] !TimeStep
    100,1,DPVWINDOW:COMBINED:DPVWALL:1157026:DEFAULTWINDOWCONSTRUCTION,Surface Outside Face Temperature [C] !TimeStep
    101,1,DPVWALL:1157027,Surface Outside Face Temperature [C] !TimeStep
    102,1,DPVWINDOW:COMBINED:DPVWALL:1157027:DEFAULTWINDOWCONSTRUCTION,Surface Outside Face Temperature [C] !TimeStep
    103,1,DPVWALL:1157028,Surface Outside Face Temperature [C] !TimeStep
    104,1,DPVWINDOW:COMBINED:DPVWALL:1157028:DEFAULTWINDOWCONSTRUCTION,Surface Outside Face Temperature [C] !TimeStep
    105,1,DPVWALL:1157029,Surface Outside Face Temperature [C] !TimeStep
    106,1,DPVWINDOW:COMBINED:DPVWALL:1157029:DEFAULTWINDOWCONSTRUCTION,Surface Outside Face Temperature [C] !TimeStep
    107,1,DPVFLOOR:1157042,Surface Outside Face Temperature [C] !TimeStep
    108,1,DPVROOF:1157058.0,Surface Outside Face Temperature [C] !TimeStep
    109,1,DPVROOF:1157058.1,Surface Outside Face Temperature [C] !TimeStep
    110,1,DPVROOF:1157058.2,Surface Outside Face Temperature [C] !TimeStep
    111,1,DPVROOF:1157058.3,Surface Outside Face Temperature [C] !TimeStep
    112,1,DEFAULT_ZONE,Zone Mean Air Temperature [C] !TimeStep
    278,1,DEFAULT_ZONEZONEHVAC:IDEALLOADSAIRSYSTEM,Zone Ideal Loads Zone Total Heating Energy [J] !TimeStep
    279,1,DEFAULT_ZONEZONEHVAC:IDEALLOADSAIRSYSTEM,Zone Ideal Loads Zone Total Cooling Energy [J] !TimeStep
    End of Data Dictionary

The first line is stored in the DataDictionary object (`dd`) as `version` and `timestamp`. After that, each line represents a variable being reported. Each such variable has an index, a number of values being reported and then a reporting frequency. Well... the first few lines (indexes 1 through 5) are a bit special and I just discard them. The rest of the data dictionary lines are built like this:

- index (e.g. 100)
- column count (is always one as far as I can tell)
- key (the same variable can be measured for different keys, as per the Output:Variable object in the IDF file)
  (e.g. "DPVWINDOW:COMBINED:DPVWALL:1157026:DEFAULTWINDOWCONSTRUCTION", a surface name in one of my models)
- variable name (e.g. "Surface Outisde Face Temperature")
- unit (e.g. "C")
- reporting frequency (e.g. "TimeStep")

These get parsed into a DataDictionary object and stored in the attributes `variables` and `index`.

    variables = dict of ids, int => [reporting_frequency,
                                     key, variable, unit]
    
    index = dict {(key, variable, reporting_frequency) => id)}

here is an example (I'm using the [IPython](http://ipython.org/) shell, in case you're wondering about the In [71] line - check it out! it is awesome!!)

    In [71]: dd.variables.items()[1]
    Out[71]:
    (100,
     ['TimeStep',
      'DPVWINDOW:COMBINED:DPVWALL:1157026:DEFAULTWINDOWCONSTRUCTION',
      'Surface Outside Face Temperature',
      'C'])

The DataDictionary object has a method `find_variable`. Say, you want to find the variable for 'Zone Mean Air Temperature':

    In [75]: dd.find_variable('Zone Mean Air Temperature')
    Out[75]: [('TimeStep', 'DEFAULT_ZONE', 'Zone Mean Air Temperature')]

Notice how the result is a list? If you had looked for surface temperatures instead:

    In [76]: dd.find_variable('surface')
    Out[76]:
    [('TimeStep', 'DPVROOF:1157058.1', 'Surface Outside Face Temperature'),
     ('TimeStep', 'DPVWALL:1157029', 'Surface Outside Face Temperature'),
     ('TimeStep',
      'DPVWINDOW:COMBINED:DPVWALL:1157029:DEFAULTWINDOWCONSTRUCTION',
      'Surface Outside Face Temperature'),
     ('TimeStep', 'DPVWALL:1157028', 'Surface Outside Face Temperature'),
     ('TimeStep', 'DPVROOF:1157058.3', 'Surface Outside Face Temperature'),
     ('TimeStep', 'DPVROOF:1157058.0', 'Surface Outside Face Temperature'),
     ('TimeStep',
      'DPVWINDOW:COMBINED:DPVWALL:1157028:DEFAULTWINDOWCONSTRUCTION',
      'Surface Outside Face Temperature'),
     ('TimeStep',
      'DPVWINDOW:COMBINED:DPVWALL:1157026:DEFAULTWINDOWCONSTRUCTION',
      'Surface Outside Face Temperature'),
     ('TimeStep', 'DPVWALL:1157027', 'Surface Outside Face Temperature'),
     ('TimeStep',
      'DPVWINDOW:COMBINED:DPVWALL:1157027:DEFAULTWINDOWCONSTRUCTION',
      'Surface Outside Face Temperature'),
     ('TimeStep', 'DPVFLOOR:1157042', 'Surface Outside Face Temperature'),
     ('TimeStep', 'DPVWALL:1157026', 'Surface Outside Face Temperature'),
     ('TimeStep', 'DPVROOF:1157058.2', 'Surface Outside Face Temperature')]

you'd have gotten a list of all variables that match 'surface' (case-insensitive, substring match). The tuples define the variable you're looking for: Frequency, key and variable name, since you can have the same variable output for different frequencies and keys!

So the index of the variable we're looking for (Zone Mean Air Temperature) can be found like this:

    In [77]: dd.index['TimeStep', 'DEFAULT_ZONE', 'Zone Mean Air Temperature']
    Out[77]: 112

When you parse an `.eso` file, you get two values back: The `DataDictionary` and the data itself, which is stored in a simple dictionary mapping the variable index to the timeseries data:

    In [82]: dd, data = esoreader.read('RevitToCitySim_fmibeta.eso')
    
    In [84]: data[112]
    Out[84]:
    [19.9999999999999,
     20.0,
     20.0,
     20.0,
     20.0,
     20.0,
     20.0,

Where does that data come from? From the rest of the `.eso` file, which looks like this:

    1,Zuerich-SMA - - TMY2-66600 WMO#=,  47.38,   8.57,   1.00, 556.00
    2,1, 1, 1, 0, 1, 0.00,60.00,Tuesday        
    6,-9.733141026918536E-003
    99,4.22860281958676
    100,2.29752216466107
    101,4.62549195332972
    102,2.48360878690238
    103,4.45346228786434
    104,2.40363283464546
    105,4.29531948374435
    106,2.37522804444541
    107,18.
    108,4.50377052140968
    109,4.62335191215081
    110,4.38341749556803
    111,4.62165617120029
    112,19.9999999999999
    278,69070426.0448551
    279,2.200249582529068E-006
    2,1, 1, 1, 0, 2, 0.00,60.00,Tuesday        
    6,-20.0097331410269
    99,-3.72067959222121
    100,-11.9333570144822
    101,-3.2185453285921
    102,-11.9539672821419
    103,-3.21604754356428
    104,-11.6999602208759
    105,-3.69978393125912
    106,-12.1422252778574
    107,18.
    108,-0.183133489472591
    109,0.134352957894094
    110,-0.291113509003108
    111,9.541793763769267E-002
    112,20.
    278,12241499.5530833
    279,0.0
    2,1, 1, 1, 0, 3, 0.00,60.00,Tuesday        
    6,-20.0097331410269
    99,-8.25275818278861
    100,-10.9050845966823

For all the main variables (id > 5) the format is:

- index
- value

Thus, the data dictionary is necessary to figure out what variables (with what frequency) are being output.

To sum up the tutorial: The code on the pypi page shows you pretty much all you can do and also all you need to do to retrieve a specific timeseries from an `.eso` file:

* read in the `eso file` to obtain the data dictionary and the data
* find the key, frequency and variable name you need in the data dictionary (with `find_variable`) or by guessing from your IDF input
* retrieve the index of that variable
* retrieve the time series data using that index

---

(this post was originally published on [blogspot](https://darenatwork.blogspot.com/2014/12/))


