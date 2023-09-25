import direct.directbase.DirectStart
from direct.gui.OnscreenText import OnscreenText
from direct.gui.DirectGui import *
from panda3d.core import *

#add some text
bk_text = "This is my Demo"
textObject = OnscreenText(text=bk_text, pos=(0.95, -0.95), scale=0.07, fg=(1, 0.5, 0.5, 1), align=TextNode.ACenter, mayChange=1)

#callback function to set  text
def setText(textEntered):
    textObject.setText(textEntered)

#clear the text
def clearText():
    entry.enterText('')

#add text entry
entry = DirectEntry(text = "", scale=.05, command=setText, initialText="Type Something", numLines = 2, focus=1, focusInCommand=clearText)

#run the tutorial
base.run()