import * as TaskOneSolution from "../solutions/1_task";
import { RocketsList } from "../solutions/2_task";
import { render, screen, waitFor, within } from "react-dom";
import testRockets from "./__fixtures__/rockets.json";

/* 
  PLEASE DO NOT MODIFY THIS FILE
*/

const API_URL = "https://api.spacexdata.com/v3/launches/past";

const testFilterParamsList = [
  {
    year: 2018,
    customerName: "NASA",
  },
  {
    year: 2008,
    customerName: "SpaceX",
  },
];

const renderRocketsList = (filterParams = testFilterParamsList[0]) =>
  render(<RocketsList filterParams={filterParams} />);

describe("# RocketsList", () => {
  it("fetches the whole list of mission from SpaceX API", () => {
    renderRocketsList();

    expect(window.fetch).toHaveBeenCalledTimes(1);
    expect(window.fetch).toHaveBeenCalledWith(API_URL);
  });

  // Expected warning: An update to TestComponent inside a test was not wrapped in act(...)
  test("should re-process missions with prepareData every time filterParams change, but not call API anymore", async () => {
    const { rerender } = renderRocketsList();

    const spy = jest.spyOn(TaskOneSolution, "prepareData");

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(testFilterParamsList[0]);

    // update filterParams prop
    rerender(<RocketsList filterParams={testFilterParamsList[1]} />);

    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenCalledWith(testFilterParamsList[1]);

    expect(window.fetch).toHaveBeenCalledTimes(1);
  });

  test("renders 'No data' on no missions", async () => {
    const mockFetch = () =>
      Promise.resolve({
        json: () => Promise.resolve([]),
      });

    window.fetch.mockImplementation(mockFetch);

    renderRocketsList();

    expect(screen.getByText("No data")).toBeInTheDocument();
  });

  test("renders all obtain missions correctly", async () => {
    render(<RocketsList />);

    await waitFor(() =>
      screen.getByText(testRockets[0].mission_name, { exact: false })
    );

    testRockets.forEach(({ flight_number, mission_name, payloads_count }) => {
      const rocketLabelElement = screen.getByText(mission_name, {
        exact: false,
      });

      expect(rocketLabelElement).toBeInTheDocument();

      console.log(
        `testRockets.forEach -> rocketLabelElement`,
        rocketLabelElement
      );

      // TODO: build label and test whole innerHTML

      // expect(
      //   within(rocketLabelElement).getByText(flight_number, { exact: false })
      // ).toBeInTheDocument();

      // expect(
      //   within(rocketLabelElement).getByText(payloads_count, { exact: false })
      // ).toBeInTheDocument();
    });
  });
});

// ==============

// describe(`# useRocketsData`, () => {
//   test.each`
//     year    | customerName
//     ${2008} | ${"SpaceX"}
//     ${2010} | ${"SpaceX"}
//     ${2018} | ${"NASA"}
//     ${2019} | ${"Iridium"}
//   `(
//     `fetches and consolidates the data correctly for year $year and customer $customerName`,
//     async (filterParams) => {
//       const { result, waitForNextUpdate } = renderHook(() =>
//         useRocketsData(filterParams)
//       );

//       expect(window.fetch).toHaveBeenCalledWith(API_URL);

//       await waitForNextUpdate();

//       expect(result.current?.rockets).toMatchSnapshot();
//     }
//   );
// });
