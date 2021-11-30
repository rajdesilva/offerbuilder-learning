import React, { Fragment, useState } from "react";
import { Row, Col, Button, Tabs, Divider, Skeleton, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { FormattedMessage, useIntl } from "react-intl";
import Settings from "./Settings";
import Marketing from "./Marketing";

import {
  checkIfTravellingDateValidAsPerBookingDate,
  createOfferRequestObject,
  resetApplicationReduxAndStorage,
} from "../../../helpers/utility";
import { Loader } from "../../../common";
import { saveEditedOffer } from "../service";
import { marketingActions, newOfferActions } from "../actions";
import { history } from "../../../helpers";
import { SearchResultContainer } from "../../browseSupply/components";

const { TabPane } = Tabs;

function OfferEdit() {
  const intl = useIntl();
  const [editOfferLoading, setEditOfferLoading] = useState(false);
  const [displayAddProperties, setDisplayAddProperties] = useState(false);

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => ({
    loading: window.getValue(state, "offerlist.fetchingOfferDetails"),
  }));

  let offerSettingsForm = null;
  let offerMarketingForm = null;
  let offerPropertyMarketingForm = null;
  const validateEditedForm = () => {
    offerSettingsForm
      .validateFields()
      .then((formValuesSettings) => {
        dispatch({
          type: newOfferActions.NEW_OFFER_DEEPLINK_INCLUDE_ALL_PROPERTIES,
          payload: formValuesSettings.deepLinkSettingsInfo.includeAllProperties,
        });

        if (
          !checkIfTravellingDateValidAsPerBookingDate(
            formValuesSettings.travellingDateRange,
            formValuesSettings.bookingDateRange
          )
        ) {
          message.error(
            intl.formatMessage({
              id: "nemo.travellingDateShouldStartOnOrAfterBookingDate",
            })
          );
          return;
        }

        offerMarketingForm
          .validateFields()
          .then((formValuesOfferMarketing) => {
            dispatch({
              type: marketingActions.SET_OFFER_IMAGE_ARRAY,
              payload: formValuesOfferMarketing.images,
            });
            offerPropertyMarketingForm
              .validateFields()
              .then((formValuesPropertyMarketing) => {
                setEditOfferLoading(true);
                saveEditedOffer(createOfferRequestObject()).then((response) => {
                  if (window.getValue(response, "success")) {
                    launchHomePage();
                  } else {
                    setEditOfferLoading(false);
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
              .catch((errorInfo) => {
                console.error(errorInfo);
              });
          })
          .catch((errorInfo) => {
            console.error(errorInfo);
          });
      })
      .catch((errorInfo) => {
        console.error(errorInfo);
      });
  };

  const launchHomePage = async () => {
    await resetApplicationReduxAndStorage();
    setEditOfferLoading(false);
    history.push({ pathname: "/", state: { saved: true } });
  };

  const showAddPropertiesFlow = () => {
    setDisplayAddProperties(true);
  };

  const finishAddPropertiesFlow = () => {
    setDisplayAddProperties(false);
  };

  return (
    <Loader spinning={editOfferLoading}>
      <Fragment>
        {displayAddProperties ? (
          <SearchResultContainer
            isEditFlow={true}
            showAddPropertiesFlow={showAddPropertiesFlow}
            finishAddPropertiesFlow={finishAddPropertiesFlow}
          />
        ) : (
          <div className="wrapper">
            <Row justify="space-between">
              <Col>
                <h2>
                  <FormattedMessage id="nemo.offerDetails" />
                </h2>
              </Col>
              <Col>
                <Button
                  data-testid="cancel-edit-offers-btn"
                  type="primary"
                  ghost
                  size="large"
                  className="cancel-save-view-btn"
                  onClick={() => history.push("/")}
                >
                  <FormattedMessage id="nemo.cancel" />
                </Button>
                <Button
                  data-testid="save-edit-offers-btn"
                  type="primary"
                  size="large"
                  onClick={validateEditedForm}
                >
                  <FormattedMessage id="nemo.save" />
                </Button>
              </Col>
            </Row>
            <Divider />
            <Skeleton loading={loading} active>
              <Tabs defaultActiveKey="settings">
                <TabPane
                  tab={intl.formatMessage({
                    id: "nemo.settings",
                  })}
                  key="settings"
                  forceRender
                >
                  <Settings
                    submitForm={(form) => (offerSettingsForm = form)}
                    isEditFlow={true}
                    showAddPropertiesFlow={showAddPropertiesFlow}
                    finishAddPropertiesFlow={finishAddPropertiesFlow}
                  />
                </TabPane>
                <TabPane
                  tab={intl.formatMessage({
                    id: "nemo.marketing",
                  })}
                  key="marketing"
                  forceRender
                >
                  <Marketing
                    submitForm={(form1, form2) => {
                      offerMarketingForm = form1;
                      offerPropertyMarketingForm = form2;
                    }}
                  />
                </TabPane>
              </Tabs>
            </Skeleton>
          </div>
        )}
      </Fragment>
    </Loader>
  );
}

export default OfferEdit;
