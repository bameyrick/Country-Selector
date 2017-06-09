export function debounce(callback: Function, wait: number) {
	
	let timeout: any;

	return () => {
		const context = this;
		const	args = arguments;

		const later = () => {
			timeout = null;
			callback.apply(context, args);
		}

		clearTimeout(timeout);

		timeout = setTimeout(later, wait);	
	}
}

// export function debounce(callback, wait, immediate) {
	
// 	let timeout = null;

// 	return () => {
// 		const context = this,
// 			  args = arguments;

// 		const later = () => {
// 			timeout = null;

// 			if(!immediate) {
// 				callback.apply(context, args);
// 			}
// 		}

// 		const callNow = immediate && !timeout;

// 		clearTimeout(timeout);

// 		timeout = setTimeout(later, wait);

// 		if(callNow) {
// 			callback.apply(context, args);
// 		}
		
// 	}
// }
