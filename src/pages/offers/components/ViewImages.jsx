import React, { Fragment, useState } from "react";
import { Row, Col, List, Button, Image } from "antd";
import { FormattedMessage } from "react-intl";
import defaultImg from "../../../assets/images/default-img.svg";
import styles from "./css/ViewImages.module.less";

function ViewImages(props) {
  const uploadedImages = props.isForProperty
    ? props.property.images
      ? props.property.images
      : []
    : props.images;

  const [showMore, setShowMore] = useState(false);

  return (
    <Fragment>
      <Row gutter={[8, 8]}>
        <Col span={4}>
          <FormattedMessage id="nemo.images" />
        </Col>
        <Col span={10}>
          {uploadedImages && uploadedImages.length === 0 ? (
            <Fragment />
          ) : (
            <Image.PreviewGroup>
              <List
                grid={{ gutter: 16, column: 5 }}
                dataSource={uploadedImages}
                data-testid={
                  props.isForProperty ? "prop-image-list" : "offer-image-list"
                }
                className={styles.listItemImg}
                renderItem={(image, index) => {
                  return index < 4 || uploadedImages.length === 5 ? (
                    <List.Item
                      key={index}
                      className={styles.marketingImageHover}
                    >
                      <Image
                        src={props.isForProperty ? image : image.url}
                        className={styles.listImg}
                        onError={(ev) => (ev.target.src = defaultImg)}
                      ></Image>
                    </List.Item>
                  ) : index === 4 && !showMore ? (
                    <List.Item
                      key={index}
                      className={styles.marketingImageHover}
                    >
                      <div className={styles.listItemMoreDiv}>
                        <Image
                          src={props.isForProperty ? image : image.url}
                          className={styles.blurrImage}
                          preview={false}
                          onClick={() => setShowMore(true)}
                          onError={(ev) => (ev.target.src = defaultImg)}
                        ></Image>
                        <Button
                          data-testid="show-more-btn"
                          ghost
                          type="link"
                          className={styles.showMoreImgListBtn}
                          onClick={() => setShowMore(true)}
                        >
                          {uploadedImages.length - 4}&nbsp;
                          <FormattedMessage id="nemo.more" />
                        </Button>
                      </div>
                    </List.Item>
                  ) : showMore ? (
                    <List.Item
                      key={index}
                      className={styles.marketingImageHover}
                    >
                      {index === uploadedImages.length - 1 && showMore ? (
                        <div>
                          <Image
                            src={props.isForProperty ? image : image.url}
                            className={styles.listImg}
                            onError={(ev) => (ev.target.src = defaultImg)}
                          ></Image>
                          <Button
                            ghost
                            type="link"
                            data-testid="show-less-btn"
                            className={styles.showLessBtn}
                            onClick={() => setShowMore(false)}
                          >
                            <FormattedMessage id="nemo.showLess" />
                          </Button>
                        </div>
                      ) : (
                        <Image
                          src={props.isForProperty ? image : image.url}
                          className={styles.listImg}
                          onError={(ev) => (ev.target.src = defaultImg)}
                        ></Image>
                      )}
                    </List.Item>
                  ) : (
                    <Fragment />
                  );
                }}
              />
            </Image.PreviewGroup>
          )}
        </Col>
      </Row>
    </Fragment>
  );
}

export default ViewImages;
