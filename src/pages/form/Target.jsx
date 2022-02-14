import React, { Fragment, useState } from "react";
import { Row, Col, Switch, Form, Button } from "antd";
import { PlusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import Brands from "./Brands";
import OnlySupplier from "./OnlySupplier";
import { useRouteMatch } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { newOfferActions } from "../offers/actions";
import { useDispatch } from "react-redux";
import { supplySearchActions } from "../browseSupply/actions";
import { history } from "../../helpers";
import styles from "./css/Target.module.less";

function Target(props) {
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(
    props.form.getFieldValue("onlySupplier")
  );
  const isBrowseSupplyPage = useRouteMatch({
    path: "/browse-supply/:page?",
    strict: true,
    sensitive: true,
  });

  const [ setNonEmpty] = useState(true);
  return (
    <React.Fragment>
      {isBrowseSupplyPage ? (
        <Row gutter={[8, 8]}>
          {props.isForSearchResultsPage ? (
            <Fragment />
          ) : (
            <Col span={4} className="col1-text">
              <FormattedMessage id="nemo.target" />
            </Col>
          )}
          {process.env.REACT_APP_HIDE_CLIENT_AND_STORE ? (
            <Fragment />
          ) : (
            <Col span={8}>
              <Form.Item
                name="onlySupplier"
                noStyle={!props.isForSearchResultsPage}
                valuePropName="checked"
              >
                <Switch
                  data-testid="supplier-switch"
                  onChange={(value) => {
                    // update a specific URL params from query string
                    let currentUrlParams = new URLSearchParams(
                      history.location.search
                    );
                    currentUrlParams.set("onlySupplier", value);
                    history.push(
                      history.location.pathname +
                        "?" +
                        currentUrlParams.toString()
                    );
                    setToggle(value);
                    dispatch({
                      type:
                        supplySearchActions.SUPPLY_SEARCH_UPDATE_IS_SUPPLIER,
                      payload: value,
                    });
                  }}
                />
              </Form.Item>
              <span>
                &nbsp;&nbsp;
                <FormattedMessage id="nemo.onlySupplier" />
              </span>
            </Col>
          )}
        </Row>
      ) : (
        <Fragment />
      )}
      {(isBrowseSupplyPage && toggle) ||
      !process.env.REACT_APP_HIDE_CLIENT_AND_STORE ? (
        <OnlySupplier
          form={props.form}
          isForSearchResultsPage={props.isForSearchResultsPage}
        />
      ) : (
        <Fragment />
      )}
      {!toggle || !isBrowseSupplyPage ? (
        <Form.List name="brands">
          {(fields, { add, remove }) => {
            if (fields.length === 0 ) {
              add();
              setNonEmpty(false);
              if (!props.isSettingsPage) {
                dispatch({
                  type: supplySearchActions.SEARCH_ADD_BRAND,
                  payload: {
                    storefronts: [{}],
                  },
                });
              }
            }
            return (
              <div
                className={
                  process.env.REACT_APP_HIDE_CLIENT_AND_STORE
                    ? ""
                    : styles["brand-component-display"]
                }
              >
                {fields &&
                  fields.map((field, i) => {
                    return (
                      <Brands
                        key={i}
                        field={field}
                        remove={remove}
                        isForSearchResultsPage={props.isForSearchResultsPage}
                        isSettingsPage={props.isSettingsPage}
                        isEditFlow={props.isEditFlow}
                        form={props.form}
                      />
                    );
                  })}

                {fields.length >= 2 ||
                process.env.REACT_APP_HIDE_CLIENT_AND_STORE ? (
                  <Fragment />
                ) : (
                  <Row gutter={[8, 8]}>
                    {props.isForSearchResultsPage ? (
                      <Fragment />
                    ) : (
                      <Col span={6} className="col1-text"></Col>
                    )}
                    <Col span={4}>
                      <Button
                        data-testid="add-brand"
                        type="link"
                        className={styles["add-source-btn"]}
                        onClick={() => {
                          add();
                          if (props.isSettingsPage) {
                            dispatch({
                              type: newOfferActions.NEW_OFFER_ADD_NEW_BRAND,
                              payload: {
                                storefronts: [{}],
                              },
                            });
                          } else {
                            dispatch({
                              type: supplySearchActions.SEARCH_ADD_BRAND,
                              payload: {
                                storefronts: [{}],
                              },
                            });
                          }
                        }}
                      >
                        {props.isForSearchResultsPage ? (
                          <PlusCircleOutlined size={24} />
                        ) : (
                          <PlusOutlined />
                        )}
                        &nbsp;
                        <FormattedMessage id="nemo.addBrand" />
                      </Button>
                    </Col>
                  </Row>
                )}
              </div>
            );
          }}
        </Form.List>
      ) : (
        <Fragment />
      )}
    </React.Fragment>
  );
}

export default Target;
