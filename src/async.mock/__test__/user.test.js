import axios from "axios";
import { register } from "../user";
import { verifyUsername } from "../verify";

jest.mock("../verify");

describe("register", () => {
  test("should post user when validated", async () => {
    // TODO 19: add test here

    await register("username", "password");

    expect(axios.post).toHaveBeenCalledWith("/user", {
      username: "username",
      password: "password",
    });
  });

  test("should reject with Error when username is invalid", async () => {
    // TODO 20: add test here
    verifyUsername.mockImplementation(() => false);

    await expect(register("username", "password")).rejects.toThrow(
      "wrong username or password"
    );
  });
});
