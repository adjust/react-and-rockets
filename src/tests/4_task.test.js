import { RocketsList } from "../solutions/4_task";
import { render, screen, waitFor, within } from "@testing-library/react";
import testRockets from "./__fixtures__/rockets.json";

/* 
  PLEASE DO NOT MODIFY THIS FILE
*/

describe("RocketsList", () => {
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
