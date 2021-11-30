import React, { Fragment } from "react";
import { Row, Col, Layout } from "antd";
import { FormattedMessage } from "react-intl";
import logo from "../../assets/images/kogx-logo.svg";
import Tabs from "./Tabs";
import Settings from "./Settings";
import { Link } from "react-router-dom";
import styles from './css/TopNav.module.less';

function TopNav(props) {
  const { Header } = Layout;
  return (
    <Header className={styles.topNav}>
      <Row className={styles.header}>
        <Col className={styles.logo}>
          <Link
            to="/refresh"
            className={styles.logoLink}
          >
            <img
              src={logo}
              alt="logo"
              className={styles.logoImage}
            />
            &nbsp;
            <FormattedMessage id="nemo.distributionManager" />
          </Link>
        </Col>
        <Col>{props.hideTabs ? <Fragment /> : <Tabs />}</Col>
        <Col className={styles.settings}>
          <Settings hideTabs={props.hideTabs} />
        </Col>
      </Row>
    </Header>
  );
}
export default TopNav;
