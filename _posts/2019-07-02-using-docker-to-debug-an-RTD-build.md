---
published: true
title: Using Docker to debug an RTD build
---
Or "How To Replicate the Read The Docs Bild Process Locally with Docker"

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

### A more detailed attempt (that failed)

So I was super smug about that, until I decided to check the [build output on RTD](https://readthedocs.org/projects/city-energy-analyst/builds/9318678/), and behold, it actually contains the actual commands that get run. So, while conceptually the above holds, let's try to replicate what the build page says.

But first, some stuff to get the party going... (i'm assuming this was done for the first build)

```bash
docker run -it readthedocs/build:latest bash
cd tmp
git clone https://github.com/architecture-building-systems/CityEnergyAnalyst.git
cd CityEnergyAnalyst
```

And now the actuall steps as shown in the build output:

```bash
git remote set-url origin https://github.com/architecture-building-systems/CityEnergyAnalyst.git
git fetch --tags --prune --prune-tags --depth 50
git checkout --force origin/master
git clean -d -f -f
conda env create --quiet --name latest --file docs/environment.yml
conda install --yes --quiet --name latest mock pillow sphinx sphinx_rtd_theme
```

OK. So far so good. The next one:

```
/home/docs/checkouts/readthedocs.org/user_builds/city-energy-analyst/conda/latest/bin/python -m pip install -U --cache-dir /home/docs/checkouts/readthedocs.org/user_builds/city-energy-analyst/.cache/pip recommonmark readthedocs-sphinx-ext
```

ah... of course that wasn't going to work. Let's figure out where python went to... according to `which python`, after initializing conda and activating the environment as in our first attempt, it seems it's here: `/home/docs/.conda/envs/latest/bin/python`. Let's continue by replacing the python path - after deactivating conda again:

```
/home/docs/.conda/envs/latest/bin/python -m pip install -U --cache-dir /home/docs/checkouts/readthedocs.org/user_builds/city-energy-analyst/.cache/pip recommonmark readthedocs-sphinx-ext

/home/docs/.conda/envs/latest/bin/python -m pip install --upgrade --upgrade-strategy eager --cache-dir /home/docs/checkouts/readthedocs.org/user_builds/city-energy-analyst/.cache/pip /home/docs/checkouts/readthedocs.org/user_builds/city-energy-analyst/checkouts/latest
```

OK. So this breaks down too. It seems we didn't check out to the right folder or something. I'm going to give up here, since I think I don't really have enough information to do an _exact_ copy of what RTD does. I wonder if there is a script somewhere?

BUT, it's still possible to figure out _what_ is being run from the build output and replicate that with our own paths. I'm leaving this as an exercise for the reader.
