from direct.gui.DirectGui import *
import direct.directbase.DirectStart

myframe = DirectScrolledFrame(canvasSize=(-2, 2, -2, 2), frameSize=(-.5, .5, -.5, .5))
myframe.setPos(0, 0, 0)
myframe.setColor((1, 0, 0, 1))


settingsText = OnscreenText(text='SETTINGS', pos=(-1, 1), scale=0.18, fg=(1, 1, 1, 1), parent=myframe.getCanvas())

run()