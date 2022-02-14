import React from "react";
import { createStore } from "redux";
import { render, fireEvent } from "../../../../helpers/testUtils";
import { MemoryRouter } from "react-router-dom";
import Marketing from "../Marketing";

import { tempStore } from "./tempStore";

describe("Marketing component test", () => {
  test("create Marketing components snapshot", () => {
    const store = createStore(() => ({ ...tempStore }));
    const submitForm = jest.fn();
    const wrapper = render(
      <MemoryRouter>
        <Marketing submitForm={submitForm} />
      </MemoryRouter>,
      {
        store,
      }
    );
    const { container } = wrapper;
    expect(container.firstChild).toMatchSnapshot();
  });
  test("check Marketing components modal", () => {
    const store = createStore(() => ({ ...tempStore }));
    let forms = {
      step_1_form: null,
      step_3_form: null,
      step_4_1_form: null,
      step_4_2_form: null,
    };
    const submitForm = jest.fn();
    const validate = () => ({
      validator(rule, images) {
        if (images && images.length >= 1) {
          return Promise.resolve();
        }
        return Promise.reject("Please upload minimum one file");
      },
    });

    const { getByTestId } = render(
      <MemoryRouter initialEntries={["/offers/create-new-offer/4"]}>
        <Marketing
          submitForm={(form1, form2) => {
            forms.step_4_1_form = form1;
            forms.step_4_2_form = form2;

            submitForm(form1, form2);
          }}
          validate={validate}
        />
      </MemoryRouter>,
      {
        store,
      }
    );
    const showModal = getByTestId("marketing-description-lang-settings-btn");
    fireEvent.click(showModal);
  });
});
