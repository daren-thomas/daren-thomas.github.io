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

And wait while it's being cloned:

```
(base) C:\Users\darthoma>docker run -it readthedocs/build:latest bash
docs@0c5a4358aadd:/$ cd tmp
docs@0c5a4358aadd:/tmp$ git clone https://github.com/architecture-building-systems/CityEnergyAnalyst.git
Cloning into 'CityEnergyAnalyst'...
remote: Enumerating objects: 102, done.
remote: Counting objects: 100% (102/102), done.
remote: Compressing objects: 100% (78/78), done.
Receiving objects:  60% (42669/70571), 807.06 MiB | 16.83 MiB/s
```


So, it seems this is the first thing RTD does, when it tries to build the project. I'm doing it in tmp here to avoid creating a mess, even though I plan to just ditch the docker image when done...

```bash
cd CityEnergyAnalyst
conda env create -f docs/environment.yml
```

Wait...

When done, 

```bash
conda activate cityenergyanalyst_docs
python setup.py install
cd docs
sphinx-build -b html . _build/html
```
