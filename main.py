from panda3d.core import loadPrcFile
import panda3d.core as p3d
loadPrcFile('config.prc')

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

engineTheme="Dark"
autoTheme=False
version="Alpha 1 Build 6"
pcname=os.getlogin()

projectFolder="C:\\Users\\{}\\Documents\\Glunzunk Engine".format(pcname)

if os.path.exists(projectFolder)==True:
	print('projectFolder exists at {}'.format(projectFolder))
else:
	print('Creating projectFolder at {}'.format(projectFolder))
	os.mkdir(projectFolder)

if os.path.exists('{}\\Projects'.format(projectFolder))==True:
	print('projectFolder\\Projects created')
else:
	print('Creating projectFolder\\Projects at {}'.format(projectFolder))
	os.mkdir('{}\\Projects'.format(projectFolder))

if os.path.exists('{}\\projects.json'.format(projectFolder))==True:
	print("'projects.json' exists so projects should be listed")
else:
	print("Creating projects.json at '{}'".format(projectFolder))
	projek = {
	    "0": "",
	    "1": "",
	    "2": "",
	    "3": "",
	    "4": "",
	    "5": "",
	    "6": "",
	    "7": "",
	    "8": "",
	    "9": ""
	}
	projekJson = json.dumps(projek, indent=2)
	with open("{}\\projects.json".format(projectFolder), "w") as outfile:
	    outfile.write(projekJson)
	    print('Generated projects.json(your projeks) at {}'.format(projectFolder))	

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

#		based = p3d.base()
		basedfr = aspect2d.attach_new_node("bru")

		# Font Loading
		lmLight = self.loader.loadFont('assets\\fonts\\egg\\LEMONMILK-Light.egg')
		lmRegular = self.loader.loadFont('assets\\fonts\\egg\\LEMONMILK-Regular.egg')
		bbn = self.loader.loadFont('assets\\fonts\\egg\\BebasNeue-Regular.egg')
		cvc = self.loader.loadFont('assets\\fonts\\egg\\coolvetica condensed rg.egg')

#		def startLoad():
#			print('Loading...')
#			global fadeBlackBG
#			global loadText
#			fadeBlackBG = OnscreenImage(image='assets\\placeholder\\fadeBlack.png', pos=(0, 0, 0), scale=100)
#			fadeBlackBG.setTransparency(TransparencyAttrib.MAlpha)
#			loadText = OnscreenText(text='Loading...', pos=(-1.25, -0.75), scale=0.10, fg=(1,1,1,1))
#			loadText.setFont(lmLight)

#		def endLoad():
#			print('Loading Finished')
#			fadeBlackBG.destroy()
#			loadText.destroy()

		def splashScreen():
			def endSplash(): 
				splashLogo.destroy()
				splashText.destroy()
				startLoad()
				homeMenu()

			base.setBackgroundColor(0.80, 0.80, 0.80)
			print('NOTE: Displaying Splash Screen [splashScreen()]')
			splashLogo = OnscreenImage(image='assets\\ui\\gztitle.png', pos=(0, 0, 0), scale=(0.8, 0.1, 0.17))
			splashLogo.setTransparency(TransparencyAttrib.MAlpha)
			splashText = OnscreenText(text='By MTSyntho', pos=(0, -0.20), scale=0.10, fg=(1, 1, 1, 1))
			splashText.setFont(lmRegular)
		#	splashText.setAlign(TextNode.ACenter)
		#	splashText.setTextColor(1, 1, 1, 1)
			t = Timer(3, endSplash)
			t.start()
	
		def createProject():
			def createProjectConfirm():
	#			print('lemme get suma dat kokain powerder')
				if os.path.exists('{}\\Projects\\{}'.format(projectFolder, projectNameEntry.get())):
					print("Project '{}' already exists.".format(projectNameEntry.get()))
					print('So haha no crash 4 u')
					fadeBlackBG.destroy()
					darkCreateBG.destroy()
					createtitle.destroy()
					projectnametitle.destroy()
					projectNameEntry.destroy()
					createProjectBtn.destroy()
					createProjectBtnTxt.destroy()
				else:
					print("Creating New Project named '{}'".format(projectNameEntry.get()))
					os.mkdir("{}\\Projects\\{}".format(projectFolder, projectNameEntry.get()))
					properties = {
					    "name": projectNameEntry.get(),
					    "description": "Not Implemented",
					    "version": "Not Implemented",
					    "engineVer": "{}".format(version)
					}
					propertiesJson = json.dumps(properties, indent=2)
					with open("{}\\Projects\\{}\\properties.json".format(projectFolder, projectNameEntry.get()), "w") as outfile:
					    outfile.write(propertiesJson)
					    print('Generated properties.json at {}\\Projects\\{}'.format(projectFolder, projectNameEntry.get()))
					with open('{}\\projects.json'.format(projectFolder)) as projekJajon: #Jajon is json
 						loadedProjectsList = json.load(projekJajon)
 						if loadedProjectsList['0']=="":
 							loadedProjectsList['0']==projectNameEntry.get()
 						if loadedProjectsList['1']=="":
 							loadedProjectsList['1']==projectNameEntry.get()
 						if loadedProjectsList['2']=="":
 							loadedProjectsList['2']==projectNameEntry.get()
 						if loadedProjectsList['3']=="":
 							loadedProjectsList['3']==projectNameEntry.get()
 						if loadedProjectsList['4']=="":
 							loadedProjectsList['4']==projectNameEntry.get()
 						if loadedProjectsList['5']=="":
 							loadedProjectsList['5']==projectNameEntry.get()
 						if loadedProjectsList['6']=="":
 							loadedProjectsList['6']==projectNameEntry.get()
 						if loadedProjectsList['7']=="":
 							loadedProjectsList['7']==projectNameEntry.get()
 						if loadedProjectsList['8']=="":
 							loadedProjectsList['8']==projectNameEntry.get()
 						if loadedProjectsList['9']=="":
 							loadedProjectsList['9']==projectNameEntry.get()

 						with open('{}\\projects.json'.format(projectFolder), "w") as f:
 							json.dump(loadedProjectsList, f, indent=2)
					fadeBlackBG.destroy()
					darkCreateBG.destroy()
					createtitle.destroy()
					projectnametitle.destroy()
					projectNameEntry.destroy()
					createProjectBtn.destroy()
					createProjectBtnTxt.destroy()

			print('NOTE: Displaying Create Project Menu[createProject()]')
			# createProjectFr actually makes the file
			fadeBlackBG = OnscreenImage(image='assets\\placeholder\\fadeBlack.png', pos=(0, 0, 0), scale=100)
			fadeBlackBG.setTransparency(TransparencyAttrib.MAlpha)
			darkCreateBG = OnscreenImage(image='assets\\placeholder\\lightDark.png', pos=(0, 0, 0), scale=(1.1, 0, 0.4))
			createtitle = OnscreenText(text='CREATE A NEW PROJECT', pos=(-0.45, 0.17), scale=0.15, fg=(1, 1, 1, 1))
			createtitle.setFont(bbn)
			projectnametitle = OnscreenText(text='PROJECT NAME:', pos=(-0.70, 0.05), scale=0.11, fg=(1, 1, 1, 1))
			projectnametitle.setFont(bbn)
			projectNameEntry = DirectEntry(text = "", scale=.07, initialText='Untitled', numLines=1, focus=1, command=createProjectConfirm, width=30, pos=-0.07)
			projectNameEntry.set_x(-1.05)
