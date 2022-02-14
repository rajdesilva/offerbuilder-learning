import React, { Fragment, useState, useCallback, useMemo } from "react";
import {
  Col,
  Row,
  Empty,
  Button,
  Skeleton,
  Menu,
  Dropdown,
  Divider,
  Table,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment/min/moment-with-locales";
import defaultImg from "../../../assets/images/default-img.svg";
import { FormattedMessage } from "react-intl";
import { EditFilled, MoreOutlined } from "@ant-design/icons";
import { searchAndFilterOffer } from "../service";
import {
  checkIfUserHasRole,
  getParsedOffers,
  parseOfferMarketingFromOffer,
  parseOfferMarketingLanguagesFromOffer,
} from "../../../helpers/utility";
import ChangeOfferStatusModal from "./ChangeOfferStatusModal";
import { appConstants } from "../../../common";
import { isEqual } from "lodash";
import { marketingActions, newOfferActions } from "../actions";
import { propertyCartActions } from "../../browseSupply/actions";
import PropertiesListItem from "./PropertiesListItem";
import ActiveOffersPagination from "./ActiveOffersPagination";
import styles from "./css/ActiveArchiveOffers.module.less";
import { history } from "../../../helpers";

export default function ActiveOffers() {
  const dispatch = useDispatch();
  const [confirmOfferStatus, setConfirmOfferStatus] = useState({});
  let { offers, loading } = useSelector(
    (state) => window.getValue(state, "offerlistsearchandfilters"),
    isEqual
  );
  const hideModal = useCallback((reloadOffers) => {
    setConfirmOfferStatus({});
    if (reloadOffers) {
      searchAndFilterOffer(appConstants.offerListTab.ACTIVE);
    }
  }, []);

  const offerItemMenu = useCallback(
    (row) => (
      <Menu
        expandIcon={<MoreOutlined className={styles.offerItemMenuIc} />}
        data-testid="menu-change-offer-status"
      >
        <Menu.Item
          key="0"
          disabled={checkIfUserHasRole(appConstants.USER_ROLE.ADMIN) && row.status.name === appConstants.OFFER_STATUS.UNPUBLISHED && row.type === appConstants.PROPERTY_TYPE_LIST[0].id}
          data-testid={row.offerId + "menu-icon"}
          onClick={() => {
            setConfirmOfferStatus({
              offerInfo: row,
              actionType:
                row.status.name === appConstants.OFFER_STATUS.UNPUBLISHED
                  ? appConstants.OFFER_STATUS_ACTION.PUBLISH
                  : appConstants.OFFER_STATUS_ACTION.UNPUBLISH,
            });
          }}
        >
          {row.status.name === appConstants.OFFER_STATUS.UNPUBLISHED ? (
            <FormattedMessage id="nemo.publish" />
          ) : row.status.name === appConstants.OFFER_STATUS.PUBLISHED ? (
            <FormattedMessage id="nemo.unpublish" />
          ) : (
            <Fragment />
          )}
        </Menu.Item>
        <Menu.Item
          key="1"
          disabled={row.status.name === appConstants.OFFER_STATUS.PUBLISHED}
          onClick={() => {
            setConfirmOfferStatus({
              offerInfo: row,
              actionType: appConstants.OFFER_STATUS_ACTION.ARCHIVE,
            });
          }}
        >
          <FormattedMessage id="nemo.archive" />
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
          const offerData = row;
          return (
            <Row gutter={[16, 0]} className={styles.rowWithinTD}>
              <Col span={6} className={styles.imageCol}>
                {row.images && row.images.length > 0 ? (
                  <img
                    onError={(ev) => (ev.target.src = defaultImg)}
                    src={row.images[0].url}
                    alt=""
                    data-testid={row.offerId + "-active-image"}
                    className={styles.image}
                  />
                ) : (
                  <Empty
                    data-testid={row.offerId + "-active-empty-image"}
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
                  <Col span={24} className={styles.propNameCol}>
                    <Button
                      type="link"
                      className={styles["offer-name"]}
                      onClick={() => history.push(`/offers/view/${offerId}`)}
                    >
                      <strong>
                        {row.name}&nbsp;-&nbsp;{offerId}&nbsp;
                      </strong>
                    </Button>
                    {row.lcn ? (
                      <span
                        className={styles.propertyBox}
                        data-testid={offerId + "-lcn"}
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
                              offerId + "-active-offer-item-properties-list"
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
                  <Col span={14}>
                    {row.status.name === appConstants.OFFER_STATUS.PUBLISHED ? (
                      <span className={styles.enableBox}>
                        <FormattedMessage id="nemo.enable" />
                      </span>
                    ) : row.status.name ===
                      appConstants.OFFER_STATUS.UNPUBLISHED ? (
                      <span className={styles.disableBox}>
                        <FormattedMessage id="nemo.disable" />
                      </span>
                    ) : (
                      <span className={styles.disableBox}>
                        <FormattedMessage id="nemo.unknown" />
                      </span>
                    )}
                  </Col>
                  <Col span={6}>
                    {checkIfUserHasRole(appConstants.USER_ROLE.VIEWER) ? (
                      <Fragment />
                    ) : (
                      <Button
                        type="text"
                        className={styles.editIcon}
                        data-testid={offerId + "active-offer-item-edit-btn"}
                        icon={<EditFilled />}
                        onClick={() => {
                          dispatch({
                            type: newOfferActions.NEW_OFFER_UPDATE_REDUX_STATE,
                            payload: { ...offerData },
                          });
                          dispatch({
                            type: marketingActions.SET_MARKETING_LANGUAGES,
                            payload: parseOfferMarketingLanguagesFromOffer(
                              offerData.languages
                            ),
                          });
                          dispatch({
                            type: propertyCartActions.UPDATE_ENTIRE_CART_LIST,
                            payload: offerData.properties,
                          });
                          dispatch({
                            type: marketingActions.UPDATE_OFFER_MARKETING_INFO,
                            payload: parseOfferMarketingFromOffer(offerData),
                          });
                          history.push(`/offers/edit/${offerId}`);
                          window.scrollTo(0, 0);
                        }}
                      ></Button>
                    )}
                  </Col>
                  <Col span={4}>
                    {checkIfUserHasRole(appConstants.USER_ROLE.VIEWER) ? (
                      <Fragment />
                    ) : (
                      <Dropdown overlay={offerItemMenu(row)}>
                        <MoreOutlined
                          className={styles.moreIcon}
                          data-testid={offerId + "-active-offer-item-menu-btn"}
                        />
                      </Dropdown>
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
    [offerItemMenu, dispatch]
  );

  offers =
    offers && offers.map((offer, index) => getParsedOffers(offer, index));

  return (
    <Skeleton loading={loading} active>
      <Table
        dataSource={offers}
        columns={columns}
        rowClassName={styles.rowHeight}
        className={styles.offersListTable}
        showHeader={false}
        data-testid="active-offer-list-table"
        pagination={false}
      />

      <ActiveOffersPagination />

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
