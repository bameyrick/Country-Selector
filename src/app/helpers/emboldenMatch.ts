export function emboldenMatch(string: string, query: string): string {
	const queryLength = query.length;
	const matchIndex = string.toLowerCase().indexOf(query);
	const matchEnd = matchIndex + queryLength;
	const before = string.substr(0, matchIndex);
	const match = string.substr(matchIndex, queryLength);
	const after = string.substr(matchEnd, string.length - matchEnd);

	return `${before}<strong>${match}</strong>${after}`;
} 
