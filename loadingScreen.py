from direct.gui.OnscreenImage import OnscreenImage
from direct.gui.OnscreenText import OnscreenText
from panda3d.core import TransparencyAttrib

def startLoad():
	print('Loading...')
	global fadeBlackBG
	global loadText
	fadeBlackBG = OnscreenImage(image='assets\\placeholder\\fadeBlack.png', pos=(0, 0, 0), scale=100)
	fadeBlackBG.setTransparency(TransparencyAttrib.MAlpha)
	loadText = OnscreenText(text='Loading...', pos=(-1.25, -0.75), scale=0.10, fg=(1,1,1,1))

def endLoad():
	print('Loading Finished')
	fadeBlackBG.destroy()
	loadText.destroy()