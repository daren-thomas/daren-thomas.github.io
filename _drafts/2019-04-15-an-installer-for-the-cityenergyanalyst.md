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

