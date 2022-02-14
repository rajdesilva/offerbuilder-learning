import React, { Fragment } from "react";
import { Row, Col, Button, Divider } from "antd";
import { SettingsPropertyList } from "./SettingsPropertyList";
import { FormattedMessage } from "react-intl";
import { browseSupplyActions, supplySearchActions } from "../../browseSupply/actions";
import { useDispatch } from "react-redux";

function TravelProduct({ prev, isEditFlow, showAddPropertiesFlow }) {
  const dispatch = useDispatch();
  return (
    <Fragment>
      <Row gutter={[8, 8]} >
        <Col span={6}>
          <h3>
            <FormattedMessage id="nemo.travelProduct" />
          </h3>
        </Col>
      </Row>
      <Row gutter={[8, 8]} >
        <Col span={4} className="col1-text">
          <FormattedMessage id="nemo.properties" />
        </Col>
        <Col span={4}>
          <Button
            data-testid="prev-btn-travel-product"
            type={"primary"}
            ghost
            block
            onClick={() => {
              dispatch({
                type: browseSupplyActions.RESET_TEMP_EDITED_BRANDS,
              });
              if (isEditFlow) {
                dispatch({
                  type: browseSupplyActions.RESET_SEARCHED_PROPERTIES,
                });
                dispatch({
                  type: supplySearchActions.RESET_SEARCH_PARAM_STATE,
                });
                showAddPropertiesFlow();
              } else {
                prev();
              }
              window.scrollTo(0, 0);
            }}
          >
            +&nbsp;
            <FormattedMessage id="nemo.addProperties" />
          </Button>
        </Col>
      </Row>

      <Row gutter={[8, 8]} >
        <Col span={4} className="col1-text"></Col>
        <Col span={20}>
          <SettingsPropertyList />
        </Col>
      </Row>
      <Divider />
    </Fragment>
  );
}

export default TravelProduct;
