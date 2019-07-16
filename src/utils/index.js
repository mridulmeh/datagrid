export const dataLoader = () => {
	return fetch(`https://api.myjson.com/bins/pkisp`);
};

export const camelCaseToWords = (camelCasedWord) => camelCasedWord.replace(/([A-Z])/g, ' $1')
	.replace(/^./, (str) => str.toUpperCase());

export const keyGenerator = (data) => {
	const keys = Object.keys(data[0]);
	const actualKeys = [];

	keys.forEach(key => {

		if(typeof data[0][key] !== 'object'){

			actualKeys.push({
				key,
				name: camelCaseToWords(key)
			});
		}
	});
	return actualKeys;
};