import React, { Fragment } from "react";
import { Col, Row, Pagination } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { FormattedMessage } from "react-intl";
import { isEqual } from "lodash";
import { searchAndFilterImages } from "../service";
import { offerImageSearchAndFilterActions } from "../actions/offerImageSearchAndFilterActions";
import styles from "./css/OfferImagesPagination.module.less";

export default function OfferImagesPagination(props) {
  const dispatch = useDispatch();
  const {
    totalOfferImages,
    offerImageList,
    pageOffset,
    pageSize,
  } = useSelector(
    (state) => window.getValue(state, "offerimagesearchandfilters"),
    isEqual
  );
  return totalOfferImages && totalOfferImages > 0 && offerImageList ? (
    <Pagination
      className={
        props.isDetailsShown
          ? styles.imageListPaginationWithDetails
          : "modal-img-list-pagination"
      }
      data-testid="offer-image-list-pagination"
      total={totalOfferImages}
      showTotal={(total, range) => (
        <Row justify="space-between" className={props.isDetailsShown
          ? styles.displayTotalRow : "display-total-row"}>
          <Col>
            <FormattedMessage id="nemo.displaying" /> &nbsp;
            {range[0]} - {range[1]}&nbsp;
            <FormattedMessage id="nemo.of" /> &nbsp;{total}
          </Col>
          {props.isDetailsShown ? (
            <Fragment />
          ) : (
            <Col>
              <FormattedMessage id="nemo.imagesPerPage" /> &nbsp;
            </Col>
          )}
        </Row>
      )}
      defaultCurrent={pageOffset + 1}
      defaultPageSize={pageSize}
      current={pageOffset + 1}
      onChange={(page) => {
        dispatch({
          type: offerImageSearchAndFilterActions.OFFER_IMAGE_LIST_PAGE_OFFSET,
          payload: page - 1,
        });
        searchAndFilterImages();
        window.scrollTo(0, 0);
      }}
      showSizeChanger
      onShowSizeChange={(current, pageNumber) => {
        dispatch({
          type: offerImageSearchAndFilterActions.OFFER_IMAGE_LIST_PAGE_OFFSET,
          payload: current - 1,
        });
        dispatch({
          type: offerImageSearchAndFilterActions.OFFER_IMAGE_LIST_PAGE_SIZE,
          payload: pageNumber,
        });
        searchAndFilterImages();
        window.scrollTo(0, 0);
      }}
    />
  ) : (
    <Fragment />
  );
}
