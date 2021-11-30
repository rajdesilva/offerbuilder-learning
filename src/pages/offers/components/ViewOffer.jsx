import React, { Fragment } from "react";
import { Row, Col, Button, Tabs, Divider, Skeleton } from "antd";
import { useSelector } from "react-redux";
import { FormattedMessage, useIntl } from "react-intl";
import { Link } from "react-router-dom";
import { checkIfUserHasRole } from "../../../helpers/utility";
import { history } from "../../../helpers";
import ViewSettings from "./ViewSettings";
import ViewMarketing from "./ViewMarketing";
import { appConstants } from "../../../common";

const { TabPane } = Tabs;

function ViewOffer() {
  const intl = useIntl();
  const { loading } = useSelector((state) => ({
    loading: window.getValue(state, "offerlist.fetchingOfferDetails"),
  }));
  const newoffersettingsparam = useSelector((state) => ({
    newoffersettingsparam: window.getValue(state, "newoffersettingsparam"),
  }));

  return (
    <Fragment>
      <div className="wrapper">
        <Row justify="space-between">
          <Col>
            <h2>
              <FormattedMessage id="nemo.offerDetails" />
            </h2>
          </Col>
          <Col>
            <Button
              data-testid="view-close-view-offers-btn"
              type="primary"
              ghost
              size="large"
              className="cancel-save-view-btn"
              onClick={() => history.push("/")}
            >
              <FormattedMessage id="nemo.cancel" />
            </Button>
            {window.getValue(
              newoffersettingsparam,
              "newoffersettingsparam.status.id"
            ) !== appConstants.OFFER_STATUS.ARCHIVED ? (
              <Button
                data-testid="view-display-edit-offers-btn"
                type="primary"
                disabled={checkIfUserHasRole(appConstants.USER_ROLE.VIEWER)}
                size="large"
              >
                <Link
                  to={{
                    pathname:
                      "/offers/edit/" +
                      window.getValue(
                        newoffersettingsparam,
                        "newoffersettingsparam.offerId"
                      ),
                  }}
                >
                  <FormattedMessage id="nemo.edit" />
                </Link>
              </Button>
            ) : (
              <Fragment />
            )}
          </Col>
        </Row>
        <Divider />
        <Skeleton loading={loading} active>
          <Tabs defaultActiveKey="settings">
            <TabPane
              tab={intl.formatMessage({
                id: "nemo.settings",
              })}
              key="view-settings"
              forceRender
            >
              <ViewSettings />
            </TabPane>
            <TabPane
              tab={intl.formatMessage({
                id: "nemo.marketing",
              })}
              key="view-marketing"
              forceRender
            >
              <ViewMarketing />
            </TabPane>
          </Tabs>
        </Skeleton>
      </div>
    </Fragment>
  );
}

export default ViewOffer;
