import React, { Fragment, useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Button, Collapse, Input, Modal, Badge, DatePicker, Radio } from "antd";
import moment from "moment/min/moment-with-locales";
import { FilterFilled, SearchOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { searchAndFilterImages } from "../service";
import { isEqual } from "lodash";
import { getImageFilterCount } from "../../../helpers/utility";
import { offerImageSearchAndFilterActions } from "../actions/offerImageSearchAndFilterActions";
import { appConstants } from "../../../common";
import styles from "./css/OfferImageFilter.module.less";

const { Panel } = Collapse;

export default function OfferImageFilter(props) {
  const intl = useIntl();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  const { appliedImageFilters } = useSelector(
    (state) => window.getValue(state, "offerimagesearchandfilters"),
    isEqual
  );

  const [filterCount, setFilterCount] = useState(
    getImageFilterCount(appliedImageFilters)
  );

  // for search
  const [currentFileName, setCurrentFileName] = useState(
    appliedImageFilters.fileName
  );
  const [uploadDateRange, setUploadDateRange] = useState(
    window.getValue(appliedImageFilters, "uploadDateRange.uploadedStartDate")
      ? [
          moment(appliedImageFilters.uploadDateRange.uploadedStartDate),
          moment(appliedImageFilters.uploadDateRange.uploadedEndDate),
        ]
      : []
  );
  const [uploadedBy, setUploadedBy] = useState(
    appliedImageFilters.uploadedByCurrentUser
  );
  const [usedInOffers, setUsedInOffers] = useState(
    appliedImageFilters.usedInAnyOffer
  );
  const [offerIdSelected, setOfferIdSelected] = useState(
    appliedImageFilters.offerIds
  );

  const handleOk = () => {
    dispatch({
      type: offerImageSearchAndFilterActions.APPLY_OFFER_IMAGE_FILTERS,
      payload: {
        fileName: currentFileName,
        uploadDateRange: {
          uploadedStartDate: uploadDateRange[0]
            ? moment(uploadDateRange[0]).format("YYYY-MM-DD")
            : "",
          uploadedEndDate: uploadDateRange[1]
            ? moment(uploadDateRange[1]).format("YYYY-MM-DD")
            : "",
        },
        uploadedByCurrentUser: uploadedBy,
        usedInAnyOffer: usedInOffers,
        offerIds: offerIdSelected,
      },
    });
    dispatch({
      type: offerImageSearchAndFilterActions.RESET_OFFERS_PAGINATION,
    });
    props.hideDetailsView();
    searchAndFilterImages();
    cancelModal();
  };

  const cancelModal = () => {
    console.log("cancelModal called");
    setVisible(false);
  };

  const resetFilter = () => {
    dispatch({
      type: offerImageSearchAndFilterActions.APPLY_OFFER_IMAGE_FILTERS,
      payload: {
        fileName: "",
        uploadDateRange: {
          uploadedStartDate: "",
          uploadedEndDate: "",
        },
        uploadedByCurrentUser: appConstants.OFFER_IMAGE.ALL,
        usedInAnyOffer: appConstants.OFFER_IMAGE.ALL,
        offerIds: "",
      },
    });
    dispatch({
      type: offerImageSearchAndFilterActions.RESET_OFFERS_PAGINATION,
    });
    props.hideDetailsView();
    searchAndFilterImages();
    cancelModal();
  };

  const onSearchFileName = (e) => {
    console.log("onSearchFileName =", e.target.value);
    setCurrentFileName(e.target.value);
  };

  const onDateSelected = (dates) => {
    console.log("onDateSelected =", dates);
    if (dates) {
      if (dates[0] && dates[1]) {
        setUploadDateRange(dates);
      }
    } else {
      setUploadDateRange([]);
    }
  };

  const onOfferIdSelected = (e) => {
    console.log("onOfferIdSelected =", e.target.value);
    setOfferIdSelected(e.target.value);
  };

  const onUploadedBySelected = (e) => {
    console.log("onUploadedBySelected =", e.target.value);
    setUploadedBy(e.target.value);
  };

  const onUsedInOfferSelected = (e) => {
    console.log("onUsedInOfferSelected =", e.target.value);
    setUsedInOffers(e.target.value);
  };

  useEffect(() => {
    setFilterCount(getImageFilterCount(appliedImageFilters));
    setCurrentFileName(appliedImageFilters.fileName);
    setUploadDateRange(
      window.getValue(appliedImageFilters, "uploadDateRange.uploadedStartDate")
        ? [
            moment(appliedImageFilters.uploadDateRange.uploadedStartDate),
            moment(appliedImageFilters.uploadDateRange.uploadedEndDate),
          ]
        : []
    );
    setUploadedBy(appliedImageFilters.uploadedByCurrentUser);
    setUsedInOffers(appliedImageFilters.usedInAnyOffer);
    setOfferIdSelected(appliedImageFilters.offerIds);
  }, [appliedImageFilters]);

  return (
    <Fragment>
      <div onClick={() => setVisible(true)} className={styles.badgeContainer}>
        <Badge
          count={filterCount}
          offset={[-5, 5]}
          size="small"
          data-testid="offers-image-filter-badge"
          className={styles.filterBadge}
        >
          <Button
            type="text"
            data-testid="filter-ic-btn"
            icon={<FilterFilled size={20} className='filter-ic' />}
          ></Button>
        </Badge>
      </div>
      <Modal
        title={
          <React.Fragment>
            <FormattedMessage id="nemo.filterBy" />
          </React.Fragment>
        }
        onCancel={cancelModal}
        visible={visible}
        closable={true}
        width={330}
        className={styles.filterModal}
        destroyOnClose={true}
        forceRender={true}
        data-testid="offer-image-filter-modal"
        okText={<FormattedMessage id="nemo.yes" />}
        cancelText={<FormattedMessage id="nemo.cancel" />}
        footer={[
          <Button
            key="cancel"
            onClick={cancelModal}
            data-testid="filter-offer-image-cancel-btn"
          >
            <FormattedMessage id="nemo.cancel" />
          </Button>,
          <Button
            key="reset"
            onClick={resetFilter}
            data-testid="filter-offer-image-reset-btn"
          >
            <FormattedMessage id="nemo.reset" />
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleOk}
            data-testid="filter-offer-image-apply-btn"
          >
            <FormattedMessage id="nemo.apply" />
          </Button>,
        ]}
      >
        <Collapse
          defaultActiveKey={["filename"]}
          ghost
          expandIconPosition="right"
          style={{ backgroundColor: "transparent" }}
        >
          <Panel
            header={<FormattedMessage id="nemo.filename" />}
            key="filename"
          >
            <Input
              placeholder={intl.formatMessage({
                id: "nemo.mediumInput",
              })}
              size="middle"
              allowClear
              value={currentFileName}
              prefix={<SearchOutlined className={styles.searchIcon} />}
              onChange={onSearchFileName}
            />
          </Panel>
          <Panel
            header={<FormattedMessage id="nemo.uploadDate" />}
            key="upload-date"
          >
            <DatePicker.RangePicker
              data-testid={"upload-range-picker"}
              format={moment.localeData().longDateFormat("L")}
              defaultValue={uploadDateRange}
              onCalendarChange={onDateSelected}
            />
          </Panel>
          <Panel
            header={<FormattedMessage id="nemo.usedInOffers" />}
            key="used-in-offers"
          >
            <Fragment>
              <Radio.Group
                onChange={onUsedInOfferSelected}
                value={usedInOffers}
              >
                <Radio value={appConstants.OFFER_IMAGE.ALL}>
                  <FormattedMessage id="nemo.yes" />
                </Radio>
                <Radio value={appConstants.OFFER_IMAGE.EXCLUDE}>
                  <FormattedMessage id="nemo.no" />
                </Radio>
              </Radio.Group>
            </Fragment>
          </Panel>
          <Panel
            header={<FormattedMessage id="nemo.uploadedByUser" />}
            key="uploaded-by-user"
          >
            <Fragment>
              <Radio.Group onChange={onUploadedBySelected} value={uploadedBy}>
                <Radio value={appConstants.OFFER_IMAGE.INCLUDE}>
                  <FormattedMessage id="nemo.currentUser" />
                </Radio>
                <Radio value={appConstants.OFFER_IMAGE.ALL}>
                  <FormattedMessage id="nemo.everyone" />
                </Radio>
              </Radio.Group>
            </Fragment>
          </Panel>
          <Panel
            header={<FormattedMessage id="nemo.offersId" />}
            key="offers-id"
          >
            <Input
              placeholder={intl.formatMessage({
                id: "nemo.enterId",
              })}
              allowClear
              size="middle"
              value={offerIdSelected}
              prefix={<SearchOutlined className={styles.searchIcon} />}
              onChange={onOfferIdSelected}
            />
          </Panel>
        </Collapse>
      </Modal>
    </Fragment>
  );
}
