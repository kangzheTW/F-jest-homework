import VaccineTest from "../vaccineTest";
import Recipient from "../recipient";

jest.mock("../recipient", () => {
  return jest.fn().mockImplementation(() => ({
    acceptInjection: jest.fn(),
    getHasAntibodies: jest.fn(),
  }));
});

beforeEach(() => {
  Recipient.mockClear();
});

describe("inject", () => {
  test("should recipient accept injection with vaccine", () => {
    const vacTest = new VaccineTest();

    vacTest.inject();

    expect(vacTest.recipient.acceptInjection).toHaveBeenCalledWith(vacTest.vaccine);
  });
});

describe("test", () => {
  test("should get Success if recipient has antibodies", () => {
    const vacTest = new VaccineTest();
    vacTest.recipient.getHasAntibodies.mockImplementation(() => true);

    vacTest.inject();

    expect(vacTest.test()).toEqual("Vaccine Test Success");
  });

  test("should get Failed if recipient has no antibodies", () => {
    const vacTest = new VaccineTest();
    vacTest.recipient.getHasAntibodies.mockImplementation(() => false);

    vacTest.inject();

    expect(vacTest.test()).toEqual("Vaccine Test Failed");
  });
});
