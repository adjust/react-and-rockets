import { RocketItem } from "../solutions/3_task";
import { render, screen } from "@testing-library/react";

/* 
  PLEASE DO NOT MODIFY THIS FILE
*/

const TEST_ROCKET = {
  flight_number: 99,
  mission_name: "Adjust Mission",
  payloads_count: 4,
};

const TEST_ROCKET_LABEL = `#99 Adjust Mission (4)`;

describe("RocketItem", () => {
  test("renders formatted rocket correctly", () => {
    render(<RocketItem rocket={TEST_ROCKET} />);

    expect(screen.getByText(TEST_ROCKET_LABEL)).toBeInTheDocument();
  });
});
