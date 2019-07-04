---
published: false
---
## How to replicate the Read the Docs build process locally with Docker

This is not the first time I came across the [RTD Build Process documentation](https://docs.readthedocs.io/en/stable/builds.html#how-we-build-documentation) and failed to figure out how to run this locally with their docker image. So. This time I'm going to document the steps I take for future reference.

```bash
docker run -it readthedocs/build:latest bash
```

The above command should download the RTD Docker image and run `bash` in it interactively. I'm guessing this is the starting point for our quest.

The  project I want to build is [CityEnergyAnalyst](https://github.com/architecture-building-systems/CityEnergyAnalyst) - it uses `conda` to create it's environment and I suspect maybe the `environmnet.yml` file used is too heavy and that is creating sporadic timeouts when building the documentation. Hence, this dive into the inner workings of the RTD build process.

Anyway... were were we? Oh right. We have a `bash` prompt waiting to start building the code:

```bash
cd tmp
git clone https://github.com/architecture-building-systems/CityEnergyAnalyst.git
```

Cloning takes a while, but when done, we can create the conda environment:

```bash
cd CityEnergyAnalyst
conda env create -f docs/environment.yml
```

I tried running `conda activate cityenergyanalyst_docs`, but got a message that I needed to set up my shell to work with conda first, so these steps might also be necessary:

```bash
conda init bash
source /home/docs/.bashrc
```

Next, we need to install the CEA itself:

```
conda activate cityenergyanalyst_docs
pip install .
```

Finally, we can build the documentation:

```
cd docs
sphinx-build -b html . _build/html
```

This simplified approach should be able to catch most of the issues that come up with the build process.

### A more detailed attempt

So I was super smug about that, until I decided to check the [build output on RTD](https://readthedocs.org/projects/city-energy-analyst/builds/9318678/), and behold, it actually contains the commands run. So, while conceptually the above holds, let's try to replicate what the build page says:

TODO: add a more detailed attempt

Finally, the build could be improved by adding a [readthedocs.yml](https://docs.readthedocs.io/en/stable/config-file/v2.html) file to the project root:
