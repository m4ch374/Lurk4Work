/**
 * Given a js file object representing a jpg or png image, such as one taken
 * from a html file input element, return a promise which resolves to the file
 * data as a data url.
 * More info:
 *   https://developer.mozilla.org/en-US/docs/Web/API/File
 *   https://developer.mozilla.org/en-US/docs/Web/API/FileReader
 *   https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
 * 
 * Example Usage:
 *   const file = document.querySelector('input[type="file"]').files[0];
 *   console.log(fileToDataUrl(file));
 * @param {File} file The file to be read.
 * @return {Promise<string>} Promise which resolves to the file as a data url.
 */
export function fileToDataUrl(file) {
	const validFileTypes = [ 'image/jpeg', 'image/png', 'image/jpg' ]
	const valid = validFileTypes.find(type => type === file.type);
	// Bad data, let's walk away.
	if (!valid) {
			throw Error('provided file is not a png, jpg or jpeg image.');
	}
	
	const reader = new FileReader();
	const dataUrlPromise = new Promise((resolve,reject) => {
			reader.onerror = reject;
			reader.onload = () => resolve(reader.result);
	});
	reader.readAsDataURL(file);
	return dataUrlPromise;
}

// Gets an element by it's id
const getElem = (elemId) => {
  return document.querySelector(`#${elemId}`);
}

const getTimeDiffStr = (timeStr) => {
	const targetDate = new Date(timeStr);
	const diff = new Date().getTime() - targetDate.getTime();

	const hrs = Math.floor(diff / (1000 * 60 * 60));
	const mins = Math.floor((diff / (1000 * 60)) % 60);

	return hrs > 24 ? targetDate.toLocaleDateString('en-AU') : `${hrs}h ${mins}m ago`;
}

const checkIntegrety = () => {
  if (!'token' in localStorage) {
    alert("Cannot access main page without logging in");
    window.location.href = "../index.html";
  }
}

export {getElem, getTimeDiffStr, checkIntegrety};
