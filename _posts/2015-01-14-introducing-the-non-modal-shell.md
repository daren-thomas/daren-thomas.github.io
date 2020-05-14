---
layout: post
published: true
title: Introducing the non-modal shell in RevitPythonShell
---

You have no idea how excited I am about this release! Revision r223 of the RevitPythonShell has been tested by a select few very brave people (Ehsan Iran Nejad and Callum Freeman) and seems to work. Normally I'm not so worried about pushing out new versions, but this one is... different.

<!--more-->

The idea actually came from Ehsan. The Next Big Thing. Also known as the non-modal shell.

I know, I know - I need to get a lot better at coming up with good names for the various parts in RevitPythonShell, but for now, that is what it is called: Non-modal shell.

The non-modal shell is different from the standard RevitPythonShell shell in that it is... well... non-modal. What does that mean? Currently, when you start a shell in RPS, the shell gets the focus and you can't interact with the rest of the Revit GUI until you close the shell again. This is cool for working with short scripts, trying stuff out etc, but we can do better:

The non-modal shell does not block the rest of Revit. You can select stuff in the view, make changes to the BIM etc. And then query the selection in the shell or do whatever you like.

With some exceptions.

You see, because the shell is non-modal, it is not running in the special thread Revit needs you to be in for accessing the API. You would get a lot of ugly errors, if there wasn't some clever magic going on in the background that sends all input to the interactive shell to an implementation of [`IExternalEventHandler`](http://help.autodesk.com/cloudhelp/2015/ENU/Revit-API/files/GUID-0A0D656E-5C44-49E8-A891-6C29F88E35C0.htm) which Revit then runs in the correct thread and everything is fine and dandy.

What doesn't work though, is using transactions in the interactive shell:

```python
>>> t = Transaction(doc, 'test')
>>> t.Start()
Autodesk.Revit.DB.TransactionStatus.Started
>>> t.GetStatus()
Autodesk.Revit.DB.TransactionStatus.RolledBack
>>> t.Commit()
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
Exception: The transaction has not been started yet (the current status is not 'Started'). A transaction must be started before it can be either committed or rolled back.
>>>
```

You can get around this by using the IronPython Pad - the little editor below the interactive shell. This allows you to run multiple lines at a time and those will be run in the same `IExternalEventHandler` so the problem does not show up.

You can find the installer for this (experimental) version of RevitPythonShell in the [Downloads section of the project homepage](http://code.google.com/p/revitpythonshell/#Downloads).

I intend to post some more articles in the future that showcase some other new features in the r223 release, so you can expect some more goodies soon :)

---

(this post was originally published on [blogspot](https://darenatwork.blogspot.com/2015/01/introducing-non-modal-shell-in.html))
