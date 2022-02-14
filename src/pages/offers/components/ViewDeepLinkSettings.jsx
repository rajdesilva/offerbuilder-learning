import React, { Fragment, useEffect, useState } from "react";
import { Row, Col } from "antd";
import { FormattedMessage } from "react-intl";
import moment from "moment/min/moment-with-locales";
import { useSelector } from "react-redux";
import Checkbox from "antd/lib/checkbox/Checkbox";
import { isEqual } from "lodash";
import { getCityFromLatLong } from "../service";

function ViewDeepLinkSettings() {
  const [city, setCity] = useState("");
  const deepLinkSettingsInfo = useSelector(
    (state) =>
      window.getValue(state, "newoffersettingsparam.deepLinkSettingsInfo"),
    isEqual
  );

  useEffect(() => {
    if (window.getValue(deepLinkSettingsInfo, "destination.lat") && !city) {
      try {
        getCityFromLatLong({
          lat: window.getValue(deepLinkSettingsInfo, "destination.lat"),
          lng: window.getValue(deepLinkSettingsInfo, "destination.lng"),
        }).then((response) => {
          if (window.getValue(response, "plus_code.compound_code")) {
            // "GVC4+5M Pune, Maharashtra, India";
            const cityName = response.plus_code.compound_code.substring(8);

            setCity(cityName);
          } else {
            console.log("Map error", response);
          }
        });
      } catch (e) {
        console.log(e.toString());
      }
    }
  });
  return (
    <Fragment>
      <Row gutter={[8, 8]} >
        <Col span={6}>
          <h3>
            <FormattedMessage id="nemo.deepLinkSettings" />
          </h3>
        </Col>
      </Row>
      <Row gutter={[8, 8]} >
        <Col span={4} className="offerid-view-field">
          <FormattedMessage id="nemo.destination" />
        </Col>
        <Col span={6}>
          <div className="offerid-view-field-name">{city || "--"}</div>
        </Col>
      </Row>
      <Row gutter={[8, 8]} >
        <Col span={4} className="offerid-view-field">
          <FormattedMessage id="nemo.hotel" />
        </Col>
        <Col span={6}>
          <Checkbox
            data-testid="include-all-properties-settings"
            disabled={true}
            checked={window.getValue(
              deepLinkSettingsInfo,
              "includeAllProperties"
            )}
          />
          <span>
            &nbsp;
            <FormattedMessage id="nemo.includeAllSelectedProperties" />
          </span>
        </Col>
      </Row>
      <Row gutter={[8, 8]} >
        <Col span={4} className="offerid-view-field">
          <FormattedMessage id="nemo.guests" />
        </Col>
        <Col span={6}>
          <div className="offerid-view-field-name">
            {window.getValue(deepLinkSettingsInfo, "adultOccupancy")}{" "}
            <FormattedMessage
              id={
                window.getValue(deepLinkSettingsInfo, "adultOccupancy") > 1
                  ? "nemo.Adult"
                  : "nemo.Adult"
              }
            />
            &nbsp;
            {window.getValue(deepLinkSettingsInfo, "childOccupancy") !== "0" ? (
              <Fragment>
                {window.getValue(deepLinkSettingsInfo, "childOccupancy")}{" "}
                <FormattedMessage id="nemo.children" />{" "}
              </Fragment>
            ) : (
              <Fragment />
            )}
          </div>
        </Col>
      </Row>

      <Row gutter={[8, 8]} >
        <Col span={4} className="offerid-view-field">
          <FormattedMessage id="nemo.checkIn" />
        </Col>
        <Col span={10}>
          <div className="offerid-view-field-name">
            {window.getValue(deepLinkSettingsInfo, "checkInType") ===
            "rolling" ? (
              <Fragment>
                <FormattedMessage id="nemo.dynamic" /> (
                {window.getValue(deepLinkSettingsInfo, "rollingOffset")}{" "}
                <FormattedMessage
                  id={
                    window.getValue(deepLinkSettingsInfo, "rollingOffset") > 1
                      ? "nemo.days"
                      : "nemo.days"
                  }
                />{" "}
                <FormattedMessage id="nemo.fromDayOfSearch" />)
              </Fragment>
            ) : window.getValue(deepLinkSettingsInfo, "checkInType") ===
              "fixed" ? (
              moment(window.getValue(deepLinkSettingsInfo, "fixedDate")).format("L")
            ) : (
              <Fragment />
            )}
          </div>
        </Col>
      </Row>

      <Row gutter={[8, 8]} >
        <Col span={4} className="offerid-view-field">
          <FormattedMessage id="nemo.lengthOfStay" />
        </Col>
        <Col span={6}>
          <div className="offerid-view-field-name">
            {window.getValue(deepLinkSettingsInfo, "los")}&nbsp;
            <FormattedMessage
              id={
                window.getValue(deepLinkSettingsInfo, "los") > 1
                  ? "nemo.nights"
                  : "nemo.nights"
              }
            />
          </div>
        </Col>
      </Row>
    </Fragment>
  );
}

export default ViewDeepLinkSettings;
