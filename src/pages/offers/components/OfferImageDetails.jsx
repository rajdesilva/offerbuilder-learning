import React from "react";
import { Row, Col, Button, Image } from "antd";
import moment from "moment/min/moment-with-locales";
import { FormattedMessage } from "react-intl";
import defaultImg from "../../../assets/images/default-img.svg";
import { CloseOutlined } from "@ant-design/icons";
import styles from './css/OfferImageDetails.module.less';

function OfferImageDetails(props) {
  return (
    <div
    data-testid={window.getValue(props, "imageDetails.image.id")+'-image-details'}
      className={styles.imgDetailsContainer}
    >
      <Row justify="space-between" key='imageDetails'>
        <Col>
          <strong className={styles.containerTitle}>
            <FormattedMessage id="nemo.imageDetails" />
          </strong>
        </Col>
        <Col>
          <Button
            type="text"
            data-testid='image-details-close-btn'
            className={styles.closeBtn}
            onClick={props.hideDetailsView}
            icon={<CloseOutlined />}
          ></Button>
        </Col>
      </Row>
      <Row justify="center" key='imageview'>
        <Image
          src={window.getValue(props, "imageDetails.image.url")}
          height={152}
          data-testid='image-big-details-view'
          className={styles.imageView}
          preview={false}
          onClick={() => {
            props.setCarouselImage(window.getValue(props, "imageDetails.index"), true, props.imageDetails.isSelected);
          }}
          onError={(ev) => (ev.target.src = defaultImg)}
        ></Image>
      </Row>
      <Row key='image-name'>
        <strong className={styles.imageName}>
          <FormattedMessage id="nemo.name" />
        </strong>
      </Row>
      <Row>{window.getValue(props, "imageDetails.image.id") || '-'}</Row>
      <Row key='image-uploaded-date'>
        <strong className={styles.topMargin}>
          <FormattedMessage id="nemo.uploaded" />
        </strong>
      </Row>
      <Row key='image-uploaded-date-display'>
        {window.getValue(props, "imageDetails.image.updatedAt")
          ? moment(window.getValue(props, "imageDetails.image.updatedAt")).format("L")
          : "-"}
      </Row>
      <Row key='image-uploaded-user'>
        <strong className={styles.topMargin}>
          <FormattedMessage id="nemo.user" />
        </strong>
      </Row>
      <Row key='image-uploaded-user-name'>{window.getValue(props, "imageDetails.image.uploadedBy") || '-'}</Row>
      <Row key='image-offer-details'>
        <strong className={styles.topMargin}>
          <FormattedMessage id="nemo.offerDetails" />
        </strong>
      </Row>
      {window.getValue(props, "imageDetails.image.offerDetails") && 
      window.getValue(props, "imageDetails.image.offerDetails").map(offer => {
        return <Row key={offer.id+'-image-offer'}>{offer.offerName}</Row>
      })}
    </div>
  );
}

export default OfferImageDetails;
