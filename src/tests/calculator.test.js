"use strict";

const {
  add,
  subtract,
  multiply,
  divide,
  modulo,
  power,
  squareRoot,
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
    test("matches extended operations image example (5 % 2)", () => {
      expect(modulo(5, 2)).toBe(1);
    });

    test("returns the remainder of a divided by b", () => {
      expect(modulo(10, 3)).toBe(1);
    });

    test("throws an error on modulo by zero", () => {
      expect(() => modulo(10, 0)).toThrow("Modulo by zero is not allowed.");
    });
  });

  describe("power", () => {
    test("matches extended operations image example (2 ^ 3)", () => {
      expect(power(2, 3)).toBe(8);
    });

    test("raises base to exponent", () => {
      expect(power(2, 5)).toBe(32);
    });
  });

  describe("squareRoot", () => {
    test("matches extended operations image example (√16)", () => {
      expect(squareRoot(16)).toBe(4);
    });

    test("returns the square root of a non-negative number", () => {
      expect(squareRoot(81)).toBe(9);
    });

    test("handles zero input", () => {
      expect(squareRoot(0)).toBe(0);
    });

    test("throws an error for negative numbers", () => {
      expect(() => squareRoot(-1)).toThrow(
        "Square root of a negative number is not allowed."
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

  test("execute routes modulo for image example values", () => {
    expect(execute("modulo", [5, 2])).toBe(1);
  });

  test("execute routes to power", () => {
    expect(execute("power", [2, 5])).toBe(32);
  });

  test("execute routes power for image example values", () => {
    expect(execute("power", [2, 3])).toBe(8);
  });

  test("execute routes to square root", () => {
    expect(execute("squareRoot", [81])).toBe(9);
  });

  test("execute routes square root for image example values", () => {
    expect(execute("squareRoot", [16])).toBe(4);
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
});
