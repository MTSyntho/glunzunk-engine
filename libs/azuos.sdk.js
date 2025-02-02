/*
	Software Developement Kit for AzuOS
	Written by: MTSyntho @ AzuSystem 2024
	AzuOS SDK allows for the development of dynamically created applications
	This SDK has been modified to fit Glunzunk Engine's needs
*/

const element = {
	create: (type, innerHTML, codename) => {
		return new Promise((resolve) => {
			const elm = document.createElement(type);
			elm.innerHTML = innerHTML;

			const elementObject = {
				codename,
				element: elm,
				attribute: (name, value) => {
					elm.setAttribute(name, value);
					return elementObject;
				},
				class: (className) => {
					elm.classList.add(className);
					return elementObject;
				},
				id: (id) => {
					elm.id = (id);
					return elementObject;
				},
				display: (display) => {
					elm.style.display = display;
					return elementObject;
				},
				flex: () => {
					elm.style.display = 'flex';
					return elementObject;
				},
				gap: (gap) => {
					elm.style.gap = gap;
					return elementObject;
				},
				objectfit: (type) => {
					elm.style.objectFit = type;
					return elementObject;
				},
				objectFit: (type) => {
					elm.style.objectFit = type;
					return elementObject;
				},
				horizontal: () => {
					elm.style.flexDirection = 'row';
					return elementObject;
				},
				vertical: () => {
					elm.style.flexDirection = 'column';
					return elementObject;
				},
				align: (alignment) => {
					elm.classList.add('__azuos-sdk-align-center');
					return elementObject;
				},
				alignx: (alignment) => {
					elm.classList.add('__azuos-sdk-alignx-center');
					return elementObject;
				},
				aligny: (alignment) => {
					elm.classList.add('__azuos-sdk-aligny-center');
					return elementObject;
				},
				textalign: (textalignment) => {
					elm.style.textAlign = textalignment;
					return elementObject;
				},
				color: (color) => {
					elm.style.color = color;
					return elementObject;
				},
				textshadow: (shadow) => {
					elm.style.textshadow = shadow;
					return elementObject;
				},
				boxshadow: (shadow) => {
					elm.style.boxShadow = shadow;
					return elementObject;
				},
				dropshadow: (shadow) => {
					elm.style.filter = `drop-shadow(${shadow})`;
					return elementObject;
				},
				opacity: (opacity) => {
					elm.style.opacity = opacity;
					return elementObject;
				},
				border: (string) => {
					elm.style.border = string;
					return elementObject;
				},
				outline: (string) => {
					elm.style.outline = string;
					return elementObject;
				},
				backgroundcolor: (color) => {
					elm.style.background = color;
					return elementObject;
				},
				backgroundimage: (image) => {
					elm.style.backgroundImage = `url(${image.replace(/ /g, '%20')})`;
					// console.log(`url(${image.replace(/ /g, '%20')})`)
					return elementObject;
				},
				backgroundrepeat: (repeat) => {
					elm.style.backgroundRepeat = repeat;
					return elementObject;
				},
				backgroundposition: (pos) => {
					elm.style.backgroundRepeat = pos;
					return elementObject;
				},
				backgroundsize: (size) => {
					elm.style.backgroundSize = size;
					return elementObject;
				},
				backgroundattachment: (attach) => {
					elm.style.backgroundAttachment = attach;
					return elementObject;
				},
				backgroundclip: (clip) => {
					elm.style.backgroundClip = clip;
					return elementObject;
				},
				backgroundorigin: (origin) => {
					elm.style.backgroundOrigin = origin;
					return elementObject;
				},
				backgroundblend: (mode) => {
					elm.style.backgroundBlendMode = mode;
					return elementObject;
				},
				backdropfilter: (filter) => {
					elm.style.backdropFilter = filter;
					return elementObject;
				},
				filter: (filter) => {
					elm.style.filter = filter;
					return elementObject;
				},
				overflow: (overflow) => {
					elm.style.overflow = overflow;
					return elementObject;
				},
				overflowx: (overflow) => {
					elm.style.overflowx = overflow;
					return elementObject;
				},
				overflowy: (overflow) => {
					elm.style.overflowy = overflow;
					return elementObject;
				},
				scale: (scale) => {
					elm.style.scale = scale;
					return elementObject;
				},
				clippath: (clip) => {
					elm.style.clipPath = clip;
					return elementObject;
				},
				source: (srcimg) => {
					elm.src = srcimg;
					return elementObject;
				},
				src: (srcimg) => {
					elm.src = srcimg;
					return elementObject;
				},
				width: (width) => {
					if (elm.tagName === 'IMG' || elm.tagName === 'VIDEO' || elm.tagName === 'CANVAS') {
						elm.width = width;
					} else {
						elm.style.width = width;
					}
					return elementObject;
				},

				height: (height) => {
					if (elm.tagName === 'IMG' || elm.tagName === 'VIDEO' || elm.tagName === 'CANVAS') {
						elm.height = height;
					} else {
						elm.style.height = height;
					}
					return elementObject;
				},
				top: (top) => {
					elm.style.top = top;
					return elementObject;
				},
				left: (left) => {
					elm.style.left = left;
					return elementObject;
				},
				bottom: (bottom) => {
					elm.style.bottom = bottom;
					return elementObject;
				},
				right: (right) => {
					elm.style.right = right;
					return elementObject;
				},
				position: (pos) => {
					elm.style.position = pos;
					return elementObject;
				},
				padding: (padding) => {
					elm.style.padding = padding;
					return elementObject;
				},
				paddingtop: (top) => {
					elm.style.paddingTop = top;
					return elementObject;
				},
				paddingleft: (left) => {
					elm.style.paddingLeft = left;
					return elementObject;
				},
				paddingbottom: (bottom) => {
					elm.style.paddingBottom = bottom;
					return elementObject;
				},
				paddingright: (right) => {
					elm.style.paddingRight = right;
					return elementObject;
				},
				margin: (margin) => {
					elm.style.margin = margin;
					return elementObject;
				},
				margintop: (top) => {
					elm.style.marginTop = top;
					return elementObject;
				},
				marginleft: (left) => {
					elm.style.marginLeft = left;
					return elementObject;
				},
				marginbottom: (bottom) => {
					elm.style.marginBottom = bottom;
					return elementObject;
				},
				marginright: (right) => {
					elm.style.marginRight = right;
					return elementObject;
				},
				marginTop: (top) => {
					elm.style.marginTop = top;
					return elementObject;
				},
				marginLeft: (left) => {
					elm.style.marginLeft = left;
					return elementObject;
				},
				marginBottom: (bottom) => {
					elm.style.marginBottom = bottom;
					return elementObject;
				},
				marginRight: (right) => {
					elm.style.marginRight = right;
					return elementObject;
				},				
				radius: (radius) => {
					elm.style.borderRadius = radius;
					return elementObject;
				},
				css: (string) => {
					elm.style.cssText = string;
					elm.classList.remove('__azuos-button-large');
					return elementObject;
				},
				style: (string) => {
					const style = document.createElement("style");
					style.innerHTML = string;
					document.head.appendChild(style);
					elm.classList.remove('__azuos-button-large');
					return elementObject;
				},
				type: (string) => {
					elm.type = string;
					return elementObject;
				},
				for: (string) => {
					elm.for = string;
					return elementObject;
				},
				mininput: (number) => {
					elm.minlength = number;
					return elementObject;
				},
				maxinput: (number) => {
					elm.maxlength = number;
					return elementObject;
				},
				inputrequired: (boolean) => {
					if (typeof boolean === 'boolean') {
						elm.required = boolean;
					} else if (boolean === 'true') {
						elm.required = true;
					} else if (boolean === 'false') {
						elm.required = false;
					}
					return elementObject;
				},
				readonly: (boolean) => {
					if (typeof boolean === 'boolean') {
						elm.readonly = boolean;
					} else if (boolean === 'true') {
						elm.readonly = true;
					} else if (boolean === 'false') {
						elm.readonly = false;
					}
					return elementObject;
				},
				autoplay: () => {
					elm.autoplay = true;
					return elementObject;
				},
				controls: () => {
					elm.controls = true;
					return elementObject;
				},
				placeholder: (string) => {
					elm.placeholder = string
					return elementObject;
				},
				parent: (elementcodename) => {
					var parent = document.querySelector(`[codename="${elementcodename}"]`);
					if (parent) {
						parent.appendChild(elm);  // Append the element to the parent
					} else {
						console.error(`[AzuOS SDK] Cannot append '${elm.tagName}' element (Codename: '${elementObject.codename}') to "${elementcodename}"`);
					}
					return elementObject;
				}			};
			// if (elm.getAttribute('system-css') === '') {
			// 	elm
			// }
			// if (elm.tagName === 'BUTTON' && ((elm.getAttribute('ignore-system-css') === null || elm.getAttribute('ignore-system-css') == 'false'))) {
			// 	elm.classList.add('__azuos-button-large')
			// };
			// const useSystemCSS = elm.getAttribute('system-css');
			// console.log('ignore-system-css value:', useSystemCSS);

			// if (elm.tagName === 'BUTTON') {
			// 	if (useSystemCSS === null || useSystemCSS === 'true') {
			// 		elm.classList.add('__azuos-button-large');
			// 	} if (useSystemCSS === 'false') {
			// 		console.log(useSystemCSS)
			// 	}
			// }

			elm.setAttribute("codename", codename);
			if (!manualIsElementOverwrite) {
				elm.setAttribute("isElement", "");
			}
			resolve(elementObject);

			// console.log(elm.classList)
			if (elm.tagName === 'BUTTON' && elm.classList.length === 0) {
				elm.classList.add('__azuos-button-small');
			}
		});
	}
};



