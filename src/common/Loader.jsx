import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import styles from './css/Loader.module.less';

const antIcon = <LoadingOutlined spin />;
const Loader = (props) => (
  <Spin data-testid='loader' indicator={antIcon} size="large" className={styles["spin-loader"]} {...props} />
);
export default Loader;
