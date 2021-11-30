import React, { Fragment, useCallback, useMemo, useState } from "react";
import { Steps, Button, Divider, Row, Col, message } from "antd";
import {
  SearchSettings,
  PropertyCartList,
  SearchResultContainer,
} from "../../browseSupply/components/";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useRouteMatch } from "react-router-dom";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import Settings from "./Settings";
import { newOfferActions } from "../actions";
import Marketing from "./Marketing";
import {
  checkIfTravellingDateValidAsPerBookingDate,
  createOfferRequestObject,
  createSearchQueryURL,
  resetApplicationReduxAndStorage,
  updateSettingsBrandWithSearchedValues,
} from "../../../helpers/utility";
import { history } from "../../../helpers";
import { FormattedMessage, useIntl } from "react-intl";
import { createNewOffer } from "../service";
import { Loader } from "../../../common";
import styles from "./css/CreateNewOffer.module.less";
import { getOfferTypeFromPropertiesSelected } from "../../../helpers/utility/getOfferTypeFromPropertiesSelected";

let forms = {
  step_1_form: null,
  step_3_form: null,
  step_4_1_form: null,
  step_4_2_form: null,
};
const { Step } = Steps;
function CreateNewOffer() {
  const intl = useIntl();
  const searchParams = useSelector((state) =>
    window.getValue(state, "searchparams")
  );
  const brands = useSelector((state) =>
    window.getValue(state, "newoffersettingsparam.brands")
  );
  const searchedBrands = useSelector((state) =>
    window.getValue(state, "searchedproperties.searchedBrands")
  );
  const pageDetails = useRouteMatch({
    path: "/offers/create-new-offer/:step?",
    strict: true,
    sensitive: true,
  });
  const dispatch = useDispatch();
  const [newOfferLoading, setNewOfferLoading] = useState(false);
  const { step } = useParams();
  const [current, setCurrent] = useState(step && step > 0 ? step - 1 : 0);
  const next = () => {
    // search result page 2nd step
    if (current === 1) {
      if (brands && brands.length > 0) {
        if (searchedBrands && searchedBrands.length > 0) {
          // update brands
          dispatch({
            type: newOfferActions.INITIAL_ADD_BRANDS,
            payload: updateSettingsBrandWithSearchedValues(),
          });
        }
      } else {
        // add brands in newoffer redux object for first time
        dispatch({
          type: newOfferActions.INITIAL_ADD_BRANDS,
          payload: searchParams.brands,
        });
      }
      history.push("/offers/create-new-offer/3");
      dispatch({
        type: newOfferActions.NEW_OFFER_SET_OFFER_PROPERTY_TYPE,
        payload: getOfferTypeFromPropertiesSelected(),
      });
      setCurrent(current + 1);
      // added condition for search forms at 0th step & settings form at 2nd step
    } else if (current % 2 === 0) {
      forms[`step_${current + 1}_form`]
        .validateFields()
        .then((formValues) => {
          if (current === 0) {
            createSearchQueryURL(`/offers/create-new-offer/${current + 2}`);
            setCurrent(current + 1);
          } else {
            dispatch({
              type: newOfferActions.NEW_OFFER_DEEPLINK_INCLUDE_ALL_PROPERTIES,
              payload: formValues.deepLinkSettingsInfo.includeAllProperties,
            });
            // check for valid travelling date
            if (
              checkIfTravellingDateValidAsPerBookingDate(
                formValues.travellingDateRange,
                formValues.bookingDateRange
              )
            ) {
              history.push("/offers/create-new-offer/4");
              setCurrent(current + 1);
            } else {
              message.error(
                intl.formatMessage({
                  id: "nemo.travellingDateShouldStartOnOrAfterBookingDate",
                })
              );
              return;
            }
          }
        })
        .catch((errorInfo) => {
          console.error("error12345 =", errorInfo, errorInfo.errorFields[0]);
        });
    } else if (current === 3) {
      forms["step_4_1_form"]
        .validateFields()
        .then((formValues) => {
          forms["step_4_2_form"]
            .validateFields()
            .then((form2Values) => {
              setNewOfferLoading(true);
              createNewOffer(createOfferRequestObject()).then((response) => {
                if (window.getValue(response, "success")) {
                  setNewOfferLoading(false);
                  history.push("/offers/offer-created/" + response.data.id);
                } else {
                  setNewOfferLoading(false);
                  if (window.getValue(response, "error.message")) {
                    message.error(window.getValue(response, "error.message"));
                  } else {
                    message.error(
                      intl.formatMessage({
                        id: "nemo.failedToCreatedNewOfferPleaseTryAgain",
                      })
                    );
                  }
                }
              });
            })
            .catch((error) => {
              console.log("step_4_2_form form error", error);
              message.error(
                intl.formatMessage({
                  id: "nemo.makeSureToFillAllFieldsForProperties",
                })
              );
            });
        })
        .catch((error) => {
          console.log("step_4_1_form form error", error);
          message.error(
            intl.formatMessage({
              id: "nemo.makeSureToFillAllFieldsForOffer",
            })
          );
        });
    }
  };

  const prev = useCallback(() => {
    setCurrent(current > 0 ? current - 1 : 0);
    history.goBack();
    if (current === 1) {
      createSearchQueryURL("/offers/create-new-offer", true);
    } else if (current === 2) {
      createSearchQueryURL("/offers/create-new-offer/2", true);
    }
  }, [current]);

  const steps = useMemo(
    () => [
      {
        title: <FormattedMessage id="nemo.propertySearch" />,
        content: (
          <div className="wrapper">
            <SearchSettings submitForm={(form) => (forms.step_1_form = form)} />
          </div>
        ),
      },
      {
        title: <FormattedMessage id="nemo.propertySelection" />,
        content: <SearchResultContainer prev={prev} />,
      },
      {
        title: <FormattedMessage id="nemo.settings" />,
        content: (
          <Settings
            submitForm={(form) => (forms.step_3_form = form)}
            prev={prev}
          />
        ),
      },
      {
        title: <FormattedMessage id="nemo.marketing" />,
        content: (
          <Marketing
            submitForm={(form1, form2) => {
              forms.step_4_1_form = form1;
              forms.step_4_2_form = form2;
            }}
          />
        ),
      },
    ],
    [prev]
  );

  return (
    <Fragment>
      <Loader spinning={newOfferLoading}>
        <div>
          <Row justify="space-between">
            <Col>
              <h2 datatest-id="">
                <FormattedMessage id="nemo.creatingNewOffer" />
              </h2>
            </Col>
            <Col>
              {window.getValue(pageDetails, "params.step") === "2" ||
              window.getValue(pageDetails, "params.step") === "3" ? (
                <div className={styles["ml-auto"]}>
                  <PropertyCartList next={next} />
                </div>
              ) : (
                <Fragment />
              )}
            </Col>
          </Row>
          <Divider className={styles["divider-above-component"]} />
          <Steps current={current}>
            {steps.map((item) => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
          <Divider className={styles["divider-below-component"]} />
          {/* {offerSuccess ? (
          <OfferCreatedSuccess offedId={offerIdCreated} />
        ) : ( */}
          <div>{steps[current].content}</div>
          {/* )} */}
        </div>
      </Loader>
      <div className={styles["footer"]}>
        <div className={styles["footer-btns"]}>
          <Button
            data-testid="cancel-footer-btn"
            size="large"
            type="primary"
            ghost
            className={styles["footer-cancel-btn"]}
            onClick={resetApplicationReduxAndStorage}
          >
            <Link to="/">
              <FormattedMessage id="nemo.cancel" />
            </Link>
          </Button>
          {current > 0 ? (
            <Button
              data-testid="prev-step-btn"
              icon={<LeftOutlined 
                className={styles.leftIcon} />}
              size="large"
              type="primary"
              ghost
              className={styles["footer-previous-btn"]}
              onClick={prev}
            >
              &nbsp;
              <FormattedMessage id="nemo.previousStep" />
            </Button>
          ) : null}

          {current <= steps.length - 1 ? (
            <Button
              data-testid="create-offer-and-next-step-footer-btn"
              size="large"
              type="primary"
              loading={newOfferLoading}
              onClick={next}
              className={
                current > 0
                  ? styles["footer-next-btn-first-step"]
                  : styles["footer-next-btn-other-step"]
              }
            >
              &nbsp;
              {current === 3 ? (
                <FormattedMessage id="nemo.createOffer" />
              ) : (
                <Fragment>
                  <FormattedMessage id="nemo.nextStep" />
                  <RightOutlined 
                  className={styles.leftIcon} />
                </Fragment>
              )}
            </Button>
          ) : null}
        </div>
      </div>
    </Fragment>
  );
}

export default CreateNewOffer;
