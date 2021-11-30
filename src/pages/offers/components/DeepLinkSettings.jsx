import React, { Fragment, useEffect, useState } from "react";
import { Row, Col, Form, Select, InputNumber, Radio } from "antd";
import { Destination, Distance, FixedDate, LengthOfStay } from "../../form";
import { FormattedMessage, useIntl } from "react-intl";
import { newOfferActions } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import Checkbox from "antd/lib/checkbox/Checkbox";
import { checkIfPropertiesHaveMultipleLocations } from "../../../helpers/utility";
import { isEqual } from "lodash";
import styles from "./css/DeepLinkSettings.module.less";
import { history } from "../../../helpers";

const { Option } = Select;
function DeepLinkSettings(props) {
  const dispatch = useDispatch();
  const intl = useIntl();
  const cartItems = useSelector(
    (state) => window.getValue(state, "propertycart.cartItems"),
    isEqual
  );
  const includeAllProperties = useSelector((state) =>
    window.getValue(
      state,
      "newoffersettingsparam.deepLinkSettingsInfo.includeAllProperties"
    )
  );

  const lastSearchDistance = useSelector((state) =>
    window.getValue(state, "newoffersettingsparam.lastSearchDistance")
  );

  const destination = useSelector((state) =>
    window.getValue(
      state,
      "newoffersettingsparam.deepLinkSettingsInfo.destination"
    )
  );

  const [multipleLocationPresent, setMulipleLocationPresent] = useState(false);
  useEffect(() => {
    props.form.validateFields(["deepLinkSettingsInfo", "destination"]);

    props.form.setFieldsValue({
      deepLinkSettingsInfo: {
        includeAllProperties:
          cartItems && cartItems.length > 0
            ? multipleLocationPresent
              ? true
              : includeAllProperties ===
                  props.form.getFieldValue([
                    "deepLinkSettingsInfo",
                    "includeAllProperties",
                  ]) && includeAllProperties === false
              ? false
              : includeAllProperties
            : false,
      },
    });
  }, [props.form, cartItems, multipleLocationPresent, includeAllProperties]);

  useEffect(() => {
    setMulipleLocationPresent(checkIfPropertiesHaveMultipleLocations());
  }, [destination, cartItems]);
  return (
    <Fragment>
      <Row gutter={[8, 8]}>
        <Col span={6}>
          <h3>
            <FormattedMessage id="nemo.deepLinkSettings" />
          </h3>
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col span={4} className="col1-text">
          {!(cartItems && cartItems.length > 0) ? (
            <span className={styles.star}>*</span>
          ) : (
            ""
          )}
          &nbsp;
          <FormattedMessage id="nemo.destination" />
        </Col>
        <Col span={8}>
          <Form.Item
            name={["deepLinkSettingsInfo", "destination"]}
            data-testid="deep-link-settings-destination"
            key={cartItems === null || cartItems.length === 0 ? 1 : 2}
            required={!(cartItems && cartItems.length > 0)}
            rules={[
              {
                required: !(cartItems && cartItems.length > 0),
                message: <FormattedMessage id="nemo.destinationRequired" />,
              },
            ]}
          >
            <Destination
              placeholder={intl.formatMessage({
                id: "nemo.mediumInput",
              })}
              onChangeDestination={(location) => {
                if (!location && cartItems && cartItems.length > 0) {
                  dispatch({
                    type: newOfferActions.NEW_OFFER_DEEPLINK_INCLUDE_ALL_PROPERTIES,
                    payload: true,
                  });
                }
                dispatch({
                  type: newOfferActions.NEW_OFFER_DEEPLINK_DESTINATION,
                  payload: location,
                });
              }}
            />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item name="lastSearchDistance" data-testid="deeplink-distance">
            <Distance
              value={lastSearchDistance}
              onChangeDistance={(distance) => {
                dispatch({
                  type: newOfferActions.NEW_OFFER_LAST_SEARCH_DISTANCE,
                  payload: distance,
                });
                if (cartItems && cartItems.length > 0) {
                  setMulipleLocationPresent(
                    checkIfPropertiesHaveMultipleLocations()
                  );
                }
              }}
              distance={0}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col offset={4} span={10} className='top-margin'>
          {multipleLocationPresent &&
          cartItems &&
          cartItems.length > 0 &&
          destination && destination.lat ? (
            <span
              data-testid="destination-msg-span"
              className={styles.destinationMsgFont}
            >
              <FormattedMessage id="nemo.propsNotInDefinedDestination" />
              <br />
              <FormattedMessage id="nemo.deeplinkDataWillNotAdd" />
            </span>
          ) : (
            <Fragment />
          )}
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col span={4} className="col1-text">
          <FormattedMessage id="nemo.hotel" />
        </Col>
        <Col span={8}>
          <Form.Item
            name={["deepLinkSettingsInfo", "includeAllProperties"]}
            data-testid="deep-link-settings-destination"
            valuePropName="checked"
            noStyle
          >
            <Checkbox
              data-testid="include-all-properties-settings"
              disabled={
                multipleLocationPresent ||
                cartItems === null ||
                cartItems.length === 0 ||
                !(destination && destination.lat)
              }
              checked={
                cartItems && cartItems.length > 0
                  ? multipleLocationPresent
                    ? true
                    : includeAllProperties ===
                        props.form.getFieldValue([
                          "deepLinkSettingsInfo",
                          "includeAllProperties",
                        ]) && includeAllProperties === false
                    ? false
                    : includeAllProperties
                  : false
              }
              onChange={(e) => {
                dispatch({
                  type: newOfferActions.NEW_OFFER_DEEPLINK_INCLUDE_ALL_PROPERTIES,
                  payload: e.target.checked,
                });

                if (props.isOfferEditPage) {
                  history.push("/offers/edit/" + props.offerId);
                } else {
                  history.push("/offers/create-new-offer/3");
                }
              }}
            />
            <span>
              &nbsp;
              <FormattedMessage id="nemo.includeAllSelectedProperties" />
            </span>
            {!(destination && destination.lat) && cartItems && cartItems.length > 0 ? (
              <Fragment>
                <br />{" "}
                <span className={styles.destinationWarning}>
                  <FormattedMessage id="nemo.cannotBeUnCheckedWithoutDestination" />
                </span>
              </Fragment>
            ) : (
              <Fragment />
            )}
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col span={4} className="col1-text">
          <FormattedMessage id="nemo.guests" />
        </Col>
        <Col span={2}>
          <Form.Item
            name={["deepLinkSettingsInfo", "adultOccupancy"]}
            data-testid="deep-link-settings-guests-adult"
            label={<FormattedMessage id="nemo.Adult" />}
            // initialValue={1}
          >
            <Select
              mode=""
              key="deep-link-settings-guests-children-key"
              data-testid="deep-link-settings-guests-adult-select"
              placeholder={intl.formatMessage({
                id: "nemo.notSelected",
              })}
              rules={[{ required: true }]}
              onChange={(value) => {
                dispatch({
                  type: newOfferActions.NEW_OFFER_DEEPLINK_ADULT_OCCUPANCY,
                  payload: value,
                });
              }}
            >
              <Option value="1">1</Option>
              <Option value="2">2</Option>
              <Option value="3">3</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={2}>
          <Form.Item
            name={["deepLinkSettingsInfo", "childOccupancy"]}
            data-testid="deep-link-settings-guests-children"
            label={<FormattedMessage id="nemo.children" />}
          >
            <Select
              mode=""
              key="deep-link-settings-guests-children-key"
              data-testid="deep-link-settings-guests-children-select"
              onChange={(value) => {
                dispatch({
                  type: newOfferActions.NEW_OFFER_DEEPLINK_CHILD_OCCUPANCY,
                  payload: value,
                });
              }}
            >
              <Option value="0">0</Option>
              <Option value="1">1</Option>
              <Option value="2">2</Option>
              <Option value="3">3</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[8, 8]}>
        <Col span={4} className="col1-text">
          <FormattedMessage id="nemo.checkIn" />
          &nbsp;
        </Col>
        <Col span={6}>
          <Form.Item name={["deepLinkSettingsInfo", "checkInType"]}>
            <Radio.Group
              defaultValue={props.form.getFieldValue([
                "deepLinkSettingsInfo",
                "checkInType",
              ])}
              onChange={(e) => {
                dispatch({
                  type: newOfferActions.NEW_OFFER_DEEPLINK_CHECK_IN_TYPE,
                  payload: e.target.value,
                });
              }}
            >
              <Radio
                className={styles.radioStyle}
                value={"rolling"}
                data-testid="deep-rolling-radio-btn"
              >
                <FormattedMessage id="nemo.rollingDate" />
              </Radio>
              <Radio
                className={styles.radioStyle}
                value={"fixed"}
                data-testid="deep-fixed-radio-btn"
              >
                <FormattedMessage id="nemo.fixedDate" />
              </Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[8, 8]}>
        <Col span={4} className="col1-text"></Col>
        <Col span={6}>
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.checkIn !== currentValues.checkIn
            }
          >
            {({ getFieldValue }) => {
              return getFieldValue(["deepLinkSettingsInfo", "checkInType"]) ===
                "rolling" ? (
                <Fragment>
                  <span>
                    <FormattedMessage id="nemo.numberOfDaysAfterTodaysDate" />
                    &nbsp;
                  </span>
                  <Form.Item
                    name={["deepLinkSettingsInfo", "rollingOffset"]}
                    preserve={false}
                    data-testid="deeplink=rolling-days-form-item"
                  >
                    <InputNumber
                      data-testid="deeplink-rolling-days-input"
                      placeholder={intl.formatMessage({
                        id: "nemo.days",
                      })}
                      min={0}
                      defaultValue={props.form.getFieldValue([
                        "deepLinkSettingsInfo",
                        "rollingOffset",
                      ])}
                      onChange={(value) => {
                        dispatch({
                          type: newOfferActions.NEW_OFFER_DEEPLINK_ROLLING_DAYS,
                          payload: value,
                        });
                      }}
                    />
                    <span>
                      &nbsp;&nbsp;
                      <FormattedMessage id="nemo.days" />
                    </span>
                  </Form.Item>
                </Fragment>
              ) : (
                <Form.Item
                  name={["deepLinkSettingsInfo", "fixedDate"]}
                  data-testid="deeplink-fixed-date-form-item"
                  rules={[
                    {
                      required: true,
                      message: (
                        <FormattedMessage id="nemo.fixedDateIsRequired" />
                      ),
                    },
                  ]}
                >
                  <FixedDate
                    onChange={(date, dateString) => {
                      dispatch({
                        type: newOfferActions.NEW_OFFER_DEEPLINK_CHECK_IN_FIXED_DATE,
                        payload: date,
                      });
                    }}
                  />
                </Form.Item>
              );
            }}
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[8, 8]}>
        <Col span={4} className="col1-text">
          <FormattedMessage id="nemo.lengthOfStay" />
        </Col>
        <Col span={6}>
          <Form.Item
            name={["deepLinkSettingsInfo", "los"]}
            noStyle
            rules={[{ required: true }]}
            data-testid="los"
          >
            <LengthOfStay
              onLengthOfStayChange={(losValue) => {
                dispatch({
                  type: newOfferActions.NEW_OFFER_DEEPLINK_LOS,
                  payload: losValue,
                });
              }}
            />
          </Form.Item>
          <span>
            &nbsp;&nbsp;
            <FormattedMessage id="nemo.nights" />
          </span>
        </Col>
      </Row>
    </Fragment>
  );
}

export default DeepLinkSettings;
