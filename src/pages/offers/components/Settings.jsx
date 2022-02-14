import React, { Fragment, useState, useEffect } from "react";
import { Row, Col, Form, Divider, Skeleton } from "antd";
import TimezoneSelect from "react-timezone-select";
import {
  DateRange,
  NemoSelect,
  OfferId,
  OfferName,
  Target,
  TravellingDateRange,
} from "../../form";
import TravelProduct from "./TravelProduct";
import { useDispatch, useSelector } from "react-redux";
import { FormattedMessage, useIntl } from "react-intl";
import { newOfferActions } from "../actions";
import { useRouteMatch } from "react-router-dom";
import DeepLinkSettings from "./DeepLinkSettings";
import styles from "./css/Settings.module.less";
import { getOfferDetails } from "../service";
import isEqual from "lodash.isequal";
import { appConstants } from "../../../common";
import { checkIfUserHasRole, getOfferTypeFromPropertiesSelected } from "../../../helpers/utility";

function Settings({ prev, submitForm, isEditFlow, showAddPropertiesFlow }) {
  const offerEditPage = useRouteMatch({
    path: "/offers/edit/:offerId?",
    strict: true,
    sensitive: true,
  });
  const intl = useIntl();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [isBookingDateSelected, setIsBookingDateSelected] = useState(false);
  const newoffersettingsparam = useSelector(
    (state) => window.getValue(state, "newoffersettingsparam"),
    isEqual
  );
  const loading = useSelector(
    (state) =>
      window.getValue(state, "offerlistsearchandfilters.offerDetailsLoading"),
    isEqual
  );
  const { cartItems, cartChangeStatus } = useSelector(
    (state) => window.getValue(state, "propertycart"),
    isEqual
  );

  useEffect(() => {
    if (submitForm) {
      submitForm(form);
    }
  }, [form, submitForm]);

  useEffect(() => {
    form.validateFields(["bookingDatesTimezone"]);
  }, [form, isBookingDateSelected]);

  useEffect(() => {
    if (!cartChangeStatus) {
      if (offerEditPage) {
        getOfferDetails(window.getValue(offerEditPage, "params.offerId"));
      }
    }
  }, []);

  useEffect(() => {
    const type = getOfferTypeFromPropertiesSelected();
    dispatch({
      type: newOfferActions.NEW_OFFER_SET_OFFER_PROPERTY_TYPE,
      payload: type,
    });
    // it is for
    if (type === appConstants.PROPERTY_TYPE_LIST[0].id) {
      dispatch({
        type: newOfferActions.NEW_OFFER_UPDATE_STATUS,
        payload: {
          id: "UNPUBLISHED",
          name: "UNPUBLISHED",
        },
      });
    }
  }, [cartItems]);

  useEffect(() => {
    form.setFieldsValue(newoffersettingsparam);
  }, [newoffersettingsparam.status]);

  useEffect(() => {
    form.setFieldsValue(newoffersettingsparam);
  }, [newoffersettingsparam.key]);

  return (
    <Skeleton loading={loading} active>
      <Form
        form={form}
        // key={Math.random()}
        initialValues={newoffersettingsparam}
        scrollToFirstError
        className="custom-form"
        data-testid="search-setting-form"
      >
        <Row gutter={[8, 8]}>
          <Col span={4} className="col1-text">
            <FormattedMessage id="nemo.name" />
          </Col>
          <Col span={8}>
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: <FormattedMessage id="nemo.pleaseEnterOfferName" />,
                },
                {
                  min: 5,
                  message: (
                    <FormattedMessage id="nemo.offerNameMustBeMinimum5Characters." />
                  ),
                },
                {
                  max: 100,
                  message: (
                    <FormattedMessage id="nemo.offerNameCanBe100CharactersLong" />
                  ),
                },
              ]}
            >
              <OfferName
                onChange={(value) =>
                  dispatch({
                    type: newOfferActions.NEW_OFFER_UPDATE_OFFER_NAME,
                    payload: value,
                  })
                }
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[8, 8]}>
          <Col span={4} className="col1-text">
            <FormattedMessage id="nemo.status" />
          </Col>
          <Col span={4}>
            <Form.Item name="status">
              <NemoSelect
                data-testid="settings-offer-status"
                mode=""
                disabled={checkIfUserHasRole(appConstants.USER_ROLE.ADMIN) &&
                  newoffersettingsparam.type !==
                  appConstants.PROPERTY_TYPE_LIST[1].id
                }
                onChange={(value) => {
                  dispatch({
                    type: newOfferActions.NEW_OFFER_UPDATE_STATUS,
                    payload: JSON.parse(value),
                  });
                }}
                optionsList={[
                  {
                    id: "UNPUBLISHED",
                    name: "UNPUBLISHED",
                  },
                  {
                    id: "PUBLISHED",
                    name: "PUBLISHED",
                  },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>
      {checkIfUserHasRole(appConstants.USER_ROLE.ADMIN) ? 
        <Row gutter={[8, 8]}>
          <Col span={4} className="col1-text">
            <FormattedMessage id="nemo.type" />
          </Col>

          <Col span={14}>
            <div
              className={styles["offer-settings-type"]}
              data-testid="offer-type"
            >
              {window.getValue(newoffersettingsparam, "type") === "ALL"
                ? appConstants.PROPERTY_TYPE_LIST[0].id
                : window.getValue(newoffersettingsparam, "type")}
            </div>
          </Col>
        </Row> : <Fragment/>}

        <Row gutter={[8, 8]}>
          <Col span={4} className="col1-text">
            <FormattedMessage id="nemo.offerID" />
          </Col>

          <Col span={14}>
            <div className={styles["offer-settings-order-id"]}>
              {offerEditPage ? (
                <div
                  className={styles["offerid-edit"]}
                  data-testid="offer-id-display-field"
                >
                  {window.getValue(newoffersettingsparam, "offerId")}
                </div>
              ) : (
                <Fragment>
                  <Form.Item
                    name="offerId"
                    required
                    rules={[
                      {
                        required: true,
                        message: (
                          <FormattedMessage id="nemo.idMustBeMinimumOf3AndMaximumOf24AlphanumericCharacters" />
                        ),
                        pattern: "^[A-Za-z0-9_]{3,24}$",
                      },
                    ]}
                  >
                    <OfferId
                      onChange={(value) =>
                        dispatch({
                          type: newOfferActions.NEW_OFFER_UPDATE_OFFER_ID,
                          payload: value,
                        })
                      }
                    />
                  </Form.Item>
                  <span className={styles["note-span"]}>
                    <FormattedMessage id="nemo.cantChangeLater" />
                  </span>
                </Fragment>
              )}
            </div>
          </Col>
        </Row>

        <Row gutter={[8, 8]}>
          <Col span={4} className="col1-text">
            <FormattedMessage id="nemo.bookingDates" />
          </Col>
          <Col span={6}>
            <Form.Item name="bookingDateRange" noStyle>
              <DateRange
                isEmptyDefaultRange={true}
                dataTestId="settings-booking-date-range"
                onChange={(dates) => {
                  if (dates) {
                    setIsBookingDateSelected(true);
                  } else {
                    setIsBookingDateSelected(false);
                  }
                  dispatch({
                    type: newOfferActions.NEW_OFFER_BOOKING_DATE_RANGE,
                    payload: dates,
                  });
                }}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name="bookingDatesTimezone"
              // noStyle
              className={styles.timezone}
              labelStyle="original"
              rules={[
                {
                  required: isBookingDateSelected,
                  message: intl.formatMessage({
                    id: "nemo.bookingTimeZoneIsRequired",
                  }),
                },
              ]}
              data-testid="settings-booking-date-time-zone"
            >
              <TimezoneSelect
                isClearable={false}
                placeholder={intl.formatMessage({
                  id: "nemo.bookingDatesTimezone",
                })}
                value={form.getFieldValue("bookingDatesTimezone")}
                onChange={(value) => {
                  dispatch({
                    type: newOfferActions.NEW_OFFER_BOOKING_TIME_ZONE,
                    payload: value,
                  });
                }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[8, 8]}>
          <Col span={4} className="col1-text">
            <FormattedMessage id="nemo.travellingDates" />
          </Col>
          <Col span={8}>
            <Form.Item name="travellingDateRange" noStyle>
              <TravellingDateRange
                isEmptyDefaultRange={true}
                onChange={(dates) => {
                  dispatch({
                    type: newOfferActions.NEW_OFFER_TRAVELLING_DATE_RANGE,
                    payload: dates,
                  });
                }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Divider />

        <TravelProduct
          prev={prev}
          isEditFlow={isEditFlow}
          showAddPropertiesFlow={showAddPropertiesFlow}
          brands={window.getValue(newoffersettingsparam, "brands") || []} // to display brands in search settings on property search results screen
        />
        <Target form={form} isSettingsPage={true} />
        <Divider />
        <DeepLinkSettings
          form={form}
          offerId={newoffersettingsparam.offerId}
          isOfferEditPage={offerEditPage}
        />
      </Form>
    </Skeleton>
  );
}

export default Settings;
