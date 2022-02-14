import React, { useState, Fragment } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { Button, message, Upload, Modal } from "antd";
import { FormattedMessage } from "react-intl";
import { uploadImage } from "../service";
import styles from "./css/UploadImage.module.less";

export default function UploadImage(props) {
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [uploadedFiles, setUplodedFiles] = useState([]);

  const handleOnChange = () => {
    setLoading(true);
    try {
      fileList.forEach(async (file, index) => {
        uploadImage(file)
          .then((response) => {
            if (window.getValue(response, "success")) {
              message.success(file.name + " uploaded successfully!");
              uploadedFiles.push(window.getValue(response, "data"));

              setUplodedFiles(uploadedFiles);
              if (uploadedFiles.length === fileList.length) {
                props.toggleUploadModal(false, uploadedFiles);
              }
            } else {
              if (window.getValue(response, "error.message")) {
                message.error(window.getValue(response, "error.message"));
              } else {
                message.error(
                  file.name + " failed to upload. Please try again"
                );
              }
            }
            setLoading(false);
          })
          .catch((error) => {
            setLoading(false);
            console.log("error for file =", file, " error =", error.toString());
            message.error(error.toString());
          });
      });
    } catch (e) {
      setLoading(false);
      message.error(e.toString());
    }
  };

  return (
    <Modal
      title={<FormattedMessage id="nemo.uploadForLocal" />}
      visible={true}
      closable={true}
      width={1080}
      centered
      destroyOnClose={true}
      className={
        fileList && fileList.length === 0
          ? styles.propertyWithNoImageModal
          : styles.propertyImageModal
      }
      okText={<FormattedMessage id="nemo.submit" />}
      onCancel={() => props.toggleUploadModal(false)}
      data-testid="image-upload-for-offer-modal"
      footer={[
        <Button
          key="cancel"
          onClick={() => {
            props.toggleUploadModal(false);
          }}
          data-testid="upload-image-cancel-btn"
        >
          <FormattedMessage id="nemo.cancel" />
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          disabled={fileList && fileList.length === 0}
          onClick={handleOnChange}
          data-testid="image-upload-btn"
        >
          <FormattedMessage id="nemo.upload" />
        </Button>,
      ]}
    >
      <Fragment>
        <Upload.Dragger
          name="file"
          accept="image/png, image/jpeg"
          fileList={fileList}
          data-testid="image-file-upload-dragger"
          onRemove={(file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
          }}
          onChange={({ localFile, localFileList }) => {
            if (localFileList) {
              setFileList(localFileList.map((file) => file.originFileObj));
            }
          }}
          beforeUpload={(file, fileList) => {
            setFileList(fileList);
            return false;
          }}
          multiple={true}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            <FormattedMessage id="nemo.clickOrDragToUpload" />
          </p>
          <p className="ant-upload-hint">
            <FormattedMessage id="nemo.supportForSingleOrBulkUpload" />
          </p>
        </Upload.Dragger>
      </Fragment>
    </Modal>
  );
}
