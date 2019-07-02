---
published: false
---
## How to replicate the Read the Docs build process locally with Docker

This is not the first time I came across the [RTD Build Process documentation](https://docs.readthedocs.io/en/stable/builds.html#how-we-build-documentation) and failed to figure out how to run this locally with their docker image. So. This time I'm going to document the steps I take for future reference.

```bash
docker run -it readthedocs/build:latest bash
```

The above command should download the RTD Docker image and run bash in it interactively. I'm guessing this is the starting point for our quest.

The  project I want to build is [CityEnergyAnalyst](https://github.com/architecture-building-systems/CityEnergyAnalyst) - it uses `conda` to create it's environment and I think maybe the `environmnet.yml` file included is too heavy and that is creating some timeouts when building the documentation.

We _do_ have a docker build of the CEA, so I think I'm going to try using the `environment.yml` included there instead.