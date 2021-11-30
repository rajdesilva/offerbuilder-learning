import React, { Fragment } from "react";
import { Row, Col, Form, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import NemoSelect from "./NemoSelect";
import { FormattedMessage } from "react-intl";
import { supplySearchActions } from "../browseSupply/actions";
import styles from "./css/OnlySupplier.module.less";

function OnlySupplier(props) {
  const dispatch = useDispatch();
  const { channels, loading } = useSelector((state) => ({
    channels: window.getValue(state, "channelinfo.channels"),
    loading: window.getValue(state, "channelinfo.loading"),
  }));
  return loading ? (
    <Row gutter={[8, 8]}>
      <Col span={4} className="col1-text"></Col>
      <Spin className={styles["brand-spinner"]} />
    </Row>
  ) : channels.length === 0 ? (
    <Row gutter={[8, 8]}>
      <Col span={4} className="col1-text"></Col>
      <FormattedMessage id="nemo.noChannelsFound" />
    </Row>
  ) : (
    <Row gutter={[8, 8]}>
      {props.isForSearchResultsPage ? (
        <Fragment />
      ) : (
        <Col span={4} className="col1-text"></Col>
      )}
      <Col span={props.isForSearchResultsPage ? 10 : 6}>
        <Form.Item
          name={["target", "suppliers"]}
          label={<FormattedMessage id="nemo.supplier" />}
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage id="nemo.pleaseSelectAtleastOneSupplier" />
              ),
            },
          ]}
          className={styles["brand-config-channel"]}
          initialValue={props.form.getFieldValue(["suppliers"])}
        >
          <NemoSelect
            data-testid="supplier-select"
            mode="multiple"
            id="brw-search-supply"
            optionsList={[
              {
                id: "ntp",
                name: "NTP",
              },
            ]}
            onChange={(value) => {
              dispatch({
                type: supplySearchActions.SUPPLY_SEARCH_UPDATE_SUPPLIERS,
                payload: value.map((channel) => JSON.parse(channel)),
              });
            }}
            defaultValue={props.form.getFieldValue(["suppliers"])}
          />
        </Form.Item>
      </Col>
      <Col span={props.isForSearchResultsPage ? 14 : 7}>
        <Form.Item
          name={["target", "channels"]}
          label={<FormattedMessage id="nemo.channelsOnlyForNtp" />}
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage id="nemo.pleaseSelectAtleastOneChannels" />
              ),
            },
          ]}
          className={styles["onlysupplier-channel"]}
          initialValue={props.form.getFieldValue([
            "suppliers",
            "0",
            "channels",
          ])}
        >
          <NemoSelect
            data-testid="channels-select"
            mode="multiple"
            id="brw-search-channel"
            maxTagCount={2}
            optionsList={channels}
            onChange={(value) => {
              dispatch({
                type: supplySearchActions.SUPPLY_SEARCH_UPDATE_CHANNELS,
                payload: value.map((channel) => JSON.parse(channel)),
              });
            }}
            defaultValue={props.form.getFieldValue([
              "suppliers",
              "0",
              "channels",
            ])}
          />
        </Form.Item>
      </Col>
    </Row>
  );
}

export default OnlySupplier;
