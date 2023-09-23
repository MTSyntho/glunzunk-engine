from panda3d.core import loadPrcFile
loadPrcFile('config.prc')

from direct.showbase.ShowBase import ShowBase
from direct.gui.OnscreenImage import OnscreenImage
from panda3d.core import TransparencyAttrib
from direct.gui.OnscreenText import OnscreenText
from direct.gui.DirectGui import *

import time
import darkdetect # Checks system theme

engineTheme="Dark"
autoTheme=False
version="Alpha 1"

# Allows light and dark mode
# autoTheme is for checking whether if it should use the system theme or user-set theme
# engineTheme is the theme chosen by the user IN THE ENGINE and not the system
if autoTheme==True:
	if darkdetect.theme()=="Light":
		lightBG = OnscreenImage(image='assets\\placeholder\\white.png', pos=(0, 0, 0), scale=100)
	elif darkdetect.theme()=="Dark":
		darkBG = OnscreenImage(image='assets\\placeholder\\dark.png', pos=(0, 0, 0), scale=100)
	else:
		darkBG = OnscreenImage(image='assets\\placeholder\\dark.png', pos=(0, 0, 0), scale=100)
		print('bruh how tf does your system not have a theme, dark got chosen automatically cuz it look real cool')
else:
	if engineTheme=="Light":
		lightBG = OnscreenImage(image='assets\\placeholder\\white.png', pos=(0, 0, 0), scale=100)
	elif engineTheme=="Dark":
		darkBG = OnscreenImage(image='assets\\placeholder\\dark.png', pos=(0, 0, 0), scale=100)
	else:
		darkBG = OnscreenImage(image='assets\\placeholder\\dark.png', pos=(0, 0, 0), scale=100)
		print('bruh how tf does your system not have a theme, dark got chosen automatically cuz it look real cool')

darkdetect.theme()=="Dark"

# lmBold = self.loadFont('assets\\fonts\\LEMONMILK-Bold.ttf')



class GZEngine(ShowBase):

	def __init__(self):
		ShowBase.__init__(self)
		def splashScreen():
			print('NOTE: Displaying Splash Screen [splashScreen()]')
			logo = OnscreenImage(image='assets\\ui\\gztitle.png', pos=(0, 0, 0), scale=(0.8, 0.1, 0.17))
			logo.setTransparency(TransparencyAttrib.MAlpha)
			textObject = OnscreenText(text='By MTSyntho', pos=(0, -0.20), scale=0.10, fg=(1, 1, 1, 1))
		#	textObject.setAlign(TextNode.ACenter)
		#	textObject.setTextColor(1, 1, 1, 1)

		def createProject():
			print('NOTE: Displaying Create Project Menu[createProject()]')
			

		def homeMenu():
			print('NOTE: Displaying Home Menu [homeMenu()]')
			title = OnscreenText(text='Glunzunk Engine', pos=(-1.0, 0.70), scale=0.12, fg=(1, 1, 1, 1)) #, parent=base.aspect2d(a2dTopLeft))
			lmRegular = self.loader.loadFont('assets\\fonts\\egg\\LEMONMILK-Regular.egg')
			title.setFont(lmRegular)
			p3dText = OnscreenText(text='Powered by Panda3D', pos=(-1.28, 0.62), scale=0.05, fg=(1, 1, 1, 1))
			lmLight = self.loader.loadFont('assets\\fonts\\egg\\LEMONMILK-Light.egg')
			p3dText.setFont(lmLight)
			versionText = OnscreenText(text=version, pos=(-1.5, 0.56), scale=0.04, fg=(1, 1, 1, 1))
			lmLight = self.loader.loadFont('assets\\fonts\\egg\\LEMONMILK-Light.egg')
			versionText.setFont(lmLight)

			# Left Side Buttons
			# Create Project Button
			createBox = OnscreenImage(image='assets\\placeholder\\lightdark.png', pos=(-1, 0, 0.3), scale=(0.5, 0, 0.12))
			createText = OnscreenText(text='CREATE PROJECT', pos=(-1, 0.24), scale=0.18, fg=(1, 1, 1, 1))
			cvc = self.loader.loadFont('assets\\fonts\\egg\\coolvetica condensed rg.egg')
			createText.setFont(cvc)
			clickCreateText = DirectButton(text=' ', pos=(-1, 0, 0.25), scale=(1.5, 0, 0.15), text_bg=(1, 1, 1, 1), command=createProject)
			clickCreateText.hide()

		splashScreen()
		# wait 3 seconds
		logo.destroy()
		textObject.destroy()
		homeMenu()

gz = GZEngine()
gz.run()