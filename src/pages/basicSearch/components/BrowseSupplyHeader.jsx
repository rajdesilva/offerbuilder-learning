import React, { Fragment } from "react";
import { Button, Row, Col, Divider, Tooltip } from "antd";
import { Link, useRouteMatch } from "react-router-dom";
import { useSelector } from "react-redux";
import { FormattedMessage } from "react-intl";
import { checkIfUserHasRole } from "../../../helpers/utility";
import { appConstants } from "../../../common";
import styles from './css/BrowseSupplyHeader.module.less';

export function BrowseSupplyHeader() {
  const isBrowseSupplyPage = useRouteMatch({
    path: "/browse-supply/:page",
    strict: true,
    sensitive: true,
  });
  const onlySupplier = useSelector((state) =>
    window.getValue(state, "searchparams.onlySupplier")
  );

  return (
    <React.Fragment>
      <Row justify="space-between" className={styles.bsHeader}>
        <Col>
          <h2>
            <FormattedMessage id="nemo.global.search.of.all.properties" />
          </h2>
        </Col>
        {process.env.REACT_APP_HIDE_CLIENT_AND_STORE ? (
          <Fragment />
        ) : isBrowseSupplyPage &&
          checkIfUserHasRole(appConstants.USER_ROLE.ADMIN) ? (
          <Col>
            <Tooltip
              placement="left"
              title={<FormattedMessage id="nemo.addBrandsToCreateOffer" />}
              visible={onlySupplier}
              data-testid="add-brand-tooltip"
            >
              <Button
                type="primary"
                size="large"
                disabled={onlySupplier}
                data-testid="create-offer-search-results-btn"
              >
                <Link
                  to={{
                    pathname: "/offers/create-new-offer/2",
                    search: `${window.location.search}`,
                  }}
                >
                  <FormattedMessage id="nemo.createOfferWithSearchResult" />
                </Link>
              </Button>
            </Tooltip>
          </Col>
        ) : (
          <Fragment />
        )}
      </Row>
      {isBrowseSupplyPage ? <Divider className={styles.divider} /> : <Fragment />}
    </React.Fragment>
  );
}
