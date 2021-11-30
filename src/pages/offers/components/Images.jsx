import React, { Fragment, useState } from "react";
import { Row, Col, List, Button, Image } from "antd";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";
import { FormattedMessage } from "react-intl";
import PropertyImageSelectionModal from "./PropertyImageSelectionModal";
import defaultImg from "../../../assets/images/default-img.svg";
import { CloseOutlined } from "@ant-design/icons";
import styles from "./css/Images.module.less";

const SortableItem = SortableElement(({ value }) => (
  <List.Item key={value.index} className={styles["marketing-image-hover"]}>
    <Image
      src={value.image}
      className="list-image"
      onError={(ev) => (ev.target.src = defaultImg)}
    ></Image>
    <Button
      data-testid="remove-image-btn"
      ghost
      className="remove-image-btn"
      type="text"
      icon={<CloseOutlined className="remove-img-icon" />}
      onClick={() => value.removeImageFromIndex(value.index)}
    ></Button>
  </List.Item>
));

const DisplayImageList = SortableContainer(({ value }) => {
  return (
    <Image.PreviewGroup>
      <List
        grid={{ gutter: 16, column: 10 }}
        dataSource={value.uploadedImages}
        className={styles["list-item-img"]}
        renderItem={(image, index) => (
          <SortableItem
            value={{
              image: image,
              index: index,
              removeImageFromIndex: value.removeImageFromIndex,
            }}
            key={`drag-item-${index}`}
            index={index}
          />
        )}
      />
    </Image.PreviewGroup>
  );
});
export default function Images(props) {
  const [uploadedImages, setUploadedImages] = useState(
    props.property.marketingImages || []
  );
  const [displayImageSelectorModal, setDisplayImageSelectorModal] =
    useState(false);

  const hideModal = () => setDisplayImageSelectorModal(false);

  const removeImageFromIndex = (removedIndex) => {
    const updatedArray = uploadedImages.filter(
      (word, index) => index !== removedIndex
    );
    setUploadedImages(updatedArray);
    props.onChange(updatedArray);
  };

  const setImagesForProperty = (imagesToDisplay) => {
    setUploadedImages(imagesToDisplay);
    props.onChange(imagesToDisplay);
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    props.onChange(arrayMove(uploadedImages, oldIndex, newIndex));
    setUploadedImages(arrayMove(uploadedImages, oldIndex, newIndex));
  };

  return (
    <Fragment>
      {displayImageSelectorModal ? (
        <PropertyImageSelectionModal
          hideModal={hideModal}
          property={props.property}
          setImagesForProperty={setImagesForProperty}
          defaultSelectedImages={uploadedImages}
        />
      ) : (
        <Fragment />
      )}
      <Row>
        <Col span={4}>
          <FormattedMessage id="nemo.images" />
        </Col>
        <Col span={20}>
          {uploadedImages && uploadedImages.length === 0 ? (
            <Fragment />
          ) : (
            <DisplayImageList
              value={{
                uploadedImages: uploadedImages,
                removeImageFromIndex: removeImageFromIndex,
              }}
              onSortEnd={onSortEnd}
              axis="x"
              distance={1}
            />
          )}
          <Button
            ghost
            type="primary"
            data-testid="add-or-remove-image-btn"
            onClick={() => setDisplayImageSelectorModal(true)}
          >
            <FormattedMessage id="nemo.add" />
            &nbsp;
            <FormattedMessage id="nemo.images" />
          </Button>
        </Col>
      </Row>
    </Fragment>
  );
}
