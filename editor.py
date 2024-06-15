import panda3d.core as p3d

from direct.showbase.ShowBase import ShowBase
# import direct.directbase.DirectStart
from direct.gui.OnscreenImage import OnscreenImage
from panda3d.core import TransparencyAttrib
from direct.gui.OnscreenText import OnscreenText
from direct.gui.DirectGui import *

from threading import Timer
import os
from os import path
import json
from loadingScreen import startLoad, endLoad
import darkdetect # Checks system theme

basedfr = aspect2d.attach_new_node("bru")
selectedProject="__none__"

def loadEditor(selectedProject):
	print('Loaded Editor')
	propsbar = OnscreenImage(image='assets\\placeholder\\lightdark.png', pos=(-1.9, 0, 0), scale=1, parent=basedfr)
	objbar = OnscreenImage(image='assets\\placeholder\\lightdark.png', pos=(1.9, 0, 0), scale=1, parent=basedfr)
	topbar = OnscreenImage(image='assets\\placeholder\\dark.png', pos=(0, 0, 20.8), scale=20, parent=basedfr)
	logo = OnscreenImage(image='assets\\ui\\gzlogo.png', pos=(-1.6, 0, 0.9), scale=0.1, parent=basedfr)
	logo.setTransparency(TransparencyAttrib.MAlpha)
	print(selectedProject)
	if selectedProject=="__none__":
		class MyApp(ShowBase):

			def __init__(self):
				ShowBase.__init__(self)
				# Load the environment model.
				self.scene = self.loader.loadModel("models/environment")
				# Reparent the model to render.
				self.scene.reparentTo(self.render)
				# Apply scale and position transforms on the model.
				self.scene.setScale(0.25, 0.25, 0.25)
				self.scene.setPos(0, 0, 0)

				propies = OnscreenText(text='PROPERTIES', pos=(0, 0), scale=1, parent=basedfr)
				propies.setFont(cvc)

#	loadEditor()

def endEditor():
	print('Closed Editor')