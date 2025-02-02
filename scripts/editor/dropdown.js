var quickSettingsBool = false;

function toggleDropdown(menu) {
	if (menu === 'quick-settings') {
		if (quickSettingsBool === true) {
			var dropdown = document.getElementById('quick-settings')
			dropdown.classList.remove('fade-in')
			dropdown.classList.add('fade-out')

			quickSettingsBool = false;
		} else {
			var dropdown = document.getElementById('quick-settings')
			dropdown.classList.remove('fade-out')
			dropdown.classList.add('fade-in')

			quickSettingsBool = true;
		};
	};
	if (menu === 'environment') {
		if (quickSettingsBool === true) {
			var dropdown = document.getElementById('environment-settings')
			dropdown.classList.remove('fade-in')
			dropdown.classList.add('fade-out')

			quickSettingsBool = false;
		} else {
			var dropdown = document.getElementById('environment-settings')
			dropdown.classList.remove('fade-out')
			dropdown.classList.add('fade-in')

			quickSettingsBool = true;
		};
	};
};