#			print(projectNameEntry.textEntered())
			createProjectBtn = DirectButton(relief=None, image='assets\\placeholder\\dark.png', pos=(-0.85, 0, -0.24), scale=(0.15, 1, 0.06), command=createProjectConfirm)
			createProjectBtnTxt = OnscreenText(text='Create', pos=(-0.85, -0.27), scale=0.10, fg=(1, 1, 1, 1))
			createProjectBtnTxt.setFont(cvc)

		def openProject():
			def openProjectConfirm():
				# Clear Screen
				# Clear the color and depth buffers.
#				based.render.clear_color()
#				based.render.clear_depth()
				basedfr.removeNode()
				darkBG.destroy()
				from editor import loadEditor, endEditor
				loadEditor('__none__')

			print('NOTE: Displaying Open Project Menu[openProject()]')
			# createProjectFr actually makes the file
			fadeBlackBG = OnscreenImage(image='assets\\placeholder\\fadeBlack.png', pos=(0, 0, 0), scale=100, parent=basedfr)
			fadeBlackBG.setTransparency(TransparencyAttrib.MAlpha)
			darkCreateBG = OnscreenImage(image='assets\\placeholder\\lightDark.png', pos=(0, 0, 0), scale=(1.1, 0, 0.4), parent=basedfr)
			opentitle = OnscreenText(text='OPEN AN EXISTING PROJECT', pos=(-0.45, 0.17), scale=0.15, fg=(1, 1, 1, 1), parent=basedfr)
			opentitle.setFont(bbn)
			projectnametitle = OnscreenText(text='PROJECT NAME:', pos=(-0.70, 0.05), scale=0.11, fg=(1, 1, 1, 1), parent=basedfr)
			projectnametitle.setFont(bbn)
			projectNameEntry = DirectEntry(text = "", scale=.07,  numLines=1, focus=1, command=openProjectConfirm, width=30, pos=-0.07, parent=basedfr)
			projectNameEntry.set_x(-1.05)
