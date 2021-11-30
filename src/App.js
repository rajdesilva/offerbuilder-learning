import React, { useEffect, Fragment } from "react";
import TopNav from "./common/headers/TopNav";
import { Layout } from "antd";
import Routes from "./Routes";
import moment from "moment/min/moment-with-locales";
import { useHistory } from "react-router-dom";
import { fetchUserInfo } from "./pages/user";
import { useSelector } from "react-redux";
import { isEqual } from "lodash";
import { FormattedMessage, useIntl } from "react-intl";
import {
  getBrands,
  getChannels,
  getCurrencies,
} from "./pages/browseSupply/service";
import ErrorBoundary from "./common/ErrorBoundary";
import { Loader } from "./common";
import styles from "./global.module.less";

import { getLanguages } from "./pages/offers/service";

export default function App() {
  const intl = useIntl();
  const { Content } = Layout;
  const loggedInStatus = useSelector(
    (state) => window.getValue(state, "userinfo.loggedIn"),
    isEqual
  );
  const history = useHistory();

  useEffect(() => {
    const locale = window.navigator.userLanguage || window.navigator.language;

    moment.locale(locale);
    if (window.location.href.indexOf("access-denied") === -1) {
      fetchUserInfo();
    }
  }, []);

  useEffect(() => {
    if (loggedInStatus === "success") {
      getChannels();
      getBrands();
      getLanguages();
      getCurrencies();
    }
  }, [loggedInStatus]);

  return loggedInStatus === "loading" ? (
    <Loader
      tip={intl.formatMessage({
        id: "nemo.verifyingAccount",
      })}
    />
  ) : loggedInStatus === "success" ||
    history.location.pathname.indexOf("/access-denied") !== -1 ? (
    <Layout>
      <TopNav hideTabs={loggedInStatus !== "success"} />
      <Content className={styles["content"]}>
        <Routes />
      </Content>
    </Layout>
  ) : loggedInStatus === "failed" ? (
    <ErrorBoundary>
      <div>
        <FormattedMessage id="nemo.unableToLoadPageRefreshButton" />
      </div>
    </ErrorBoundary>
  ) : (
    <Fragment />
  );
}
