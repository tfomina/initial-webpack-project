export const isSquare = (str: string) => {
	const index = str.indexOf("**");
	return index === -1 ? str : `square(${str.substring(0, index)})`;
};

export const isFactorial = (str: string) => {
	const index = str.indexOf("!");
	return index === -1 ? str : `factorial(${str.substring(0, index)})`;
};

const parser = (str: string) =>
	str
		.split(" ")
		.map((el) => isSquare(isFactorial(el)))
		.join(" ");

export default parser;
