import webview

# webview.create_window('Glunzunk Engine', url='index.html', background_color='#000000', width=1280, height=720)

webview.create_window('Glunzunk Engine', url='editor.html', background_color='#000000', width=1280, height=720)

# webview.start()
webview.start(gui='qt', debug=True)
															