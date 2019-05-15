
---
layout: post
title: How to install the CityEnergyAnalyst (CEA) on Windows
---

Up until very recently, the official guide to installing the CEA on Windows involved a bunch of [arcane steps](https://city-energy-analyst.readthedocs.io/en/latest/installation-on-windows-manual.html) that sometimes tripped up new (and experienced) users. So we set out to come up with a better solution:

[Try out the CEA Installer!](https://cityenergyanalyst.com/tryit)

There are two basic installation modes for the CEA:

- installation as a [Student or Practitioner](https://city-energy-analyst.readthedocs.io/en/latest/user-personas.html)
- installation as a [Researcher or Developer](https://city-energy-analyst.readthedocs.io/en/latest/user-personas.html)

## Installation as a Student or Practitioner

Installation is as simple as runnning the installer and just accepting all the default options. There. You're done.

Let's go through each step in detail:

[Licence Agreement]({{site.url}}/images/2019-05-15-installing-cea-on-windows/licence-agreement.png)

The CEA is released under the [MIT Licence](https://en.wikipedia.org/wiki/MIT_License). You'll need to agree to the licence terms to continue the installation by clicking on the button labled "I Agree".

[Choose Install Location]({{site.url}}/images/2019-05-15-installing-cea-on-windows/choose-install-location.png)

The default setting is to install the CEA in a subfolder of your Documents folder called "CityEnergyAnalyst". Yes, that's the special "Documents" folder in the "Quick access" list in Windows Explorer - this will come in handy if you're doing a Developer style installation (see bellow).

You can change this setting to any folder you like as long as you have write access to that folder. Be aware, though, that in general, the CEA Documentation assumes you installed to the default location.

[Choose Components]({{site.url}}/images/2019-05-15-installing-cea-on-windows/choose-components.png)

The main difference between a Student/Practitioner and a Researcher/Developer style installation is the choice of the components. The default setting is to install a "Base Installation" (more on that below) and to "Create Start menu shortcuts". Additionally, you can choose to "Create Desktop shortcuts". This will install the same set of shortcuts as those in the Start menu, but on your Desktop.

[Installing]({{site.url}}/images/2019-05-15-installing-cea-on-windows/installing.png)

The installation will take around seven minutes. You can see a detailed view of the current progress by clicking on the button labled "Show details".

The installer will install the following items:

- A folder called "City Energy Analyst" in your Start menu containing the following shortcuts:
  - _CEA Dashboard_: Launches the CEA Dashboard in your web browser
  - _CEA Console_: Launches the [cmder](https://cmder.net/) console emulator, preconfigured to run the CEA command line interface (type `cea --help` for an introduction on the available scripts)
  - _cea.config_: Launches `notepad.exe` with the `cea.config` file - this is a convenience for users who want to edit this file manually
- A folder called "CityEnergyAnalyst" in your Documents folder containing the following items:
  - _Uninstall.exe_: Use this to uninstall the CEA from your computer
  - The same list of shortcuts as in the Start menu, for your convenience
  - _dashboard.bat_: A utility file for starting the CEA Dashboard from the shortcut
  - _Dependencies_: This folder contains the minimal [Daysim](http://daysim.ning.com/) binaries necessary to run the CEA, a Python environment with the CEA dependencies as well as the preconfigured cmder console emulator.

The installer requires an internet connection to locate and download the Python environment.

[Installation Complete]({{site.url}}/images/2019-05-15-installing-cea-on-windows/installation-complete.png)

There. You're done. Check out the [tutorials section](https://city-energy-analyst.readthedocs.io/en/latest/tutorials.html) of our documentation for further next steps.


## Installation as a Researcher or Developer

