import React from "react";
import { createStore } from "redux";
import { render, fireEvent, within } from "../../../../helpers/testUtils";
import { MemoryRouter } from "react-router-dom";
import * as service from "../../service";
import * as Util from "../../../../helpers/utility/checkIfUserHasRole";
import Settings from "../Settings";
import { tempStore } from "./tempStore";
import { cloneDeep } from "lodash";

jest.mock("./../../service");

describe.only("Settings component test", () => {
  test("create Settings components snapshot", () => {
    const store = createStore(() => ({ ...tempStore }));
    const wrapper = render(
      <MemoryRouter initialEntries={["/offers/edit/123"]}>
        <Settings />
      </MemoryRouter>,
      {
        store,
      }
    );
    const { container } = wrapper;
    expect(container.firstChild).toMatchSnapshot();
  });
  test("check Settings offer name with and without data validation", async () => {
    const submitForm = jest.fn();
    const store = createStore(() => ({ ...tempStore }));
    const prev = jest.fn();
    const { getByTestId } = render(
      <MemoryRouter initialEntries={["/offers/edit/123"]}>
        <Settings
          prev={prev}
          submitForm={submitForm}
          isEditFlow={false}
          showAddPropertiesFlow={true}
        />
      </MemoryRouter>,
      {
        store,
      }
    );
    const formSubmit = getByTestId("search-setting-form");
    fireEvent.submit(formSubmit);
    expect(submitForm).toHaveBeenCalledTimes(1);
    const offerName = getByTestId("offer-name");
    expect(offerName.value).toBe("Cypress Offer - Edit");
    fireEvent.change(offerName, { target: { value: "" } });
    fireEvent.submit(formSubmit);
  });

  test("check Settings offer Id with and without data validation", async () => {
    const submitForm = jest.fn();
    const store = createStore(() => ({ ...tempStore }));
    const prev = jest.fn();
    const { getByTestId, queryByTestId } = render(
      <MemoryRouter initialEntries={["/offers/edit/123"]}>
        <Settings
          prev={prev}
          submitForm={submitForm}
          isEditFlow={true}
          showAddPropertiesFlow={true}
        />
      </MemoryRouter>,
      {
        store,
      }
    );
    const formSubmit = getByTestId("search-setting-form");
    fireEvent.submit(formSubmit);
    expect(submitForm).toHaveBeenCalledTimes(1);
    // as offer id is present in url
    const offerId = getByTestId("offer-id-display-field");
    expect(offerId).toBeInTheDocument(); // as per store data
    expect(queryByTestId("settings-offer-id")).not.toBeInTheDocument();
  });

  test("check Settings offer Id input field when create new offer flow", async () => {
    const submitForm = jest.fn();
    const store = createStore(() => ({ ...tempStore }));
    const prev = jest.fn();
    const { getByTestId, queryByTestId } = render(
      <MemoryRouter initialEntries={["offers/create-new-offer/3"]}>
        <Settings
          prev={prev}
          submitForm={submitForm}
          isEditFlow={true}
          showAddPropertiesFlow={true}
        />
      </MemoryRouter>,
      {
        store,
      }
    );
    const formSubmit = getByTestId("search-setting-form");
    fireEvent.submit(formSubmit);
    expect(submitForm).toHaveBeenCalledTimes(1);
    // as offer id is present in url
    const offerInput = getByTestId("settings-offer-id");
    expect(offerInput).toBeInTheDocument(); // as per store data
    expect(queryByTestId("offer-id-display-field")).not.toBeInTheDocument();

    // change value and check validation for offer id
    fireEvent.change(offerInput, { target: { value: "1234" } });
    expect(offerInput.value).toBe("1234");
    //TODO update error message
    // expect(queryByText("Error message")).not.toBeInTheDocument();

    //  mocking delete api when validate offer
    service.validateOfferId.mockImplementation((data) => {
      return Promise.resolve({
        success: true,
      });
    });
    expect(service.validateOfferId).toHaveBeenCalledTimes(1);
  });

  test("check Settings target data if not provided", async () => {
    const submitForm = jest.fn();
    const settingsStore = {
      ...tempStore,
    };
    settingsStore.brands = [];
    const store = createStore(() => ({ ...settingsStore }));
    const prev = jest.fn();
    const { getByTestId, getByText } = render(
      <MemoryRouter initialEntries={["/offers/edit/123"]}>
        <Settings
          prev={prev}
          submitForm={submitForm}
          isEditFlow={false}
          showAddPropertiesFlow={true}
        />
      </MemoryRouter>,
      {
        store,
      }
    );
    const formSubmit = getByTestId("search-setting-form");
    fireEvent.submit(formSubmit);
    expect(submitForm).toHaveBeenCalledTimes(1);
    expect(getByText("No clients found")).toBeInTheDocument();
    expect(getByText("Add client")).toBeInTheDocument();
  });

  test("check Settings in Edit offer flow, based on cart data, empty msg displayed and include all properties flag is disabled", async () => {
    const submitForm = jest.fn();
    const settingsStore = cloneDeep(tempStore);

    settingsStore.propertycart.cartItems = [];

    const store = createStore(() => ({ ...settingsStore }));

    const prev = jest.fn();
    const { getByText, getByTestId } = render(
      <MemoryRouter initialEntries={["/offers/edit/123"]}>
        <Settings
          prev={prev}
          submitForm={submitForm}
          isEditFlow={true}
          showAddPropertiesFlow={true}
        />
      </MemoryRouter>,
      {
        store,
      }
    );
    expect(getByText("No Data")).toBeInTheDocument();
    expect(getByTestId("include-all-properties-settings")).toBeDisabled();
  });
  test("check Settings in create offer flow, based on cart data, empty msg displayed and include all properties flag is disabled", async () => {
    const submitForm = jest.fn();
    const settingsStore = cloneDeep(tempStore);
    settingsStore.propertycart.cartItems = [];
    const store = createStore(() => ({ ...settingsStore }));
    const prev = jest.fn();
    const { getByText, getByTestId } = render(
      <MemoryRouter initialEntries={["offers/create-new-offer/3"]}>
        <Settings
          prev={prev}
          submitForm={submitForm}
          isEditFlow={true}
          showAddPropertiesFlow={true}
        />
      </MemoryRouter>,
      {
        store,
      }
    );
    expect(getByText("No Data")).toBeInTheDocument();
    expect(getByTestId("include-all-properties-settings")).toBeDisabled();
  });
  test("check Settings in Edit offer flow, based on cart data, cart list displayed and include all properties flag is enabled", async () => {
    const submitForm = jest.fn();
    const store = createStore(() => ({ ...tempStore }));

    const prev = jest.fn();
    const { getByTestId, queryByText } = render(
      <MemoryRouter initialEntries={["/offers/edit/123"]}>
        <Settings
          prev={prev}
          submitForm={submitForm}
          isEditFlow={true}
          showAddPropertiesFlow={true}
        />
      </MemoryRouter>,
      {
        store,
      }
    );

    expect(queryByText("No Data")).not.toBeInTheDocument();
    expect(getByTestId("property-list-table")).toBeInTheDocument();
    expect(getByTestId("include-all-properties-settings")).not.toBeDisabled();
  });

  test("check Settings in create offer flow, based on cart data, cart list displayed and type is PROD", async () => {
    const submitForm = jest.fn();
    const myStore = cloneDeep(tempStore);
    myStore.searchparams = {
      ...myStore.searchparams,
      type : 'PROD',
    }
    myStore.propertycart.cartItems[0] = {
      ...myStore.propertycart.cartItems[0],
      type : 'PROD',
    };
    myStore.newoffersettingsparam = {
      ...myStore.newoffersettingsparam,
      type: 'PROD'
    }
    const checkIfUserHasRole = jest.spyOn(Util, "checkIfUserHasRole");
    checkIfUserHasRole.mockReturnValue(true);
    const store = createStore(() => ({ ...myStore }));

    const prev = jest.fn();
    const { getByTestId } = render(
      <MemoryRouter initialEntries={["offers/create-new-offer/3"]}>
        <Settings
          prev={prev}
          submitForm={submitForm}
          isEditFlow={true}
          showAddPropertiesFlow={true}
        />
      </MemoryRouter>,
      {
        store,
      }
    );
    const { getByText } = within(getByTestId('offer-type'))
    expect(getByText('PROD')).toBeInTheDocument()
  });

  test("check Settings in create offer flow, based on cart data, cart list displayed and type is DEMO", async () => {
    const submitForm = jest.fn();
    const myStore = cloneDeep(tempStore);
    myStore.searchparams = {
      ...myStore.searchparams,
      type : 'DEMO',
    }
    myStore.propertycart.cartItems[0] = {
      ...myStore.propertycart.cartItems[0],
      type : 'DEMO',
    };
    myStore.newoffersettingsparam = {
      ...myStore.newoffersettingsparam,
      type: 'DEMO'
    }
    const checkIfUserHasRole = jest.spyOn(Util, "checkIfUserHasRole");
    checkIfUserHasRole.mockReturnValue(true);
    const store = createStore(() => ({ ...myStore }));

    const prev = jest.fn();
    const { getByTestId } = render(
      <MemoryRouter initialEntries={["offers/create-new-offer/3"]}>
        <Settings
          prev={prev}
          submitForm={submitForm}
          isEditFlow={true}
          showAddPropertiesFlow={true}
        />
      </MemoryRouter>,
      {
        store,
      }
    );
    const { getByText } = within(getByTestId('offer-type'))
    expect(getByText('DEMO')).toBeInTheDocument()
  });

  test("check Settings in create offer flow, based on cart data, cart list is empty and type is PROD", async () => {
    const submitForm = jest.fn();
    const myStore = cloneDeep(tempStore);
    myStore.searchparams = {
      ...myStore.searchparams,
      type : 'ALL',
    }
    myStore.propertycart.cartItems = [];
    myStore.newoffersettingsparam = {
      ...myStore.newoffersettingsparam,
      type: 'DEMO'
    }
    const checkIfUserHasRole = jest.spyOn(Util, "checkIfUserHasRole");
    checkIfUserHasRole.mockReturnValue(true);
    const store = createStore(() => ({ ...myStore }));

    const prev = jest.fn();
    const { getByTestId } = render(
      <MemoryRouter initialEntries={["offers/create-new-offer/3"]}>
        <Settings
          prev={prev}
          submitForm={submitForm}
          isEditFlow={true}
          showAddPropertiesFlow={true}
        />
      </MemoryRouter>,
      {
        store,
      }
    );
    const { getByText } = within(getByTestId('offer-type'))
    expect(getByText('DEMO')).toBeInTheDocument()
  });

  test("check Settings in EDIT offer flow, based on cart data, cart list is with prod property and type is PROD", async () => {
    const submitForm = jest.fn();
    const myStore = cloneDeep(tempStore);
    myStore.searchparams = {
      ...myStore.searchparams,
      type : 'ALL',
    }
    myStore.propertycart.cartItems[0] = {
      ...myStore.propertycart.cartItems[0],
      type : 'PROD',
    };
    myStore.newoffersettingsparam = {
      ...myStore.newoffersettingsparam,
      type: 'PROD'
    }
    const checkIfUserHasRole = jest.spyOn(Util, "checkIfUserHasRole");
    checkIfUserHasRole.mockReturnValue(true);
    const store = createStore(() => ({ ...myStore }));

    const prev = jest.fn();
    const { getByTestId } = render(
      <MemoryRouter initialEntries={["/offers/edit/123"]}>
        <Settings
          prev={prev}
          submitForm={submitForm}
          isEditFlow={true}
          showAddPropertiesFlow={true}
        />
      </MemoryRouter>,
      {
        store,
      }
    );
    const { getByText } = within(getByTestId('offer-type'))
    expect(getByText('PROD')).toBeInTheDocument()
  });

  test("check Settings in EDIT offer flow, based on cart data, cart list is with demo property and type is DEMO", async () => {
    const submitForm = jest.fn();
    const myStore = cloneDeep(tempStore);
    myStore.searchparams = {
      ...myStore.searchparams,
      type : 'ALL',
    }
    myStore.propertycart.cartItems[0] = {
      ...myStore.propertycart.cartItems[0],
      type : 'DEMO',
    };
    myStore.newoffersettingsparam = {
      ...myStore.newoffersettingsparam,
      type: 'DEMO'
    }
    const store = createStore(() => ({ ...myStore }));
    const checkIfUserHasRole = jest.spyOn(Util, "checkIfUserHasRole");
    checkIfUserHasRole.mockReturnValue(true);
    const prev = jest.fn();
    const { getByTestId } = render(
      <MemoryRouter initialEntries={["/offers/edit/123"]}>
        <Settings
          prev={prev}
          submitForm={submitForm}
          isEditFlow={true}
          showAddPropertiesFlow={true}
        />
      </MemoryRouter>,
      {
        store,
      }
    );
    const { getByText } = within(getByTestId('offer-type'))
    expect(getByText('DEMO')).toBeInTheDocument()
  });

  test("check Settings in EDIT offer flow, based on cart data, cart list is with demo property and status is UNPUBLISHED", async () => {
    const submitForm = jest.fn();
    const myStore = cloneDeep(tempStore);
    myStore.searchparams = {
      ...myStore.searchparams,
      type : 'ALL',
    }
    myStore.propertycart.cartItems[0] = {
      ...myStore.propertycart.cartItems[0],
      type : 'DEMO',
    };
    myStore.newoffersettingsparam = {
      ...myStore.newoffersettingsparam,
      type: 'DEMO'
    }
    const checkIfUserHasRole = jest.spyOn(Util, "checkIfUserHasRole");
    checkIfUserHasRole.mockReturnValue(true);
    const store = createStore(() => ({ ...myStore }));

    const prev = jest.fn();
    const { getByTestId, queryByText } = render(
      <MemoryRouter initialEntries={["/offers/edit/123"]}>
        <Settings
          prev={prev}
          submitForm={submitForm}
          isEditFlow={true}
          showAddPropertiesFlow={true}
        />
      </MemoryRouter>,
      {
        store,
      }
    );
    const { getByText } = within(getByTestId('offer-type'));
    expect(getByText('DEMO')).toBeInTheDocument()
    expect(queryByText(/UNPUBLISHED/i)).toBeInTheDocument();
    expect(queryByText("PUBLISHED")).not.toBeInTheDocument();
  });

  test("check Settings in Create offer flow, based on cart data, cart list is with demo property and status is UNPUBLISHED", async () => {
    const submitForm = jest.fn();
    const myStore = cloneDeep(tempStore);
    myStore.searchparams = {
      ...myStore.searchparams,
      type : 'ALL',
    }
    myStore.propertycart.cartItems[0] = {
      ...myStore.propertycart.cartItems[0],
      type : 'PROD',
    };
    myStore.newoffersettingsparam = {
      ...myStore.newoffersettingsparam,
      type: 'PROD'
    }
    const checkIfUserHasRole = jest.spyOn(Util, "checkIfUserHasRole");
    checkIfUserHasRole.mockReturnValue(true);
    const store = createStore(() => ({ ...myStore }));

    const prev = jest.fn();
    const { getByTestId, queryByText } = render(
      <MemoryRouter initialEntries={["offers/create-new-offer/3"]}>
        <Settings
          prev={prev}
          submitForm={submitForm}
          isEditFlow={true}
          showAddPropertiesFlow={true}
        />
      </MemoryRouter>,
      {
        store,
      }
    );
    const { getByText } = within(getByTestId('offer-type'))
    expect(getByText('PROD')).toBeInTheDocument()
    expect(queryByText(/UNPUBLISHED/i)).toBeInTheDocument();
    expect(queryByText("PUBLISHED")).not.toBeInTheDocument();
  });

  test("check Settings in Create offer flow, if user is other than admin, then offer type is not displayed", async () => {
    const submitForm = jest.fn();
    const myStore = cloneDeep(tempStore);
    myStore.searchparams = {
      ...myStore.searchparams,
      type : 'ALL',
    }
    myStore.propertycart.cartItems[0] = {
      ...myStore.propertycart.cartItems[0],
      type : 'PROD',
    };
    myStore.newoffersettingsparam = {
      ...myStore.newoffersettingsparam,
      type: 'PROD'
    }
    const checkIfUserHasRole = jest.spyOn(Util, "checkIfUserHasRole");
    checkIfUserHasRole.mockReturnValue(false);
    const store = createStore(() => ({ ...myStore }));

    const prev = jest.fn();
    const { queryByTestId } = render(
      <MemoryRouter initialEntries={["offers/create-new-offer/3"]}>
        <Settings
          prev={prev}
          submitForm={submitForm}
          isEditFlow={true}
          showAddPropertiesFlow={true}
        />
      </MemoryRouter>,
      {
        store,
      }
    );
    expect(queryByTestId("offer-type")).not.toBeInTheDocument();
  });
});
