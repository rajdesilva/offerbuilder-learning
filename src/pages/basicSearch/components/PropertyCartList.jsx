import React, { Fragment, useMemo, useState } from "react";
import { Row, Rate, Table, Empty, Button, Space, Tooltip } from "antd";
import { useSelector } from "react-redux";
import { RightOutlined, InfoCircleOutlined } from "@ant-design/icons";
import defaultImg from "../../../assets/images/default-img.svg";
import { DeleteCartItem } from "./DeleteCartItem";
import Modal from "antd/lib/modal/Modal";
import { displayMargin, getFormattedValue } from "../../../helpers/utility";
import { FormattedMessage, useIntl } from "react-intl";
import { appConstants } from "../../../common";
import { useRouteMatch } from "react-router-dom";
import styles from './css/PropertyCartList.module.less';

export function PropertyCartList(props) {
  const intl = useIntl();
  const [visible, setVisible] = useState(false);
  const { selectedProperties } = useSelector((state) => ({
    selectedProperties: window.getValue(state, "propertycart.cartItems"),
  }));
  const isNewOfferSettingsPage = useRouteMatch({
    path: "/offers/create-new-offer/3",
    strict: true,
    sensitive: true,
  });
  const columns = useMemo(
    () => [
      {
        title: <FormattedMessage id="nemo.properties" />,
        dataIndex: "",
        className:styles.propertyList,
        width: "12%",
        render: (row) =>
          window.getValue(row, "img") ? (
            <img
              onError={(ev) => (ev.target.src = defaultImg)}
              src={window.getValue(row, "img")}
              alt=""
              className={styles.cartListImg}
              data-testid="image"
            />
          ) : window.getValue(row, "images") ? (
            <img
              onError={(ev) => (ev.target.src = defaultImg)}
              src={window.getValue(row, "images[0]")}
              alt=""
              className={styles.cartListImg}
              data-testid="image"
            />
          ) : (
            <Empty
              data-testid="empty-image"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={<span>No Image </span>}
              className={styles.emptyCartItemImg}
            />
          ),
      },
      {
        className: styles.headingColor,
        dataIndex: "",
        width: "40%",
        render: (text, row) => (
          <div>
            <div className={styles.fw600}>
              {row.hotelName} &nbsp;
              {row.lcn ? (
                <span className={styles.propertyBox} data-testid="lcn">
                  {"LCN"}
                </span>
              ) : (
                <Fragment />
              )}
            </div>
            <div>
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
          </div>
        ),
      },
      {
        title: <FormattedMessage id="nemo.margin" />,
        dataIndex: "",
        className: styles.margin,
        width: "10%",
        render: (row) => (
          <Row>
            {displayMargin(row.lowestMargin, row.highestMargin) || (
              <FormattedMessage id="nemo.n/a" />
            )}
          </Row>
        ),
      },
      {
        title: <FormattedMessage id="nemo.supplier" />,
        dataIndex: "",
        className: styles.margin,
        width: "20%",
        render: (row) => (
          <Row>
            {row.supplier ? row.supplier.toUpperCase() : ""}-{row.channel}
          </Row>
        ),
      },
      {
        dataIndex: "",
        title: <FormattedMessage id="nemo.capitalPool" />,
        className: styles.margin,
        width: "13%",
        render: (row) => (
          <Fragment>
            {row.lcn ? (
              <Row>
                {row.remainingCapital
                  ? getFormattedValue(row.remainingCapital)
                  : ""}{" "}
                EUR
              </Row>
            ) : (
              <Fragment />
            )}
          </Fragment>
        ),
      },
      {
        dataIndex: "",
        width: "5%",
        render: (row) => {
          return (
            <Row justify="end">
              <DeleteCartItem row={row} />
            </Row>
          );
        },
      },
    ],
    []
  );

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleProceed = () => {
    if (props.next) {
      props.next();
    }
    setVisible(false);
  };

  return (
    <Fragment>
      <Button
        data-testid="property-list-modal"
        type="primary"
        ghost
        onClick={showModal}
        size="large"
        disabled={!(selectedProperties && selectedProperties.length > 0)}
      >
        <span className={styles.fs14}>
          <FormattedMessage id="nemo.propertiesInOffer" />
        </span>
        &nbsp;
        <span className={styles.cartTotalCount} data-testid="properties-count">
          {selectedProperties ? selectedProperties.length : "0"}
        </span>
      </Button>
      <Modal
        title={<FormattedMessage id="nemo.propertiesInOffer" />}
        visible={visible}
        width={1080}
        centered
        className={styles.cartListModal}
        onCancel={handleCancel}
        data-testid="property-cart-list-modal"
        destroyOnClose
        footer={
          props.isEditFlow
            ? null
            : [
                <Button key="back" onClick={handleCancel} data-testid="cancel">
                  <FormattedMessage id="nemo.cancel" />
                </Button>,
                <Button
                  key="submit"
                  type="primary"
                  onClick={handleProceed}
                  data-testid="proceed"
                  disabled={
                    !(selectedProperties && selectedProperties.length > 0)
                  }
                >
                  {isNewOfferSettingsPage ? (
                    <Fragment>
                      <FormattedMessage id="nemo.proceedToMarketing" />
                      &nbsp;{" "}
                    </Fragment>
                  ) : (
                    <Fragment>
                      <FormattedMessage id="nemo.proceedToSettings" />
                      &nbsp;
                    </Fragment>
                  )}
                  <RightOutlined className={styles.fs10}/>
                </Button>,
              ]
        }
      >
        <Space direction="vertical" size="middle">
          <Space size="middle">
            <div data-testid="properties-selected">
              <FormattedMessage id="nemo.propertiesSelected" />
              &nbsp;
              {selectedProperties ? selectedProperties.length : "0"}/
              {appConstants.MAXIMUM_CART_ITEMS_COUNT}
              &nbsp;
            </div>
            <div>
              <Tooltip
                title={intl.formatMessage(
                  {
                    // Matching ID as above
                    id: "nemo.maximumCartItemCount",
                    // Default Message in English
                    defaultMessage: "{count} properties maximum can be added.",
                  },
                  { count: appConstants.MAXIMUM_CART_ITEMS_COUNT }
                )}
              >
                <InfoCircleOutlined className={styles["fs-16"]} />
              </Tooltip>
            </div>
          </Space>
          <Table
            dataSource={selectedProperties}
            columns={columns}
            scroll={{ y: 510 }}
            className={styles.propertyList}
            data-testid="property-list-table"
            pagination={false}
            expandable={{
              expandIcon: () => <Fragment />,
            }}
          />
        </Space>
      </Modal>
    </Fragment>
  );
}
