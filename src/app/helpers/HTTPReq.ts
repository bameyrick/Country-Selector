export enum RequestType {
	GET,
	POST,
	DELETE,
	UPDATE
}

export class Header {

	public key: string;
	public value: string;
	
	constructor(key: string, value: string) {
		this.key = key;
		this.value = value;
	}
	
}

export function HTTPReq(url: string, type?: RequestType, headers?: Header[], data?: Object | any[]): Promise<string> {
	return new Promise((resolve, reject) => {
		
		const xhr = new XMLHttpRequest();
		xhr.open(RequestTypeToString(type), url);

		if (headers) {
			headers.forEach(header => {
				xhr.setRequestHeader(header.key, header.value);
			});
		}

		xhr.onload = function () {
			if (xhr.status >= 200 && xhr.status < 300) {
				resolve(xhr.response);
			} else {
				reject({
					status: xhr.status,
					statusText: xhr.statusText
				});
			}
		};

		xhr.onerror = () => {
			reject({
				status: xhr.status,
				statusText: xhr.statusText
			});
		};
		
		if (data) {
			xhr.send(JSON.stringify(data));
		} else {
			xhr.send();
		}
		
	});
}

function RequestTypeToString(type: RequestType): string {
	switch (type) {
		case RequestType.POST:
			return 'POST';
		case RequestType.DELETE:
			return 'DELETE';
		case RequestType.UPDATE:
			return 'UPDATE';
		default:
			return 'GET';
	}
}
