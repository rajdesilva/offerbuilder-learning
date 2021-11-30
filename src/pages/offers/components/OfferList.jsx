import React, { Fragment, useEffect, useState, useCallback } from "react";
import { Row, Col, Button, Tabs, Divider, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FormattedMessage, useIntl } from "react-intl";
import ActiveOffers from "./ActiveOffers";
import { offerListSearchAndFilterActions } from "../actions";
import ArchiveOffers from "./ArchiveOffers";
import OfferFilters from "./OfferFilters";
import { searchAndFilterOffer } from "../service";
import { appConstants } from "../../../common";
import { isEqual } from "lodash";
import {
  checkIfUserHasRole,
  resetApplicationReduxAndStorage,
} from "../../../helpers/utility";
import { history } from "../../../helpers";

const { Search } = Input;
const { TabPane } = Tabs;
function OfferList() {
  const intl = useIntl();
  const [reset, setReset] = useState(false);
  const dispatch = useDispatch();
  const { searchInputText } = useSelector(
    (state) =>
      window.getValue(state, "offerlistsearchandfilters.appliedFilters"),
    isEqual
  );
  const selectedTab = useSelector(
    (state) => window.getValue(state, "offerlistsearchandfilters.selectedTab"),
    isEqual
  );
  const [currentSelectedTab, setCurrentSelectedTab] = useState(selectedTab);

  useEffect(() => {
    searchAndFilterOffer(currentSelectedTab);
  }, [currentSelectedTab, dispatch]);

  const processSearchedTerm = useCallback(
    (e) => {
      const finalSearchKey = e ? (e.target ? e.target.value : e) : "";

      if (searchInputText === "" && finalSearchKey === "") {
        return;
      }
      // reset page offset and pagesize for new search
      dispatch({
        type: offerListSearchAndFilterActions.OFFER_LIST_PAGE_SIZE,
        payload: 10,
      });
      dispatch({
        type: offerListSearchAndFilterActions.OFFER_LIST_PAGE_OFFSET,
        payload: 0,
      });
      dispatch({
        type: offerListSearchAndFilterActions.APPLY_SEARCH_KEY,
        payload: finalSearchKey,
      });
      searchAndFilterOffer(currentSelectedTab);
    },
    [currentSelectedTab, dispatch, searchInputText]
  );
  return (
    <div className="wrapper">
      <Row justify="space-between">
        <Col>
          <h2>
            <FormattedMessage id="nemo.offerList" />
          </h2>
        </Col>

        {checkIfUserHasRole(appConstants.USER_ROLE.ADMIN) ||
        checkIfUserHasRole(appConstants.USER_ROLE.EDITOR) ? (
          <Col>
            <Button
              data-testid="add-offers-btn"
              type="primary"
              size="large"
              onClick={() => {
                resetApplicationReduxAndStorage();
                history.push("/offers/create-new-offer");
              }}
            >
              <Link to="/offers/create-new-offer">
                +&nbsp;
                <FormattedMessage id="nemo.add" />
                &nbsp;
                <FormattedMessage id="nemo.offers" />
              </Link>
            </Button>
          </Col>
        ) : (
          <Fragment />
        )}
      </Row>
      <Divider />
      <Row justify="space-between">
        <Col span="6">
          <Search
            allowClear
            enterButton={
              <Button
                data-testid="offer-list-search-input-button"
                icon={<SearchOutlined />}
              />
            }
            onSearch={processSearchedTerm}
            defaultValue={searchInputText}
            data-testid="offer-list-search-input"
            placeholder={intl.formatMessage({
              id: "nemo.search",
            })}
            onPressEnter={processSearchedTerm}
          />
        </Col>
        <Col>
          <OfferFilters
            currentSelectedTab={currentSelectedTab}
            key={reset}
            resetCallback={() => setReset(!reset)}
          />
        </Col>
      </Row>
      <Tabs
        defaultActiveKey={currentSelectedTab}
        destroyInactiveTabPane
        onChange={(tabKey) => {
          setCurrentSelectedTab(tabKey);
          dispatch({
            type: offerListSearchAndFilterActions.RESET_OFFERS_PAGINATION,
          });
          dispatch({
            type: offerListSearchAndFilterActions.SELECTED_TAB_KEY,
            payload: tabKey,
          });
        }}
      >
        <TabPane
          forceRender
          tab={intl.formatMessage({
            id: "nemo.active",
          })}
          key={appConstants.offerListTab.ACTIVE}
        >
          <ActiveOffers />
        </TabPane>
        <TabPane
          forceRender
          tab={intl.formatMessage({
            id: "nemo.archive",
          })}
          key={appConstants.offerListTab.ARCHIVE}
        >
          <ArchiveOffers />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default OfferList;
