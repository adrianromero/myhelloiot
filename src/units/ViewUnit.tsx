import React, { useEffect, useState } from "react"; // FC functional control.
import { useMQTTContext, useMQTTSubscribe } from "../mqtt/MQTTProvider";
import { IconFormat } from "../mqtt/FormatTypes";
import { StrIconFormat } from "../mqtt/IconFormat";

import "antd/dist/antd.css";
import "../assets/main.css";

type ViewUnitProps = {
  topicsub: string;
  format?: IconFormat;
};

const ViewUnit: React.FC<ViewUnitProps> = ({
  topicsub,
  format = StrIconFormat(),
}) => {
  const [{ connected }] = useMQTTContext();
  const [buffer, setBuffer] = useState<Buffer>(Buffer.from([]));

  useEffect(() => {
    setBuffer(Buffer.from([]));
  }, [connected]); // eslint-disable-line react-hooks/exhaustive-deps

  useMQTTSubscribe(topicsub, (topic: string, mqttmessage: Buffer) => {
    setBuffer(mqttmessage);
  });

  return <>{format.toIcon(buffer)}</>;
};
export default ViewUnit;
