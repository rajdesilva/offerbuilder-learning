import React from "react";
import { Image, List, Row, Button, Col } from "antd";
import { FormattedMessage } from "react-intl";
import defaultImg from "../../../assets/images/default-img.svg";
import { CloseOutlined } from "@ant-design/icons";
import styles from "./css/PropertyImagesSelected.module.less";

export default function PropertyImagesSelected(props) {
  const removeImageFromIndex = (removedIndex) => {
    const updatedArray = props.selectedImages.filter(
      (word, index) => index !== removedIndex
    );
    props.setSelectedImages(updatedArray);
  };

  return (
    <div className={styles.selectedArea} data-testid="selected-images-section">
      <Row justify="space-between">
        <Col>
          <FormattedMessage id="nemo.selectedImages" />:
        </Col>
        <Col>
          <Button
            type="link"
            data-testid="deselect-image-all-btn"
            onClick={() => props.setSelectedImages([])}
          >
            <FormattedMessage id="nemo.deselectAll" />
          </Button>
        </Col>
      </Row>
      <Image.PreviewGroup>
        <List
          grid={{ gutter: 12, column: 10 }}
          dataSource={props.selectedImages}
          className={styles["list-item-img"]}
          renderItem={(image, index) => {
            return (
              <List.Item
                key={index + "-" + image.id}
                data-testid={index + "-" + image.id + "-image-list-item"}
              >
                <Image
                  src={image}
                  className={styles.selectedImg}
                  preview={false}
                  data-testid={index + "-selected-img"}
                  onClick={(value) => {
                    props.setDisplayCarousel({
                      display: true,
                      startIndex: index,
                    });
                  }}
                  onError={(ev) => (ev.target.src = defaultImg)}
                ></Image>
                <Button
                  data-testid={index + "-remove-image-btn"}
                  ghost
                  className={styles["remove-image-btn"]}
                  type="text"
                  icon={<CloseOutlined className={styles.closeIcon} />}
                  onClick={() => removeImageFromIndex(index)}
                ></Button>
              </List.Item>
            );
          }}
        ></List>
      </Image.PreviewGroup>
    </div>
  );
}
