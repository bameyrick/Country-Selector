export function dynamicSort(property: string) {
	let sortOrder = 1;
	if (property.charAt(0) === '-') {
		sortOrder = -1;
		property = property.substr(1);
	}
	
	return (a: any, b: any) => {
		const result: any = (a[property] < b[property]) ? -1 : (a[property] > b[property]);

		return result * sortOrder;
	};
}

export function dynamicSortMultiple(...props: string[]): any {
	return (obj1: any, obj2: any): number => {
	
	
		let i = 0;
		let result = 0;
		const numberOfProperties = props.length;

		while (result === 0 && i < numberOfProperties) {
			result = dynamicSort(props[i])(obj1, obj2);
			i++;
		}

		return result;
	};
}
