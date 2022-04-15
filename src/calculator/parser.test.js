import parser, { isSquare, isFactorial } from "./parser";

test("isSquare transforms 4** into square(4)", () => {
	expect(isSquare("4**")).toBe("square(4)");
});

test("isFactorial transforms 3! into factorial(3)", () => {
	expect(isFactorial("3!")).toBe("factorial(3)");
});

test(`parser transforms "3! + 4**" into "factorial(3) + square(4)"`, () => {
	expect(parser("3! + 4**")).toBe("factorial(3) + square(4)");
});
