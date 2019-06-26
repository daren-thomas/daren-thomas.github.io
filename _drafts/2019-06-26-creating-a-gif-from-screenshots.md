---
published: false
---
## Using ffmpeg to create a GIF from screenshots

This post is a bit of a little note to myself: The other day, when writing a post on [the new installer for the CEA](https://daren-thomas.github.io/installing-cea-on-windows-part-1/), I wanted to stitch together a bunch of screenshots into a GIF, with each screenshot showing for one second.

I used the [portable version of ShareX](https://github.com/ShareX/ShareX/releases) to create the screenshots. It turns out, ShareX also ships `ffmpeg.exe`. According to the website](https://ffmpeg.org/), ffmpeg is

> A complete, cross-platform solution to record, convert and stream audio and video. 

	* ffmpeg -i cea-base-installation.gif -vsync 0 cea-base-installation/cea-base-installation-%06d.png
	* 
for i, fn in enumerate(fnames):

		* 
os.rename(os.path.join(folder, fn), os.path.join(folder, 'cea-base-installation-%04d.png' % i))
	* 
ffmpeg -i cea-base-installation/cea-base-installation-%04d.png cea-base-installation-test.gif

		* 
bad quality, create palette:
	* 
ffmpeg -i cea-base-installation/cea-base-installation-%04d.png cea-base-installation-test.gif -vf palettegen -y palette.png
	* 
ffmpeg -i cea-base-installation/cea-base-installation-%04d.png cea-base-installation-test.gif -i palette.png -lavfi paletteuse -y cea-base-installation-test.gif
	* 
ffmpeg -framerate 1 -i cea-base-installation/cea-base-installation-%04d.png -i palette.png -lavfi paletteuse -y cea-base-installation-test.gif

		* 
used this one with screen shots made by hand...
	* 
ffmpeg -i cea-developer-installation/cea-developer-installation-%03d.png cea-base-installation-test.gif -vf palettegen -y palette.png

