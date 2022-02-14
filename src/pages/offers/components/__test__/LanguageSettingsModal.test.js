import React from "react";
import { createStore } from "redux";
import { render, fireEvent } from "../../../../helpers/testUtils";
import { MemoryRouter } from "react-router-dom";
import LanguageSettingsModal from "../LanguageSettingsModal";
import { tempStore } from "./tempStore";

describe("LanguageSettingsModal component test", () => {
  test("create LanguageSettingsModal components snapshot", () => {
    const store = createStore(() => ({ ...tempStore }));
    const wrapper = render(
      <MemoryRouter>
        <LanguageSettingsModal hideModal={() => {}} />
      </MemoryRouter>,
      {
        store,
      }
    );
    const { container } = wrapper;
    expect(container.firstChild).toMatchSnapshot();
  });

  test("LanguageSettingsModal >> Click on OK", () => {
    const store = createStore(() => ({ ...tempStore }));
    const hideModal = jest.fn();
    const { getByText, queryByTestId } = render(
      <MemoryRouter>
        <LanguageSettingsModal hideModal={hideModal} />
      </MemoryRouter>,
      {
        store,
      }
    );
    expect(queryByTestId("language-loader")).not.toBeInTheDocument();
    const okBtn = getByText("OK");
    fireEvent.click(okBtn);
    expect(hideModal).toHaveBeenCalledTimes(1);
  });
  test("LanguageSettingsModal >> Click on Cancel", () => {
    const store = createStore(() => ({ ...tempStore }));
    const hideModal = jest.fn();
    const { getByText } = render(
      <MemoryRouter>
        <LanguageSettingsModal hideModal={hideModal} />
      </MemoryRouter>,
      {
        store,
      }
    );
    const cancelBtn = getByText("Cancel");
    fireEvent.click(cancelBtn);
    expect(hideModal).toHaveBeenCalledTimes(1);
  });
  test("LanguageSettingsModal >> Check if other checkboxs are disabled if 4 langs are selected", () => {
    const langStore = { ...tempStore };
    langStore.newoffermarketinginfo.selectedLanguages = [
      {
        id: "EN",
        name: "English",
      },
      {
        id: "ES",
        name: "Spanish",
      },
      {
        id: "FR",
        name: "French",
      },
      {
        id: "EL",
        name: "Greek",
      },
    ];
    const store = createStore(() => ({ ...langStore }));
    const hideModal = jest.fn();
    const { getByText } = render(
      <MemoryRouter>
        <LanguageSettingsModal hideModal={hideModal} />
      </MemoryRouter>,
      {
        store,
      }
    );
    const cancelBtn = getByText("Cancel");
    fireEvent.click(cancelBtn);
    expect(hideModal).toHaveBeenCalledTimes(1);
  });
});
