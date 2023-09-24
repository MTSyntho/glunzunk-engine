from panda3d.core import loadPrcFile
loadPrcFile('config.prc')

from direct.showbase.ShowBase import ShowBase
from direct.gui.OnscreenImage import OnscreenImage
from panda3d.core import TransparencyAttrib
from direct.gui.OnscreenText import OnscreenText
from direct.gui.DirectGui import *

from threading import Timer
import os
from os import path
import json
import darkdetect # Checks system theme

engineTheme="Dark"
autoTheme=False
version="Alpha 1 Build 2"

projectFolder="C:\\Users\\User\\Documents\\Glunzunk Engine"

if os.path.exists(projectFolder):
	print('projectFolder exists at {}'.format(projectFolder))
else:
	print('Creating projectFolder at {}'.format(projectFolder))
	os.mkdir(projectFolder)

#splashLogo=0
#splashText=0

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
		def startLoad():
			print('Loading...')
			fadeBlackBG = OnscreenImage(image='assets\\placeholder\\fadeBlack.png', pos=(0, 0, 0), scale=100)
			fadeBlackBG.setTransparency(TransparencyAttrib.MAlpha)
			loadText = OnscreenText(text='Loading...', pos=(-1.25, -0.75), scale=0.10, fg=(1,1,1,1))
			lmLight = self.loader.loadFont('assets\\fonts\\egg\\LEMONMILK-Light.egg')
			loadText.setFont(lmLight)

		def endLoad():
			print('Loading Finished')
			global fadeBlackBG
			fadeBlackBG.destroy()
			loadText.destroy()

		def splashScreen():
			def endSplash(): 
				splashLogo.destroy()
				splashText.destroy()
				startLoad()
				homeMenu()

			print('NOTE: Displaying Splash Screen [splashScreen()]')
			splashLogo = OnscreenImage(image='assets\\ui\\gztitle.png', pos=(0, 0, 0), scale=(0.8, 0.1, 0.17))
			splashLogo.setTransparency(TransparencyAttrib.MAlpha)
			splashText = OnscreenText(text='By MTSyntho', pos=(0, -0.20), scale=0.10, fg=(1, 1, 1, 1))
			lmRegular = self.loader.loadFont('assets\\fonts\\egg\\LEMONMILK-Regular.egg')
			splashText.setFont(lmRegular)
		#	splashText.setAlign(TextNode.ACenter)
		#	splashText.setTextColor(1, 1, 1, 1)
			t = Timer(3, endSplash)
			t.start()
	
		def createProject():
			def createProjectConfirm():
				print('ho')
#				print("Creating New Project named '{}'".format(textEntered))
#				os.mkdir("{}\\{}".format(projectFolder, textEntered))
#				os.mkdir("{}".format(textEntered))

			print('NOTE: Displaying Create Project Menu[createProject()]')
			# createProjectFr actually makes the file
			fadeBlackBG = OnscreenImage(image='assets\\placeholder\\fadeBlack.png', pos=(0, 0, 0), scale=100)
			fadeBlackBG.setTransparency(TransparencyAttrib.MAlpha)
			darkCreateBG = OnscreenImage(image='assets\\placeholder\\lightDark.png', pos=(0, 0, 0), scale=(1.1, 0, 0.4))
			createtitle = OnscreenText(text='CREATE A NEW PROJECT', pos=(-0.45, 0.17), scale=0.15, fg=(1, 1, 1, 1))
			bbn = self.loader.loadFont('assets\\fonts\\egg\\BebasNeue-Regular.egg')
			createtitle.setFont(bbn)
			projectnametitle = OnscreenText(text='PROJECT NAME:', pos=(-0.70, 0.05), scale=0.11, fg=(1, 1, 1, 1))
			projectnametitle.setFont(bbn)
			projectNameEntry = DirectEntry(text = "", scale=.07, initialText='Untitled', numLines=1, focus=1, command=createProjectConfirm(), width=30)
			createProjectBtn = DirectButton(relief=None, image='assets\\placeholder\\dark.png', pos=(-0.85, 0, -0.24), scale=(0.15, 0, 0.06), command=createProjectConfirm)
			createProjectBtnTxt = OnscreenText(text='Create', pos=(-0.85, -0.27), scale=0.10, fg=(1, 1, 1, 1))
			cvc = self.loader.loadFont('assets\\fonts\\egg\\coolvetica condensed rg.egg')
			createProjectBtnTxt.setFont(cvc)


		def homeMenu():
			print('NOTE: Displaying Home Menu [homeMenu()]')
			title = OnscreenText(text='Glunzunk Engine', pos=(-1.0, 0.70), scale=0.12, fg=(1, 1, 1, 1)) #, parent=base.aspect2d(a2dTopLeft))
			lmRegular = self.loader.loadFont('assets\\fonts\\egg\\LEMONMILK-Regular.egg')
			title.setFont(lmRegular)
			p3dText = OnscreenText(text='Powered by Panda3D', pos=(-1.28, 0.62), scale=0.05, fg=(1, 1, 1, 1))
			lmLight = self.loader.loadFont('assets\\fonts\\egg\\LEMONMILK-Light.egg')
			p3dText.setFont(lmLight)
			versionText = OnscreenText(text=version, pos=(-1.5, 0.56), scale=0.04, fg=(1, 1, 1, 1))
