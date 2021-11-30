import React, { Fragment } from "react";
import { Button, Image, Skeleton, Checkbox, List } from "antd";
import moment from "moment/min/moment-with-locales";
import { useSelector } from "react-redux";
import { FormattedMessage } from "react-intl";
import { isEqual } from "lodash";
import defaultImg from "../../../assets/images/default-img.svg";
import styles from "./css/OfferImageGallery.module.less";

export default function OfferImageGallery(props) {
  let currentImage = {};
  const loading = useSelector(
    (state) => window.getValue(state, "offerimagesearchandfilters.loading"),
    isEqual
  );

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

  return (
    <Fragment>
      <div
        className={
          window.getValue(props, "offerImageList.length") === 0
            ? styles.galleryEmptyView
            : styles.galleryView
        }
      >
        <Skeleton loading={loading} active>
          <Checkbox.Group value={props.selectedImages.map((image) => image.id)}>
            <List
              grid={
                props.isDetailsShown
                  ? { gutter: 16, column: 6 }
                  : { gutter: 16, column: 8 }
              }
              dataSource={props.offerImageList}
              loading={loading}
              renderItem={(image, index) => {
                return (
                  <List.Item
                    key={index}
                    className={styles["marketing-image-hover"]}
                  >
                    <Image
                      src={image.url}
                      preview={false}
                      data-testid={image.id + "-image-list-display"}
                      className={styles.galleryImg}
                      onError={(ev) => (ev.target.src = defaultImg)}
                    ></Image>
                    <Checkbox
                      key={index}
                      className={styles["img-checkbox"]}
                      onClick={(value) => {
                        currentImage = { ...image };
                      }}
                      onChange={onChange}
                      value={image.id}
                      data-testid={
                        image.id + "-" + index + "-image-checkbox-display"
                      }
                    ></Checkbox>
                    <div>
                      <Button
                        className={styles["image-name"]}
                        data-testid={image.id + "-" + index + "-image-name-btn"}
                        type="link"
                        onClick={() => props.displayImageDetails(image, index)}
                      >
                        {image.id || <FormattedMessage id="nemo.unknown" />}
                      </Button>
                    </div>
                    <div
                      className={styles["image-date"]}
                      onClick={() => props.displayImageDetails(image, index)}
                    >
                      {window.getValue(image, "createdAt") ? (
                        moment(window.getValue(image, "createdAt")).format("L")
                      ) : (
                        <FormattedMessage id="nemo.n/a" />
                      )}
                    </div>
                  </List.Item>
                );
              }}
            ></List>
          </Checkbox.Group>
        </Skeleton>
      </div>
    </Fragment>
  );
}
