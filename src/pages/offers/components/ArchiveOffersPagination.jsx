import React, { Fragment } from "react";
import { Col, Row, Pagination } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { FormattedMessage } from "react-intl";
import { offerListSearchAndFilterActions } from "../actions";
import { searchAndFilterOffer } from "../service";
import { appConstants } from "../../../common";
import { isEqual } from "lodash";

export default function ArchiveOffersPagination() {
  const dispatch = useDispatch();
  const { totalOffers, offers, pageOffset, pageSize } = useSelector(
    (state) => window.getValue(state, "offerlistsearchandfilters"),
    isEqual
  );
  return totalOffers && totalOffers > 0 && offers ? (
    <Pagination
      className="offer-list-pagination"
      data-testid="archive-offer-list-pagination"
      total={totalOffers}
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
          type: offerListSearchAndFilterActions.OFFER_LIST_PAGE_OFFSET,
          payload: page - 1,
        });
        searchAndFilterOffer(appConstants.offerListTab.ARCHIVE);
        window.scrollTo(0, 0);
      }}
      showSizeChanger
      onShowSizeChange={(current, pageNumber) => {
        dispatch({
          type: offerListSearchAndFilterActions.OFFER_LIST_PAGE_OFFSET,
          payload: current - 1,
        });
        dispatch({
          type: offerListSearchAndFilterActions.OFFER_LIST_PAGE_SIZE,
          payload: pageNumber,
        });
        searchAndFilterOffer(appConstants.offerListTab.ARCHIVE);
        window.scrollTo(0, 0);
      }}
    />
  ) : (
    <Fragment />
  );
}
