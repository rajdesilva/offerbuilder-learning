import React from "react";
import { FormattedMessage } from "react-intl";
import styles from './css/ErrorBoundary.module.less';
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    window.apm.captureError(error);
    window.apm.captureError(info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.errorBoundary}>
          <h2>
            <FormattedMessage id="nemo.somethingWentWrongPleaseTryAgain" />
          </h2>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
