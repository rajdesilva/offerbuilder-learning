import React, { Fragment, useState } from "react";
import { Row, Col, Form, Button } from "antd";
import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import NemoSelect from "./NemoSelect";
import { useDispatch, useSelector } from "react-redux";
import ConfirmRemoveSupplierModal from "./ConfirmRemoveSupplierModal";
import { FormattedMessage } from "react-intl";
import {
  checkIfMultipleChannelPresentForTarget,
  checkIfMultipleStorefrontPresentForTarget,
  checkIfMultipleSupplierPresentForTarget,
  getListOfPropertiesForChannels,
  getListOfPropertiesForStorefront,
  getListOfPropertiesForSupplier,
} from "../../helpers/utility";
import { newOfferActions } from "../offers/actions";
import { supplySearchActions } from "../browseSupply/actions";
import styles from "./css/BrandConfig.module.less";

const resetForm = (callback) => setTimeout(callback, 0);
function BrandConfig(props) {
  const dispatch = useDispatch();
  const [removedObjectInfo, setRemovedObjectInfo] = useState({});
  const hideModal = () => {
    setRemovedObjectInfo({});
  };

  const { storefronts, selectedProperties, channels } = useSelector(
    (state) => ({
      storefronts: window.getValue(
        state,
        `sourceinfo.brands[${props.field.name}].storefronts`
      ),
      channels: window.getValue(state, "channelinfo.channels"),
      selectedProperties: window.getValue(state, "propertycart.cartItems"),
    })
  );

  const [empty, setNonEmpty] = useState(true);

  const RemoveStorefrontBtn = (field, index, remove) => {
    return (
      <MinusCircleOutlined
        className="storefront-minus"
        data-testid="remove-storefront"
        onClick={() => {
          if (props.isSettingsPage) {
            if (selectedProperties && selectedProperties.length > 0) {
              const isMultipleStorefrontPresent =
                checkIfMultipleStorefrontPresentForTarget(
                  props.form.getFieldValue([
                    "brands",
                    props.field.name,
                    "storefronts",
                    index,
                  ])
                );
              const propertiesForStorefront = getListOfPropertiesForStorefront(
                props.form.getFieldValue([
                  "brands",
                  props.field.name,
                  "storefronts",
                  index,
                ])
              );
              if (
                props.form.getFieldValue([
                  "brands",
                  props.field.name,
                  "storefronts",
                  index,
                ]) &&
                !isMultipleStorefrontPresent &&
                propertiesForStorefront.length > 0
              ) {
                setRemovedObjectInfo({
                  isStorefront: true,
                  brandIndex: props.field.name,
                  storefrontIndex: index,
                  properties: propertiesForStorefront,
                  value: props.form.getFieldValue([
                    "brands",
                    props.field.name,
                    "storefronts",
                    index,
                  ]),
                  removeStoreFront: () => {
                    remove(field.name);
                    resetForm(props.form.resetFields);
                  },
                });
              } else {
                remove(field.name);
                dispatch({
                  type: newOfferActions.NEW_OFFER_REMOVE_STOREFRONT,
                  payload: {
                    brandIndex: props.field.name,
                    storefrontIndex: index,
                  },
                });
                resetForm(props.form.resetFields);
              }
            } else {
              remove(field.name);
              dispatch({
                type: newOfferActions.NEW_OFFER_REMOVE_STOREFRONT,
                payload: {
                  brandIndex: props.field.name,
                  storefrontIndex: index,
                },
              });
              resetForm(props.form.resetFields);
            }
          } else {
            remove(field.name);
            dispatch({
              type: supplySearchActions.SEARCH_REMOVE_STOREFRONT,
              payload: {
                brandIndex: props.field.name,
                storefrontIndex: index,
              },
            });
            resetForm(props.form.resetFields);
          }
        }}
      />
    );
  };

  return (
    <Fragment>
      <Form.List name={[props.field.name, "storefronts"]}>
        {(fields, { add, remove }) => {
          if (fields.length === 0 && empty) {
            add();
            setNonEmpty(false);
          }

          return (
            <div>
              {fields.map((field, index) => {
                return (
                  <Row
                    gutter={[8, 8]}
                    key={field.key}
                  >
                    {props.isForSearchResultsPage ? (
                      <Fragment />
                    ) : (
                      <Col span={4} className="col-1-text"></Col>
                    )}
                    <Col
                      span={
                        props.isForSearchResultsPage
                          ? 19
                          : process.env.REACT_APP_HIDE_CLIENT_AND_STORE
                          ? 0
                          : 4
                      }
                      offset={props.isForSearchResultsPage ? 2 : 0}
                    >
                      <Form.Item
                        colon={false}
                        name={[field.name, "name"]}
                        className={styles["dynamic-form"]}
                        hidden={process.env.REACT_APP_HIDE_CLIENT_AND_STORE}
                        rules={[
                          {
                            required:
                              !process.env.REACT_APP_HIDE_CLIENT_AND_STORE,
                            message: (
                              <FormattedMessage id="nemo.pleaseSelectStorefront" />
                            ),
                          },
                        ]}
                        label={
                          index === 0 ? (
                            <FormattedMessage id="nemo.storefront" />
                          ) : props.isForSearchResultsPage ? (
                            <FormattedMessage id="nemo.storefront" />
                          ) : (
                            ""
                          )
                        }
                      >
                        <NemoSelect
                          mode=""
                          data-testid="brand-nemo-select"
                          id={
                            props.field.name +
                            index +
                            "search-supply-storefront"
                          }
                          defaultValue={props.form.getFieldValue([
                            "brands",
                            props.field.name,
                            "storefronts",
                            index,
                          ])}
                          optionsList={storefronts}
                          onChange={(value) => {
                            if (props.isSettingsPage) {
                              dispatch({
                                type: newOfferActions.NEW_OFFER_UPDATE_STOREFRONT,
                                payload: {
                                  value: JSON.parse(value),
                                  brandIndex: props.field.name,
                                  storefrontIndex: index,
                                },
                              });
                            } else {
                              dispatch({
                                type: supplySearchActions.SEARCH_UPDATE_STOREFRONT,
                                payload: {
                                  value: JSON.parse(value),
                                  brandIndex: props.field.name,
                                  storefrontIndex: index,
                                },
                              });
                            }
                          }}
                        />
                      </Form.Item>
                    </Col>
                    {process.env.REACT_APP_HIDE_CLIENT_AND_STORE ? (
                      <Fragment />
                    ) : props.isForSearchResultsPage && index >= 1 ? (
                      <Col>{RemoveStorefrontBtn(field, index, remove)}</Col>
                    ) : (
                      <Fragment />
                    )}
                    <Col
                      span={props.isForSearchResultsPage ? 20 : 7}
                      offset={
                        props.isForSearchResultsPage
                          ? process.env.REACT_APP_HIDE_CLIENT_AND_STORE
                            ? 0
                            : 4
                          : 0
                      }
                    >
                      <Form.Item
                        colon={false}
                        name={[field.name, "suppliers", 0, "name"]}
                        className={styles["dynamic-form"]}
                        rules={[
                          {
                            required: true,
                            message: (
                              <FormattedMessage id="nemo.pleaseSelectAtleastOneSupplier" />
                            ),
                          },
                        ]}
                        label={
                          index === 0 ? (
                            <FormattedMessage id="nemo.supplier" />
                          ) : props.isForSearchResultsPage ? (
                            <FormattedMessage id="nemo.supplier" />
                          ) : (
                            ""
                          )
                        }
                      >
                        <NemoSelect
                          data-testid="brw-search-supply"
                          mode="multiple"
                          id={props.field.name + index + "brw-search-supply"}
                          optionsList={storefronts[index].suppliers}
                          defaultValue={props.form.getFieldValue([
                            "brands",
                            props.field.name,
                            "storefronts",
                            index,
                            "suppliers",
                          ])}
                          onSelect={(value) => {
                            if (props.isSettingsPage) {
                              dispatch({
                                type: newOfferActions.NEW_OFFER_UPDATE_SUPPLIERS,
                                payload: {
                                  value: JSON.parse(value),
                                  brandIndex: props.field.name,
                                  storefrontIndex: index,
                                },
                              });
                            } else {
                              dispatch({
                                type: supplySearchActions.SEARCH_UPDATE_SUPPLIER,
                                payload: {
                                  value: JSON.parse(value),
                                  brandIndex: props.field.name,
                                  storefrontIndex: index,
                                },
                              });
                            }
                          }}
                          onDeselect={(value) => {
                            if (props.isSettingsPage) {
                              if (
                                selectedProperties &&
                                selectedProperties.length > 0
                              ) {
                                const isMulipleSupplierPresent =
                                  checkIfMultipleSupplierPresentForTarget(
                                    JSON.parse(value)
                                  );
                                const propertiesForSupplier =
                                  getListOfPropertiesForSupplier(
                                    JSON.parse(value)
                                  );
                                if (
                                  !isMulipleSupplierPresent &&
                                  propertiesForSupplier.length > 0
                                ) {
                                  setRemovedObjectInfo({
                                    isSupplier: true,
                                    brandIndex: props.field.name,
                                    storefrontIndex: index,
                                    properties: propertiesForSupplier,
                                    value: JSON.parse(value),
                                    onCancelRemove: () =>
                                      props.form.resetFields(),
                                  });
                                } else {
                                  dispatch({
                                    type: newOfferActions.NEW_OFFER_UPDATE_SUPPLIERS,
                                    payload: {
                                      value: JSON.parse(value),
                                      brandIndex: props.field.name,
                                      storefrontIndex: index,
                                    },
                                  });
                                }
                              } else {
                                dispatch({
                                  type: newOfferActions.NEW_OFFER_UPDATE_SUPPLIERS,
                                  payload: {
                                    value: JSON.parse(value),
                                    brandIndex: props.field.name,
                                    storefrontIndex: index,
                                  },
                                });
                              }
                            } else {
                              dispatch({
                                type: supplySearchActions.SEARCH_UPDATE_SUPPLIER,
                                payload: {
                                  value: JSON.parse(value),
                                  brandIndex: props.field.name,
                                  storefrontIndex: index,
                                },
                              });
                            }
                          }}
                        />
                      </Form.Item>
                    </Col>
                    <Col
                      span={props.isForSearchResultsPage ? 18 : 7}
                      offset={
                        props.isForSearchResultsPage
                          ? process.env.REACT_APP_HIDE_CLIENT_AND_STORE
                            ? 0
                            : 6
                          : 0
                      }
                    >
                      <Form.Item
                        colon={false}
                        name={[field.name, "suppliers", 0, "channels"]}
                        className={`${styles["dynamic-form"]} ${styles["brand-config-channel"]}`}
                        rules={[
                          {
                            required: true,
                            message: (
                              <FormattedMessage id="nemo.pleaseSelectAtleastOneChannels" />
                            ),
                          },
                        ]}
                        label={
                          index === 0 ? (
                            <FormattedMessage id="nemo.channelsOnlyForNtp" />
                          ) : props.isForSearchResultsPage ? (
                            <FormattedMessage id="nemo.channelsOnlyForNtp" />
                          ) : (
                            ""
                          )
                        }
                      >
                        <NemoSelect
                          mode="multiple"
                          id={props.field.name + index + "brand-search-channel"}
                          maxTagCount={1}
                          optionsList={
                            props.isBrowseSupplyPage
                              ? channels
                              : storefronts[index].suppliers[0].channels
                          }
                          defaultValue={props.form.getFieldValue([
                            "brands",
                            props.field.name,
                            "storefronts",
                            index,
                            "suppliers",
                            index,
                            "channels",
                          ])}
                          onSelect={(value) => {
                            if (props.isSettingsPage) {
                              dispatch({
                                type: newOfferActions.NEW_OFFER_UPDATE_CHANNELS,
                                payload: {
                                  value: JSON.parse(value),
                                  brandIndex: props.field.name,
                                  storefrontIndex: index,
                                  supplierIndex: 0, // TODO: hardcoded for now
                                },
                              });
                            } else {
                              dispatch({
                                type: supplySearchActions.SEARCH_UPDATE_CHANNEL,
                                payload: {
                                  value: JSON.parse(value),
                                  brandIndex: props.field.name,
                                  storefrontIndex: index,
                                  supplierIndex: 0, // TODO: hardcoded for now
                                },
                              });
                            }
                          }}
                          onDeselect={(value) => {
                            if (props.isSettingsPage) {
                              if (
                                selectedProperties &&
                                selectedProperties.length > 0
                              ) {
                                const isMulipleChannelPresent =
                                  checkIfMultipleChannelPresentForTarget(
                                    JSON.parse(value)
                                  );
                                const propertiesForChannel =
                                  getListOfPropertiesForChannels(
                                    JSON.parse(value)
                                  );
                                if (
                                  !isMulipleChannelPresent &&
                                  propertiesForChannel.length > 0
                                ) {
                                  setRemovedObjectInfo({
                                    isSupplier: false,
                                    brandIndex: props.field.name,
                                    storefrontIndex: index,
                                    properties: propertiesForChannel,
                                    supplierIndex: 0, // TODO: hardcoded for now
                                    value: JSON.parse(value),
                                    onCancelRemove: () =>
                                      props.form.resetFields(),
                                  });
                                } else {
                                  dispatch({
                                    type: newOfferActions.NEW_OFFER_REMOVE_CHANNEL,
                                    payload: {
                                      value: JSON.parse(value),
                                      brandIndex: props.field.name,
                                      storefrontIndex: index,
                                      supplierIndex: 0, // TODO: hardcoded for now
                                    },
                                  });
                                }
                              } else {
                                dispatch({
                                  type: newOfferActions.NEW_OFFER_REMOVE_CHANNEL,
                                  payload: {
                                    value: JSON.parse(value),
                                    brandIndex: props.field.name,
                                    storefrontIndex: index,
                                    supplierIndex: 0, // TODO: hardcoded for now
                                  },
                                });
                              }
                            } else {
                              dispatch({
                                type: supplySearchActions.SEARCH_REMOVE_CHANNEL,
                                payload: {
                                  value: JSON.parse(value),
                                  brandIndex: props.field.name,
                                  storefrontIndex: index,
                                  supplierIndex: 0, // TODO: hardcoded for now
                                },
                              });
                            }
                          }}
                        />
                      </Form.Item>
                    </Col>
                    {process.env.REACT_APP_HIDE_CLIENT_AND_STORE ? (
                      <Fragment />
                    ) : !props.isForSearchResultsPage && index >= 1 ? (
                      RemoveStorefrontBtn(field, index, remove)
                    ) : (
                      <Fragment />
                    )}
                    {process.env.REACT_APP_HIDE_CLIENT_AND_STORE ? (
                      <Fragment />
                    ) : storefronts[index + 1] ? (
                      fields.length - 1 === index ? (
                        <Button
                          type="link"
                          onClick={() => {
                            add();
                            if (props.isSettingsPage) {
                              dispatch({
                                type: newOfferActions.NEW_OFFER_ADD_ROW_STOREFRONT,
                                payload: {
                                  brandIndex: props.field.name,
                                },
                              });
                            } else {
                              dispatch({
                                type: supplySearchActions.SEARCH_ADD_ROW_STOREFRONT,
                                payload: {
                                  brandIndex: props.field.name,
                                },
                              });
                            }
                          }}
                          icon={
                            <PlusCircleOutlined
                              className={
                                props.isForSearchResultsPage
                                  ? styles["add-store-btn-left-panel"]
                                  : index >= 1
                                  ? styles["add-store-second-btn"]
                                  : styles["add-store-first-btn"]
                              }
                              data-testid={"add-storefront"}
                            ></PlusCircleOutlined>
                          }
                        >
                          {" "}
                          {props.isForSearchResultsPage ? (
                            <FormattedMessage id="nemo.addStorefront" />
                          ) : (
                            <Fragment />
                          )}
                        </Button>
                      ) : (
                        <Fragment />
                      )
                    ) : (
                      <Fragment />
                    )}
                  </Row>
                );
              })}
            </div>
          );
        }}
      </Form.List>
      {removedObjectInfo && removedObjectInfo.value ? (
        <ConfirmRemoveSupplierModal
          removedObjectInfo={removedObjectInfo}
          hideModal={hideModal}
        />
      ) : (
        <Fragment />
      )}
    </Fragment>
  );
}

export default BrandConfig;
