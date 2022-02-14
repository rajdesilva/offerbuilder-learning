import React from "react";
import NemoSelect from "../NemoSelect";

import { render, cleanup } from "../../../helpers/testUtils";

afterEach(cleanup);

describe("NemoSelect component test cases", () => {
  test("NemoSelect components snapshot", () => {
    const props = {
      onChange: jest.fn(),
    };
    const { container } = render(<NemoSelect {...props} />);
    expect(container.firstChild).toMatchSnapshot();
  });
  test("default value of nemoselect", () => {
    const props = {
      onChange: jest.fn(),
      defaultValue: "NTP",
    };
    const { queryByText, getByText } = render(<NemoSelect {...props} />);
    expect(queryByText("Please Select")).not.toBeInTheDocument();
    expect(getByText("NTP")).toBeInTheDocument();
  });
  test("pass options and  default value empty", () => {
    const props = {
      defaultValue: "",
      optionsList: [
        {
          id: "brand",
          name: "internal brand",
        },
      ],
    };
    const { queryByText } = render(<NemoSelect {...props} />);

    expect(queryByText("Please Select")).toBeInTheDocument();
  });
  test("pass options and value empty", () => {
    const props = {
      defaultValue: "",
      optionsList: [
        {
          id: "brand",
          name: "internal brand",
        },
      ],
    };
    const { queryByText } = render(<NemoSelect {...props} />);

    expect(queryByText("Please Select")).toBeInTheDocument();
  });
  test("pass options and default value as an object", () => {
    const props = {
      defaultValue: {
        id: "brand",
        name: "internal brand",
      },
      optionsList: [
        {
          id: "brand",
          name: "internal brand",
        },
      ],
    };
    const { queryByText } = render(<NemoSelect {...props} />);

    expect(queryByText("internal brand")).toBeInTheDocument();
  });
  test("pass options and default value as an array", () => {
    const props = {
      defaultValue: [
        {
          id: "brand",
          name: "internal brand",
        },
      ],
      optionsList: [
        {
          id: "brand",
          name: "internal brand",
        },
      ],
    };
    const { queryByText } = render(<NemoSelect {...props} />);

    expect(queryByText("internal brand")).toBeInTheDocument();
  });
  test("pass options having conditional id and default value as an object", () => {
    const props = {
      id: "brw-search-channel",
      defaultValue: [
        {
          id: "brand",
          name: "internal brand",
          channels: ["abc"],
        },
      ],
      optionsList: [
        {
          id: "brand",
          name: "internal brand",
        },
      ],
    };
    const { queryByText } = render(<NemoSelect {...props} />);

    expect(queryByText("internal brand (brand)")).toBeInTheDocument();
  });
  test("pass options having name is empty (channel use-case) default value as an object", () => {
    const props = {
      defaultValue: [
        {
          id: "AT_CORDIAL",
          name: "",
        },
      ],
      optionsList: [
        {
          id: "AT_CORDIAL",
          name: "",
        },
      ],
    };
    const { queryByText } = render(<NemoSelect {...props} />);

    expect(queryByText("AT_CORDIAL")).toBeInTheDocument();
  });
  test("pass options having name is empty (channel use-case), default value as an string", () => {
    const props = {
      defaultValue: [
        JSON.stringify({
          id: "AT_CORDIAL",
          name: "",
        }),
      ],
      optionsList: [
        {
          id: "AT_CORDIAL",
          name: "",
        },
      ],
    };
    const { queryByText } = render(<NemoSelect {...props} />);

    expect(queryByText("AT_CORDIAL")).toBeInTheDocument();
  });
  test("pass options having name is empty (channel use-case), default value as an array of strings", () => {
    const props = {
      mode: "multiple",
      defaultValue: [
        JSON.stringify({
          id: "AT_CORDIAL",
          name: "",
        }),
        JSON.stringify({
          id: "OFFER_DIGI",
          name: "Offer Builder",
        }),
      ],
      optionsList: [
        {
          id: "AT_CORDIAL",
          name: "",
        },
        {
          id: "OFFER_DIGI",
          name: "Offer Builder",
        },
      ],
    };
    const { queryByText } = render(<NemoSelect {...props} />);

    expect(queryByText("AT_CORDIAL")).toBeInTheDocument();
    expect(queryByText("Offer Builder")).toBeInTheDocument();
  });
});
