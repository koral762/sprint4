export const storageService = {
	load,
	save,
	clear
}

function load(key) {
	return JSON.parse(localStorage.getItem(key));
}

function save(key, val) {
	localStorage.setItem(key, JSON.stringify(val));
}

function clear(key){
	localStorage.clear(key)
}