import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "antd/lib/modal/Modal";
import { Checkbox, Col, Row, Spin } from "antd";
import { marketingActions } from "../actions";
import { FormattedMessage } from "react-intl";
import styles from './css/LanguageSettingsModal.module.less';

export default function LanguageSettingsModal({ hideModal }) {
  let {
    fetchedLanguages,
    defaultSelectedLanguages,
    loadingLanguages,
  } = useSelector((state) => ({
    fetchedLanguages: window.getValue(state, "languageinfo.languages"),
    loadingLanguages: window.getValue(state, "languageinfo.loading"),
    defaultSelectedLanguages: window.getValue(
      state,
      "newoffermarketinginfo.selectedLanguages"
    ),
  }));
  const dispatch = useDispatch();
  let [selectedLanguages, setSelectedLanguages] = useState(
    defaultSelectedLanguages.map((language) => language.id)
  );
  const handleOk = () => {
    dispatch({
      type: marketingActions.SET_MARKETING_LANGUAGES,
      payload: selectedLanguages.map((languageId) => {
        return fetchedLanguages.find((language) => languageId === language.id);
      }),
    });
    hideModal();
  };

  const cancelModal = () => {
    hideModal();
  };

  const onChange = (checkedValues) => {
    setSelectedLanguages(checkedValues);
  };

  const isDisabled = (id) => {
    if (selectedLanguages.length > 3 && selectedLanguages.indexOf(id) === -1) {
      return true;
    }
    return false;
  };
  return (
    <Modal
      title={<FormattedMessage id="nemo.languageSettings" />}
      visible={true}
      onOk={handleOk}
      onCancel={cancelModal}
      data-testid="language-setting-modal"
    >
      {loadingLanguages ? (
        <Spin data-testid="language-loader"/>
      ) : (
        <Checkbox.Group defaultValue={selectedLanguages} onChange={onChange}>
          <Row>
            {fetchedLanguages.map((language, index) => (
              <Col span={8} key={language.id} className={index > 2 ? styles.langCheckbox : ''}>
                <Checkbox
                  data-testid={`language-setting-checkbox${language.id}`}
                  value={language.id}
                  disabled={isDisabled(language.id)}
                >
                  {language.name}
                </Checkbox>
              </Col>
            ))}
          </Row>
        </Checkbox.Group>
      )}
    </Modal>
  );
}
