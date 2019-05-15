---
layout: post
title: An Installer for the CityEnergyAnalyst
---

This post collects some ideas about [issue #1828 (Make one-for-all installer for Windows)](https://github.com/architecture-building-systems/CityEnergyAnalyst/issues/1828).

The main goal of that issue is to make installing the CEA on a new machine as painless as possible. This is supposed to work for a [wide variety of users](https://city-energy-analyst.readthedocs.io/en/latest/user-personas.html), spanning end-users that just want to give it a spin all the way to developers, who want to set up an environment for extending the CEA.

In theory, this should be trivial. In practice, it's not. The weird thing about the requirements is that we're straddling the two worlds of deployed application and development environment. Here are some things the installer needs to do:

- Provide a `cea` command (and friends, such as `cea-config` and possibly a future `cea-dev`) that a user can call from `cmd.exe`
- Provide a Python environment that PyCharm can be configured to use as the [Project Interpreter](https://www.jetbrains.com/help/pycharm/configuring-python-interpreter.html) for developing the CEA
- Update to the newest version of the CEA 
	- on GitHub? 
	- on PyPI?
- Install a mechanism for running the `cea dashboard`
- Provide a shell (`cmd.exe`? With an initialization script?) to run the CEA from
- Install everything to a single folder
- Allow using a repository for the CEA (`pip install -e` switch)

Some problems:

- The conda environment we currently create (with `conda env create -f environment.yml`) is probably what we're going to ship. I have a zip of a current version that is 1GB in size. Is this feasible?
- Where to host such a big zip file? Bundle it with the installer?
- Some of the operations required (e.g. `pip install cityenergyanalyst` and `pip install -e .`) only become available once the conda environment has been extracted to the installation location
- Unknown: Does the `%USERPROFILE%\Miniconda2\envs\cea\Scripts\cea.exe` executable need to be in that subfolder? Because, I'd like to move it to the root of the installation location... How does it know where to look?
- How does the installer know how to update an installation?
- How does the installer know what kind of installation is used?
- This installation method should also work with the computer rooms on campus (HIL E65, HIB MBS)

---

Proposed layout as per issue:

- CEA (inside the Documents folder of the user?)
  - CityEnergyAnalyst
    - the repository?
  - Dependencies
    - what goes in here?
  - cea.config
    - hm... maybe this isn't such a good idea
  - CEA.exe
    - might be a problem with how pip works - we'll find out!

As hinted at above, there might be some problems with this layout...

1. GitHub Desktop has opinions on where the repository goes
2. what's in the Dependencies folder? the conda environment?
3. `cea.config` - how does the CEA find this at runtime? Especially since we don't know where it is
4. `CEA.exe` might not work there. I don't know. I'll have to try this out.

---

# Literary review: Trying to find best practices

- https://superuser.com/questions/532460/where-to-install-small-programs-without-installers-on-windows
  - apparently no rules?
  - advice against using ProgramData? (but `Documents` not cool either...)
  - probably best to keep it local (so, *don't use user profile*)
  - I'm liking `ProgramData` more, but it's hard to find manually and Jimeno want's to access `cea.config` manually.
- don't use roaming profile for storing data, as this could mess with corporate stuff
  - (especially since scenarios and stuff can be quite large)
  - or maybe we should?
- what if we made the default %PROGRAMDATA% but allowed Jimeno to install wherever he wants?
- ship git with it?
- WAIT! Not everything _has_ to be installed by the installer! Or _included_ in the installer! The update functionality and the repo functionality etc. can be installed later on with tools we install.

---

There should be a start menu entry "City Energy Analyst" with ab bunch of tools

- open cea command line (can we ship a cool terminal for this? msys or whatever it's called?)
- switch version (master on GitHub, version on PyPI, dev mode - enter path to local repository)
- run dashboard
- install arcgis toolbox?
- let's not install git as part of the process: instead, the user must install it himself
- we're going to ship cmder.net (the minimal version) and set up the cea command line thing to use that
- (optionally allow installing a portable version of git there?)

---

NSIS

Plugins used:
- https://nsis.sourceforge.io/Inetc_plug-in
- https://nsis.sourceforge.io/Nsis7z_plug-in

---

# TODO

- copy Dependencies.7z to Dependencies folder (done - easiest solution: create archive to match folder structure needed)
- copy Daysim binaries to Dependencies folder (which ones exactly?)
- set Daysim binaries to use based on installation...
- copy cmder to Dependencies folder (done)
- create dashboard runner (let's just open a shell in minimized mode... that's good enough for our use case - done)
- create all the shortcuts (done - unless... what shortcuts do we need in addition?)
- add extraction text for Dependencies.7z (done)
- how to get `cea.config` to be in $INSTDIR?! (i don't think we should do that...)
- copy config to home folder (this is hard to add in the pull request, since it doesn't exist yet...)
- document installer (what do the options do? what get's installed?)
  - document left-over tasks
    - un-bind the installer to allow tracking master? (or something similar)
