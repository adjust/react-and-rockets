// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import data from "./tests/__fixtures__/data.json";

beforeAll(() => jest.spyOn(window, "fetch"));

const mockFetch = () =>
  Promise.resolve({
    json: () => Promise.resolve(data),
    ok: true,
  });

beforeEach(() => window.fetch.mockImplementation(mockFetch));
