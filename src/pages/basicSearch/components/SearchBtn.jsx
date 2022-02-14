import { Button, Col, Row } from "antd";
import React, { Fragment } from "react";
import { FormattedMessage } from "react-intl";
import styles from './css/SearchBtn.module.less';

export function SearchBtn(props) {
  return props.isBrowseSupplyPage || props.isForSearchResultsPage ? (
    <Row >
      {props.isForSearchResultsPage || props.isBrowseSupplyPage ? (
        <Col span={4}></Col>
      ) : (
        <Fragment />
      )}
      <Col span={props.isForSearchResultsPage ? process.env.REACT_APP_HIDE_CLIENT_AND_STORE ? 23 : 24 : 6}>
        <Button
          type="primary"
          htmlType="submit"
          className={props.isForSearchResultsPage ? styles['search-results-page-btn'] : ''}
          size="default"
          
        >
          <FormattedMessage id="nemo.search" />
        </Button>
      </Col>
    </Row>
  ) : (
    <Fragment />
  );
}
