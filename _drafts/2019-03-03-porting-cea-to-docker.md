---
layout: post
title: Porting CEA to Docker
---

So this has been a pet project of mine the last few weeks: Can the CEA be run in a Docker container?

Why bother? Mainly, three reasons:

- [issue #1005 (Fix installation guide for Ubuntu)](https://github.com/architecture-building-systems/CityEnergyAnalyst/issues/1005) requires an Ubuntu system to test the steps on and I don't really have one of those handy, _BUT_ Docker makes it super simple to fire up a virtual machine and have a go! By keeping my steps in a Dockerfile, I'd be logging my progress as well.
- Running the CEA on a linux distribution would also allow running simulations on the Euler cluster - except, that's a whole other story...
- 