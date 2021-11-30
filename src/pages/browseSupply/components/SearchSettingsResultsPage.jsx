import React, { Fragment, useEffect, useCallback } from "react";
import { Form, Divider, Switch, Row, InputNumber, Collapse, Col } from "antd";
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
import { searchSupply } from "../service";
import { SearchBtn } from "./SearchBtn";
import { FormattedMessage, useIntl } from "react-intl";
import {
  checkIfUserHasRole,
  createSearchQueryURL,
  mapBrands,
} from "../../../helpers/utility";
import styles from "./css/SearchSettingsResultsPage.module.less";
import { appConstants } from "../../../common";

const { Panel } = Collapse;

export function SearchSettingsResultsPage({ submitForm, isEditFlow }) {
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
      values.brands = mapBrands(values.brands);

      dispatch({
        type: supplySearchActions.SUPPLY_SEARCH_UPDATE_REDUX_STATE,
        payload: values,
      });
      if (isEditFlow) {
        searchSupply("/offers/edit", isEditFlow);
      } else {
        if (isBrowseSupplyPage) {
          searchSupply("/browse-supply/search-results");
        } else {
          searchSupply("/offers/create-new-offer/2");
        }
      }
    },
    [isBrowseSupplyPage, isEditFlow, dispatch]
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
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 22 }}
      initialValues={searchParams}
      onFieldsChange={(changedFields, allFields) => {
        console.log("onFieldsChange called =", changedFields, allFields);
        if (!isEditFlow) {
          if (isBrowseSupplyPage) {
            createSearchQueryURL("/browse-supply/search-results", true);
          } else {
            createSearchQueryURL("/offers/create-new-offer/2", true);
          }
        }
      }}
      scrollToFirstError
      className={styles["search-form"]}
      data-testid="search-setting-form"
    >
      <Collapse
        bordered={false}
        ghost={true}
        defaultActiveKey={["search-settings-panel-1"]}
        expandIconPosition="right"
      >
        <Row gutter={[8, 8]}>
          <Form.Item
            name="destination"
            data-testid="destination"
            label={<FormattedMessage id="nemo.destination" />}
          >
            <Destination
              onChangeDestination={(destination) => {
                dispatch({
                  type: supplySearchActions.SUPPLY_SEARCH_UPDATE_DESTINATION,
                  payload: destination,
                });
              }}
            />
          </Form.Item>
          <Form.Item
            name="distance"
            data-testid="distance"
            label={<FormattedMessage id="nemo.distance" />}
          >
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
        </Row>

        {checkIfUserHasRole(appConstants.USER_ROLE.ADMIN) ? (
          <Row gutter={[8, 8]}>
            <Form.Item
              name="type"
              data-testid="property-type"
              label={<FormattedMessage id="nemo.propertyType" />}
            >
              <PropertyType
                onChangeType={(type) => {
                  dispatch({
                    type: supplySearchActions.SUPPLY_SEARCH_UPDATE_PROPERTY_TYPE,
                    payload: type,
                  });
                }}
              />
            </Form.Item>
          </Row>
        ) : (
          <Fragment />
        )}

        <Row gutter={[8, 8]}>
          <Form.Item
            name="hotelName"
            data-testid="hotel-name"
            label={<FormattedMessage id="nemo.hotelName" />}
          >
            <HotelName
              onHotelChange={(hotel) => {
                dispatch({
                  type: supplySearchActions.SUPPLY_SEARCH_UPDATE_HOTEL_NAME,
                  payload: hotel,
                });
              }}
            />
          </Form.Item>
        </Row>

        <Row gutter={[8, 8]}>
          <Form.Item
            name="dateRange"
            data-testid="date-range"
            label={<FormattedMessage id="nemo.dateRange" />}
          >
            <DateRange
              onDateChange={(dates) => {
                dispatch({
                  type: supplySearchActions.SUPPLY_SEARCH_UPDATE_DATE_RANGE,
                  payload: dates,
                });
              }}
            />
          </Form.Item>
        </Row>

        {/* Lenght of Stay */}
        <Row gutter={[8, 8]}>
          <Form.Item
            name="los"
            data-testid="los"
            label={<FormattedMessage id="nemo.lengthOfStay" />}
          >
            <LengthOfStay
              form={form}
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
        </Row>
        <Divider />
        <Panel
          header={
            isBrowseSupplyPage ? (
              <FormattedMessage id="nemo.target" />
            ) : (
              <FormattedMessage id="nemo.source" />
            )
          }
          key="search-settings-panel-1"
        >
          <Target
            form={form}
            isForSearchResultsPage={true}
            isEditFlow={isEditFlow}
          />
        </Panel>
        <Divider />
        <Panel
          header={<FormattedMessage id="nemo.priceAndlcn" />}
          key="search-settings-panel-2"
        >
          <Row gutter={[8, 8]}>
            <Form.Item
              name="currencyCode"
              label={<FormattedMessage id="nemo.currency" />}
            >
              <Currency
                datatestid="search-panel-currency-code"
                onChangeCurrency={(value) => {
                  dispatch({
                    type: supplySearchActions.SUPPLY_SEARCH_UPDATE_CURRENCY,
                    payload: value,
                  });
                }}
                id="search-panel-currency-code"
              />
            </Form.Item>
          </Row>
          <Row gutter={[8, 8]}>
            <Form.Item
              name="lcn"
              valuePropName="checked"
              label={<FormattedMessage id="nemo.lcn" />}
            >
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
                  <Col span={24}>
                    <Form.Item
                      name="remainingCapitalPool"
                      preserve={false}
                      data-testid="min-remain-capital-pool"
                      label={
                        <FormattedMessage id="nemo.minRemainingCapitalPool" />
                      }
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
                      />{" "}
                      <span className={styles.currencyCode}>
                        {searchParams.currencyCode || (
                          <FormattedMessage id="nemo.eur" />
                        )}
                      </span>
                    </Form.Item>
                  </Col>
                </Row>
              ) : (
                <Fragment />
              );
            }}
          </Form.Item>
        </Panel>
        <SearchBtn isForSearchResultsPage={true} />
      </Collapse>
    </Form>
  );
}
