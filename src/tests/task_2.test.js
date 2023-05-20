import * as TaskOneSolution from "../solutions/task_1";
import { RocketsList } from "../solutions/task_2";
import { render, waitFor } from "@testing-library/react";
import testSpecs from "./__fixtures__/testSpecs.json";

/* 
  PLEASE DO NOT MODIFY THIS FILE
*/

const API_URL = "https://api.spacexdata.com/v3/launches/past";
const NO_DATA_LABEL = "No data";
const LOADING_LABEL = "Loading...";

const testFilterParamsList = testSpecs.map(({ filterParams }) => filterParams);

const renderRocketsList = (filterParams = testFilterParamsList[0]) =>
  render(<RocketsList filterParams={filterParams} />);

describe("# RocketsList", () => {
  it(`renders ${LOADING_LABEL} while fetching data`, async () => {
    const mockFetch = () => new Promise(() => {});

    window.fetch.mockImplementation(mockFetch);

    const { getByText, queryByText } = renderRocketsList();

    await waitFor(() => expect(getByText(LOADING_LABEL)).toBeInTheDocument());
    expect(queryByText(NO_DATA_LABEL)).not.toBeInTheDocument();
  });

  it("renders 'Loading...' while fetching data, and 'No data' on no missions obtained", async () => {
    const mockFetch = () =>
      Promise.resolve({
        json: () => Promise.resolve([]),
      });

    window.fetch.mockImplementation(mockFetch);

    const { getByText, queryByText } = renderRocketsList();

    expect(getByText(LOADING_LABEL)).toBeInTheDocument();
    await waitFor(() => expect(getByText(NO_DATA_LABEL)).toBeInTheDocument());
    await waitFor(() =>
      expect(queryByText(LOADING_LABEL)).not.toBeInTheDocument()
    );
  });

  it("fetches the whole list of mission from SpaceX API", async () => {
    const { getByText, queryByText } = renderRocketsList();

    // to avoid RTL 'act' warning
    await waitFor(() => expect(getByText(LOADING_LABEL)).toBeInTheDocument());

    expect(window.fetch).toHaveBeenCalledTimes(1);
    expect(window.fetch).toHaveBeenCalledWith(API_URL);

    expect(queryByText(LOADING_LABEL)).not.toBeInTheDocument();
    expect(queryByText(NO_DATA_LABEL)).not.toBeInTheDocument();
  });

  it("should re-process missions with prepareData every time filterParams change, but not call API anymore", async () => {
    const prepareDataSpy = jest.spyOn(TaskOneSolution, "prepareData");

    const { rerender, getByText, queryByText } = renderRocketsList(
      testFilterParamsList[0]
    );

    expect(prepareDataSpy).toHaveBeenCalledTimes(1);
    expect(prepareDataSpy).toHaveBeenCalledWith(testFilterParamsList[0]);

    // update filterParams prop
    rerender(<RocketsList filterParams={testFilterParamsList[1]} />);

    expect(prepareDataSpy).toHaveBeenCalledTimes(2);
    expect(prepareDataSpy).toHaveBeenCalledWith(testFilterParamsList[1]);

    expect(window.fetch).toHaveBeenCalledTimes(1);

    // to avoid RTL 'act' warning
    await waitFor(() => expect(getByText(LOADING_LABEL)).toBeInTheDocument());

    prepareDataSpy.mockRestore();

    expect(queryByText(LOADING_LABEL)).not.toBeInTheDocument();
    expect(queryByText(NO_DATA_LABEL)).not.toBeInTheDocument();
  });

  describe("renders all obtained missions correctly", () => {
    test.each(testSpecs)(
      "specs: %O",
      async ({ filterParams, results: missionLabels }) => {
        const { getByText } = renderRocketsList(filterParams);

        await waitFor(() => getByText(missionLabels[0]));

        missionLabels.forEach((label) =>
          expect(getByText(label)).toBeInTheDocument()
        );
      }
    );
  });
});
