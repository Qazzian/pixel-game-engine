// Maths
export function degToRad(deg: number) {
	return deg * Math.PI / 180;
}

// Random numbers
export async function getASeed(): Promise<string>{
	try {
		return await fetchSeed();
	}
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	catch (error) {
		return Promise.resolve(generateSeed());
	}
}

export async function fetchSeed(): Promise<string> {
	const result = await fetch('https://www.random.org/integers/?num=1&min=1&max=100000000&col=1&base=10&format=plain&rnd=new');
	return await result.text();
}

export function generateSeed(): string{
	return Date.now().toString();
}

