---
published: false
---
## Using ffmpeg to create a GIF from screenshots

This post is a bit of a little note to myself: The other day, when writing a post on [the new installer for the CEA](https://daren-thomas.github.io/installing-cea-on-windows-part-1/), I wanted to stitch together a bunch of screenshots into a GIF, with each screenshot showing for one second.

I used the [portable version of ShareX](https://github.com/ShareX/ShareX/releases) to create the screenshots. It turns out, ShareX also ships `ffmpeg.exe`. According to the website](https://ffmpeg.org/), ffmpeg is

> A complete, cross-platform solution to record, convert and stream audio and video.

And of course, `ffmpeg.exe` has a [million options](https://ffmpeg.org/ffmpeg.html). The one I ended up using was this:

```
ffmpeg -framerate 1 -i screenshots-%04d.png -i palette.png -lavfi paletteuse -y screenshots.gif
```

Let's break it down:

- `-framerate 1`: duh. 1 second per frame
- `-i screenshots-%04d.png`: instruct ffmpeg to use files matching `screenshots-%04d.png` (in the current working directory) as input. The `%04d` portion means an integer decimal number, four digits long, padded with leading zeros. So save the screenshots as `screenshots-0001.png`, `screenshots-0002.png` etc.
- `-i palette.png`: use this file as a "palette", since the GIF will end up with 256 colors and you want to make sure the palette used by the GIF includes all the colors in your screenshots.
- `-lavfi paletteuse`: I'm not totally sure. I think this makes the palette be used. Let's just assume a magic invocation.
- `-y`: Overwrite output files (this isn't strictly necessary)
- `screenshots.gif`: This is the name of the GIF file to produce.

Where did `palette.png` come from?! I created it with `ffmepg.exe`:

```
ffmpeg -i screenshots-%04d.png screenshots.gif -vf palettegen -y palette.png
```

The important part here is the `-vf palettegen` and the output file name `palette.png`. Run this first.

## Using ffmpeg to create screenshots from a GIF

ShareX also has the capability to record a GIF instead of taking just a snapshot. I think using this feature is required to download the `ffmpeg.exe` file - it will show up in a subfolder `ShareX/Tools` below your portable installation of ShareX.

You can "explode" a GIF into it's frames with this command:

```
ffmepg -i mygif.gif -vsync 0 mypngs-%04d.png
```

This time the _input_ file is the GIF and the _output_ file is specified using the wildcard `%04d` since we are creating a bunch of PNG files.

The `-vsync 0` parameter is something I found on the internet. I'm assuming it's required to make sure each frame ends up as it's own PNG file, as per the documentation of the -vsync parameter for 0:

> Each frame is passed with its timestamp from the demuxer to the muxer.

Now you can edit each frame, re-arrange them, delete some, add in new ones - Just be sure to re-index them in increasing order (`mypngs-0001.png`, `mypngs-0002.png`, `mypngs-0003.png` etc.). A bit of python scripting can help with that. Something like:

```
import os
fnames = sorted([f for f in os.listdir('.') if f.startswith('mypngs-')])
for i, fname in enumerate(fnames):
    os.rename(fname, 'mypngs-%04d.png' % i))
```

Then, you can use the method above, to re-create the GIF. You might need to play around with the `-framerate` parameter.