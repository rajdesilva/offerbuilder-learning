import React, { useCallback, useState, useEffect } from "react";
import { Menu , Dropdown, Space,Divider} from "antd";
import { PlusSquareOutlined } from "@ant-design/icons";
import { Link, useRouteMatch } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { offerListSearchAndFilterActions } from "../../pages/offers/actions";
import { useDispatch } from "react-redux";
import styles from './css/Tabs.module.less';
import { DownOutlined ,UserOutlined } from '@ant-design/icons';



function Tabs() {
  const dispatch = useDispatch();
  const isBrowseSupplyPage = useRouteMatch({
    path: "/browse-supply/:page?",
    strict: true,
    sensitive: true,
  });
  const [currentState, setCurrentState] = useState(
    isBrowseSupplyPage ? "browse-supply" : "offers"
  );

  useEffect(
    () => setCurrentState(isBrowseSupplyPage ? "browse-supply" : "offers"),
    [isBrowseSupplyPage]
  );

  const handleClick = useCallback((e) => {
    setCurrentState(e.key);
    dispatch({
      type: offerListSearchAndFilterActions.RESET_OFFERS_PAGINATION
    });
  }, [dispatch]);

  const menu = (
    <Menu onClick={handleClick}>
      <Menu.Item key="1" >
      <FormattedMessage id="nemo.allproperties" />

      <Link to="/basic-search/">
      </Link>

      </Menu.Item>
      
      <Menu.Item key="2" >
      <FormattedMessage id="nemo.properties.with.pricing" />

        <Link to="/browse-supply/" data-testid="browse-supply">
        </Link>
      </Menu.Item>
    </Menu>
  );
  
  return (
    <Menu
      onClick={handleClick}
      defaultSelectedKeys={[currentState]}
      selectedKeys={[currentState]}
      mode="horizontal"
    >
      <Menu.Item
        data-testid="offer-tab"
        key="offers"
        icon={<PlusSquareOutlined className={styles.iconSize} />}
      >
        <Link to="/offers">
          <FormattedMessage id="nemo.offers" />
        </Link>
      </Menu.Item>
      <Divider type="vertical" className={styles.menuVerticalDivider} />
      <Dropdown  
        icon={<UserOutlined className={styles.iconSize} />}
        overlay={menu}  >
      <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
      <UserOutlined className={styles.iconSize} />  <FormattedMessage id="nemo.properties" /> <DownOutlined />
      </a>
      </Dropdown>
    </Menu>
  );
}

export default Tabs;
