import React, { Fragment } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { Button, Image, Modal, Row } from "antd";
import { FormattedMessage } from "react-intl";
import {
  CloseOutlined,
  LeftCircleFilled,
  RightCircleFilled,
} from "@ant-design/icons";
import defaultImg from "../../../assets/images/default-img.svg";
import { getImageName } from "../../../helpers/utility";

export default function PropertyImageCarousel(props) {
  const imgList =
    props.images &&
    props.images.map((image, index) => {
      return {
        original: image,
        key: index,
      };
    });

  return (
    <Modal
      visible={true}
      closable={true}
      onCancel={props.hideCarousel}
      className="carousel-image-modal"
      width={"100%"}
      data-testid="property-details-img-carousel"
      centered
      closeIcon={
        <CloseOutlined
          data-testid="property-img-carousel-close-btn"
          className="close-carousel-icon"
        />
      }
      destroyOnClose={true}
      footer={null}
    >
      <div className="gallery-parent">
        <ImageGallery
          items={imgList}
          startIndex={props.startIndex}
          showThumbnails={false}
          renderRightNav={(onClick, disabled) => {
            return (
              <Button
                type="text"
                data-testid="carousel-right-btn"
                icon={<RightCircleFilled className="carousel-btn" />}
                className="image-gallery-right-nav"
                onClick={onClick}
              ></Button>
            );
          }}
          renderLeftNav={(onClick, disabled) => {
            return (
              <Button
                className="image-gallery-left-nav"
                type="text"
                data-testid="carousel-left-btn"
                icon={<LeftCircleFilled className="carousel-btn" />}
                onClick={onClick}
              ></Button>
            );
          }}
          showPlayButton={false}
          showFullscreenButton={false}
          useBrowserFullscreen={true}
          renderItem={(image, index) => {
            console.log("render item called =", image, " index=", index);
            return (
              <Fragment>
                <Image
                  preview={false}
                  className="img-carousel"
                  src={image.original}
                  data-testid={"property-image-" + image.key}
                  onError={(ev) => (ev.target.src = defaultImg)}
                />
                 <Row justify="center" className="chekbox-row">
                    <div className="img-name">
                      {getImageName(image.original) || (
                        <FormattedMessage id="nemo.unknown" />
                      )}
                    </div>
                  </Row>
              </Fragment>
            );
          }}
        />
      </div>
    </Modal>
  );
}
