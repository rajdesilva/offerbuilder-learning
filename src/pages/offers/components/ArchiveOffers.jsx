import React, { Fragment, useMemo, useState, useCallback } from "react";
import {
  Col,
  Row,
  Table,
  Divider,
  Empty,
  Skeleton,
  Menu,
  Dropdown,
  Button,
} from "antd";
import { useSelector } from "react-redux";
import moment from "moment/min/moment-with-locales";
import defaultImg from "../../../assets/images/default-img.svg";
import { FormattedMessage } from "react-intl";
import { MoreOutlined } from "@ant-design/icons";
import { searchAndFilterOffer } from "../service";
import { checkIfUserHasRole, getParsedOffers } from "../../../helpers/utility";
import ArchiveOffersPagination from "./ArchiveOffersPagination";
import ChangeOfferStatusModal from "./ChangeOfferStatusModal";
import { appConstants } from "../../../common";
import { isEqual } from "lodash";
import PropertiesListItem from "./PropertiesListItem";
import styles from "./css/ActiveArchiveOffers.module.less";
import { history } from "../../../helpers";

export default function ArchiveOffers() {
  const [confirmOfferStatus, setConfirmOfferStatus] = useState({});
  let { offers, loading } = useSelector(
    (state) => window.getValue(state, "offerlistsearchandfilters"),
    isEqual
  );
  const hideModal = useCallback((reloadOffers) => {
    setConfirmOfferStatus({});
    if (reloadOffers) {
      searchAndFilterOffer(appConstants.offerListTab.ARCHIVE);
    }
  }, []);
  const offerItemMenu = useCallback(
    (row) => (
      <Menu
        expandIcon={<MoreOutlined className={styles["offer-item-menu-ic"]} />}
      >
        <Menu.Item
          key="0"
          disabled={checkIfUserHasRole(appConstants.USER_ROLE.ADMIN) &&  row.type === appConstants.PROPERTY_TYPE_LIST[0].id}
          data-testid={row.offerId + "archive-publish-item"}
          onClick={() => {
            setConfirmOfferStatus({
              offerInfo: row,
              actionType: appConstants.OFFER_STATUS_ACTION.PUBLISH,
            });
          }}
        >
          <FormattedMessage id="nemo.publish" />
        </Menu.Item>
        <Menu.Item
          key="1"
          data-testid={row.offerId + "archive-unpublish-item"}
          onClick={() => {
            setConfirmOfferStatus({
              offerInfo: row,
              actionType: appConstants.OFFER_STATUS_ACTION.UNPUBLISH,
            });
          }}
        >
          <FormattedMessage id="nemo.unpublish" />
        </Menu.Item>
      </Menu>
    ),
    []
  );
  const columns = useMemo(
    () => [
      {
        render: (row) => {
          const offerId = row.offerId;
          return (
            <Row gutter={[16, 0]} className={styles.rowWithinTD}>
              <Col span={6} className={styles.imageCol}>
                {row.images && row.images.length > 0 ? (
                  <img
                    onError={(ev) => (ev.target.src = defaultImg)}
                    src={window.getValue(row, "images[0].url")}
                    alt=""
                    data-testid={row.offerId + "archive-image"}
                    className={styles.image}
                  />
                ) : (
                  <Empty
                    data-testid={row.offerId + "-archive-empty-image"}
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    className={styles["empty-img"]}
                    description={
                      <span>
                        <FormattedMessage id="nemo.noImages" />
                        &nbsp;
                      </span>
                    }
                  />
                )}
              </Col>
              <Col span={11}>
                <Row className={styles.rowMarginTop}>
                  <Col span={24}>
                    <Button
                      type="link"
                      className={styles["offer-name"]}
                      onClick={() => history.push(`/offers/view/${offerId}`)}
                    >
                      <b>
                        {row.name}&nbsp;-&nbsp;{offerId}&nbsp;
                      </b>
                    </Button>
                    {row.lcn ? (
                      <span
                        className={styles.propertyBox}
                        data-testid={row.offerId + "-archive-lcn"}
                      >
                        {<FormattedMessage id="nemo.lcn" />}
                      </span>
                    ) : (
                      <Fragment />
                    )}
                  </Col>
                  <Col span={24}>
                    {process.env.REACT_APP_HIDE_CLIENT_AND_STORE ? (
                      <Fragment />
                    ) : (
                      <b>
                        {row.brandName} - {row.storefrontName}
                      </b>
                    )}
                  </Col>
                  <Col span={24}>
                    <Row gutter={1}>
                      <Col span={16}>
                        <b>
                          <FormattedMessage id="nemo.properties" />
                        </b>
                        {row.properties && row.properties.length > 0 ? (
                          <PropertiesListItem
                            row={row}
                            dataTestId={
                              row.offerId +
                              "-archive-offer-item-properties-list"
                            }
                          />
                        ) : (
                          <Fragment>
                            <br />
                            <FormattedMessage id="nemo.noPropertiesPresent" />
                          </Fragment>
                        )}
                      </Col>
                      <Col span={8}>
                        <Row gutter={[0, 10]}>
                          <Col>
                            <b>
                              <FormattedMessage id="nemo.bookingDates" />
                            </b>
                            <div>
                              {row.displayBookingDateRange ? (
                                `${moment(
                                  row.displayBookingDateRange.startDate
                                ).format("L")} - ${moment(
                                  row.displayBookingDateRange.endDate
                                ).format("L")}`
                              ) : (
                                <FormattedMessage id="nemo.n/a" />
                              )}
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <b>
                              <FormattedMessage id="nemo.travelDates" />
                            </b>
                            <div>
                              {row.displayTravellingDateRange ? (
                                `${moment(
                                  row.displayTravellingDateRange.startDate
                                ).format("L")} - ${moment(
                                  row.displayTravellingDateRange.endDate
                                ).format("L")}`
                              ) : (
                                <FormattedMessage id="nemo.n/a" />
                              )}
                            </div>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Col span={3} className={styles.createdDateCol}>
                <Row className={styles.rowMarginTop}>
                  <b>
                    <FormattedMessage id="nemo.created" />
                  </b>
                  &nbsp;
                  {moment(row.createdDate).format("L")}
                </Row>
                <Row gutter={[0, 15]}>
                  <Col>
                    <Fragment />
                  </Col>
                </Row>
                <Row>
                  <Col offset={10}>
                    <Divider type="vertical" className={styles.divider} />
                  </Col>
                </Row>
              </Col>
              <Col span={4}>
                <Row className={styles.rowMarginTop}>
                  <Col span={18}>
                    {row.status.name === appConstants.OFFER_STATUS.ARCHIVED ? (
                      <span
                        className={styles.archiveBox}
                        data-testid={"archive-status-" + row.offerId}
                      >
                        <FormattedMessage id="nemo.archived" />
                      </span>
                    ) : (
                      <span className={styles.archiveBox}>
                        <FormattedMessage id="nemo.unknown" />
                      </span>
                    )}
                  </Col>
                  <Col span={6}>
                    {checkIfUserHasRole(appConstants.USER_ROLE.VIEWER) ? (
                      <Fragment />
                    ) : (
                      <Col span="4">
                        <Dropdown
                          type="text"
                          data-testid={
                            row.offerId + "archive-offer-item-menu-btn"
                          }
                          overlay={offerItemMenu(row)}
                        >
                          <MoreOutlined className={styles.moreIcon} />
                        </Dropdown>
                      </Col>
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <span className={styles.currencyName}>{row.currency}</span>
                  </Col>
                </Row>
              </Col>
            </Row>
          );
        },
      },
    ],
    [offerItemMenu]
  );

  offers = offers.map((offer, index) => getParsedOffers(offer, index));

  return (
    <Skeleton loading={loading} active>
      <Table
        dataSource={offers}
        columns={columns}
        rowClassName={styles.rowHeight}
        className={styles.offersListTable}
        showHeader={false}
        data-testid="archive-offer-list-table"
        pagination={false}
      />
      <ArchiveOffersPagination />
      {confirmOfferStatus.offerInfo ? (
        <ChangeOfferStatusModal
          offerInfo={confirmOfferStatus.offerInfo}
          actionType={confirmOfferStatus.actionType}
          hideModal={hideModal}
        />
      ) : (
        <Fragment />
      )}
    </Skeleton>
  );
}
