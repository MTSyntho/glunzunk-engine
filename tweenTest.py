
from direct.showbase.ShowBase import ShowBase
from direct.gui.OnscreenImage import OnscreenImage
from panda3d.core import TransparencyAttrib
from direct.gui.OnscreenText import OnscreenText
from direct.gui.DirectGui import *

# Create an OnscreenImage
image = OnscreenImage(image='my_image.png')

# Create a tween object
tween = Tweener.tween(image, duration=1)

# Set the start and end values of the tween
tween.start_value = (0, 0)
tween.end_value = (100, 100)

# Start the tween
tween.play()

# From Google Bard