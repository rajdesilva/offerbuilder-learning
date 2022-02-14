import React, { useCallback, useState, useEffect } from "react";
import { Menu , Dropdown,Divider} from "antd";
import { PlusSquareOutlined } from "@ant-design/icons";
import { Link, useRouteMatch } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { offerListSearchAndFilterActions } from "../../pages/offers/actions";
import { useDispatch } from "react-redux";
import styles from './css/Tabs.module.less';
import { DownOutlined ,UserOutlined,ShopOutlined } from '@ant-design/icons';

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
        <Link to="/basic-search/">
             <Menu.Item key="1" >
                <FormattedMessage id="nemo.allproperties" />
             </Menu.Item>
        </Link>
        <Link to="/browse-supply/" data-testid="browse-supply">
            <Menu.Item key="2" >
                <FormattedMessage id="nemo.properties.with.pricing" />
            </Menu.Item>
        </Link>
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
      <ShopOutlined className={styles.iconSize} />  <FormattedMessage id="nemo.properties" /> <DownOutlined />
      </a>
      </Dropdown>
    </Menu>
  );
}

export default Tabs;