#			lmLight = self.loader.loadFont('assets\\fonts\\egg\\LEMONMILK-Light.egg')
			versionText.setFont(lmLight)

			# Left Side Buttons
			# Create Project Button
#			createBox = OnscreenImage(image='assets\\placeholder\\lightdark.png', pos=(-1, 0, 0.3), scale=(0.5, 0, 0.12))
			createBtn = DirectButton(relief=None, image='assets\\placeholder\\lightdark.png', pos=(-1, 0, 0.3), scale=(0.5, 0, 0.12), command=createProject)
			createText = OnscreenText(text='CREATE PROJECT', pos=(-1, 0.24), scale=0.18, fg=(1, 1, 1, 1))
			cvc = self.loader.loadFont('assets\\fonts\\egg\\coolvetica condensed rg.egg')
			createText.setFont(cvc)
#			clickCreateText = DirectButton(text=' ', pos=(-1, 0, 0.25), scale=(1.5, 0, 0.15), text_bg=(1, 1, 1, 1), command=createProject)
#			clickCreateText.hide()


			# Project Properties Button
#			propBox = OnscreenImage(image='assets\\placeholder\\lightdark.png', pos=(-1, 0, 0), scale=(0.5, 0, 0.12))
			propBtn = DirectButton(relief=None, image='assets\\placeholder\\lightdark.png', pos=(-1, 0, 0), scale=(0.5, 0, 0.12))
			propText = OnscreenText(text='PROJECT INFO', pos=(-1, -0.06), scale=0.18, fg=(1, 1, 1, 1))
			cvc = self.loader.loadFont('assets\\fonts\\egg\\coolvetica condensed rg.egg')
			propText.setFont(cvc)
#			clickPropText = DirectButton(text=' ', pos=(-1, 0, -0.05), scale=(1.5, 0, 0.15), text_bg=(1, 1, 1, 1), command=createProject)
#			clickPropText.hide()

			# Settings Button
#			settingsBox = OnscreenImage(image='assets\\placeholder\\lightdark.png', pos=(-1, 0, -0.3), scale=(0.5, 0, 0.12))
			settingsBtn = DirectButton(relief=None, image='assets\\placeholder\\lightdark.png', pos=(-1, 0, -0.3), scale=(0.5, 0, 0.12))
			settingsText = OnscreenText(text='SETTINGS', pos=(-1, -0.36), scale=0.18, fg=(1, 1, 1, 1))
			cvc = self.loader.loadFont('assets\\fonts\\egg\\coolvetica condensed rg.egg')
			settingsText.setFont(cvc)
#			clickSettingsText = DirectButton(text=' ', pos=(-1, 0, -0.35), scale=(1.5, 0, 0.15), text_bg=(1, 1, 1, 1), relief=None, command=createProject, image=('assets\\textures\\tiled_Green Background.png'))
#			clickSettingsText.hide()

			endLoad()

#		createProject()
		splashScreen()

gz = GZEngine()
gz.run()

# This is MTSyntho at 9:54 PM on 2023/09/24, i'm suffering tryna get project creation working and the project entry positioned correctly