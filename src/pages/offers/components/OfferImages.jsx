import React, { Fragment, useEffect, useState } from "react";
import { Row, Col, List, Button, Image } from "antd";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";
import { FormattedMessage } from "react-intl";
import defaultImg from "../../../assets/images/default-img.svg";
import { CloseOutlined } from "@ant-design/icons";
import OfferImageSelectionModal from "./OfferImageSelectionModal";
import UploadImage from "./UploadImage";
import OfferImagesCarousel from "./OfferImagesCarousel";
import { useDispatch, useSelector } from "react-redux";
import isEqual from "lodash.isequal";
import { cloneDeep } from "lodash";
import styles from "./css/OfferImages.module.less";
import { offerImageSearchAndFilterActions } from "../actions/offerImageSearchAndFilterActions";

const SortableItem = SortableElement(({ value }) => (
  <List.Item key={value.index} className={styles["marketing-image-hover"]}>
    <Image
      src={value.image.url}
      className="list-image"
      onError={(ev) => (ev.target.src = defaultImg)}
    ></Image>
    <Button
      data-testid={value.index + "-remove-image-btn"}
      ghost
      type="text"
      className="remove-image-btn"
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

export default function OfferImages(props) {
  const dispatch = useDispatch();
  const reduxSelectedImages = useSelector(
    (state) =>
      window.getValue(state, "newoffermarketinginfo.marketingInfo.images") ||
      [],
    isEqual
  );
  const offerImageList = useSelector(
    (state) =>
      window.getValue(state, "offerimagesearchandfilters.offerImageList") || [],
    isEqual
  );

  const [carouselImage, setCarouselImage] = useState({
    index: 0,
    display: false,
    isSelected: false,
  });
  const [uploadedImages, setUploadedImages] = useState(
    reduxSelectedImages || []
  );
  const [uploadDetails, setUploadDetails] = useState({
    displayImageSelectorModal: false,
    displayUpload: false,
  });
  const [selectedImages, setSelectedImages] = useState(reduxSelectedImages);

  useEffect(() => {
    setUploadedImages(reduxSelectedImages);
  }, [reduxSelectedImages]);

  const hideModal = () => {
    setUploadDetails({
      displayImageSelectorModal: false,
      displayUpload: false,
    });
    dispatch({
      type: offerImageSearchAndFilterActions.APPLY_OFFER_IMAGE_INITIAL_STATE,
    });
  };

  const refreshSelectedImages = () => {
    setSelectedImages(reduxSelectedImages);
  };

  const updateSelectedImages = (imageSelected, isToAdd) => {
    if (isToAdd) {
      const temp = cloneDeep(selectedImages);
      temp.push({ ...imageSelected });

      setSelectedImages(temp);
    } else {
      const temp = selectedImages.filter(
        (image) => image.id !== imageSelected.id
      );

      setSelectedImages(temp);
    }
  };

  const setUpdatedSelectedImages = (updatedImages) => {
    setSelectedImages(updatedImages);
  };

  const removeImageFromIndex = (removedIndex) => {
    const updatedArray = uploadedImages.filter(
      (word, index) => index !== removedIndex
    );
    setUploadedImages(updatedArray);
    props.onChange(updatedArray);
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    const updatedArray = arrayMove(uploadedImages, oldIndex, newIndex);
    props.onChange(updatedArray);
    setUploadedImages(updatedArray);
  };

  const toggleUploadModal = (updatedStatus, uploadedFilesArray) => {
    if (window.getValue(uploadedFilesArray, "length") > 0) {
      setSelectedImages(selectedImages.concat(uploadedFilesArray));
    }
    setUploadDetails({
      displayImageSelectorModal: !updatedStatus,
      displayUpload: updatedStatus,
    });
  };

  const displaySelectedImages = () => {
    props.onChange(selectedImages);
    setUploadedImages(selectedImages);
  };

  const setCarouselDetails = (index, display, isSelected) => {
    setCarouselImage({
      index,
      display,
      isSelected,
    });
  };

  const hideCarousel = () => {
    setCarouselImage({
      index: 0,
      isSelected: false,
      display: false,
      images: [],
    });
  };

  return (
    <Fragment>
      {uploadDetails.displayImageSelectorModal ? (
        <OfferImageSelectionModal
          hideModal={hideModal}
          toggleUploadModal={toggleUploadModal}
          displaySelectedImages={displaySelectedImages}
          setCarouselImage={setCarouselDetails}
          updateSelectedImages={updateSelectedImages}
          setUpdatedSelectedImages={setUpdatedSelectedImages}
          selectedImages={selectedImages}
          refreshSelectedImages={refreshSelectedImages}
        />
      ) : (
        <Fragment />
      )}
      {carouselImage.display ? (
        <OfferImagesCarousel
          carouselImage={carouselImage}
          selectedImages={selectedImages}
          displaySelectedImages={displaySelectedImages}
          updateSelectedImages={updateSelectedImages}
          images={carouselImage.isSelected ? selectedImages : offerImageList}
          hideCarousel={hideCarousel}
        />
      ) : (
        <Fragment />
      )}
      {uploadDetails.displayUpload ? (
        <UploadImage
          toggleUploadModal={toggleUploadModal}
        />
      ) : (
        <Fragment />
      )}

      <Row gutter={[8, 8]}>
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
            data-testid="manage-offer-image-btn"
            onClick={() => {
              setUploadDetails({
                displayImageSelectorModal: true,
                displayUpload: uploadDetails.displayUpload,
              });
            }}
          >
            <FormattedMessage id="nemo.manageImages" />
          </Button>
        </Col>
      </Row>
    </Fragment>
  );
}
