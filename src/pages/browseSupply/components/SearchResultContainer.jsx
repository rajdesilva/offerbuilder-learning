import { Button, Col, Divider, message, Row } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import {
  checkIfNewPropertiesAdded,
  getTrustYouIdListFromProperties,
  updateSettingsBrandWithSearchedValues,
} from "../../../helpers/utility";
import { newOfferActions } from "../../offers/actions";
import {
  browseSupplyActions,
  propertyCartActions,
  supplySearchActions,
} from "../actions";
import { getMarketPricesForListOfProperties } from "../service";
import { PropertyCartList } from "./PropertyCartList";
import { SearchedPropertyList } from "./SearchedPropertyList";
import { SearchResultPagination } from "./SearchResultPagination";
import { SearchSettingsResultsPage } from "./SearchSettingsResultsPage";
import styles from "./css/SearchResultContainer.module.less";
import { PropertySort } from "./PropertySort";
import { history } from "../../../helpers";

export function SearchResultContainer(props) {
  const intl = useIntl();
  const dispatch = useDispatch();
  const [show, setPanelShow] = useState(props.isEditFlow);
  const [isNewPropertyAdded, setIsNewPropertyAdded] = useState(
    checkIfNewPropertiesAdded()
  );
  const {
    properties,
    loading,
    offerName,
    selectedProperties,
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
    <Fragment>
      {props.isEditFlow ? (
        <Fragment>
          <Row justify="space-between">
            <Col>
              <h3 className={styles.title}>
                <FormattedMessage id="nemo.addPropertiesToOffer" /> "{offerName}
                "
              </h3>
            </Col>
            <Col>
              <PropertyCartList isEditFlow={props.isEditFlow} />
              <Button
                type="primary"
                size="large"
                data-testid="discard-changes-btn"
                className={styles.discardBtn}
                onClick={() => {
                  dispatch({
                    type: propertyCartActions.DISCARD_CHANGES_IN_EDITED_CART_LIST,
                  });
                  dispatch({
                    type: browseSupplyActions.RESET_TEMP_EDITED_BRANDS,
                  });
                }}
              >
                <FormattedMessage id="nemo.discardChanges" />
              </Button>
              <Button
                type="primary"
                size="large"
                data-testid="save-changes-btn"
                onClick={() => {
                  props.finishAddPropertiesFlow();
                  if (isNewPropertyAdded) {
                    dispatch({
                      type: propertyCartActions.UPDATE_CART_CHANGE_STATUS,
                      payload: true,
                    });
                    dispatch({
                      type: newOfferActions.INITIAL_ADD_BRANDS,
                      payload: updateSettingsBrandWithSearchedValues(),
                    });
                    history.push(window.location.pathname);
                  } else {
                    dispatch({
                      type: propertyCartActions.DISCARD_CHANGES_IN_EDITED_CART_LIST,
                    });
                  }
                  dispatch({
                    type: browseSupplyActions.RESET_TEMP_EDITED_BRANDS,
                  });
                }}
              >
                {isNewPropertyAdded ? (
                  <FormattedMessage id="nemo.save" />
                ) : (
                  <FormattedMessage id="nemo.cancel" />
                )}
              </Button>
            </Col>
          </Row>
          <Divider />
        </Fragment>
      ) : (
        <Fragment />
      )}
      <Row justify="space-between">
        <Col span={6} className={styles.alignLeft}>
          <span className={styles.alignLeft}>
            <b>
              <FormattedMessage id="nemo.searchParameters" />
            </b>
          </span>{" "}
          <Button
            type="link"
            onClick={() => {
              setPanelShow(!show);
            }}
          >
            {show ? (
              <FormattedMessage id="nemo.hide" />
            ) : (
              <FormattedMessage id="nemo.show" />
            )}
          </Button>
        </Col>
        <Col span={10} className={styles.alignLeft}>
          <PropertySort sortBy={sortBy} />
        </Col>
        <Col span={8}>
          <Button
            type="link"
            size="large"
            data-testid="include-market-price-btn"
            onClick={() => {
              // as it will be false initially so if it is false, fetch api is called and then it
              // is updated to true
              if (!includeMarketPrice) {
                const idList = getTrustYouIdListFromProperties();

                if (idList && idList.length > 0) {
                  dispatch({
                    type: supplySearchActions.SET_INCLUDE_MARKET_PRICE_FLAG,
                    payload: !includeMarketPrice,
                  });
                  getMarketPricesForListOfProperties();
                } else {
                  message.info(
                    intl.formatMessage({
                      id: "nemo.marketPriceNotPresentForProperties",
                    })
                  );
                }
              } else {
                dispatch({
                  type: supplySearchActions.SET_INCLUDE_MARKET_PRICE_FLAG,
                  payload: !includeMarketPrice,
                });
              }
            }}
            className={includeMarketPrice ? styles.marketPricePresent : styles.marketPriceAbsent}
          >
            + &nbsp;
            <FormattedMessage id="nemo.includeMarketPrice" />
          </Button>
        </Col>
      </Row>
      <Row>
        {show ? (
          <Col span={6}>
            <SearchSettingsResultsPage isEditFlow={props.isEditFlow} />
          </Col>
        ) : (
          <Fragment />
        )}
        <Col span={show ? 18 : 24}>
          <SearchedPropertyList
            prev={props.prev}
            show={show}
            isEditFlow={props.isEditFlow}
          />
        </Col>
      </Row>

      {!loading && properties && properties.length > 0 ? (
        <SearchResultPagination />
      ) : (
        <Fragment />
      )}
    </Fragment>
  );
}
