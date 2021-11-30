import React, { Fragment, useState } from "react";
import { Image, List, Modal, Button, Col, Row } from "antd";
import { FormattedMessage } from "react-intl";
import defaultImg from "../../../assets/images/default-img.svg";
import styles from "./css/PropertyDetailsImageModal.module.less";
import PropertyImageCarousel from "./PropertyImageCarousel";
import PropertyImageListPagination from "./PropertyImageListPagination";

export default function PropertyDetailsImageModal(props) {
  const [displayCarousel, setDisplayCarousel] = useState({
    display: false,
    startIndex: 0,
  });
  const [images, setImages] = useState(
    props.images ? props.images.slice(0, 10) : []
  );

  const hideCarousel = () => {
    setDisplayCarousel({
      display: false,
      startIndex: 0,
    });
  };

  const getImageNameToDisplay = (image) => {
    const t = image.split("/");
    return t[t.length - 1];
  };

  return (
    <Modal
      title={<FormattedMessage id="nemo.propertySupplierImages" />}
      visible={true}
      closable={true}
      centered
      className="image-list-modal"
      width={1080}
      onCancel={props.hideModal}
      destroyOnClose={true}
      data-testid="image-gallery-property-modal"
      footer={[
        <Button
          key="submit"
          type="primary"
          onClick={props.hideModal}
          data-testid="gallery-img-close-btn"
        >
          <FormattedMessage id="nemo.close" />
        </Button>,
      ]}
    >
      <div className={styles.modalContent}>
        <List
          grid={{ gutter: 16, column: 8 }}
          dataSource={images}
          renderItem={(image, index) => {
            return (
              <List.Item
                key={index}
                className={styles["marketing-image-hover"]}
              >
                <Image
                  src={image}
                  onError={(ev) => (ev.target.src = defaultImg)}
                  preview={false}
                  data-testid={index + "-" + image}
                  onClick={() =>
                    setDisplayCarousel({
                      display: true,
                      startIndex: index,
                    })
                  }
                ></Image>
                <div className={styles.imgName}>
                  {getImageNameToDisplay(image) || (
                    <FormattedMessage id="nemo.unknown" />
                  )}
                </div>
              </List.Item>
            );
          }}
        ></List>
      </div>
      <Col>
        <Row>
          <PropertyImageListPagination
            images={props.images}
            setImages={(images1) => setImages(images1)}
          />
        </Row>
      </Col>

      {displayCarousel.display ? (
        <PropertyImageCarousel
          images={images}
          hideCarousel={hideCarousel}
          startIndex={displayCarousel.startIndex}
        />
      ) : (
        <Fragment />
      )}
    </Modal>
  );
}
