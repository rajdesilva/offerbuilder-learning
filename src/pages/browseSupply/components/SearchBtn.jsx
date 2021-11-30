import { Button, Col, Row } from "antd";
import React, { Fragment } from "react";
import { FormattedMessage } from "react-intl";
import styles from './css/SearchBtn.module.less';

export function SearchBtn(props) {
  return props.isBrowseSupplyPage || props.isForSearchResultsPage ? (
    <Row gutter={[8, 8]}>
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
          size="large"
          onClick={() =>
            props.isForSearchResultsPage || props.isBrowseSupplyPage
              ? window.scrollTo(0, 0)
              : null
          }
          data-testid="browse-supply-search-submit-btn"
        >
          <FormattedMessage id="nemo.search" />
        </Button>
      </Col>
    </Row>
  ) : (
    <Fragment />
  );
}
