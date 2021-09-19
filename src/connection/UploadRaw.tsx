/*
MYHELLOIOT
Copyright (C) 2021 Adrián Romero
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

import React from "react";
import { DownloadOutlined, UploadOutlined } from "@ant-design/icons";
import { Upload, Button, Input, Col, Row } from "antd";
import { RcFile } from "antd/lib/upload/interface";
import { cyrb53str } from "./CryptFunctions";
import "./UploadRaw.css";

export type FileInfo = {
  name: string;
  type: string;
  data: string;
  hash: string;
};

export type UploadRawProps = {
  accept: string;
  value?: FileInfo;
  className?: string;
  onChange?: (v?: FileInfo) => void;
};

const UploadRaw: React.FC<UploadRawProps> = ({
  accept,
  value,
  onChange,
  className,
}) => {
  const handleUpload = (file: RcFile): boolean => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      const urldata = reader.result as string;
      if (urldata === "data:") {
        onChange?.({
          name: file.name,
          type: file.type,
          data: "",
          hash: cyrb53str(""),
        });
      } else {
        fetch(urldata)
          .then((response) => response.text())
          .then((data) =>
            onChange?.({
              name: file.name,
              type: file.type,
              data,
              hash: cyrb53str(data),
            })
          );
      }
    };
    return false;
  };

  const download = () => {
    if (!value) {
      throw new Error("Cannot download empty value.");
    }

    const dataurl = `data:${value.type || "text/plain"};base64,${btoa(
      value.data
    )}`;
    const a = document.createElement("a");
    a.href = dataurl;
    a.download = value.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <>
      <Row gutter={[8, 8]} className={className}>
        <Col xs={24} sm={24} md={24} lg={24}>
          <Row gutter={[8, 8]} wrap={false} align="middle">
            <Col flex="0 1 auto">
              <span>Name:</span>
            </Col>
            <Col flex="1 1 auto">
              <Input
                className="myhUploadRaw-name"
                onChange={(e) =>
                  onChange?.({
                    name: e.target.value,
                    type: value?.type || "",
                    data: value?.data || "",
                    hash: cyrb53str(value?.data || ""),
                  })
                }
                value={value?.name || ""}
              />
            </Col>
            <Col flex="0 1 auto">
              <Upload
                accept={accept}
                multiple={false}
                fileList={[]}
                beforeUpload={handleUpload}
                maxCount={1}
              >
                <Button icon={<UploadOutlined />} />
              </Upload>
            </Col>
            <Col flex="0 1 auto">
              <Button
                icon={<DownloadOutlined />}
                onClick={download}
                disabled={!value?.name}
              />
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Input.TextArea
            className="myhUploadRaw-data"
            onChange={(e) =>
              onChange?.({
                name: value?.name || "",
                type: value?.type || "",
                data: e.target.value,
                hash: cyrb53str(e.target.value),
              })
            }
            value={value?.data || ""}
          />
        </Col>
      </Row>
    </>
  );
};

export default UploadRaw;
