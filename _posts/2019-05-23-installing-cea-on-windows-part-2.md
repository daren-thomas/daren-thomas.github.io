---
layout: post
title: How to install the CityEnergyAnalyst (CEA) on Windows - part 2
---

Up until very recently, the official guide to installing the CEA on Windows involved a bunch of [arcane steps](https://city-energy-analyst.readthedocs.io/en/latest/installation-on-windows-manual.html) that sometimes tripped up new (and experienced) users. So we set out to come up with a better solution:

[Try out the CEA Installer!](https://cityenergyanalyst.com/tryit)

There are two basic installation modes for the CEA, based on [how you intend to use software](https://city-energy-analyst.readthedocs.io/en/latest/user-personas.html):

- installation as a [Student or Practitioner](#installation-as-a-student-or-practitioner) (see [part 1](/installing-cea-on-windows-part-1))
- installation as a [Researcher or Developer](#installation-as-a-researcher-or-developer) (this post)


## Installation as a Researcher or Developer

The installation for researchers and developers follows the same structure as that for students and practitioners. Make sure to select the "Developer version" component on the "Choose Components" page:

![Choose Components (Developer Version)]({{site.url}}/images/2019-05-15-installing-cea-on-windows/choose-components-developer-version.png)

The "Developer version" installs _in addition_ to the "Base Installation" a subdirectory "CityEnergyAnalyst" inside the installation folder. This is a clone of the [CEA git repository](https://github.com/architecture-building-systems/CityEnergyAnalyst) and contains the source code of the CEA. Next, the "Developer version" runs `pip install -e C:\Users\{user}\Documents\CityEnergyAnalyst\CityEnergyAnalyst`. This command ensures that the git repository is used as the current CEA version.

If you would like to switch to another branch, pull changes from origin or push your own changes, use the `git` command in the CEA Console or add the repository in [GitHub Desktop](https://desktop.github.com/): Select "File -> Add local repository..." from the menu (or press Ctrl + O) and navigate to the installation folder (`C:\Users\{user}\Documents\CityEnergyAnalyst`) and select the folder "CityEnergyAnalyst".

![GitHub Desktop Add local repository]({{site.url}}/images/2019-05-15-installing-cea-on-windows/github-desktop-add-local-repository.png)

Check out the [GitHub Desktop documentation](https://help.github.com/en/desktop) for more information on how to work with GitHub repositories.

If you would like to modify the source, we suggest using the [PyCharm IDE](https://www.jetbrains.com/pycharm/) - but any text editor will do. In PyCharm, open the repository (`C:\Users\{user}\Documents\CityEnergyAnalyst\CityEnergyAnalyst`). You will need to [set the Project Interpreter](https://www.jetbrains.com/help/pycharm/configuring-python-interpreter.html#add-existing-interpreter) to `C:\Users\{user}\Documents\CityEnergyAnalyst\Dependencies\Python\python.exe`

![Select Python Interpreter]({{site.url}}/images/2019-05-15-installing-cea-on-windows/select-python-interpreter.png)


