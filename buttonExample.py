import direct.directbase.DirectStart
from direct.gui.OnscreenText import OnscreenText
from direct.gui.DirectGui import *

from panda3d.core import TextNode

# Add some text
bk_text = "This is my Demo"
textObject = OnscreenText(text=bk_text, pos=(0.95,-0.95), scale=0.07,
                          fg=(1, 0.5, 0.5, 1), align=TextNode.ACenter,
                          mayChange=1)

# Callback function to set  text
def setText():
        bk_text = "Button Clicked"
        textObject.setText(bk_text)

# Add button
b = DirectButton(text=("OK", "click!", "rolling over", "disabled"),
                 scale=.05, command=setText)

# Run the tutorial
base.run()