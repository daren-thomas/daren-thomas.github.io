---
published: false
---
## How to replicate the Read the Docs build process locally with Docker

This is not the first time I came across the [RTD Build Process documentation](https://docs.readthedocs.io/en/stable/builds.html#how-we-build-documentation) and failed to figure out how to run this locally with their docker image. So. This time I'm going to document the steps I take for future reference.

```bash
docker run -it readthedocs/build:latest bash
```

The above command should download the RTD Docker image and run `bash` in it interactively. I'm guessing this is the starting point for our quest.

The  project I want to build is [CityEnergyAnalyst](https://github.com/architecture-building-systems/CityEnergyAnalyst) - it uses `conda` to create it's environment and I think maybe the `environmnet.yml` file included is too heavy and that is creating some timeouts when building the documentation.

We _do_ have a docker build of the CEA, so I think I'm going to try using the `environment.yml` included there instead.

Anyway... were were we? Oh right. We have a `bash` prompt waiting to start building the code.

```bash
cd tmp
git clone https://github.com/architecture-building-systems/CityEnergyAnalyst.git
```

So, it seems this is the first thing RTD does, when it tries to build the project. I'm doing it in tmp here to avoid creating a mess, even though I plan to just ditch the docker image when done...

```bash
cd CityEnergyAnalyst/docs
conda env create
```

Ugh. I keep getting this:

```
docs@e6b1308f087f:/tmp/CityEnergyAnalyst/docs$ conda env create
Warning: you have pip-installed dependencies in your environment file, but you do not list pip itself as one of your conda dependencies.  Conda may not use the correct pip to install your packages, and they may end up in the wrong place.  Please add an explicit pip dependency.  I'm adding one for you, but still nagging you.
Collecting package metadata: failed

CondaHTTPError: HTTP 502 BAD GATEWAY for url <https://repo.anaconda.com/pkgs/main/linux-64/repodata.json.bz2>
Elapsed: 00:00.002946
CF-RAY: 4f0126707effcc3a-ZRH

A remote server error occurred when trying to retrieve this URL.

A 500-type error (e.g. 500, 501, 502, 503, etc.) indicates the server failed to
fulfill a valid request.  The problem may be spurious, and will resolve itself if you
try your request again.  If the problem persists, consider notifying the maintainer
of the remote server.
```