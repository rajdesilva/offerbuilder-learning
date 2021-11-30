import React, { Fragment, useEffect, useCallback } from "react";
import { Form, Divider, Switch, Row, Col, InputNumber } from "antd";
import Destination from "../../form/Destination";
import Distance from "../../form/Distance";
import { useDispatch, useSelector } from "react-redux";
import { supplySearchActions } from "../actions/supplySearch";
import {
  HotelName,
  LengthOfStay,
  DateRange,
  Target,
  Currency,
  PropertyType,
} from "../../form";
import { useRouteMatch } from "react-router-dom";
import { SearchBtn } from "./SearchBtn";
import { FormattedMessage, useIntl } from "react-intl";
import {
  checkIfUserHasRole,
  createSearchQueryURL,
} from "../../../helpers/utility";
import { appConstants } from "../../../common";
import { newOfferActions } from "../../offers/actions";

export function SearchSettings({ submitForm }) {
  const dispatch = useDispatch();
  const intl = useIntl();
  const isBrowseSupplyPage = useRouteMatch({
    path: "/browse-supply/:page?",
    strict: true,
    sensitive: true,
  });
  const [form] = Form.useForm();
  const searchParams = useSelector((state) =>
    window.getValue(state, "searchparams")
  );

  const onFinish = useCallback(
    (values) => {
      dispatch({
        type: supplySearchActions.SUPPLY_SEARCH_UPDATE_REDUX_STATE,
        payload: values,
      });
      createSearchQueryURL("/browse-supply/search-results");
    },
    [dispatch]
  );
  useEffect(() => {
    if (submitForm) {
      submitForm(form);
    }
  }, [form, submitForm]);
  return (
    <Form
      form={form}
      onFinish={onFinish}
      initialValues={searchParams}
      scrollToFirstError
      className="custom-form"
      data-testid="search-setting-form"
    >
      <Row gutter={[8, 8]}>
        <Col span={4} className="col1-text">
          <FormattedMessage id="nemo.destination" />
        </Col>
        <Col span={8}>
          <Form.Item name="destination" data-testid="destination">
            <Destination
              onChangeDestination={(destination) => {
                dispatch({
                  type: supplySearchActions.SUPPLY_SEARCH_UPDATE_DESTINATION,
                  payload: destination,
                });
                dispatch({
                  type: newOfferActions.NEW_OFFER_DEEPLINK_DESTINATION,
                  payload: destination,
                });
              }}
            />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item name="distance" data-testid="distance">
            <Distance
              onChangeDistance={(distance) => {
                dispatch({
                  type: supplySearchActions.SUPPLY_SEARCH_UPDATE_DISTANCE,
                  payload: distance,
                });
              }}
              distance={0}
            />
          </Form.Item>
        </Col>
      </Row>

      {checkIfUserHasRole(appConstants.USER_ROLE.ADMIN) ? (
        <Fragment>
          <Row gutter={[8, 8]}>
            <Col span={4} className="col1-text">
              <FormattedMessage id="nemo.propertyType" />
            </Col>
            <Col span={5}>
              <Form.Item name="type" data-testid="property-type">
                <PropertyType
                  onChangeType={(type) => {
                    dispatch({
                      type: supplySearchActions.SUPPLY_SEARCH_UPDATE_PROPERTY_TYPE,
                      payload: type,
                    });
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col offset={4} span={10} className="top-margin">
              <span>
                <FormattedMessage id="nemo.offerWithDemoPropertyNotPublishedOnProd" />
              </span>
            </Col>
          </Row>
        </Fragment>
      ) : (
        <Fragment />
      )}

      <Row gutter={[8, 8]}>
        <Col span={4} className="col1-text">
          <FormattedMessage id="nemo.hotelName" />
        </Col>
        <Col span={8}>
          <Form.Item name="hotelName" data-testid="hotel-name">
            <HotelName
              onHotelChange={(hotel) => {
                dispatch({
                  type: supplySearchActions.SUPPLY_SEARCH_UPDATE_HOTEL_NAME,
                  payload: hotel,
                });
              }}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[8, 8]}>
        <Col span={4} className="col1-text">
          <FormattedMessage id="nemo.dateRange" />
        </Col>
        <Col span={8}>
          <Form.Item name="dateRange" noStyle data-testid="date-range">
            <DateRange
              onChange={(dates) => {
                dispatch({
                  type: supplySearchActions.SUPPLY_SEARCH_UPDATE_DATE_RANGE,
                  payload: dates,
                });
              }}
            />
          </Form.Item>
        </Col>
      </Row>

      {/* Length of Stay */}
      <Row gutter={[8, 8]}>
        <Col span={4} className="col1-text">
          <FormattedMessage id="nemo.lengthOfStay" />
        </Col>
        <Col span={4}>
          <Form.Item name="los" noStyle data-testid="los">
            <LengthOfStay
              onLengthOfStayChange={(losValue) => {
                dispatch({
                  type: supplySearchActions.SUPPLY_SEARCH_UPDATE_LOS,
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
        <Col span={4}></Col>
      </Row>
      <Divider />

      <Target form={form} />

      <Divider />

      <Row gutter={[8, 8]}>
        <Col span={4} className="col1-text">
          <FormattedMessage id="nemo.currency" />
        </Col>
        <Col span={4}>
          <Form.Item name="currencyCode">
            <Currency
              data-testid="search-panel-currency-code"
              onChangeCurrency={(value) => {
                dispatch({
                  type: supplySearchActions.SUPPLY_SEARCH_UPDATE_CURRENCY,
                  payload: value,
                });
              }}
              id="search-panel-currency-code"
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[8, 8]}>
        <Col span={4} className="col1-text">
          <FormattedMessage id="nemo.lcn" />
        </Col>
        <Col span={6}>
          <Form.Item name="lcn" valuePropName="checked">
            <Switch
              data-testid="lcn-switch"
              onChange={(value) => {
                dispatch({
                  type: supplySearchActions.SUPPLY_SEARCH_UPDATE_LCN_FLAG,
                  payload: value,
                });
              }}
            />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.lcn !== currentValues.lcn
        }
      >
        {({ getFieldValue }) => {
          return getFieldValue("lcn") ? (
            <Row gutter={[8, 8]}>
              <Col span={4} className="col1-text">
                <FormattedMessage id="nemo.minRemainingCapitalPool" />
              </Col>
              <Col span={6}>
                <Form.Item
                  name="remainingCapitalPool"
                  noStyle
                  preserve={false}
                  data-testid="min-remain-capital-pool"
                >
                  <InputNumber
                    data-testid="min-remaining-capital-pool-input"
                    placeholder={intl.formatMessage({
                      id: "nemo.minimumAmount",
                    })}
                    maxLength={15}
                    className="min-capital-pool"
                    onChange={(value) => {
                      dispatch({
                        type: supplySearchActions.SUPPLY_SEARCH_UPDATE_REMAINING_CAPITAL_POOL,
                        payload: value,
                      });
                    }}
                  />
                </Form.Item>
                <span>
                  &nbsp;&nbsp;
                  {searchParams.currencyCode || (
                    <FormattedMessage id="nemo.eur" />
                  )}
                </span>
              </Col>
            </Row>
          ) : (
            <Fragment />
          );
        }}
      </Form.Item>
      <SearchBtn isBrowseSupplyPage={isBrowseSupplyPage} />
    </Form>
  );
}
