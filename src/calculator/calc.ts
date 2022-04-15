import parser from "./parser";

const mathjs = require("mathjs");

const ERROR = "Ошибка";

const calc = (str: string): string => {
	try {
		const parsedStr = parser(str);
		return mathjs.evaluate(parsedStr);
	} catch (e) {
		return ERROR;
	}
};

export default calc;
