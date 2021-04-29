import React, { FC } from "react"; // FC functional control.

import { Row, Col } from "antd";

import {
  BulbIconFormat,
  StarIconFormat,
  ThuderboltIconFormat,
} from "../mqtt/IconFormat";
import InputCard from "../units/InputCard";
import SwitchCard from "../units/SwitchCard";
import ButtonCard from "../units/ButtonCard";
import ViewCard from "../units/ViewCard";
import {
  TitleIconEdit,
  LiteralIconEdit,
  ImageIconEdit,
} from "../mqtt/ButtonFormat";
import { ComposedIconEdit } from "../mqtt/IconFormat";
import {
  HEXValueEdit,
  Base64ValueEdit,
  SwitchValueEdit,
} from "../mqtt/ValueFormat";
import { ReactComponent as Themes } from "../assets/svg/themes.svg";

const PanelTests: FC<{}> = () => (
  <div style={{ padding: "24px" }}>
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
          format={HEXValueEdit()}
        />
      </Col>
      <Col span={4}>
        <InputCard
          title="cosita2"
          topicpub="myhelloiot/cosita"
          topicsub="myhelloiot/cosita"
          format={Base64ValueEdit()}
        />
      </Col>
      <Col span={4}>
        <InputCard title="Subscribe only" topicsub="myhelloiot/cosita" />
      </Col>
      <Col span={4}>
        <InputCard title="Publish only" topicpub="myhelloiot/cosita" />
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
          title="El viewer de number receive"
          topicsub="myhelloiot/cosita"
        />
      </Col>
      <Col span={4}>
        <SwitchCard
          title="El switch de cosita"
          footer="Switch footer"
          topicpub="myhelloiot/cosita"
          topicsub="myhelloiot/cosita"
        />
      </Col>
      <Col span={4}>
        <ButtonCard
          title="El switch de cosita"
          topicpub="myhelloiot/cosita"
          topicsub="myhelloiot/cosita"
        />
      </Col>
      <Col span={4}>
        <ButtonCard
          title="Button title"
          footer="Button footer"
          topicpub="myhelloiot/cosita"
          topicsub="myhelloiot/cosita"
          format={ComposedIconEdit(SwitchValueEdit(), BulbIconFormat())}
        />
      </Col>
      <Col span={4}>
        <ButtonCard
          topicpub="myhelloiot/cosita"
          topicsub="myhelloiot/cosita"
          format={ComposedIconEdit(SwitchValueEdit(), ThuderboltIconFormat())}
        />
      </Col>
      <Col span={4}>
        <ButtonCard
          topicpub="myhelloiot/cosita"
          topicsub="myhelloiot/cosita"
          format={ComposedIconEdit(SwitchValueEdit(), StarIconFormat())}
        />
      </Col>
      <Col span={4}>
        <ButtonCard
          footer="text"
          topicpub="pepe/cosa/cosita"
          format={LiteralIconEdit("Button", Buffer.from("mensaje"))}
        />
      </Col>
      <Col span={4}>
        <ButtonCard
          footer="svg"
          topicpub="pepe/cosa/cosita"
          format={ImageIconEdit(Themes, Buffer.from("mensaje"))}
        />
      </Col>
      <Col span={4}>
        <ButtonCard
          footer="svg + text"
          topicpub="pepe/cosa/cosita"
          format={TitleIconEdit(Themes, "Colors", Buffer.from("mensaje"))}
        />
      </Col>
    </Row>
  </div>
);
export default PanelTests;
