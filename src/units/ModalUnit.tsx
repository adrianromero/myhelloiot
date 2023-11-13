/*
MYHELLOIOT
Copyright (C) 2021-2023 Adrián Romero
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
import { Buffer } from "buffer";
import { IClientSubscribeOptions } from "mqtt";
import { Modal } from "antd";
import type { MQTTMessage } from "../mqtt/MQTTProvider";
import { useMQTTSubscribe } from "../mqtt/MQTTHooks";
import type { ONOFF } from "../format/FormatTypes";
import { ONOFFNumber } from "../format/FormatConstants";
import { useAppStoreProperty } from "../AppStoreHooks";

type ModalUnitProps = {
  instancekey?: string;
  subtopic?: string;
  suboptions?: IClientSubscribeOptions;
  onoff?: ONOFF;
  title?: string;
  cancelable?: boolean;
  className?: string;
  children?: React.ReactNode;
};

const ModalUnit: React.FC<ModalUnitProps> = ({
  instancekey = "",
  subtopic = "",
  suboptions,
  onoff = ONOFFNumber,
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
    ({ message }: MQTTMessage) => setIsModalVisible(message.toString()),
    suboptions
  );

  // const handleOk = () => {
  //   setIsModalVisible(onoff.off.toString());
  // };

  const handleCancel = () => {
    setIsModalVisible(onoff.off.toString());
  };

  return (
    <Modal
      title={title}
      maskClosable={cancelable}
      closable={cancelable}
      keyboard={cancelable}
      open={
        isModalVisible ? onoff.on.equals(Buffer.from(isModalVisible)) : false
      }
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
