#!/usr/bin/env node

"use strict";

/**
 * Supported operations:
 * - Addition (+)
 * - Subtraction (-)
 * - Multiplication (*, x, ×)
 * - Division (/, ÷)
 */
const OPERATIONS = Object.freeze({
  add: "add",
  subtract: "subtract",
  multiply: "multiply",
  divide: "divide",
});

function add(numbers) {
  return numbers.reduce((total, value) => total + value, 0);
}

function subtract(numbers) {
  const [first, ...rest] = numbers;
  return rest.reduce((total, value) => total - value, first);
}

function multiply(numbers) {
  return numbers.reduce((total, value) => total * value, 1);
}

function divide(numbers) {
  const [first, ...rest] = numbers;
  return rest.reduce((total, value) => {
    if (value === 0) {
      throw new Error("Division by zero is not allowed.");
    }
    return total / value;
  }, first);
}

function parseNumbers(rawValues) {
  if (rawValues.length < 2) {
    throw new Error("At least two numeric operands are required.");
  }

  const parsed = rawValues.map((value) => Number(value));
  if (parsed.some((value) => Number.isNaN(value) || !Number.isFinite(value))) {
    throw new Error("All operands must be valid finite numbers.");
  }

  return parsed;
}

function parseExpression(expression) {
  const match = expression.match(
    /^\s*(-?\d+(?:\.\d+)?)\s*([+\-xX*×÷/])\s*(-?\d+(?:\.\d+)?)\s*$/
  );

  if (!match) {
    throw new Error(
      "Expression must look like: <number> <operator> <number> (example: 5 + 3)."
    );
  }

  const [, leftRaw, operatorRaw, rightRaw] = match;
  const left = Number(leftRaw);
  const right = Number(rightRaw);

  if (!Number.isFinite(left) || !Number.isFinite(right)) {
    throw new Error("Expression values must be valid finite numbers.");
  }

  const normalizedOperator =
    operatorRaw === "x" || operatorRaw === "X" || operatorRaw === "×"
      ? "*"
      : operatorRaw === "÷"
      ? "/"
      : operatorRaw;

  switch (normalizedOperator) {
    case "+":
      return { operation: OPERATIONS.add, numbers: [left, right] };
    case "-":
      return { operation: OPERATIONS.subtract, numbers: [left, right] };
    case "*":
      return { operation: OPERATIONS.multiply, numbers: [left, right] };
    case "/":
      return { operation: OPERATIONS.divide, numbers: [left, right] };
    default:
      throw new Error("Unsupported operator.");
  }
}

function parseCliArgs(argv) {
  if (argv.length === 0 || argv.includes("--help") || argv.includes("-h")) {
    return { help: true };
  }

  const operationFlags = {
    "--add": OPERATIONS.add,
    "--subtract": OPERATIONS.subtract,
    "--multiply": OPERATIONS.multiply,
    "--divide": OPERATIONS.divide,
  };

  const first = argv[0];
  if (operationFlags[first]) {
    return {
      operation: operationFlags[first],
      numbers: parseNumbers(argv.slice(1)),
    };
  }

  if (argv.length === 1) {
    return parseExpression(argv[0]);
  }

  throw new Error(
    "Invalid arguments. Use --help to see supported calculator commands."
  );
}

function execute(operation, numbers) {
  switch (operation) {
    case OPERATIONS.add:
      return add(numbers);
    case OPERATIONS.subtract:
      return subtract(numbers);
    case OPERATIONS.multiply:
      return multiply(numbers);
    case OPERATIONS.divide:
      return divide(numbers);
    default:
      throw new Error("Unsupported operation requested.");
  }
}

function printHelp() {
  console.log(`Node.js CLI Calculator

Supported operations:
  - Addition (+) via --add
  - Subtraction (-) via --subtract
  - Multiplication (*, x, ×) via --multiply
  - Division (/, ÷) via --divide

Usage:
  node src/calculator.js --add 5 3
  node src/calculator.js --subtract 9 4
  node src/calculator.js --multiply 3 4
  node src/calculator.js --divide 10 2
  node src/calculator.js "5 + 3"
`);
}

function run() {
  try {
    const parsed = parseCliArgs(process.argv.slice(2));
    if (parsed.help) {
      printHelp();
      return;
    }

    const result = execute(parsed.operation, parsed.numbers);
    console.log(result);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exitCode = 1;
  }
}

if (require.main === module) {
  run();
}

module.exports = {
  add,
  subtract,
  multiply,
  divide,
  parseCliArgs,
  execute,
};
