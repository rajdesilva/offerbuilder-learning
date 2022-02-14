import React, { Fragment, useState } from "react";
import { Row, Col, Form, Button, Spin, Divider } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";

import BrandConfig from "./BrandConfig";
import NemoSelect from "./NemoSelect";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { newOfferActions } from "../offers/actions";
import {
  checkIfMultipleBrandPresentForTarget,
  getListOfPropertiesForBrand,
  labelForBrands,
} from "../../helpers/utility";
import ConfirmRemoveSupplierModal from "./ConfirmRemoveSupplierModal";
import { supplySearchActions } from "../browseSupply/actions";
import styles from "./css/Brands.module.less";

function Brands(props) {
  const [removedObjectInfo, setRemovedObjectInfo] = useState({});
  const dispatch = useDispatch();
  const isBrowseSupplyPage = useRouteMatch({
    path: "/browse-supply/",
    strict: true,
    sensitive: true,
  });
  const { brands, loading, selectedProperties } = useSelector((state) => ({
    brands: window.getValue(state, `sourceinfo.brands`),
    loading: window.getValue(state, `sourceinfo.loading`),
    selectedProperties: window.getValue(state, "propertycart.cartItems"),
  }));
  const hideModal = () => {
    setRemovedObjectInfo({});
  };

  const removebrandBtn = () => {
    return (
      <Button
        type="text"
        data-testid="remove-source-btn"
        className={styles["brand-remove-btn"]}
        icon={<MinusCircleOutlined className={styles["minus-btn-icon"]} />}
        onClick={() => {
          if (props.isSettingsPage) {
            if (selectedProperties && selectedProperties.length > 0) {
              const isDuplicateBrandPresent =
                checkIfMultipleBrandPresentForTarget(
                  props.form.getFieldValue(["brands", props.field.key])
                );
              const propertiesForBrand = getListOfPropertiesForBrand(
                props.form.getFieldValue(["brands", props.field.key])
              );
              if (
                !isDuplicateBrandPresent &&
                propertiesForBrand &&
                propertiesForBrand.length > 0
              ) {
                setRemovedObjectInfo({
                  isBrand: true,
                  brandIndex: props.field.name,
                  properties: propertiesForBrand,
                  value: props.form.getFieldValue(["brands", props.field.key]),
                  removeBrand: () => {
                    props.remove(props.field.name);
                  },
                });
              } else {
                props.remove(props.field.name);
                dispatch({
                  type: newOfferActions.NEW_OFFER_REMOVE_BRAND,
                  payload: props.field.name, // index of the brand to be removed
                });
              }
            } else {
              props.remove(props.field.name);
              dispatch({
                type: newOfferActions.NEW_OFFER_REMOVE_BRAND,
                payload: props.field.name, // index of the brand to be removed
              });
            }
          } else {
            props.remove(props.field.name);
            dispatch({
              type: supplySearchActions.SEARCH_REMOVE_BRAND,
              payload: props.field.name, // index of the brand to be removed
            });
          }
        }}
      >
        {props.isForSearchResultsPage ? (
          <Fragment />
        ) : (
          <Fragment>
            &nbsp;
            <FormattedMessage id="nemo.removeThisSource" />
          </Fragment>
        )}
      </Button>
    );
  };

  return loading ? (
    <Row gutter={[8, 8]}>
      <Col span={4} className="col1-text"></Col>
      <Spin className={styles["brand-spinner"]} />
    </Row>
  ) : brands.length === 0 ? (
    <Row gutter={[8, 8]}>
      <Col span={4} className="col1-text"></Col>
      <FormattedMessage id="nemo.noBrandsFound" />
    </Row>
  ) : (
    <React.Fragment>
      {process.env.REACT_APP_HIDE_CLIENT_AND_STORE ? (
        <Row gutter={[8, 8]}>
          {!props.isForSearchResultsPage ? (
            <Col span={4} className="col1-text">
              {labelForBrands(props, isBrowseSupplyPage)}
            </Col>
          ) : (
            <Fragment />
          )}
        </Row>
      ) : (
        <Row gutter={[8, 8]}>
          {!props.isForSearchResultsPage ? (
            <Col span={4} className="col1-text">
              {labelForBrands(props, isBrowseSupplyPage)}
            </Col>
          ) : (
            <Fragment />
          )}
          <Col span={props.isForSearchResultsPage ? 18 : 4}>
            <Form.Item
              data-testid="brand"
              label={<FormattedMessage id="nemo.brand" />}
              name={[props.field.name, "name"]}
              colon={false}
              hidden={process.env.REACT_APP_HIDE_CLIENT_AND_STORE}
              className={styles["dynamic-form"]}
              rules={[
                {
                  required: !process.env.REACT_APP_HIDE_CLIENT_AND_STORE,
                  message: <FormattedMessage id="nemo.pleaseSelectBrand" />,
                },
              ]}
            >
              <NemoSelect
                data-testid="select-brand"
                mode=""
                id="search-supply-brand"
                optionsList={brands}
                defaultValue={{
                  name: { id: "idb", name: "Internal Demo Brand" },
                  storefronts: [
                    {
                      name: { id: "ids", name: "Internal Demo Storefront" },
                      suppliers: [
                        {
                          channels: [
                            {
                              id: "DEMO_OFFERBUILDER",
                              name: "DEMO_OFFERBUILDER",
                            },
                          ],
                          name: [{ id: "ntp", name: "NTP" }],
                        },
                      ],
                    },
                  ],
                }}
                onChange={(value) => {
                  if (props.isSettingsPage) {
                    dispatch({
                      type: newOfferActions.NEW_OFFER_UPDATE_BRAND,
                      payload: {
                        brandInfo: JSON.parse(value),
                        brandIndex: props.field.name,
                      },
                    });
                  } else {
                    dispatch({
                      type: supplySearchActions.SEARCH_UPDATE_BRAND,
                      payload: {
                        brandInfo: JSON.parse(value),
                        brandIndex: props.field.name,
                      },
                    });
                  }
                }}
              />
            </Form.Item>
          </Col>
          {props.isForSearchResultsPage && props.field.key >= 1 ? (
            <Col>{removebrandBtn()}</Col>
          ) : props.field.key >= 1 ? (
            removebrandBtn()
          ) : (
            <Fragment></Fragment>
          )}
        </Row>
      )}
      <BrandConfig
        data-testid="brand-config-2"
        {...props}
        isBrowseSupplyPage={isBrowseSupplyPage}
      />
      {process.env.REACT_APP_HIDE_CLIENT_AND_STORE ? (
        <Fragment />
      ) : (
        <Row gutter={[8, 8]}>
          <Col span={6} className="col1-text"></Col>
          <Col span={18}>
            <Divider />
          </Col>
        </Row>
      )}
      {removedObjectInfo && removedObjectInfo.value ? (
        <ConfirmRemoveSupplierModal
          removedObjectInfo={removedObjectInfo}
          hideModal={hideModal}
        />
      ) : (
        <Fragment />
      )}
    </React.Fragment>
  );
}

export default Brands;
