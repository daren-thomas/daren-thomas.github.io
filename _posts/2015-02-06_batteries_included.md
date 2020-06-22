---
layout: post
published: true
title: Batteries included!
---

The newest versions of the [RevitPythonShell](https://github.com/architecture-building-systems/revitpythonshell) include a copy of the python standard library. This copy is taken from IronPython. This means you don't need to add a search path to a local python distribution when importing standard python modules.

Since the library is included in a zip file embedded in the `RpsRuntime.dll`, it is also automatically deployed with when creating [RpsAddIns](http://darenatwork.blogspot.ch/2013/05/deploying-rps-scripts-with.html).

The versions supporting this feature are:

- (r223) Installer for Autodesk Revit 2015 (*experimental*)
- Installer for Autodesk Vasari (Beta 3)
- List item

---

(this post was originally published on [blogspot](https://darenatwork.blogspot.com/2015/02/))