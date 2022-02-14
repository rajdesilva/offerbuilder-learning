import React, { Fragment } from "react";
import { Image, List, Row, Button, Col } from "antd";
import { FormattedMessage } from "react-intl";
import defaultImg from "../../../assets/images/default-img.svg";
import { CloseOutlined } from "@ant-design/icons";
import styles from "./css/OfferSelectedImages.module.less";
import { getImageName } from "../../../helpers/utility";

export default function OfferSelectedImages(props) {
  const removeImageFromIndex = (removedIndex) => {
    const updatedArray = props.selectedImages.filter(
      (word, index) => index !== removedIndex
    );
    props.setUpdatedSelectedImages(updatedArray);
  };

  return (
    <div
      className={styles["selected-area"]}
      data-testid="selected-images-section"
    >
      <Row justify="space-between">
        <Col>
          <FormattedMessage id="nemo.selectedImages" />:
        </Col>
        <Col>
          <Button
            type="link"
            data-testid="deselect-image-all-btn"
            onClick={() => props.setUpdatedSelectedImages([])}
          >
            <FormattedMessage id="nemo.deselectAll" />
          </Button>
        </Col>
      </Row>
      <Image.PreviewGroup>
        <List
          grid={{ gutter: 14, column: props.isDetailsShown ? 7 : 10 }}
          dataSource={props.selectedImages}
          className={styles["list-item-img"]}
          renderItem={(image, index) => {
            return (
              <List.Item
                key={index + "-" + image.id}
                data-testid={index + "-" + image.id + "-image-list-item"}
              >
                <Image
                  src={image.url}
                  className={styles.imgSelected}
                  preview={false}
                  onClick={() => props.setCarouselImage(index, true, true)}
                  onError={(ev) => (ev.target.src = defaultImg)}
                ></Image>
                <Button
                  data-testid={index + "-remove-image-btn"}
                  ghost
                  className={styles["remove-image-btn"]}
                  type="text"
                  icon={<CloseOutlined className={styles.removeIcon} />}
                  onClick={() => removeImageFromIndex(index)}
                ></Button>
              </List.Item>
            );
          }}
        ></List>
      </Image.PreviewGroup>
      <Row>
        <div
          data-testid="selected-images-name-list"
          className={styles.imgTextDiv}
        >
          <span className={styles.imgsUsedText}>
            <FormattedMessage id="nemo.theseImagesWillBeUsedInOffer" />{" "}
          </span>{" "}
          :
          {props.selectedImages.map((image, index) => {
            return (
              <Fragment>
                {index === 0 ? "" : ","}
                <Button
                  size="small"
                  type="link"
                  data-testid={index + "-selected-image-name"}
                  onClick={() => {
                    props.displayImageDetails(image, index, true);
                  }}
                  className={styles.imgNameBtn}
                >
                  {getImageName(image.url) || (
                    <FormattedMessage id="nemo.unknown" />
                  )}
                </Button>
              </Fragment>
            );
          })}
        </div>
      </Row>
    </div>
  );
}