#			print(projectNameEntry.textEntered())
			openProjectBtn = DirectButton(relief=None, image='assets\\placeholder\\dark.png', pos=(-0.85, 0, -0.24), scale=(0.15, 1, 0.06), command=openProjectConfirm, parent=basedfr)
			openProjectBtnTxt = OnscreenText(text='Open', pos=(-0.85, -0.27), scale=0.10, fg=(1, 1, 1, 1), parent=basedfr)
			openProjectBtnTxt.setFont(cvc)


		def homeMenu():
			def launchProject():
				print('Oh boy oh boy, i am in for a real treat :|')

			print('NOTE: Displaying Home Menu [homeMenu()]')
			title = OnscreenText(text='Glunzunk Engine', pos=(-1.0, 0.70), scale=0.12, fg=(1, 1, 1, 1), parent=basedfr) #, parent=base.aspect2d(a2dTopLeft))
			lmRegular = self.loader.loadFont('assets\\fonts\\egg\\LEMONMILK-Regular.egg')
			title.setFont(lmRegular)
			p3dText = OnscreenText(text='Powered by Panda3D', pos=(-1.28, 0.62), scale=0.05, fg=(1, 1, 1, 1), parent=basedfr)
			lmLight = self.loader.loadFont('assets\\fonts\\egg\\LEMONMILK-Light.egg')
			p3dText.setFont(lmLight)
			versionText = OnscreenText(text=version, pos=(-1.42, 0.56), scale=0.04, fg=(1, 1, 1, 1), parent=basedfr)
#			lmLight = self.loader.loadFont('assets\\fonts\\egg\\LEMONMILK-Light.egg')
			versionText.setFont(lmLight)

			# Left Side Buttons
			# Create Project Button
#			createBox = OnscreenImage(image='assets\\placeholder\\lightdark.png', pos=(-1, 0, 0.3), scale=(0.5, 0, 0.12))
			createBtn = DirectButton(relief=None, image='assets\\placeholder\\lightdark.png', pos=(-1, 0, 0.3), scale=(0.5, 1, 0.12), command=createProject, parent=basedfr)
			createText = OnscreenText(text='CREATE PROJECT', pos=(-1, 0.24), scale=0.18, fg=(1, 1, 1, 1), parent=basedfr)
#			cvc = self.loader.loadFont('assets\\fonts\\egg\\coolvetica condensed rg.egg')
			createText.setFont(cvc)
#			clickCreateText = DirectButton(text=' ', pos=(-1, 0, 0.25), scale=(1.5, 0, 0.15), text_bg=(1, 1, 1, 1), command=createProject)
#			clickCreateText.hide()


			# Project Properties Button
#			propBox = OnscreenImage(image='assets\\placeholder\\lightdark.png', pos=(-1, 0, 0), scale=(0.5, 0, 0.12))
			propBtn = DirectButton(relief=None, image='assets\\placeholder\\lightdark.png', pos=(-1, 0, 0), scale=(0.5, 1, 0.12), parent=basedfr)
			propText = OnscreenText(text='PROJECT INFO', pos=(-1, -0.06), scale=0.18, fg=(1, 1, 1, 1), parent=basedfr)
#			cvc = self.loader.loadFont('assets\\fonts\\egg\\coolvetica condensed rg.egg')
			propText.setFont(cvc)
#			clickPropText = DirectButton(text=' ', pos=(-1, 0, -0.05), scale=(1.5, 0, 0.15), text_bg=(1, 1, 1, 1), command=createProject)
#			clickPropText.hide()

			# Settings Button
#			settingsBox = OnscreenImage(image='assets\\placeholder\\lightdark.png', pos=(-1, 0, -0.3), scale=(0.5, 0, 0.12))
			settingsBtn = DirectButton(relief=None, image='assets\\placeholder\\lightdark.png', pos=(-1, 0, -0.3), scale=(0.5, 1, 0.12), parent=basedfr)
			settingsText = OnscreenText(text='SETTINGS', pos=(-1, -0.36), scale=0.18, fg=(1, 1, 1, 1), parent=basedfr)
#			cvc = self.loader.loadFont('assets\\fonts\\egg\\coolvetica condensed rg.egg')
			settingsText.setFont(cvc)
#			clickSettingsText = DirectButton(text=' ', pos=(-1, 0, -0.35), scale=(1.5, 0, 0.15), text_bg=(1, 1, 1, 1), relief=None, command=createProject, image=('assets\\textures\\tiled_Green Background.png'))
#			clickSettingsText.hide()

			projectList = DirectScrolledFrame(canvasSize=(-.80, .70, -2, 8), frameSize=(-.80, .80, -1.2, .40), scrollBarWidth=0.05, parent=basedfr)
			projectList.setPos(0.80, 0, 0.38)
			projectList.setColor(.22, .22, .22)

			project1 = DirectButton(relief=None, image='assets\\placeholder\\dark.png', pos=(0, 0, 7.8), scale=(0.7, 1, 0.12), parent=projectList.getCanvas(), command=openProject)
			p1name = OnscreenText(text='OPEN PROJECT', parent=project1, scale=(0.15, 0.8), fg=(1, 1, 1, 1), pos=(0, -0.32))
			p1name.setFont(lmRegular)

			endLoad()

#		createProject()
#		splashScreen()
		openProject()
#		homeMenu()

gz = GZEngine()
gz.run()

# This is MTSyntho at 9:54 PM on 2023/09/24, i'm suffering tryna get project creation working and the project entry positioned correctly
# This is MTSyntho at 8:41 AM on 2023/09/25, i love google bard now, not in that sus way though :skull: :moyai:
# im such a fukin dumbass rn at 10:32 PM on 2023/09/28, not even bard can help
# Thanks rdb from helping me with menu deletion at 11:55 PM on 2023/09/29