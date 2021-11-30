import React, { Fragment, useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import {
  Button,
  Checkbox,
  Col,
  Collapse,
  Input,
  Switch,
  Modal,
  List,
  Badge,
  message,
} from "antd";
import { FilterFilled, SearchOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { NemoSelect } from "../../form";
import { appConstants } from "../../../common";
import { offerListSearchAndFilterActions } from "../actions";
import { searchAndFilterOffer } from "../service";
import { isEqual } from "lodash";
import { checkIfUserHasRole, getFilterCount } from "../../../helpers/utility";
import styles from "./css/OfferFilters.module.less";
const { Panel } = Collapse;

export default function OfferFilters({ currentSelectedTab, resetCallback }) {
  const intl = useIntl();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  const { targetfilterdata, appliedFilters } = useSelector(
    (state) => window.getValue(state, "offerlistsearchandfilters"),
    isEqual
  );

  const [filterCount, setFilterCount] = useState(
    getFilterCount(appliedFilters, currentSelectedTab)
  );

  const [brandsSelected, setBrandsSelected] = useState(appliedFilters.brands);
  const [storefrontSelected, setStorefrontSelected] = useState(
    appliedFilters.storefronts
  );
  const [suppliersSelected, setSuppliersSelected] = useState(
    appliedFilters.suppliers
  );
  const [channelsSelected, setChannelsSelected] = useState(
    appliedFilters.channels
  );
  const [propertyTypeSelected, setPropertyTypeSelected] = useState(
    appliedFilters.propertyTypes
  );
  const [statusSelected, setStatus] = useState(
    currentSelectedTab === appConstants.offerListTab.ARCHIVE
      ? [appConstants.OFFER_STATUS_OPTIONS[2]]
      : [
          appConstants.OFFER_STATUS_OPTIONS[0],
          appConstants.OFFER_STATUS_OPTIONS[1],
        ]
  );
  useEffect(() => {
    setStatus(
      currentSelectedTab === appConstants.offerListTab.ARCHIVE
        ? [appConstants.OFFER_STATUS_OPTIONS[2]]
        : [
            appConstants.OFFER_STATUS_OPTIONS[0],
            appConstants.OFFER_STATUS_OPTIONS[1],
          ]
    );
  }, [currentSelectedTab]);
  const [lcn, setLCN] = useState();

  // for search
  const [currentBrands, setCurrentBrands] = useState();
  const [currentStorefronts, setCurrentStorefronts] = useState();
  const [currentSuppliers, setCurrentSuppliers] = useState();
  const [currentChannels, setCurrentChannels] = useState();

  const handleOk = () => {
    if (
      statusSelected &&
      statusSelected.length === 0 &&
      !(appliedFilters.status && appliedFilters.status.length > 0)
    ) {
      message.error(
        intl.formatMessage({
          id: "nemo.pleaseSelectAtLeastOneStatus",
        })
      );
      return;
    }

    dispatch({
      type: offerListSearchAndFilterActions.APPLY_OFFER_LIST_FILTERS,
      payload: {
        brands: brandsSelected,
        storefronts: storefrontSelected,
        suppliers: suppliersSelected,
        channels: channelsSelected,
        propertyTypes: propertyTypeSelected,
        lcn,
        status:
          statusSelected && statusSelected.length > 0
            ? statusSelected
            : [
                appConstants.OFFER_STATUS_OPTIONS[0],
                appConstants.OFFER_STATUS_OPTIONS[1],
              ],
      },
    });
    dispatch({
      type: offerListSearchAndFilterActions.OFFER_LIST_PAGE_OFFSET,
      payload: 0,
    });
    searchAndFilterOffer(currentSelectedTab);
    cancelModal();
  };

  const cancelModal = () => {
    setVisible(false);
  };

  const onBrandSelected = (checkedValues) => {
    setBrandsSelected(checkedValues);
  };

  const onStorefrontSelected = (checkedValues) => {
    setStorefrontSelected(checkedValues);
  };

  const onSupplierSelected = (checkedValues) => {
    setSuppliersSelected(checkedValues);
  };

  const onChannelsSelected = (checkedValues) => {
    setChannelsSelected(checkedValues);
  };

  const onSearchBrand = (e) => {
    let updatedBrands = targetfilterdata.brands;
    if (e.target.value.length > 0) {
      updatedBrands = updatedBrands.filter((brand) =>
        brand.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
    }

    setCurrentBrands(updatedBrands);
  };

  const onSearchStorefront = (e) => {
    let updatedStorefronts = targetfilterdata.storefronts;
    if (e.target.value.length > 0) {
      updatedStorefronts = updatedStorefronts.filter((storefront) =>
        storefront.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
    }
    setCurrentStorefronts(updatedStorefronts);
  };

  const onSearchSupplier = (e) => {
    let updatedSuppliers = targetfilterdata.suppliers;
    if (e.target.value.length > 0) {
      updatedSuppliers = updatedSuppliers.filter((supplier) =>
        supplier.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
    }

    setCurrentSuppliers(updatedSuppliers);
  };

  const onSearchChannel = (e) => {
    let updatedChannels = targetfilterdata.channels;
    if (e.target.value.length > 0) {
      updatedChannels = updatedChannels.filter((channel) =>
        channel.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
    }

    setCurrentChannels(updatedChannels);
  };

  useEffect(() => {
    setFilterCount(getFilterCount(appliedFilters, currentSelectedTab));
  }, [appliedFilters, currentSelectedTab]);

  return (
    <Fragment>
      <div
        className={styles.badgeContainer}
        onClick={() => {
          setVisible(true);
        }}
      >
        <Badge
          count={filterCount}
          offset={[-5, 5]}
          data-testid="offers-filter-badge"
          className={styles.badgeFilter}
        >
          <Button
            type="text"
            data-testid="filter-ic-btn"
            icon={<FilterFilled size={20} className="filter-ic" />}
          ></Button>
        </Badge>
      </div>
      <Modal
        title={
          <React.Fragment>
            <FormattedMessage id="nemo.filterBy" />
          </React.Fragment>
        }
        onCancel={cancelModal}
        visible={visible}
        closable={true}
        destroyOnClose={true}
        forceRender={true}
        data-testid="confirm-remove-supplier-modal"
        okText={<FormattedMessage id="nemo.yes" />}
        cancelText={<FormattedMessage id="nemo.cancel" />}
        footer={[
          <Button
            key="cancel"
            type="text"
            onClick={cancelModal}
            data-testid="filter-offer-cancel-btn"
          >
            <FormattedMessage id="nemo.cancel" />
          </Button>,
          <Button
            key="reset"
            onClick={() => {
              cancelModal();
              dispatch({
                type: offerListSearchAndFilterActions.RESET_OFFER_FILTER_DATA,
              });
              searchAndFilterOffer(currentSelectedTab);
              resetCallback();
            }}
            type="text"
            data-testid="filter-offer-reset-btn"
          >
            <FormattedMessage id="nemo.reset" />
          </Button>,
          <Button
            key="submit"
            type="link"
            disabled={
              currentSelectedTab === appConstants.offerListTab.ACTIVE &&
              statusSelected.length === 0
            }
            onClick={handleOk}
            data-testid="filter-offer-filter-btn"
          >
            <FormattedMessage id="nemo.apply" />
          </Button>,
        ]}
      >
        <Collapse
          defaultActiveKey={["brands"]}
          ghost
          expandIconPosition="right"
        >
          {process.env.REACT_APP_HIDE_CLIENT_AND_STORE ? (
            <Fragment />
          ) : (
            <Fragment>
              <Panel
                header={<FormattedMessage id="nemo.brands" />}
                key="brands"
                className={styles["collapse-font"]}
              >
                <Fragment>
                  <Input
                    placeholder={intl.formatMessage({
                      id: "nemo.mediumInput",
                    })}
                    size="large"
                    prefix={
                      <SearchOutlined
                        color="#1890ff"
                        className={styles.searchIcon}
                      />
                    }
                    onChange={onSearchBrand}
                  />
                  <Checkbox.Group
                    defaultValue={appliedFilters.brands}
                    onChange={onBrandSelected}
                  >
                    <List
                      dataSource={currentBrands || targetfilterdata.brands}
                      renderItem={(item) => (
                        <List.Item>
                          <Col span={24}>
                            <Checkbox value={item.id}>{item.name}</Checkbox>
                          </Col>
                        </List.Item>
                      )}
                    />
                  </Checkbox.Group>
                </Fragment>
              </Panel>
              <Panel
                header={<FormattedMessage id="nemo.targetStorefronts" />}
                key="storefronts"
              >
                <Fragment>
                  <Input
                    placeholder={intl.formatMessage({
                      id: "nemo.mediumInput",
                    })}
                    size="large"
                    prefix={<SearchOutlined className={styles.searchIcon} />}
                    onChange={onSearchStorefront}
                  />
                  <Checkbox.Group
                    defaultValue={appliedFilters.storefronts}
                    onChange={onStorefrontSelected}
                  >
                    <List
                      dataSource={
                        currentStorefronts || targetfilterdata.storefronts
                      }
                      renderItem={(item) => (
                        <List.Item>
                          <Col span={24}>
                            <Checkbox value={item.id}>{item.name}</Checkbox>
                          </Col>
                        </List.Item>
                      )}
                    />
                  </Checkbox.Group>
                </Fragment>
              </Panel>
            </Fragment>
          )}
          <Panel
            header={<FormattedMessage id="nemo.suppliers" />}
            key="suppliers"
            className={styles["collapse-font"]}
          >
            <Fragment>
              <Input
                placeholder={intl.formatMessage({
                  id: "nemo.mediumInput",
                })}
                size="large"
                prefix={<SearchOutlined className={styles.searchIcon} />}
                onChange={onSearchSupplier}
              />
              <Checkbox.Group
                defaultValue={appliedFilters.suppliers}
                onChange={onSupplierSelected}
              >
                <List
                  dataSource={currentSuppliers || targetfilterdata.suppliers}
                  renderItem={(item) => (
                    <List.Item>
                      <Col span={24}>
                        <Checkbox
                          className={styles["filter-option-font"]}
                          value={item.id}
                        >
                          {item.name}
                        </Checkbox>
                      </Col>
                    </List.Item>
                  )}
                />
              </Checkbox.Group>
            </Fragment>
          </Panel>
          <Panel
            header={<FormattedMessage id="nemo.channels" />}
            key="channels"
            className={styles["collapse-font"]}
          >
            <Fragment>
              <Input
                placeholder={intl.formatMessage({
                  id: "nemo.mediumInput",
                })}
                size="large"
                prefix={<SearchOutlined className={styles.searchIcon} />}
                onChange={onSearchChannel}
              />
              <Checkbox.Group
                defaultValue={appliedFilters.channels}
                onChange={onChannelsSelected}
              >
                <List
                  dataSource={currentChannels || targetfilterdata.channels}
                  renderItem={(item) => (
                    <List.Item>
                      <Col span={24}>
                        <Checkbox
                          className={styles["filter-option-font"]}
                          value={item.id}
                        >
                          {item.name}
                        </Checkbox>
                      </Col>
                    </List.Item>
                  )}
                />
              </Checkbox.Group>
            </Fragment>
          </Panel>
          <Panel header="LCN" key="lcn" className={styles["collapse-font"]}>
            <Switch
              className={styles["filter-option-font"]}
              data-testid="filter-lcn-switch"
              defaultChecked={appliedFilters.lcn}
              onChange={setLCN}
            />
          </Panel>
          {checkIfUserHasRole(appConstants.USER_ROLE.ADMIN) ? <Panel
            header={<FormattedMessage id="nemo.propertyType" />}
            key="propertyType"
            data-testid="property-type-filter"
            className={styles["collapse-font"]}
          >
            <Fragment>
              <Checkbox.Group
                value={[propertyTypeSelected]}
                defaultValue={[appliedFilters.propertyTypes]}
              >
                <List
                  dataSource={targetfilterdata.propertyTypes}
                  renderItem={(item) => (
                    <List.Item>
                      <Col span={24}>
                        <Checkbox
                          onChange={(e) => {
                            console.log("checked = ", e.target.value);
                            if (e.target.value) {
                              setPropertyTypeSelected(item.id);
                            } else {
                              setPropertyTypeSelected(null);
                            }
                          }}
                          className={styles["filter-option-font"]}
                          value={item.id}
                        >
                          {item.name}
                        </Checkbox>
                      </Col>
                    </List.Item>
                  )}
                />
              </Checkbox.Group>
            </Fragment>
          </Panel> : <Fragment />}
          <Panel
            header="Status"
            key="status"
            className={styles["collapse-font"]}
          >
            <NemoSelect
              data-testid="filter-offer-status"
              mode="multiple"
              className={styles["filter-offer-status-select"]}
              key={currentSelectedTab}
              disabled={
                currentSelectedTab === appConstants.offerListTab.ARCHIVE
              }
              defaultValue={
                currentSelectedTab === appConstants.offerListTab.ARCHIVE
                  ? appConstants.OFFER_STATUS_OPTIONS[2]
                  : appliedFilters.status
              }
              onChange={(value) => {
                const statusArray = value;
                setStatus(
                  statusArray.map((statusValue) => JSON.parse(statusValue))
                );
              }}
              id="filter-offer-status"
              optionsList={
                currentSelectedTab === appConstants.offerListTab.ARCHIVE
                  ? [appConstants.OFFER_STATUS_OPTIONS[2]]
                  : [
                      appConstants.OFFER_STATUS_OPTIONS[0],
                      appConstants.OFFER_STATUS_OPTIONS[1],
                    ]
              }
            />
            {currentSelectedTab === appConstants.offerListTab.ACTIVE &&
            statusSelected.length === 0 ? (
              <div className={styles["span-error-msg"]}>
                <FormattedMessage id="nemo.pleaseSelectAtLeastOneStatus" />
              </div>
            ) : (
              <Fragment />
            )}
          </Panel>
        </Collapse>
      </Modal>
    </Fragment>
  );
}
