import React, { Fragment } from "react";
import { Col, Row, Pagination } from "antd";
import { FormattedMessage } from "react-intl";

export default function PropertyImageListPagination(props) {
  return props.images && props.images.length > 0 ? (
    <Pagination
      className="modal-img-list-pagination"
      data-testid="property-image-list-pagination"
      total={props.images.length}
      showTotal={(total, range) => (
          <Row justify="space-between" className="display-total-row">
            <Col>
              <FormattedMessage id="nemo.displaying" /> &nbsp;
              {range[0]} - {range[1]}&nbsp;
              <FormattedMessage id="nemo.of" /> &nbsp;{total}
            </Col>
            <Col>
              <FormattedMessage id="nemo.imagesPerPage" /> &nbsp;
            </Col>
          </Row>
      )}
      onChange={(pageNumber, pageSize) => {
        const total = props.images.length;
        const firstIndex = (pageNumber - 1) * pageSize;
        const lastIndex = total - (pageNumber * pageSize) > 0 ? pageNumber * pageSize : total;
        props.setImages(props.images.slice(firstIndex, lastIndex));
        window.scrollTo(0, 0);
      }}
      defaultPageSize={10}
      showSizeChanger={true}
    />
  ) : (
    <Fragment />
  );
}
