import React, { Fragment } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { Button, Image, Row, Checkbox, Modal } from "antd";
import { FormattedMessage } from "react-intl";
import {
  CloseOutlined,
  LeftCircleFilled,
  RightCircleFilled,
} from "@ant-design/icons";
import defaultImg from "../../../assets/images/default-img.svg";

export default function OfferImagesCarousel(props) {
  let currentImage = {};

  const onChange = (checkedValues) => {
    if (
      props.selectedImages.findIndex(
        (image) => image.id === checkedValues.target.value
      ) === -1 &&
      checkedValues.target.checked
    ) {
      // true to add
      props.updateSelectedImages(currentImage, true);
    } else {
      // false to remove
      props.updateSelectedImages(currentImage, false);
    }
  };

  const imgList =
    props.images &&
    props.images.map((image, index) => {
      return {
        original: image.url,
        key: index,
        ...image,
      };
    });

  if (imgList && imgList.length === 0) {
    props.hideCarousel();
  }
  return (
    <Modal
      visible={true}
      closable={true}
      onCancel={props.hideCarousel}
      className="carousel-image-modal"
      width={"100%"}
      centered
      closeIcon={
        <CloseOutlined
          data-testid="img-carousel-close-btn"
          className="close-carousel-icon"
        />
      }
      destroyOnClose={true}
      footer={null}
    >
      <div
        data-testid="offer-image-carousel-content"
        className="gallery-parent"
      >
        <Checkbox.Group value={props.selectedImages.map((image) => image.id)}>
          <ImageGallery
            items={imgList}
            startIndex={props.carouselImage.index}
            showThumbnails={false}
            renderRightNav={(onClick, disabled) => {
              return (
                <Button
                  type="text"
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
                    data-testid={index + "-img-carousel"}
                    className="img-carousel"
                    src={image.original}
                    onError={(ev) => (ev.target.src = defaultImg)}
                  />
                  <Row justify="center" className="chekbox-row">
                    <Checkbox
                      key={image.id}
                      onClick={(value) => {
                        currentImage = { ...image };
                        console.log("checkbox clicked", currentImage);
                      }}
                      className="chekbox"
                      onChange={onChange}
                      value={image.id}
                      data-testid={
                        image.id + "-carousel-image-checkbox-display"
                      }
                    ></Checkbox>
                    <div className="img-name">
                      {image.id || <FormattedMessage id="nemo.unknown" />}
                    </div>
                  </Row>
                </Fragment>
              );
            }}
          />
        </Checkbox.Group>
      </div>
    </Modal>
  );
}
