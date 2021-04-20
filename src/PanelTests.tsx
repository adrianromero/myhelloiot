import React, { FC } from "react"; // FC functional control.

import { Row, Col } from "antd";

import { ToComposedIconEdit, ToIconFormat } from "./mqtt/FormatTypes";
import { ToHEX, ToBase64, ToIntlNumber, ToSwitch } from "./mqtt/StringEdit";
import { ToIconBulb, ToStar, ToThuderbolt } from "./mqtt/IconFormat";
import InputCard from "./units/InputCard";
import SwitchCard from "./units/SwitchCard";
import ButtonCard from "./units/ButtonCard";
import ViewCard from "./units/ViewCard";

const PanelTests: FC<{}> = () => (
  <Row gutter={[8, 8]}>
    <Col span={4}>
      <InputCard
        title="cosita"
        topicpub="myhelloiot/cosita"
        topicsub="myhelloiot/cosita"
      />
    </Col>
    <Col span={4}>
      <InputCard
        title="cosita2"
        topicpub="myhelloiot/cosita"
        topicsub="myhelloiot/cosita"
        format={ToHEX()}
      />
    </Col>
    <Col span={4}>
      <InputCard
        title="cosita2"
        topicpub="myhelloiot/cosita"
        topicsub="myhelloiot/cosita"
        format={ToBase64()}
      />
    </Col>
    <Col span={4}>
      <InputCard
        title="Subscribe only"
        topicpub=""
        topicsub="myhelloiot/cosita"
      />
    </Col>
    <Col span={4}>
      <InputCard
        title="Publish only"
        topicpub="myhelloiot/cosita"
        topicsub=""
      />
    </Col>
    <Col span={4}>
      <InputCard
        title={"\u00A0"}
        topicpub="myhelloiot/cosita"
        topicsub="myhelloiot/cosita"
      />
    </Col>
    <Col span={4}>
      <ViewCard
        title={"El viewer de number receive"}
        topicsub="myhelloiot/cosita"
      />
    </Col>
    <Col span={4}>
      <SwitchCard
        title={"El switch de cosita"}
        topicpub="myhelloiot/cosita"
        topicsub="myhelloiot/cosita"
      />
    </Col>
    <Col span={4}>
      <ButtonCard topicpub="myhelloiot/cosita" topicsub="myhelloiot/cosita" />
    </Col>
    <Col span={4}>
      <ButtonCard
        topicpub="myhelloiot/cosita"
        topicsub="myhelloiot/cosita"
        format={ToComposedIconEdit(ToSwitch(), ToIconBulb())}
      />
    </Col>
    <Col span={4}>
      <ButtonCard
        topicpub="myhelloiot/cosita"
        topicsub="myhelloiot/cosita"
        format={ToComposedIconEdit(ToSwitch(), ToThuderbolt())}
      />
    </Col>
    <Col span={4}>
      <ButtonCard
        topicpub="myhelloiot/cosita"
        topicsub="myhelloiot/cosita"
        format={ToComposedIconEdit(ToSwitch(), ToStar())}
      />
    </Col>
    <Col span={4}>
      <InputCard
        title={"El switch de number send"}
        topicpub="myhelloiot/number"
        topicsub=""
        format={ToIntlNumber({ style: "unit", unit: "celsius" })}
      />
    </Col>
    <Col span={4}>
      <ViewCard
        title={"El viewer de number receive"}
        topicsub="myhelloiot/number"
        format={ToIconFormat(
          ToIntlNumber({
            style: "unit",
            unit: "celsius",
          })
        )}
      />
    </Col>
  </Row>
);
export default PanelTests;
