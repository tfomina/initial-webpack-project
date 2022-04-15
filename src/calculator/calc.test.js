import calc from "./calc";

test("1 + 2 = 3", () => {
	expect(calc("1 + 2")).toBe(3);
});

test("1 + 2 * 8 - 10 = 7", () => {
	expect(calc("1 + 2 * 8 - 10")).toBe(7);
});

test("abracadabra equals error", () => {
	expect(calc("cfghdfhdfh")).toBe("Ошибка");
});

test("abracadabra with math expressions equals error", () => {
	expect(calc("3 + 4 * cfghdfhdfh")).toBe("Ошибка");
});

test("math expressions with factorial", () => {
	expect(calc("3! + 8")).toBe(14);
});

test("math expressions with square", () => {
	expect(calc("3** + 8")).toBe(17);
});
