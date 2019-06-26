---
published: false
---
## A New Post


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

