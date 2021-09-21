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
import { IClientSubscribeOptions } from "mqtt";
import { Modal } from "antd";
import { MQTTMessage, useMQTTSubscribe } from "../mqtt/MQTTProvider";
import { ValueFormat } from "../format/FormatTypes";
import { StrValueFormat } from "../format/ValueFormat";
import { useAppStoreProperty } from "../AppStoreProvider";

type ModalUnitProps = {
  instancekey: string;
  subtopic: string;
  suboptions?: IClientSubscribeOptions;
  format?: ValueFormat;
  title?: string;
  cancelable?: boolean;
  className?: string;
  children: React.ReactNode;
};

const ModalUnit: React.FC<ModalUnitProps> = ({
  instancekey,
  subtopic,
  suboptions,
  format = StrValueFormat(),
  title,
  cancelable = true,
  className = "",
  children,
}) => {
  const [isModalVisible, setIsModalVisible] = useAppStoreProperty(
    instancekey + "-modal-visible"
  );

  useMQTTSubscribe(
    subtopic,
    ({ message }: MQTTMessage) => setIsModalVisible(format.toDisplay(message)),
    suboptions
  );

  // const handleOk = () => {
  //   setIsModalVisible("0");
  // };

  const handleCancel = () => {
    setIsModalVisible("0");
  };

  return (
    <Modal
      title={title}
      maskClosable={cancelable}
      closable={cancelable}
      keyboard={cancelable}
      visible={isModalVisible === "1"}
      onCancel={handleCancel}
      footer={
        null
        // [
        //   <Button key="cancel" onClick={handleCancel}>
        //     Cancel
        //   </Button>,
        //   <Button key="ok" type="primary" onClick={handleOk}>
        //     Close
        //   </Button>,
        // ]
      }
      className={`myhModalUnit ${className}`}
    >
      {children}
    </Modal>
  );
};

export default ModalUnit;
