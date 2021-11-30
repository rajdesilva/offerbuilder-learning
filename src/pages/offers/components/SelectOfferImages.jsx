import React, { useCallback, useEffect, Fragment, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Row, Modal, Button, Col, Divider } from "antd";
import { FormattedMessage, useIntl } from "react-intl";
import { searchAndFilterImages } from "../service";
import Search from "antd/lib/input/Search";
import OfferImageFilter from "./OfferImageFilter";
import { offerImageSearchAndFilterActions } from "../actions/offerImageSearchAndFilterActions";
import { useDispatch, useSelector } from "react-redux";
import SelectedOfferImages from "./SelectedOfferImages";
import OfferImagesPagination from "./OfferImagesPagination";
import { ImageGallery, OfferImageDetails } from ".";
import styles from './css/SelectOfferImages.module.less';
import isEqual from "lodash.isequal";

export default function SelectOfferImages(props) {
  const intl = useIntl();
  const dispatch = useDispatch();
  const [imageDetails, setImageDetails] = useState({
    display: false,
    image: {},
    isSelected: false,
  });
  const offerImageList = useSelector(
    (state) =>
      window.getValue(state, "offerimagesearchandfilters.offerImageList"),
    isEqual
  );

  const handleOk = () => {
    props.displaySelectedImages([]);
    props.hideModal();
  };

  const cancelModal = () => {
    props.hideModal();
  };

  const processSearchedTerm = useCallback(
    (e) => {
      console.log("processSearchedTerm = ", e);
      hideDetailsView();
      // reset page offset and pagesize for new search
      dispatch({
        type: offerImageSearchAndFilterActions.OFFER_IMAGE_LIST_PAGE_SIZE,
        payload: 10,
      });
      dispatch({
        type: offerImageSearchAndFilterActions.OFFER_IMAGE_LIST_PAGE_OFFSET,
        payload: 0,
      });
      dispatch({
        type: offerImageSearchAndFilterActions.APPLY_SEARCH_KEY,
        payload: e ? (e.target ? e.target.value : e) : "",
      });
      searchAndFilterImages();
    },
    [dispatch]
  );

  useEffect(() => {
    props.refreshSelectedImages();
    searchAndFilterImages();
  }, []);

  const displayImageDetails = (image, index, isSelected) => {
    setImageDetails({
      display: true,
      image: image,
      isSelected,
      index,
    });
  };

  const hideDetailsView = () => {
    setImageDetails({
      display: false,
      image: {},
      isSelected: false,
    });
  };

  return (
    <Modal
      title={
        <Fragment>
          <FormattedMessage id="nemo.selectingImagesFor" />
          ...
        </Fragment>
      }
      visible={true}
      closable={true}
      width={1080}
      className={styles.imageModalWithSelectedImages}
      centered
      destroyOnClose={true}
      forceRender={true}
      onOk={handleOk}
      okText={<FormattedMessage id="nemo.submit" />}
      onCancel={cancelModal}
      maskClosable={false}
      data-testid="image-selection-for-offer-modal"
      footer={[
        <Button
          key="upload-image"
          onClick={() => props.toggleUploadModal(true)}
          data-testid="filter-offer-upload-image-btn"
        >
          <UploadOutlined />
          &nbsp;
          <FormattedMessage id="nemo.uploadImage" />
        </Button>,
        <Button
          key="cancel"
          onClick={cancelModal}
          data-testid="offer-image-list-cancel-btn"
        >
          <FormattedMessage id="nemo.cancel" />
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={handleOk}
          data-testid="offer-image-list-submit-btn"
        >
          <FormattedMessage id="nemo.submit" />
        </Button>,
      ]}
    >
      <Fragment>
        <Row justify="space-between">
          <Col>
            <Search
              allowClear
              onSearch={processSearchedTerm}
              placeholder={intl.formatMessage({
                id: "nemo.search",
              })}
              onPressEnter={processSearchedTerm}
            />
          </Col>
          <Col>
            <OfferImageFilter hideDetailsView={hideDetailsView} />
          </Col>
        </Row>
        <Divider />
        <div className={styles.imageDialogContent}>
        <Row>
          <Col
            span={imageDetails.display ? 17 : 24}
            style={{ paddingRight: 10 }}
            className={styles.selectedCol}
          >
            {props.selectedImages && props.selectedImages.length > 0 ? (
              <Fragment>
                <SelectedOfferImages
                  isDetailsShown={imageDetails.display}
                  displayImageDetails={displayImageDetails}
                  setUpdatedSelectedImages={props.setUpdatedSelectedImages}
                  selectedImages={props.selectedImages}
                  setCarouselImage={props.setCarouselImage}
                />
              </Fragment>
            ) : (
              <Fragment />
            )}
            <ImageGallery
              displayImageDetails={displayImageDetails}
              updateSelectedImages={props.updateSelectedImages}
              isDetailsShown={imageDetails.display}
              offerImageList={offerImageList}
              selectedImages={props.selectedImages}
              setCarouselImage={props.setCarouselImage}
            />
            <Row>
              <OfferImagesPagination isDetailsShown={imageDetails.display} />
            </Row>
          </Col>
          {/* <Col span={imageDetails.display ? 1 : 0} style={{ borderRight: '1px solid #edeaea' }} /> */}
          <Col
            span={imageDetails.display ? 7 : 0}
            style={{ borderLeft: "1px solid #edeaea" }}
          >
            <OfferImageDetails
              displayImageDetails={displayImageDetails}
              hideDetailsView={hideDetailsView}
              setCarouselImage={props.setCarouselImage}
              imageDetails={imageDetails}
            />
          </Col>
        </Row>
        </div>
      </Fragment>
    </Modal>
  );
}
