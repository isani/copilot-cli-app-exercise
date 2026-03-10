"use strict";

const {
  add,
  subtract,
  multiply,
  divide,
  modulo,
  exponentiate,
  sqrt,
  execute,
  parseCliArgs,
} = require("../calculator");

describe("calculator arithmetic functions", () => {
  describe("add", () => {
    test("adds numbers from the image example (2 + 3)", () => {
      expect(add([2, 3])).toBe(5);
    });

    test("adds more than two numbers", () => {
      expect(add([1, 2, 3, 4])).toBe(10);
    });

    test("handles negative numbers", () => {
      expect(add([-5, 2, 1])).toBe(-2);
    });
  });

  describe("subtract", () => {
    test("subtracts numbers from the image example (10 - 4)", () => {
      expect(subtract([10, 4])).toBe(6);
    });

    test("subtracts multiple numbers from left to right", () => {
      expect(subtract([20, 5, 3])).toBe(12);
    });

    test("handles negative outcomes", () => {
      expect(subtract([3, 10])).toBe(-7);
    });
  });

  describe("multiply", () => {
    test("multiplies numbers from the image example (45 * 2)", () => {
      expect(multiply([45, 2])).toBe(90);
    });

    test("multiplies several values", () => {
      expect(multiply([2, 3, 4])).toBe(24);
    });

    test("returns zero when any operand is zero", () => {
      expect(multiply([12, 0, 99])).toBe(0);
    });
  });

  describe("divide", () => {
    test("divides numbers from the image example (20 / 5)", () => {
      expect(divide([20, 5])).toBe(4);
    });

    test("divides multiple values from left to right", () => {
      expect(divide([100, 5, 2])).toBe(10);
    });

    test("throws an error on division by zero", () => {
      expect(() => divide([8, 0])).toThrow("Division by zero is not allowed.");
    });
  });

  describe("modulo", () => {
    test("returns the remainder of 10 % 3", () => {
      expect(modulo([10, 3])).toBe(1);
    });

    test("returns zero when divisible evenly", () => {
      expect(modulo([12, 4])).toBe(0);
    });

    test("handles negative dividend", () => {
      expect(modulo([-7, 3])).toBe(-1);
    });

    test("applies modulo left to right for multiple operands", () => {
      expect(modulo([100, 30, 7])).toBe(3);
    });

    test("throws an error on modulo by zero", () => {
      expect(() => modulo([10, 0])).toThrow("Modulo by zero is not allowed.");
    });
  });

  describe("exponentiate", () => {
    test("raises 2 to the power of 8", () => {
      expect(exponentiate([2, 8])).toBe(256);
    });

    test("raises a number to the power of 0", () => {
      expect(exponentiate([5, 0])).toBe(1);
    });

    test("raises a number to the power of 1", () => {
      expect(exponentiate([7, 1])).toBe(7);
    });

    test("handles negative exponent", () => {
      expect(exponentiate([2, -1])).toBe(0.5);
    });

    test("applies exponentiation left to right for multiple operands", () => {
      expect(exponentiate([2, 3, 2])).toBe(64);
    });
  });

  describe("sqrt", () => {
    test("returns the square root of 16", () => {
      expect(sqrt([16])).toBe(4);
    });

    test("returns the square root of 0", () => {
      expect(sqrt([0])).toBe(0);
    });

    test("returns the square root of a non-perfect square", () => {
      expect(sqrt([2])).toBeCloseTo(1.4142135623730951);
    });

    test("throws an error for negative numbers", () => {
      expect(() => sqrt([-1])).toThrow(
        "Square root of a negative number is not allowed."
      );
    });

    test("throws an error when more than one operand is given", () => {
      expect(() => sqrt([4, 9])).toThrow(
        "Square root requires exactly one operand."
      );
    });
  });
});

describe("calculator execution and CLI parsing", () => {
  test("execute routes to addition", () => {
    expect(execute("add", [2, 3])).toBe(5);
  });

  test("execute routes to subtraction", () => {
    expect(execute("subtract", [10, 4])).toBe(6);
  });

  test("execute routes to multiplication", () => {
    expect(execute("multiply", [45, 2])).toBe(90);
  });

  test("execute routes to division", () => {
    expect(execute("divide", [20, 5])).toBe(4);
  });

  test("execute routes to modulo", () => {
    expect(execute("modulo", [10, 3])).toBe(1);
  });

  test("execute routes to exponentiation", () => {
    expect(execute("exponentiate", [2, 8])).toBe(256);
  });

  test("execute routes to sqrt", () => {
    expect(execute("sqrt", [16])).toBe(4);
  });

  test("parseCliArgs supports operation flags", () => {
    expect(parseCliArgs(["--add", "2", "3"])).toEqual({
      operation: "add",
      numbers: [2, 3],
    });
  });

  test("parseCliArgs supports expression input", () => {
    expect(parseCliArgs(["10 - 4"])).toEqual({
      operation: "subtract",
      numbers: [10, 4],
    });
  });

  test("parseCliArgs recognizes multiplication symbols x/×", () => {
    expect(parseCliArgs(["7 x 6"])).toEqual({
      operation: "multiply",
      numbers: [7, 6],
    });
    expect(parseCliArgs(["8 × 2"])).toEqual({
      operation: "multiply",
      numbers: [8, 2],
    });
  });

  test("parseCliArgs recognizes division symbol ÷", () => {
    expect(parseCliArgs(["20 ÷ 5"])).toEqual({
      operation: "divide",
      numbers: [20, 5],
    });
  });

  test("parseCliArgs supports --modulo flag", () => {
    expect(parseCliArgs(["--modulo", "10", "3"])).toEqual({
      operation: "modulo",
      numbers: [10, 3],
    });
  });

  test("parseCliArgs supports modulo expression", () => {
    expect(parseCliArgs(["10 % 3"])).toEqual({
      operation: "modulo",
      numbers: [10, 3],
    });
  });

  test("parseCliArgs supports --exponentiate flag", () => {
    expect(parseCliArgs(["--exponentiate", "2", "8"])).toEqual({
      operation: "exponentiate",
      numbers: [2, 8],
    });
  });

  test("parseCliArgs supports ** exponentiation expression", () => {
    expect(parseCliArgs(["2 ** 8"])).toEqual({
      operation: "exponentiate",
      numbers: [2, 8],
    });
  });

  test("parseCliArgs supports ^ exponentiation expression", () => {
    expect(parseCliArgs(["2 ^ 8"])).toEqual({
      operation: "exponentiate",
      numbers: [2, 8],
    });
  });

  test("parseCliArgs supports --sqrt flag", () => {
    expect(parseCliArgs(["--sqrt", "16"])).toEqual({
      operation: "sqrt",
      numbers: [16],
    });
  });

  test("parseCliArgs supports sqrt expression", () => {
    expect(parseCliArgs(["sqrt 16"])).toEqual({
      operation: "sqrt",
      numbers: [16],
    });
  });

  test("parseCliArgs throws for too few operands with flags", () => {
    expect(() => parseCliArgs(["--add", "2"])).toThrow(
      "At least two numeric operands are required."
    );
  });

  test("parseCliArgs throws for invalid expression", () => {
    expect(() => parseCliArgs(["2 + 3 + 4"])).toThrow(
      "Expression must look like: <number> <operator> <number> (example: 5 + 3)."
    );
  });

  test("parseCliArgs throws for --sqrt with wrong number of operands", () => {
    expect(() => parseCliArgs(["--sqrt", "4", "9"])).toThrow(
      "--sqrt requires exactly one numeric operand."
    );
  });
});
