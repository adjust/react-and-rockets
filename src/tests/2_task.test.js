import { renderHook } from "@testing-library/react-hooks";
import { useRocketsData, API_URL } from "../solutions/2_task";
import * as TaskOneSolution from "../solutions/1_task";

/* 
  PLEASE DO NOT MODIFY THIS FILE
*/

describe(`useRocketsData`, () => {
  test.each`
    year    | customerName
    ${2008} | ${"SpaceX"}
    ${2010} | ${"SpaceX"}
    ${2018} | ${"NASA"}
    ${2019} | ${"Iridium"}
  `(
    `fetches and consolidates the data correctly for year $year and customer $customerName`,
    async (filterParams) => {
      const { result, waitForNextUpdate } = renderHook(() =>
        useRocketsData(filterParams)
      );

      expect(window.fetch).toHaveBeenCalledWith(API_URL);

      await waitForNextUpdate();

      expect(result.current?.rockets).toMatchSnapshot();
    }
  );

  // Expected warning: An update to TestComponent inside a test was not wrapped in act(...).
  test("should re-calculate rockets with prepareData every time filterParams change", async () => {
    const spy = jest.spyOn(TaskOneSolution, "prepareData");

    const testFilterParams = [
      {
        year: 2008,
        customerName: "SpaceX",
      },
      {
        year: 2018,
        customerName: "NASA",
      },
    ];

    const { rerender, waitForNextUpdate } = renderHook(
      (filterParams) => useRocketsData(filterParams),
      {
        initialProps: testFilterParams[0],
      }
    );

    await waitForNextUpdate();
    expect(spy).toHaveBeenCalledWith(testFilterParams[0]);

    // update filterParams
    rerender(testFilterParams[1]);

    await waitForNextUpdate();
    expect(spy).toHaveBeenCalledWith(testFilterParams[1]);
  });
});
