import React, { useEffect, useState, Fragment } from "react";
import { Checkbox, Col, Image, List, Modal, Row, Skeleton } from "antd";
import { FormattedMessage } from "react-intl";
import defaultImg from "../../../assets/images/default-img.svg";
import { getImagesFromProperties } from "../service";
import { useRouteMatch } from "react-router-dom";
import styles from "./css/PropertyImageSelectionModal.module.less";
import { cloneDeep } from "lodash";
import PropertySelectionCarousel from "./PropertySelectionCarousel";
import PropertyImagesSelected from "./PropertyImagesSelected";
import PropertyImageListPagination from "./PropertyImageListPagination";

export default function PropertyImageSelectionModal(props) {
  const [displayCarousel, setDisplayCarousel] = useState({
    display: false,
    startIndex: 0,
  });

  const isOfferEditPage = useRouteMatch({
    path: "/offers/edit/:offerId?",
    strict: true,
    sensitive: true,
  });
  const [selectedImages, setSelectedImages] = useState(
    props.defaultSelectedImages || []
  );
  const [imageList, setImageList] = useState(
    isOfferEditPage
      ? []
      : window.getValue(props, "property.images").slice(0, 10) || []
  );
  const [remoteImages, setRemoteImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleOk = () => {
    props.setImagesForProperty(selectedImages);
    props.hideModal();
  };

  const cancelModal = () => {
    props.hideModal();
  };

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

  useEffect(() => {
    if (isOfferEditPage) {
      setLoading(true);
      getImagesFromProperties(window.getValue(props, "property.propertyCode"))
        .then((response) => {
          if (window.getValue(response, "success")) {
            const images =
              window.getValue(
                response.data,
                "properties[0].mainProperty.info.images"
              ) || [];
            setRemoteImages(images);
            setImageList(images.slice(0, 10));
          } else {
            setImageList([]);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.log("error = ", error.toString());
          setLoading(false);
          setImageList([]);
        });
    }
  }, []);

  const updateSelectedImages = (imageSelected, isToAdd) => {
    if (isToAdd) {
      const temp = cloneDeep(selectedImages);
      temp.push(imageSelected);

      setSelectedImages(temp);
    } else {
      const temp = selectedImages.filter((image) => image !== imageSelected);

      setSelectedImages(temp);
    }
  };

  return (
    <Modal
      title={
        <Fragment>
          <FormattedMessage id="nemo.selectingImagesFor" />
          &nbsp;{window.getValue(props, "property.hotelName")}
        </Fragment>
      }
      visible={true}
      closable={true}
      className={styles.propertyImageModal}
      width={1080}
      centered
      destroyOnClose={true}
      onOk={handleOk}
      okText={<FormattedMessage id="nemo.submit" />}
      onCancel={cancelModal}
      data-testid="image-selection-for-property-modal"
    >
      <div className={styles.modalContent}>
        {selectedImages && selectedImages.length > 0 ? (
          <PropertyImagesSelected
            setDisplayCarousel={setDisplayCarousel}
            setSelectedImages={setSelectedImages}
            selectedImages={selectedImages}
            setCarouselImage={props.setCarouselImage}
          />
        ) : (
          <Fragment />
        )}
        <div
          className={
            window.getValue(props, "imageList.length") === 0
              ? styles.galleryEmptyView
              : styles.galleryView
          }
        >
          <Skeleton loading={loading} active>
            <Checkbox.Group
              defaultValue={selectedImages}
              value={selectedImages}
            >
              <List
                grid={{ gutter: 16, column: 8 }}
                dataSource={imageList}
                loading={loading}
                renderItem={(image, index) => {
                  return (
                    <List.Item
                      key={index + "-" + image}
                      className={styles["marketing-image-hover"]}
                    >
                      <Image
                        src={image}
                        key={index + "--" + image}
                        onError={(ev) => (ev.target.src = defaultImg)}
                        preview={false}
                        className={styles.propertyImage}
                        onClick={() =>
                          setDisplayCarousel({
                            display: true,
                            startIndex: index,
                          })
                        }
                      ></Image>
                      <Checkbox
                        key={index + image}
                        className={styles.selectionCheckbox}
                        value={image}
                        onChange={(e) =>
                          updateSelectedImages(image, e.target.checked)
                        }
                        data-testid="language-setting-checkbox"
                      ></Checkbox>
                      <div className={styles.imgName}>
                        {getImageNameToDisplay(image) || (
                          <FormattedMessage id="nemo.unknown" />
                        )}
                      </div>
                    </List.Item>
                  );
                }}
              ></List>
            </Checkbox.Group>
          </Skeleton>
        </div>
        {displayCarousel.display ? (
          <PropertySelectionCarousel
            images={imageList}
            hideCarousel={hideCarousel}
            selectedImages={selectedImages}
            startIndex={displayCarousel.startIndex}
            updateSelectedImages={updateSelectedImages}
          />
        ) : (
          <Fragment />
        )}
      </div>
      <Col>
        <Row>
          <PropertyImageListPagination
            images={
              isOfferEditPage
                ? remoteImages
                : window.getValue(props, "property.images")
            }
            setImages={setImageList}
          />
        </Row>
      </Col>
    </Modal>
  );
}
