import React, { Fragment, useEffect, useCallback, useState } from "react";
import { Form, Divider, Switch, Row, Col, InputNumber, Button } from "antd";
import { BasicSearchAdvanced } from "./BasicSearchAdvanced";
import { BasicSearchSettingsResultsPage } from "./BasicSearchSettingsResultsPage";
import { SearchBtn } from "./SearchBtn";
import { PropertySort } from "./PropertySort";
import { SearchedPropertyList } from "./SearchedPropertyList";
import { SearchResultPagination } from "./SearchResultPagination";
import { useDispatch, useSelector } from "react-redux";
import styles from "./css/SearchResultContainer.module.less";
import { supplySearchActions } from "../actions/supplySearch";
import { DownOutlined } from '@ant-design/icons';
import {
  HotelName,
  LengthOfStay,
  DateRange,
  Target,
  Currency,
  PropertyType,
} from "../../form";
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
import { SearchSettingsResultsPage } from "./SearchSettingsResultsPage";


export function SearchSettings({ submitForm ,props}) {
  const dispatch = useDispatch();
  const intl = useIntl();
  const [show, setPanelShow] = useState(props);
  const [hide, setPanelHide] = useState(props);
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

  const {
    properties,
    loading,
    offerName,
    includeMarketPrice,
    sortBy,
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
      initialValues={searchParams}
      scrollToFirstError
      className="custom-form"
      data-testid="search-setting-form">
        <dev style={{ display: "flex", justifyContent: 'flex-end'}} >
          <Button 
          className={styles.pos}
            type="link"
            onClick={() => {
              setPanelShow(!show);
            }}>
            
            {show ? (
              <FormattedMessage id="nemo.hide.advance.option" />
            ) : (
              <FormattedMessage id="nemo.advance.option" />
            )}
        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
        <FormattedMessage id="nemo.search.space" />
        <DownOutlined />
        </a>
        </Button>
        </dev>
      
      <Row >
        {show ? (
          <Col span={show ? 24 : 24} >
            <BasicSearchAdvanced isEditFlow={props} />
          </Col>
        ) : (
          <Col span={show ? 12 : 24} >
          <BasicSearchSettingsResultsPage isEditFlow={props} />
        </Col>
        )}
      </Row>
        <Divider />
        <Row>
        <Col span={show ? 24 : 24}>
        <Row justify="space-between" className={styles.bsHeader}>
        <Col>
          <h4>
            <FormattedMessage id="nemo.search.results" />
          </h4>
        </Col>       
        <Col>
        <Button
        data-testid="property-list-modal"
        type="primary"
        ghost
        onClick={showModal}
        size="large"
        disabled={!(selectedProperties && selectedProperties.length > 0)}
      >
        <span className={styles.fs14}>
          <FormattedMessage id="nemo.wishlist" />
        </span>
        &nbsp;
        <span className={styles.cartTotalCount} data-testid="properties-count">
          {selectedProperties ? selectedProperties.length : "0"}
        </span>
      </Button>  
      <Divider type="vertical" className={styles.menuVerticalDivider} />

      <Button
        data-testid="property-list-modal"
        type="primary"
        ghost
        onClick={showModal}
        size="large"
        disabled={!(selectedProperties && selectedProperties.length > 0)}
      >
        <span className={styles.fs14}>
          <FormattedMessage id="nemo.propertiesInOffer" />
        </span>
        &nbsp;
        <span className={styles.cartTotalCount} data-testid="properties-count">
          {selectedProperties ? selectedProperties.length : "0"}
        </span>
      </Button>
      </Col>
      
      </Row>
      {/* {checkIfUserHasRole(appConstants.USER_ROLE.ADMIN) ? (
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
      )}          */}
      <Row>
      <Col span={5} className={styles.alignLeft} >
          <PropertySort sortBy={sortBy} />
      </Col>

      <Divider type="vertical" className={styles.menuVerticalDivider} />
      
      {/* <Button
        data-testid="property-list-modal"
        type="primary"
        ghost
        onClick={showModal}
        size="large"
        disabled={!(selectedProperties && selectedProperties.length > 0)}
      >
        <span className={styles.fs14}>
          <FormattedMessage id="nemo.most.relevant" />
        </span>
        &nbsp;
        <span className={styles.cartTotalCount} data-testid="properties-count">
          {selectedProperties ? selectedProperties.length : "0"}
        </span>
      </Button> */}
      
        </Row>
          <SearchedPropertyList
            prev={props}
            show={show}
            isEditFlow={props}
          />
        </Col>
      </Row>      

        {!loading && properties && properties.length > 0 ? (
        <SearchResultPagination />
      ) : (
        <Fragment />
      )}
      <Divider />
    </Form>
    
  );
}
