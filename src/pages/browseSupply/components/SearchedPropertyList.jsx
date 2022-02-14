import React, { Fragment, useEffect, useState } from "react";
import {
  Col,
  Row,
  Rate,
  Table,
  Empty,
  Button,
  Skeleton,
  message,
  Spin,
  Divider,
  Space,
} from "antd";
import moment from "moment/min/moment-with-locales";
import { Link, useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import defaultImg from "../../../assets/images/default-img.svg";
import copyIcon from "../../../assets/images/copy-icon.svg";
import {
  browseSupplyActions,
  propertyCartActions,
  supplySearchActions,
} from "../actions";
import { ConfirmAddCartItemModal } from "./ConfirmAddCartItemModal";
import {
  displayMargin,
  getFormattedValue,
  getMarketPriceForPropertyFromList,
  isParentOrChildrenPropertyAdded,
  isPropertySelected,
  getParsedProperty,
} from "../../../helpers/utility";
import { FormattedMessage, useIntl } from "react-intl";
import { appConstants } from "../../../common";
import { EmptyList } from "./EmptyList";
import { store } from "../../../redux/store";
import { isEqual } from "lodash";
import { searchSupply } from "../service";
import { newOfferActions } from "../../offers/actions";
import { LoadingOutlined } from "@ant-design/icons";
import styles from "./css/SearchedPropertyList.module.less";

export function SearchedPropertyList({ prev, show, isEditFlow }) {
  const intl = useIntl();
  const {
    selectedProperties,
    loading,
    marketPriceLoading,
    includeMarketPrice,
  } = useSelector((state) => ({
    selectedProperties: window.getValue(state, "propertycart.cartItems"),
    loading: window.getValue(state, "searchedproperties.loading"),
    marketPriceLoading: window.getValue(state, "marketprice.loading"),
    includeMarketPrice: window.getValue(
      state,
      "marketprice.includeMarketPrice"
    ),
  }));
  let properties = useSelector((state) =>
    window.getValue(state, "searchedproperties.properties")
  );
  const currencyCode = useSelector(
    (state) => window.getValue(state, "searchparams.currencyCode"),
    isEqual
  );
  const lastSearchedDistance = useSelector(
    (state) => window.getValue(state, "searchparams.distance"),
    isEqual
  );
  const destination = useSelector(
    (state) => window.getValue(state, "searchparams.destination"),
    isEqual
  );
  const [modalInfo, setModalInfo] = useState({});
  const dispatch = useDispatch();
  const match = useRouteMatch({
    path: "/offers/create-new-offer/:step?",
    strict: true,
    sensitive: true,
  });
  const [expandedRows, setExpandedRows] = useState([]);

  const columns = [
    {
      render: (row) => {
        const isSelected = isPropertySelected(row, selectedProperties);
        return (
          <Fragment>
            <Row gutter={[16, 0]}>
              <Col
                span={show ? 5 : 6}
                className={show ? styles.imgColPadding : ""}
              >
                {row.img ? (
                  <div
                    className={
                      row.isParent ? styles.parentImg : styles.childImg
                    }
                  >
                    <img
                      onError={(ev) => (ev.target.src = defaultImg)}
                      src={row.img}
                      alt=""
                      className={
                        row.isParent
                          ? styles.imgParentProperty
                          : styles.imgChildrenProperty
                      }
                      data-testid="image"
                    />
                  </div>
                ) : (
                  <div
                    className={
                      row.isParent ? styles.parentImg : styles.childImg
                    }
                  >
                    <Empty
                      data-testid="empty-image"
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                      description={
                        <span>
                          <FormattedMessage id="nemo.noImages" />
                          &nbsp;
                        </span>
                      }
                      className={
                        row.isParent
                          ? styles.imgParentPropertyEmpty
                          : styles.imgChildrenPropertyEmpty
                      }
                    />
                  </div>
                )}
              </Col>
              <Col span={show ? 7 : 8}>
                <Space
                  direction="horizontal"
                  className={
                    row.isParent
                      ? styles.descriptionParentContainer
                      : styles.descriptionChildContainer
                  }
                >
                  <Link
                    to={`/property/${row.propertyCode}`}
                    className={
                      row.isParent ? styles.hotelName : styles.hotelNameChild
                    }
                    onClick={() => {
                      sessionStorage.setItem(
                        "property-info",
                        JSON.stringify(row)
                      );
                    }}
                  >
                    {row.isParent ? null : <img alt="" src={copyIcon} />} &nbsp;
                    <span>
                      {row.hotelName.length > 28
                        ? `${row.hotelName.slice(0, 23)}...`
                        : row.hotelName}
                    </span>{" "}
                    &nbsp;
                  </Link>
                  {row.lcn ? (
                    <div className={styles.propertyBox} data-testid="lcn">
                      <FormattedMessage id="nemo.LCN" />
                    </div>
                  ) : (
                    <Fragment />
                  )}
                </Space>
                <div className={styles["property-location"]}>
                  {row.city},&nbsp;
                  {row.country} &nbsp;
                  {row.rating ? (
                    <span>
                      <Rate disabled defaultValue={row.rating} />
                    </span>
                  ) : (
                    <Fragment />
                  )}
                </div>
                <div
                  className={
                    (row.isParent &&
                      window.getValue(row, "alternativeProperties")) ||
                    row.isParent === false
                      ? styles.propertyDescriptionWithExpand
                      : styles.propertyDescription
                  }
                >
                  {row.description || (
                    <FormattedMessage id="nemo.descriptionNA" />
                  )}
                </div>
                {row.isParent &&
                window.getValue(row, "alternativeProperties") ? (
                  expandedRows.includes(row.key) ? (
                    <Button type="link" className={styles["expand-btn"]}>
                      <span
                        className={styles.cartTotalCount}
                        data-testid="alternative-property-count"
                      >
                        {window.getValue(row, "alternativeProperties.length")}
                      </span>
                      &nbsp;{" "}
                      <span
                        className={styles.fs12}
                        data-testid="hide-duplicate-properties"
                      >
                        <FormattedMessage id="nemo.hideDuplicates" />
                      </span>
                    </Button>
                  ) : (
                    <Button type="link" className={styles["expand-btn"]}>
                      <span
                        className={styles.cartTotalCount}
                        data-testid="alternative-property-count"
                      >
                        {window.getValue(row, "alternativeProperties.length")}
                      </span>
                      &nbsp;{" "}
                      <span
                        className={styles.fs12}
                        data-testid="show-duplicate-properties"
                      >
                        <FormattedMessage id="nemo.showDuplicateProperties" />
                      </span>
                    </Button>
                  )
                ) : (
                  <Fragment />
                )}
                {row.isParent === false && (
                  <Button
                    type="link"
                    className={
                      row.isParent
                        ? styles["expand-btn"]
                        : styles["expand-btn-child"]
                    }
                  >
                    <FormattedMessage id="nemo.sameContent" />
                    &nbsp;({window.getValue(row, "total")}&nbsp;
                    <FormattedMessage id="nemo.matches" />)
                  </Button>
                )}
              </Col>
              <Col span={show ? 12 : 10}>
                <Row>
                  <Col
                    span={24}
                    className={
                      row.isParent
                        ? styles.trustColParent
                        : styles.trustColChild
                    }
                  >
                    <Row
                      className={
                        styles[
                          row.isParent
                            ? "review-section"
                            : "review-section-child-prop"
                        ]
                      }
                    >
                      {window.getValue(row, "trustyou.info.reviews_count") ? (
                        <div className={styles.trustYou}>
                          <FormattedMessage id="nemo.basedOn" />
                          &nbsp;
                          {window.getValue(
                            row,
                            "trustyou.info.reviews_count"
                          )}{" "}
                          &nbsp;
                          <FormattedMessage id="nemo.reviews" />
                          &nbsp;
                        </div>
                      ) : (
                        <Fragment />
                      )}
                      {window.getValue(
                        row,
                        "trustyou.info.score_description"
                      ) && window.getValue(row, "trustyou.info.score") ? (
                        <div className={styles.trustYouScore}>
                          {window.getValue(
                            row,
                            "trustyou.info.score_description"
                          )}{" "}
                          &nbsp;
                          <span className={styles.rateBox}>
                            {" "}
                            {window.getValue(row, "trustyou.info.score")}
                          </span>
                        </div>
                      ) : (
                        <Fragment />
                      )}
                    </Row>
                  </Col>
                </Row>
                <Row className={show ? "" : styles.supplierContainer}>
                  <Divider
                    type="vertical"
                    className={
                      row.isParent
                        ? styles.parentSupplierDivider
                        : styles.childSupplierDivider
                    }
                  />
                  <Col span={show ? 12 : 11}>
                    <div
                      className={
                        row.isParent
                          ? styles.supplierSection
                          : styles.col3duplicates
                      }
                    >
                      <Row gutter={[8, 8]}>
                        <Col span={10} className={styles["supplier-heading"]}>
                          <FormattedMessage id="nemo.supplier" />
                        </Col>
                        <Col span={14}>
                          <strong>
                            {row.supplier ? row.supplier.toUpperCase() : ""}-
                            {row.channel}
                          </strong>
                        </Col>
                      </Row>
                      <Row gutter={[8, 8]}>
                        <Col span={10}>
                          <FormattedMessage id="nemo.margin" />
                        </Col>
                        <Col span={14}>
                          <strong>
                            {displayMargin(
                              window.getValue(row, "lowestMargin"),
                              window.getValue(row, "highestMargin")
                            ) || <FormattedMessage id="nemo.n/a" />}
                          </strong>
                        </Col>
                      </Row>
                      {row.lcn ? (
                        <Row gutter={[8, 8]}>
                          <Col span={10}>
                            <FormattedMessage id="nemo.minRemainingCapitalPool" />
                          </Col>
                          <Col span={14}>
                            <strong>
                              {row.remainingCapital
                                ? getFormattedValue(row.remainingCapital)
                                : "0"}{" "}
                              {currencyCode}{" "}
                            </strong>
                          </Col>
                        </Row>
                      ) : (
                        <Fragment />
                      )}
                    </div>
                  </Col>
                  <Divider
                    type="vertical"
                    className={
                      row.isParent ? styles.parentDivider : styles.childDivider
                    }
                  />
                  <Col span={show ? 10 : 11}>
                    <div className={styles.priceContainer}>
                      <div
                        className={
                          includeMarketPrice &&
                          window.getValue(row, "trustyou.id")
                            ? styles.priceSectionWithMarketPrice
                            : styles.priceSection
                        }
                      >
                        <div>
                          <Row gutter={[8, 8]}>
                            <Col span={24}>
                              <div className={styles["lowest-price"]}>
                                <FormattedMessage id="nemo.lowestPriceOn" />{" "}
                                {window.getValue(row, "arrivalDate") ? (
                                  moment(
                                    window.getValue(row, "arrivalDate")
                                  ).format("L")
                                ) : (
                                  <FormattedMessage id="nemo.n/a" />
                                )}
                              </div>
                            </Col>
                          </Row>
                          <Row
                            gutter={[8, 8]}
                            className={row.isParent ? styles.b2bParentRow : ""}
                          >
                            <Col span={11}>
                              <div className={styles["price-title"]}>
                                <FormattedMessage id="nemo.b2bPrice" />
                              </div>
                            </Col>
                            <Col span={13}>
                              <div className={styles.priceDisplay}>
                                <Fragment>
                                  <strong>
                                    {window.getValue(row, "b2bPrice") ? (
                                      <Fragment>
                                        {window.getValue(row, "b2bPrice")}
                                        &nbsp;
                                        {currencyCode}
                                      </Fragment>
                                    ) : (
                                      <FormattedMessage id="nemo.n/a" />
                                    )}
                                  </strong>
                                </Fragment>
                              </div>
                            </Col>
                          </Row>
                          <Row gutter={[8, 8]}>
                            <Col span={11}>
                              <div className={styles["price-title"]}>
                                <FormattedMessage id="nemo.b2cPrice" />
                              </div>
                            </Col>
                            <Col span={13}>
                              <div className={styles.priceDisplay}>
                                <Fragment>
                                  <strong>
                                    {window.getValue(row, "b2cPrice") ? (
                                      <Fragment>
                                        {window.getValue(row, "b2cPrice")}
                                        &nbsp;
                                        {currencyCode}
                                      </Fragment>
                                    ) : (
                                      <FormattedMessage id="nemo.n/a" />
                                    )}
                                  </strong>
                                </Fragment>
                              </div>
                            </Col>
                          </Row>
                          {window.getValue(row, "trustyou.id") ? (
                            marketPriceLoading ? (
                              <Spin
                                size='large'
                                data-testid={`${window.getValue(
                                  row,
                                  "trustyou.id"
                                )}-market-price-loader`}
                                className={styles["market-price-spinner"]}
                                indicator={<LoadingOutlined size={24} spin />}
                              />
                            ) : includeMarketPrice ? (
                              <Row gutter={[8, 8]}>
                                <Col span={11}>
                                  <div className={styles["price-title"]}>
                                    <FormattedMessage id="nemo.marketPrice" />
                                  </div>
                                </Col>
                                <Col span={13}>
                                  <div className={styles.priceDisplay}>
                                    <Fragment>
                                      <strong
                                        data-testid={`${window.getValue(
                                          row,
                                          "trustyou.id"
                                        )}-market-price-value`}
                                      >
                                        {(() => {
                                          const price =
                                            getMarketPriceForPropertyFromList(
                                              window.getValue(
                                                row,
                                                "trustyou.id"
                                              )
                                            );
                                          return price && price !== "" ? (
                                            <Fragment>
                                              {price}&nbsp;
                                              {currencyCode}
                                            </Fragment>
                                          ) : (
                                            <FormattedMessage id="nemo.n/a" />
                                          );
                                        })()}
                                      </strong>
                                    </Fragment>
                                  </div>
                                </Col>
                              </Row>
                            ) : (
                              <Fragment />
                            )
                          ) : (
                            <Fragment />
                          )}
                        </div>
                        {match || isEditFlow ? (
                          <Button
                            type={"primary"}
                            className={
                              row.isParent
                                ? styles.addToOfferBtn
                                : styles.addToOfferBtnChildProp
                            }
                            ghost={!isSelected}
                            block={isSelected}
                            data-testid="add-to-offer-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (
                                selectedProperties.length ===
                                appConstants.MAXIMUM_CART_ITEMS_COUNT
                              ) {
                                message.info(
                                  intl.formatMessage(
                                    {
                                      // Matching ID as above
                                      id: "nemo.maximumCartItemCount",
                                    },
                                    {
                                      count:
                                        appConstants.MAXIMUM_CART_ITEMS_COUNT,
                                    }
                                  )
                                );
                                return;
                              }
                              if (isSelected) {
                                dispatch({
                                  type: browseSupplyActions.REMOVE_TEMP_EDITED_BRANDS,
                                  payload:
                                    row.propertyCode +
                                    row.supplier +
                                    row.channel, //updated brands value that used to fetch properties
                                });
                                dispatch({
                                  type: propertyCartActions.DELETE_CART_ITEM,
                                  payload: row,
                                });
                              } else {
                                if (
                                  isParentOrChildrenPropertyAdded(
                                    row,
                                    selectedProperties
                                  )
                                ) {
                                  setModalInfo({
                                    row,
                                    displayModal: true,
                                  });
                                } else {
                                  dispatch({
                                    type: newOfferActions.NEW_OFFER_LAST_SEARCH_DISTANCE,
                                    payload: lastSearchedDistance,
                                  });
                                  dispatch({
                                    type: newOfferActions.NEW_OFFER_DEEPLINK_DESTINATION,
                                    payload: destination,
                                  });
                                  dispatch({
                                    type: supplySearchActions.SET_SELECTED_CURRENCY,
                                    payload: currencyCode,
                                  });
                                  dispatch({
                                    type: browseSupplyActions.ADD_TEMP_EDITED_BRANDS,
                                    payload: {
                                      key:
                                        row.propertyCode +
                                        row.supplier +
                                        row.channel,
                                      brands:
                                        store.getState().searchparams.brands,
                                    }, //updated brands value that used to fetch properties
                                  });
                                  dispatch({
                                    type: propertyCartActions.ADD_PROPERTY_TO_CART,
                                    payload: row,
                                  });
                                }
                              }
                            }}
                          >
                            {isSelected ? (
                              <FormattedMessage id="nemo.Added" />
                            ) : (
                              <FormattedMessage id="nemo.AddToOffer" />
                            )}
                          </Button>
                        ) : (
                          <Fragment />
                        )}
                      </div>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Fragment>
        );
      },
    },
  ];

  useEffect(() => {
    // reset the include market price flag
    dispatch({
      type: supplySearchActions.SET_INCLUDE_MARKET_PRICE_FLAG,
      payload: false,
    });
    searchSupply(undefined);
  }, [dispatch]);

  properties =
    properties &&
    properties.map((row, index) => {
      return {
        ...getParsedProperty(row.mainProperty, index, true),
        alternativeProperties: row.alternateProperties
          ? row.alternateProperties.length === 0
            ? null
            : row.alternateProperties.map((innerRow, innerIndex) => ({
                ...getParsedProperty(innerRow, innerIndex, false),
                total: row.alternateProperties.length,
              }))
          : null,
      };
    });

  const expandedRowRender = (row) => {
    return (
      <Fragment>
        <Table
          data-testid="show-duplicates"
          dataSource={row.alternativeProperties}
          bordered={true}
          rowClassName={styles["child-expanded-row"]}
          className={
            row.alternativeProperties && row.alternativeProperties.length > 5
              ? styles.showDuplicatesPagination
              : styles.showDuplicates
          }
          showHeader={false}
          pagination={{
            defaultPageSize: 5,
            hideOnSinglePage: true,
            showTotal: function (total, range) {
              return (
                <span className={styles.paginationText}>
                  <FormattedMessage id="nemo.displaying" /> {range[0]} -{" "}
                  {range[1]} <FormattedMessage id="nemo.of" /> {total}
                </span>
              );
            },
          }}
          columns={columns}
        />
      </Fragment>
    );
  };
  return (
    <Fragment>
      {modalInfo && modalInfo.displayModal === true ? (
        <ConfirmAddCartItemModal
          row={modalInfo.row}
          isEditFlow={isEditFlow}
          hideModal={() =>
            setModalInfo({
              row: {},
              displayModal: false,
            })
          }
        />
      ) : (
        <Fragment />
      )}
      <Skeleton loading={loading} active>
        {properties && properties.length > 0 ? (
          <Fragment>
            <Table
              dataSource={properties}
              rowClassName="tr-height"
              columns={columns}
              className={show ? styles.bsSearchShow : styles.bsSearch}
              showHeader={false}
              expandable={{
                expandIconColumnIndex: -1,
                expandRowByClick: true,
                onExpandedRowsChange: (rows) => setExpandedRows(rows),
                rowExpandable: (record) =>
                  window.getValue(record, "alternativeProperties"),
                expandedRowRender,
              }}
              data-testid="property-list-table"
              pagination={false}
            />
          </Fragment>
        ) : (
          <EmptyList prev={prev} show={show} isEditFlow={isEditFlow} />
        )}
      </Skeleton>
    </Fragment>
  );
}
