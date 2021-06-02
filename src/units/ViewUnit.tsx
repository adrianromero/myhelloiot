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

import React, { useEffect, useState } from "react";
import { IClientSubscribeOptions } from "mqtt";
import { useMQTTContext, useMQTTSubscribe } from "../mqtt/MQTTProvider";
import { IconFormat } from "../format/FormatTypes";
import { StrIconFormat } from "../format/IconFormat";

type ViewUnitProps = {
  subtopic: string;
  suboptions?: IClientSubscribeOptions;
  format?: IconFormat;
  className?: string;
};

const ViewUnit: React.FC<ViewUnitProps> = ({
  subtopic,
  suboptions,
  format = StrIconFormat(),
  className,
}) => {
  const [{ ready }] = useMQTTContext();
  const [buffer, setBuffer] = useState<Buffer>(Buffer.from([]));

  useEffect(() => {
    setBuffer(Buffer.from([]));
  }, [ready]); // eslint-disable-line react-hooks/exhaustive-deps

  useMQTTSubscribe(
    subtopic,
    (topic: string, mqttmessage: Buffer) => {
      setBuffer(mqttmessage);
    },
    suboptions
  );

  return <span className={className}>{format.toIcon(buffer)}</span>;
};

export default ViewUnit;
