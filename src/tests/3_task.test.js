import { LOADING_MESSAGE, RocketItem, RocketsList } from "../solutions/3_task";
import { render, screen, waitFor, within, act } from "@testing-library/react";
import testRockets from "./__fixtures__/rockets.json";

/* 
  PLEASE DO NOT MODIFY THIS FILE
*/

const TEST_ROCKET = {
  flight_number: 99,
  mission_name: "Adjust Mission",
  payloads_count: 4,
};

const TEST_ROCKET_LABEL = `#99 Adjust Mission (4)`;

describe("# RocketItem", () => {
  test("renders formatted rocket correctly", () => {
    render(<RocketItem rocket={TEST_ROCKET} />);

    expect(screen.getByText(TEST_ROCKET_LABEL)).toBeInTheDocument();
  });
});

describe("# RocketsList", () => {
  test("renders LOADING_MESSAGE string while rockets are being loaded", async () => {
    await act(async () => {
      render(<RocketsList />);

      screen.getByText(LOADING_MESSAGE);
    });
  });

  test("renders all rockets", async () => {
    render(<RocketsList />);

    await waitFor(() =>
      screen.getByText(testRockets[0].mission_name, { exact: false })
    );

    testRockets.forEach(({ flight_number, mission_name, payloads_count }) => {
      const rocketLabel = screen.getByText(mission_name, {
        exact: false,
      });

      expect(rocketLabel).toBeInTheDocument();

      expect(
        within(rocketLabel).getByText(flight_number, { exact: false })
      ).toBeInTheDocument();

      expect(
        within(rocketLabel).getByText(payloads_count, { exact: false })
      ).toBeInTheDocument();
    });
  });
});
