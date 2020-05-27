---
layout: post
published: true
title: CEA Plugins - Part 6: Publish your plugin and claim your T-Shirt
---

You've coded up your CEA plugin - now it's time to add it to the CEA and share it with the rest of the world!

<!--more-->

This is part 6 in a series of articles on CEA plugins:

- [Part 1: Introduction to core CEA concepts](/2020-05-25-cea-plugins-part-1)

- [Part 2: Anatomy of a CEA plugin](/2020-05-25-cea-plugins-part-2) 

- [Part 3: Introduction to the CEA plugin template](/2020-05-25-cea-plugins-part-3) 

- [Part 4: How to add your own tools to the CEA ](/2020-05-25-cea-plugins-part-4)

- [Part 5: How to add your own plots to the CEA](/2020-05-25-cea-plugins-part-5)

- Part 6: Publish your plugin and claim your T-Shirt (this article)

## Publishing your plugin

While developing your plugin, you can use the command `pip -e .` in the repository folder to install your plugin to python in "editable mode": This tells Python to check that folder for the current version of the source code.

Once you've finished testing and debugging you can [deploy the plugin to PyPI](https://realpython.com/pypi-publish-python-package/). This is not a requirement - you might not want to share the source with the rest of the world - but it _does_ make installation on another computer a bit easier: Your user will then just do a `pip install <yourplugin>`.

Regardless of how you'll be deploying your plugin, please note that it needs to be installed in the _same_ python environment that the CEA uses. Using the `pip` method above, that means running it form the CEA Console.

## Registering a CEA plugin with the CEA

The CEA config file maintains a list of CEA plugins - by default it's an empty list. You can view that list from the CEA Console with `cea-config read general:plugins`:

```
λ cea-config read general:plugins
- general:plugins = []
  (default: [])
```

BTW: You can use this command to read any parameter in the user config file (`cea.config` in your user profile folder).

To add a plugin to that list, you can do something like this:

```
λ cea-config write --general:plugins {general:plugins}, cea_plugin_template.demand_summary.DemandSummaryPlugin
```

A short explaination: `cea-config` is a tool for working with the config file. You guessed that already. `write` means: write to the config file. `--general:plugins` denotes the secion and parameter the following text is to be written to. Since the plugins list is a, well, a list, it's encoded as a string with commas separating them. We have two values here: `{general:plugins}` and `cea_plugin_template.demand_summary.DemandSummaryPlugin`. `{general:plugins}` will be expanded to the previous list of plugins.

Note: You'll need to run that in the CEA Console or an equivalent environment - either by instructing your users or writing an installer.

It's also possible to manually edit the `cea.config` file located in your user folder - I'll leave that as an exercise for you to figure out.

## Claim your T-Shirt

Let us know about your CEA plugin! If it's open source like the CEA, we'll link to it from our website [www.cityenergyanalyst.com](https://cityenergyanalyst.com).

To claim your T-Shirt, follow the [guide for contributing to the CEA](https://city-energy-analyst.readthedocs.io/en/latest/how-to-contribute.html#step-7-claim-your-cea-t-shirt). Well. You won't be forking/merging to CEA core, but you know... We'd love to hear all about your experiences creating your CEA plugin!
