import React, { Fragment, useEffect, useCallback, useState } from "react";
import { Form, Divider, Switch, Row, Col, InputNumber, Input, Button, Checkbox } from "antd";
import AllPropertiesDestination from "../../form/AllPropertiesDestination";
import Distance from "../../form/Distance";
import { BasicSearchAdvanced } from "./BasicSearchAdvanced";
import { SearchBtn } from "./SearchBtn";
import { SearchedPropertyList } from "./SearchedPropertyList";
import { SearchResultPagination } from "./SearchResultPagination";
import { useDispatch, useSelector } from "react-redux";
import styles from "./css/SearchResultContainer.module.less";
import { supplySearchActions } from "../actions/supplySearch";
import { DownOutlined ,CaretDownOutlined } from '@ant-design/icons';

import {
  checkIfNewPropertiesAdded,
  getTrustYouIdListFromProperties,
  updateSettingsBrandWithSearchedValues,
} from "../../../helpers/utility";
import { useRouteMatch } from "react-router-dom";
import { FormattedMessage, useIntl } from "react-intl";
import {
  checkIfUserHasRole,
  createSearchQueryURL,
} from "../../../helpers/utility";
import { appConstants } from "../../../common";
import { newOfferActions } from "../../offers/actions";

export function BasicSearchSettingsResultsPage({ submitForm ,props}) {
  const dispatch = useDispatch();
  const intl = useIntl();
  const [show, setPanelShow] = useState(props);
  const [isNewPropertyAdded, setIsNewPropertyAdded] = useState(
    checkIfNewPropertiesAdded()
  );
  const isBrowseSupplyPage = useRouteMatch({
    path: "/basic-search/:page?",
    strict: true,
    sensitive: true,
  });
  const [form] = Form.useForm();
  const searchParams = useSelector((state) =>
    window.getValue(state, "searchparams")
  );
  const { selectedProperties } = useSelector((state) => ({
    selectedProperties: window.getValue(state, "propertycart.cartItems"),
  }));
  const [visible, setVisible,] = useState(false);


  const onFinish = useCallback(
    (values) => {
      //debugger
      const val = {
        'distance': values.distance,
        'lat': values.destination.lat,
        'lan': values.destination.lng,
      }
      console.log(val)
      dispatch({
        type: supplySearchActions.SUPPLY_SEARCH_UPDATE_BASIC_SETTING_REDUX_STATE,
        payload: val,
      });
    },
    [dispatch]
  );


  useEffect(() => {
    if (submitForm) {
      submitForm(form);
    }
  }, [form, submitForm]);

  useEffect(() => {
    setIsNewPropertyAdded(checkIfNewPropertiesAdded());
  }, [selectedProperties]);

  const showModal = () => {
    setVisible(true);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const {
   
  } = useSelector((state) => ({
    properties: window.getValue(state, "searchedproperties.properties"),
    loading: window.getValue(state, "searchedproperties.loading"),
    offerName: window.getValue(state, "newoffersettingsparam.name"),
    selectedProperties: window.getValue(state, "propertycart.cartItems"),
    includeMarketPrice: window.getValue(
      state,
      "marketprice.includeMarketPrice"
    ),
    sortBy: window.getValue(state, "searchparams.sortBy"),
  }));

  useEffect(() => {
    setIsNewPropertyAdded(checkIfNewPropertiesAdded());
  }, [selectedProperties]);
  
  return (  

    <Form
      form={form}
      onFinish={onFinish}
      initialValues={searchParams}
      scrollToFirstError
      onFinishFailed={onFinishFailed}
      className="custom-form"
      className={styles.customForm}
      data-testid="search-setting-form"
    >

      <Row gutter={[9, 1]} style
      layout="inline">
        <Col span={7}>
          <Form.Item name="destination" data-testid="destination" 
            
            rules={[
              {
                required: true,
                message: <FormattedMessage id="nemo.destination.required" />,
              }
            ]}     > 
            <AllPropertiesDestination
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
        <Col span={3}>
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
        <Col span ={2}  >          
        <Form.Item >
        <SearchBtn layout="inline" isForSearchResultsPage={true} />
        </Form.Item>       
        </Col>                       
      </Row> 
    </Form>    
  );
}
