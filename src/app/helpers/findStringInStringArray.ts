export function findStringInStringArray(string: string, stringArray: string[]) {
	if (!Array.isArray(stringArray)) {
		stringArray = [stringArray];
	}

	let arrayIndex = -1;
	let stringIndex = -1;

	let match = stringArray.some((str, index) => {
		stringIndex = str.indexOf(string);

		if (stringIndex > -1) {
			arrayIndex = index;
			return true;
		}

		return false;
	});

	return {
		match,
		arrayIndex,
		stringIndex
	}
}
