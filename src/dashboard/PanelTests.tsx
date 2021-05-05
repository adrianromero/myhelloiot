import React, { FC } from "react"; // FC functional control.

import { Row, Col } from "antd";

import {
  BulbIconFormat,
  StarIconFormat,
  ThuderboltIconFormat,
} from "../mqtt/IconFormat";
import CardStd from "../units/CardStd";
import InputUnit from "../units/InputUnit";
import SwitchUnit from "../units/SwitchUnit";
import ButtonUnit from "../units/ButtonUnit";
import ViewUnit from "../units/ViewUnit";
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
        <CardStd title="cosita">
          <InputUnit
            topicpub="myhelloiot/cosita"
            topicsub="myhelloiot/cosita"
          />
        </CardStd>
      </Col>
      <Col span={4}>
        <CardStd title="cosita2">
          <InputUnit
            topicpub="myhelloiot/cosita"
            topicsub="myhelloiot/cosita"
            format={HEXValueEdit()}
          />
        </CardStd>
      </Col>
      <Col span={4}>
        <CardStd title="cosita2">
          <InputUnit
            topicpub="myhelloiot/cosita"
            topicsub="myhelloiot/cosita"
            format={Base64ValueEdit()}
          />
        </CardStd>
      </Col>
      <Col span={4}>
        <CardStd title="Subscribe only">
          <InputUnit topicsub="myhelloiot/cosita" />
        </CardStd>
      </Col>
      <Col span={4}>
        <CardStd title="Publish only">
          <InputUnit topicpub="myhelloiot/cosita" />
        </CardStd>
      </Col>
      <Col span={4}>
        <CardStd title={"\u00A0"}>
          <InputUnit
            topicpub="myhelloiot/cosita"
            topicsub="myhelloiot/cosita"
          />
        </CardStd>
      </Col>
      <Col span={4}>
        <CardStd title="El viewer de number receive">
          <ViewUnit topicsub="myhelloiot/cosita" />
        </CardStd>
      </Col>
      <Col span={4}>
        <CardStd title="El switch de cosita">
          <SwitchUnit
            topicpub="myhelloiot/cosita"
            topicsub="myhelloiot/cosita"
          />
        </CardStd>
      </Col>
      <Col span={4}>
        <CardStd title="El switch de cosita">
          <ButtonUnit
            topicpub="myhelloiot/cosita"
            topicsub="myhelloiot/cosita"
          />
        </CardStd>
      </Col>
      <Col span={4}>
        <CardStd title="Button title">
          <ButtonUnit
            topicpub="myhelloiot/cosita"
            topicsub="myhelloiot/cosita"
            format={ComposedIconEdit(SwitchValueEdit(), BulbIconFormat())}
          />
        </CardStd>
      </Col>
      <Col span={4}>
        <CardStd>
          <ButtonUnit
            topicpub="myhelloiot/cosita"
            topicsub="myhelloiot/cosita"
            format={ComposedIconEdit(SwitchValueEdit(), ThuderboltIconFormat())}
          />
        </CardStd>
      </Col>
      <Col span={4}>
        <CardStd>
          <ButtonUnit
            topicpub="myhelloiot/cosita"
            topicsub="myhelloiot/cosita"
            format={ComposedIconEdit(SwitchValueEdit(), StarIconFormat())}
          />
        </CardStd>
      </Col>
      <Col span={4}>
        <CardStd>
          <ButtonUnit
            topicpub="pepe/cosa/cosita"
            format={LiteralIconEdit("Button", Buffer.from("mensaje"))}
          />
        </CardStd>
      </Col>
      <Col span={4}>
        <CardStd>
          <ButtonUnit
            topicpub="pepe/cosa/cosita"
            format={ImageIconEdit(Themes, Buffer.from("mensaje"))}
          />
        </CardStd>
      </Col>
      <Col span={4}>
        <CardStd>
          <ButtonUnit
            topicpub="pepe/cosa/cosita"
            format={TitleIconEdit(Themes, "Colors", Buffer.from("mensaje"))}
          />
        </CardStd>
      </Col>
    </Row>
  </div>
);
export default PanelTests;
