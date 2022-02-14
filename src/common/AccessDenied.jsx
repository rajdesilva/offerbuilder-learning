import { Button } from "antd";
import React from "react";
import { FormattedMessage } from "react-intl";
import { useLocation } from "react-router-dom";
import { baseURL } from "../helpers";
import styles from './css/AccessDenied.module.less';

export function AccessDenied() {
  const query = new URLSearchParams(useLocation().search);
  const emailId = query.get("email");
  return (
    <div className={styles.accessDenied}>
      <div className={styles.screenTitle}>
        <FormattedMessage id="nemo.accessDenied" />
      </div>
      <div className={styles.deniedMsg}>
        <FormattedMessage
          id="nemo.notHavAccessToApplication"
          values={{
            email: emailId,
          }}
        />
        <br />
        <br />
        <FormattedMessage id="nemo.contactSystmeAdmin" />
      </div>
      <Button
        type="primary"
        data-testid="denied-logout-btn"
        className={styles.deniedLogoutBtn}
        onClick={() => (window.location.href = `${baseURL.API_URL_BASE}logout`)}
      >
        <FormattedMessage id="nemo.logout" />
      </Button>
    </div>
  );
}
