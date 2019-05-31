---
layout: post
title: How to install the CEA on Windows - part 2
---

In [part 1 of this series](/installing-cea-on-windows-part-1), I showed you how to do a basic installation of the City Energy Analyst (CEA). For Researchers and Developers that would like to edit the source code of the CEA,
this post explains how to set it up.


The installation for researchers and developers follows the same structure as that for students and practitioners. Download and run the [CEA Installer](https://cityenergyanalyst.com/tryit). Make sure to select the "Developer version" component on the "Choose Components" page.

![Installing the developer version of the CEA]({{site.url}}/images/2019-05-15-installing-cea-on-windows/cea-developer-installation.gif)


The "Developer version" installs _in addition_ to the "Base Installation" a subdirectory "CityEnergyAnalyst" inside the installation folder. This is a clone of the [CEA git repository](https://github.com/architecture-building-systems/CityEnergyAnalyst) and contains the source code of the CEA. Next, the "Developer version" runs `pip install -e C:\Users\{user}\Documents\CityEnergyAnalyst\CityEnergyAnalyst`. This command ensures that the git repository is used as the current CEA version.

If you would like to switch to another branch, pull changes from origin or push your own changes, use the `git` command in the CEA Console or add the repository in [GitHub Desktop](https://desktop.github.com/): Select "File -> Add local repository..." from the menu (or press Ctrl + O) and navigate to the installation folder (`C:\Users\{user}\Documents\CityEnergyAnalyst`) and select the folder "CityEnergyAnalyst".

![GitHub Desktop Add local repository]({{site.url}}/images/2019-05-15-installing-cea-on-windows/github-desktop-add-local-repository.png)

Check out the [GitHub Desktop documentation](https://help.github.com/en/desktop) for more information on how to work with GitHub repositories.

If you would like to modify the source, we suggest using the [PyCharm IDE](https://www.jetbrains.com/pycharm/) - but any text editor will do. In PyCharm, open the repository (`C:\Users\{user}\Documents\CityEnergyAnalyst\CityEnergyAnalyst`). You will need to [set the Project Interpreter](https://www.jetbrains.com/help/pycharm/configuring-python-interpreter.html#add-existing-interpreter) to `C:\Users\{user}\Documents\CityEnergyAnalyst\Dependencies\Python\python.exe`

![Select Python Interpreter]({{site.url}}/images/2019-05-15-installing-cea-on-windows/select-python-interpreter.png)


