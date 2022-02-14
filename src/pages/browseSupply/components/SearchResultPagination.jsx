import React, { Fragment } from "react";
import { Col, Row, Pagination } from "antd";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { searchSupply } from "../service";
import { supplySearchActions } from "../actions";
import { FormattedMessage } from "react-intl";
import styles from './css/SearchResultPagination.module.less';

export function SearchResultPagination() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { totalMatch, properties, pageOffset, pageSize } = useSelector(
    (state) => ({
      totalMatch: window.getValue(state, "searchedproperties.totalMatch"),
      properties: window.getValue(state, "searchedproperties.properties"),
      pageOffset: window.getValue(state, "searchparams.pageOffset"),
      pageSize: window.getValue(state, "searchparams.pageSize"),
    })
  );
  return totalMatch && properties ? (
    <Pagination
      className={styles.pagination}
      data-testid="pagination"
      total={totalMatch}
      showTotal={(total, range) => (
        <Row justify="space-between">
          <Col>
            <FormattedMessage id="nemo.displaying" /> &nbsp;
            {range[0]} - {range[1]}&nbsp;
            <FormattedMessage id="nemo.of" /> &nbsp;{total}
          </Col>
          <Col>
            <FormattedMessage id="nemo.rowPerPage" /> &nbsp;
          </Col>
        </Row>
      )}
      defaultCurrent={pageOffset + 1}
      defaultPageSize={pageSize}
      current={pageOffset + 1}
      onChange={(page) => {
        dispatch({
          type: supplySearchActions.SUPPLY_SEARCH_UPDATE_PAGE_OFFSET,
          payload: page - 1,
        });
        searchSupply(history.location.pathname);
      }}
      showSizeChanger
      onShowSizeChange={(current, pageSize) => {
        dispatch({
          type: supplySearchActions.SUPPLY_SEARCH_UPDATE_PAGE_OFFSET,
          payload: current - 1,
        });
        dispatch({
          type: supplySearchActions.SUPPLY_SEARCH_UPDATE_PAGE_SIZE,
          payload: pageSize,
        });
        searchSupply(history.location.pathname);
      }}
    />
  ) : (
    <Fragment />
  );
}
