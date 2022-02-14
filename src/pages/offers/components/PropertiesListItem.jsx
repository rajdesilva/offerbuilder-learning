import React, { Fragment, useState } from "react";
import { List, Button } from "antd";
import { FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
import styles from "./css/PropertiesListItem.module.less";

const getPropertiesForList = (properties) => {
  return properties.length % 2 === 0
    ? properties
    : [...properties, { key: "collapse" }];
};

function PropertiesListItem({ row, dataTestId }) {
  const properties = getPropertiesForList(row.properties);

  const [showMore, setShowMore] = useState(false);
  return (
    <List
      grid={{
        gutter: 16,
        xs: 2,
        sm: 2,
        md: 2,
        lg: 2,
        xl: 2,
        xxl: 2,
      }}
      data-testid={dataTestId}
      dataSource={properties}
      renderItem={(item, index) => {
        return index === 7 &&
          row.properties.length > 7 &&
          showMore === false ? (
          <List.Item
            className={styles.listItem}
            onClick={() => {
              setShowMore(!showMore);
            }}
          >
            <Button
              type="link"
              className={styles.showMoreBtn}
              data-testid={dataTestId + "-show-more"}
            >
              <Fragment>
                <FormattedMessage id="nemo.and" /> {row.properties.length - 7}{" "}
                <FormattedMessage id="nemo.more" />
              </Fragment>
            </Button>
          </List.Item>
        ) : index > 7 && showMore === false ? (
          <Fragment />
        ) : index === row.properties.length && showMore === true ? (
          <List.Item className={styles.listItem}>
            <Button
              type="link"
              className={styles.showMoreBtn}
              onClick={() => setShowMore(!showMore)}
              data-testid={dataTestId + "-collapse-all"}
            >
              <FormattedMessage id="nemo.collapseAll" />
            </Button>
          </List.Item>
        ) : (
          <List.Item className={styles.listItem}>
            <Fragment>
              <div className={styles.propertyName}>{item.name}</div>
              {index === row.properties.length - 1 &&
              showMore === true &&
              row.properties.length % 2 === 0 ? (
                <Button
                  type="link"
                  className={styles.showMoreBtn}
                  onClick={() => setShowMore(!showMore)}
                  data-testid={dataTestId + "-collapse-all"}
                >
                  <FormattedMessage id="nemo.collapseAll" />
                </Button>
              ) : (
                <Fragment />
              )}
            </Fragment>
          </List.Item>
        );
      }}
    />
  );
}

PropertiesListItem.propTypes = {
  row: PropTypes.object,
  dataTestId: PropTypes.string,
};
export default PropertiesListItem;
