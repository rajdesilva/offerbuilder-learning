import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { SettingOutlined, UserOutlined } from "@ant-design/icons";
import { Menu, Divider } from "antd";
import { baseURL, history } from "../../helpers";
import { FormattedMessage } from "react-intl";
import {
  checkIfUserHasRole,
} from "../../helpers/utility";
import { appConstants } from "../Constants";
import styles from './css/Settings.module.less';

function Settings(props) {
  const { SubMenu } = Menu;
  useSelector((state) => ({
    allLanguages: window.getValue(state, "languageinfo.languages") || [],
  }));

  return (
    <Menu mode="horizontal" data-testid="logout" selectable={false}>
      {props.hideTabs ? (
        <Fragment />
      ) : (
        <SubMenu
          key="menu-settings"
          icon={<SettingOutlined className={styles.iconSize} />}
          data-testid="menu-setting-icon"
        >
          <Menu.Item
            data-testid="profile"
            key="profile"
            onClick={() => {
              window.open(baseURL.PROFILE_URL);
            }}
          >
            <FormattedMessage id="nemo.Profile" />
          </Menu.Item>
          {checkIfUserHasRole(appConstants.USER_ROLE.ADMIN) ? (
            <Fragment>
              <Menu.Item
                data-testid="menu-settings-usermanagement"
                key="menu-settings-usermanagement"
                onClick={() => {
                  history.push("/user-management/list");
                }}
              >
                <FormattedMessage id="nemo.userManagement" />
              </Menu.Item>
              <Menu.Item
                data-testid="menu-settings-history"
                key="menu-settings-history"
                onClick={() => {
                  window.open(baseURL.HISTORY_URL);
                }}
              >
                <FormattedMessage id="nemo.history" />
              </Menu.Item>
            </Fragment>
          ) : (
            <Fragment />
          )}
        </SubMenu>
      )}
      <Divider type="vertical" className={styles.menuVerticalDivider} />
      <SubMenu
        icon={<UserOutlined className={styles.iconSize} />}
        data-testid="menu-user-icon"
      >
        <Menu.Item
          data-testid="menu-settings-logout"
          key="menu-settings-logout"
          onClick={() => history.push("/logout")}
        >
          <FormattedMessage id="nemo.logout" />
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
}

export default Settings;
