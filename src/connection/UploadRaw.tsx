import React from "react";
import { DownloadOutlined, UploadOutlined } from "@ant-design/icons";
import { Upload, Button, Input } from "antd";
import { RcFile } from "antd/lib/upload/interface";
import "./UploadRaw.css";

export type UploadRawProps = {
  accept: string;
  value?: string;
  onChange?: (value?: string) => void;
};

const UploadRaw: React.FC<UploadRawProps> = ({ accept, value, onChange }) => {
  const handleUpload = (file: RcFile) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      const urldata = reader.result as string;
      if (urldata === "data:") {
        onChange?.("");
      } else {
        fetch(urldata)
          .then((response) => response.text())
          .then((data) => onChange?.(data));
      }
    };
    return false;
  };

  return (
    <>
      <div
        style={{ display: "flex", alignItems: "center", paddingBottom: "5px" }}
      >
        <div>
          <Upload
            accept={accept}
            multiple={false}
            fileList={[]}
            beforeUpload={handleUpload}
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Load {accept}</Button>
          </Upload>
        </div>
        <div>
          <Button icon={<DownloadOutlined />}>Save {accept}</Button>
          {/* <a href="data:...." target="_blank"/> */}
        </div>
      </div>
      <Input.TextArea
        className="myhUploadRaw-data"
        onChange={(e) => onChange?.(e.target.value)}
        value={value}
      />
    </>
  );
};

export default UploadRaw;
