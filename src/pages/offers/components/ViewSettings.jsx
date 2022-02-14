import React, { Fragment, useEffect } from "react";
import { Row, Col, Divider, Skeleton } from "antd";
import { useSelector } from "react-redux";
import moment from "moment/min/moment-with-locales";
import { FormattedMessage } from "react-intl";
import ViewDeepLinkSettings from "./ViewDeepLinkSettings";
import ViewTarget from "./ViewTarget";
import { SettingsPropertyList } from "./SettingsPropertyList";
import { isEqual } from "lodash";
import { useRouteMatch } from "react-router";
import { getOfferDetails } from "../service";
import { checkIfUserHasRole } from "../../../helpers/utility";
import { appConstants } from "../../../common";

function ViewSettings() {
  const match = useRouteMatch({
    path: "/offers/view/:offerId?",
    strict: true,
    sensitive: true,
  });
  const loading = useSelector(
    (state) =>
      window.getValue(state, "offerlistsearchandfilters.offerDetailsLoading"),
    isEqual
  );
  const newoffersettingsparam = useSelector(
    (state) => window.getValue(state, "newoffersettingsparam"),
    isEqual
  );
  useEffect(() => {
    if (match) {
      getOfferDetails(window.getValue(match, "params.offerId"));
    }
  }, []);
  return (
    <Skeleton loading={loading} active>
      <Row gutter={[8, 8]}>
        <Col span={4} className="offerid-view-field">
          <FormattedMessage id="nemo.internamName" />
        </Col>
        <Col span={8}>
          <div
            className="offerid-view-field-name"
            data-testid="offer-id-display-field"
          >
            {window.getValue(newoffersettingsparam, "name")}
          </div>
        </Col>
      </Row>

      <Row gutter={[8, 8]}>
        <Col span={4} className="offerid-view-field">
          <FormattedMessage id="nemo.status" />
        </Col>
        <Col span={4}>
          <div
            className="offerid-view-field-name"
            data-testid="offer-id-display-field"
          >
            {window.getValue(newoffersettingsparam, "status.name")}
          </div>
        </Col>
      </Row>

      {checkIfUserHasRole(appConstants.USER_ROLE.ADMIN) ? (
        <Row gutter={[8, 8]}>
          <Col span={4} className="offerid-view-field">
            <FormattedMessage id="nemo.type" />
          </Col>

          <Col span={14}>
            <div className="offerid-view-field-name" data-testid='offer-type'>
              {window.getValue(newoffersettingsparam, "type")}
            </div>
          </Col>
        </Row>
      ) : (
        <Fragment />
      )}

      <Row gutter={[8, 8]}>
        <Col span={4} className="offerid-view-field">
          <FormattedMessage id="nemo.offerID" />
        </Col>

        <Col span={6}>
          <div
            className="offerid-view-field-name"
            data-testid="offer-id-display-field"
          >
            {window.getValue(newoffersettingsparam, "offerId")}
          </div>
        </Col>
      </Row>

      <Row gutter={[8, 8]}>
        <Col span={4} className="offerid-view-field">
          <FormattedMessage id="nemo.bookingDates" />
        </Col>
        <Col span={5}>
          <div
            className="offerid-view-field-name"
            data-testid="offer-id-display-field"
          >
            {window.getValue(
              newoffersettingsparam,
              "bookingDateRange.startDate"
            ) ? (
              <Fragment>
                {moment(
                  window.getValue(
                    newoffersettingsparam,
                    "bookingDateRange.startDate"
                  )
                ).format("L")}
                --
                {moment(
                  window.getValue(
                    newoffersettingsparam,
                    "bookingDateRange.endDate"
                  )
                ).format("L")}{" "}
              </Fragment>
            ) : (
              "--"
            )}
          </div>
        </Col>
        <Col
          span={
            window.getValue(newoffersettingsparam, "bookingDatesTimezone.value")
              ? 6
              : 0
          }
        >
          <div
            className="offerid-view-field-name"
            data-testid="offer-id-display-field"
          >
            -- &nbsp; &nbsp;
            {window.getValue(
              newoffersettingsparam,
              "bookingDatesTimezone.value"
            ) || "--"}
          </div>
        </Col>
      </Row>

      <Row gutter={[8, 8]}>
        <Col span={4} className="offerid-view-field">
          <FormattedMessage id="nemo.travellingDates" />
        </Col>
        <Col span={6}>
          <div
            className="offerid-view-field-name"
            data-testid="offer-id-display-field"
          >
            {window.getValue(
              newoffersettingsparam,
              "travellingDateRange.startDate"
            ) ? (
              <Fragment>
                {moment(
                  window.getValue(
                    newoffersettingsparam,
                    "travellingDateRange.startDate"
                  )
                ).format("L")}
                --
                {moment(
                  window.getValue(
                    newoffersettingsparam,
                    "travellingDateRange.endDate"
                  )
                ).format("L")}{" "}
              </Fragment>
            ) : (
              "--"
            )}
          </div>
        </Col>
      </Row>

      <Divider />
      <Row gutter={[8, 8]}>
        <Col span={5}>
          <h3>
            <FormattedMessage id="nemo.travelProduct" />
          </h3>
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col span={4} className="offerid-view-field">
          <FormattedMessage id="nemo.properties" />
        </Col>
        <Col span={20}>
          <SettingsPropertyList isForViewOnly={true} />
        </Col>
      </Row>
      <Divider />
      <Row gutter={[8, 8]}>
        <Col span={4} className="offerid-view-field">
          <FormattedMessage id="nemo.target" />
        </Col>
        <Col span={20}>
          <ViewTarget />
        </Col>
      </Row>
      <Divider />
      <ViewDeepLinkSettings />
    </Skeleton>
  );
}

export default ViewSettings;
