import { engineFiles } from './../engine/glunzunk.js'
import { threeFiles } from './../../libs/threejs/buildList.js'
import { sceneScript } from './scriptEditor.js'

const loading = document.getElementById('loading-screen')
const buildState = document.getElementById('loading-message')

async function exportGame(platform) {
	const assetsDirectory = 'projects/sample/assets.json'
	// const engineFiles = engineFiles
	const folderStructure = {
	  '/assets/assets.json': assetsDirectory,
	  '/libs/threejs/': '/libs/threejs/',
	  '/scripts/engine/gzjs/': '/scripts/engine/gzjs/',
	  '/scripts/engine/glunzunk.js': '/scripts/engine/glunzunk.js',
	  '/scripts/editor/init.js': '/scripts/editor/buildGameFiles/init.js',
	  '/scripts/Inter-Regular.woff2': '/assets/fonts/web/Inter-Regular.woff2',
	  '/scripts/Roboto-ThinItalic.woff': '/assets/fonts/roboto/Roboto-ThinItalic.woff',
	  // '/scripts/game/scenes.json': '/scripts/game/scenes.json',
	  '/index.css': '/scripts/editor/buildGameFiles/index.css',
	  '/index.html': '/scripts/editor/buildGameFiles/index.html',
	  '/scripts/engine/gzjs/gzjs.loadscene.js': '/scripts/editor/buildGameFiles/gzjs.loadscene.js'
	};

	for (const filename of engineFiles) {
	  const localPath = `scripts/engine/gzjs/${filename}.js`;
	  const serverPath = `/scripts/engine/gzjs/${filename}.js`;
	  folderStructure[localPath] = serverPath;
	}

	for (const path of threeFiles) {
		const localPath = `/libs/threejs/${path}`;
		const serverPath = `/libs/threejs/${path}`;
		folderStructure[localPath] = serverPath;
	}

	loading.classList.remove('fade-out')
	loading.classList.add('fade-in')

	console.log('[Game Compilation] Loading Game Assets')
	buildState.textContent = 'Loading Game Assets';
	await new Promise(r => setTimeout(r, 1));

	// assets.json :p
	let loadedAssetsCount = 0;
	try {
		const response = await fetch(assetsDirectory);
		// const assetsJson = await response.json(); // mysterious error in parsing valid json
		const assetsRaw = await response.text();

		const assetsJson = JSON.parse(assetsRaw)
		// console.log(assetsJson)

		

		for (const [key, data] of Object.entries(assetsJson.images || {})) {
			const fileName = data.file;
			if (fileName) {
				console.log(`[Game Compilation] Loading ${fileName}`)
				buildState.textContent = `Loading ${fileName}`
				await new Promise(r => setTimeout(r, 0));
				const assetPath = `/assets/images/${fileName}`;
				const realPath = `projects/sample/assets/images/${fileName}`;
				folderStructure[assetPath] = realPath;
				loadedAssetsCount = loadedAssetsCount + 1
			}
		}
	} catch (error) {
		console.error('Error while loading assets: ' +  error);
	}


	console.log(`[Game Compilation] Loaded ${loadedAssetsCount} assets`)
	buildState.textContent = `Loaded ${loadedAssetsCount} assets`
	await new Promise(r => setTimeout(r, 0));

		// const response = await fetch(assetsDirectory);
		// // const assetsJson = await response.json(); // mysterious error in parsing valid json
		// const assetsRaw = await response.text();

		// const assetsJson = JSON.parse(assetsRaw)
		// // console.log(assetsJson)

		// for (const [key, data] of Object.entries(assetsJson.images || {})) {
		// 	const fileName = data.file;
		// 	if (fileName) {
		// 		console.log(`[Game Compilation] Loading ${fileName}`)
		// 		buildState.textContent = `Loading ${fileName}`
		// 		await new Promise(r => setTimeout(r, 0));
		// 		const assetPath = `/assets/images/${fileName}`;
		// 		const realPath = `projects/sample/assets/images/${fileName}`;
		// 		folderStructure[assetPath] = realPath;
		// 	}
		// }

  const zip = new JSZip();

  for (const [zipPath, url] of Object.entries(folderStructure)) {
    try {
			console.log(`[Game Compilation] Fetching ${url}`)
			buildState.textContent = `Fetching ${url}`
			await new Promise(r => setTimeout(r, 1));
      const response = await fetch(url);
      if (!response.ok) {
        console.error(`Failed to fetch ${url}: ${response.statusText}`);
        continue;
      }
      const blob = await response.blob();
      zip.file(zipPath, blob);
    } catch (error) {
      console.error(`Error fetching ${url}:`, error);
    }
  }

	console.log(`[Game Compilation] Creating /scripts/scenes.json`)
	buildState.textContent = `Creating /scripts/scenes.json`
	await new Promise(r => setTimeout(r, 1));

  var scene = saveProject();

  	// scenes.json
// 	zip.file('scripts/scenes.json', `
// {
//   "scenes": {
//   	"1": "${scene.name}"
//   }
// }
// 	`);
	var scenesJson = {
	  scenes: {
	    "1": scene.name
	  }
	};
	zip.file('scripts/scenes.json', JSON.stringify(scenesJson, null, 2));

  // Building Game
  var environment = scene.environment;
  console.log(scene)

  let scenecode = "";

  console.log(`[Game Compilation] Creating /scripts/scenes/${scene.name}/scene.js : Initilizing Script`)
	buildState.textContent = `Creating /scripts/scenes/${scene.name}/scene.js : Initilizing Script`
	await new Promise(r => setTimeout(r, 1));

  scenecode += (`
	import { gzjs } from './../../engine/glunzunk.js';
	import { startScript } from './script.js';

	function startScene() {
  `)



  if (environment.lighting) {
  	console.log(`[Game Compilation] Creating /scripts/scenes/${scene.name}/scene.js : Adding Scene Lighting (Environment)`)
		buildState.textContent = `Creating /scripts/scenes/${scene.name}/scene.js : Adding Scene Lighting (Environment)`
		await new Promise(r => setTimeout(r, 5));
  	if (environment.lighting.hemisphere) {
  		scenecode += `gzjs.lighting('hemisphere', ${environment.lighting.hemisphere.intensity}, ${environment.lighting.hemisphere.color1}, ${environment.lighting.hemisphere.color2});`
  	} else if (environment.lighting.ambient) {
  		scenecode += `gzjs.lighting('ambient', ${environment.lighting.ambient.intensity}, ${environment.lighting.ambient.color});`  		
  	}
  	if (environment.lighting.shadowType) {scenecode += `gzjs.shadow(true, '${environment.lighting.shadowType}');`};
  }

  if (environment.tonemapping) {
  	console.log(`[Game Compilation] Creating /scripts/scenes/${scene.name}/scene.js : Adding Tonemapping (Environment)`)
		buildState.textContent = `Creating /scripts/scenes/${scene.name}/scene.js : Adding Tonemapping (Environment)`
		await new Promise(r => setTimeout(r, 5));
  	scenecode += `gzjs.tonemapping('${environment.tonemapping.type}', ${environment.tonemapping.exposure});`
  }

  if (environment.fog) {
  	console.log(`[Game Compilation] Creating /scripts/scenes/${scene.name}/scene.js : Adding Fog (Environment)`)
		buildState.textContent = `Creating /scripts/scenes/${scene.name}/scene.js : Adding Fog (Environment)`
		await new Promise(r => setTimeout(r, 5));
  	if (environment.fog.expo) {
  		scenecode += `gzjs.fog('expo', ${environment.fog.expo.color}, ${environment.fog.expo.density});`
  	} else if (environment.fog.linear) {
  		scenecode += `gzjs.fog('linear', ${environment.fog.linear.color}, ${environment.fog.linear.near}, ${environment.fog.linear.far});`
  	}
  }

  if (environment.sky) {
  	if (environment.sky.enable === true) {
  		console.log(`[Game Compilation] Creating /scripts/scenes/${scene.name}/scene.js : Adding Sky (Environment)`)
  		buildState.textContent = `Creating /scripts/scenes/${scene.name}/scene.js : Adding Sky (Environment)`
  		await new Promise(r => setTimeout(r, 5));
  		console.log(environment.sky)
  		scenecode += `gzjs.sky(
  			${environment.sky.turbidity},
  			${environment.sky.rayleigh},
  			${environment.sky.mieCoefficient},
  			${environment.sky.mieDirectionalG},
  			${environment.sky.elevation},
  			${environment.sky.azimuth},
  			${environment.sky.scale},
  			${environment.sky.sunlight.color},
  			${environment.sky.sunlight.intensity},
  			${environment.sky.sunlight.castShadow}
  		);`
  	}
  }


  if (scene.effects) {
  	console.log(`[Game Compilation] Creating /scripts/scenes/${scene.name}/scene.js : Adding Post-Processing`)
  	buildState.textContent = `Creating /scripts/scenes/${scene.name}/scene.js : Adding Post-Processing`
  	await new Promise(r => setTimeout(r, 5));
		for (const [key, obj] of Object.entries(scene.effects)) {
			scenecode += `gzjs.postProcessing('add', ${key}, ${obj});`
			console.log(key, obj)
		}; 	
  }

  // if this isnt true, then bruh waht happened :sob:
  if (scene.objects) {
	for (const [key, obj] of Object.entries(scene.objects)) {
		console.log(`[Game Compilation] Creating /scripts/scenes/${scene.name}/scene.js : Creating ${key} (Object)`)		
		buildState.textContent = `Creating /scripts/scenes/${scene.name}/scene.js : Creating ${key} (Object)`
		await new Promise(r => setTimeout(r, 1));
		// var textures = obj.textures;
		let texturesObject = "";
		console.log(obj.material)
		if (obj.material.textures) {
			for (const [key, value] of Object.entries(obj.material?.textures)) {
			  texturesObject += `${key}: gzjs.texture('${value}'),`;
			}			
		}


		scenecode += `
    	gzjs.newObject(
    	    '${key}',
    	    '${obj.type}',
    	    ${obj.color},
    	    [${[obj.x, obj.y, obj.z]}],
    	    ${JSON.stringify(obj.properties)}, 
    	    '${obj.material?.type || 'standard'}',
    	    ${JSON.stringify(obj.material?.properties || {})},
			{ textures: { ${texturesObject} } }
    	);`
    };
  }

  // console.log(`[Game Compilation] `)

	if (scene.lights) {
		// Object.entries().forEach(([key, obj]) => {	
		for (const [key, obj] of Object.entries(scene.lights)) {
			// console.log(obj)
			console.log(`[Game Compilation] Creating /scripts/scenes/${scene.name}/scene.js : Creating ${key} (Light Object)`)
			buildState.textContent = `Creating /scripts/scenes/${scene.name}/scene.js : Creating ${key} (Light Object)`
			await new Promise(r => setTimeout(r, 1));
			scenecode += `
				gzjs.createLight(
					'${obj.type}',
					'${key}',
					${obj.color},
					[${[obj.position.x, obj.position.y, obj.position.z]}],
					${JSON.stringify(obj.properties || {})}
				)
			`
		};
	}

  // console.log(scene)

	console.log(`[Game Compilation] Creating /scripts/scenes/${scene.name}/scene.js : Adding Loading Screen and Code Initilization`)
	buildState.textContent = `Creating /scripts/scenes/${scene.name}/scene.js : Adding Loading Screen and Code Initilization`
	await new Promise(r => setTimeout(r, 1));

  scenecode += `
		var loading = document.getElementById('loading-screen');
		loading.style.display = 'none';
		loading.style.pointerEvents = 'none';

		startScript();
	};

	export { startScene }
  `

  console.log(scenecode)

  console.log(`[Game Compilation] Creating /scripts/scenes/${scene.name}/scene.js : Finalizing Build`)
  buildState.textContent = `Creating /scripts/scenes/${scene.name}/scene.js : Finalizing Build`
  await new Promise(r => setTimeout(r, 1));

  zip.file(`scripts/game/${scene.name}/scene.js`, scenecode)
  zip.file(`scripts/game/${scene.name}/script.js`, `
	import * as THREE from 'three';
	import { gzjs } from './../../engine/glunzunk.js';

	function startScript() {
		// setInterval(function() {}, 1); // placeholder
		${sceneScript()}
	};

	export { startScript };
  `)

  try {
    const content = await zip.generateAsync({ type: 'blob' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(content);
    link.download = 'glunzunk-game-export.zip';
    document.body.appendChild(link);
    console.log(`[Game Compilation] Completed /scripts/scenes/${scene.name}/scene.js`)
    buildState.textContent = `Completed /scripts/scenes/${scene.name}/scene.js`
    await new Promise(r => setTimeout(r, 1));
    link.click();
    document.body.removeChild(link);
		loading.classList.remove('fade-in')
		loading.classList.add('fade-out')
  } catch (error) {
    console.error('Error generating ZIP:', error);
  }
}

export { exportGame }