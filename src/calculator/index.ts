#!/usr/bin/env node

import readline from "readline";
import calc from "./calc";

process.stdout.write(`Введите выражение для вычисления\n`);

const input = readline.createInterface(process.stdin);

input.on("line", (str: string) => {
	const result = calc(str);
	process.stdout.write(`> ${result}\n\n`);
});
