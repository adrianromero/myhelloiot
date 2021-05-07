import React, { useEffect, useState } from "react"; // FC functional control.
import { IClientSubscribeOptions } from "mqtt";
import { useMQTTContext, useMQTTSubscribe } from "../mqtt/MQTTProvider";
import { IconFormat } from "../format/FormatTypes";
import { StrIconFormat } from "../format/IconFormat";

import "antd/dist/antd.css";
import "../assets/main.css";

type ViewUnitProps = {
  subtopic: string;
  suboptions?: IClientSubscribeOptions;
  format?: IconFormat;
};

const ViewUnit: React.FC<ViewUnitProps> = ({
  subtopic,
  suboptions,
  format = StrIconFormat(),
}) => {
  const [{ connected }] = useMQTTContext();
  const [buffer, setBuffer] = useState<Buffer>(Buffer.from([]));

  useEffect(() => {
    setBuffer(Buffer.from([]));
  }, [connected]); // eslint-disable-line react-hooks/exhaustive-deps

  useMQTTSubscribe(
    subtopic,
    (topic: string, mqttmessage: Buffer) => {
      setBuffer(mqttmessage);
    },
    suboptions
  );

  return format.toIcon(buffer);
};
export default ViewUnit;
