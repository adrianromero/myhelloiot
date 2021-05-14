import React from "react";
import { Row, Col } from "antd";
import { BulbIconFormat, ThuderboltIconFormat } from "../format/IconFormat";
import CardStd from "../units/CardStd";
import InputUnit from "../units/InputUnit";
import SwitchUnit from "../units/SwitchUnit";
import ButtonUnit from "../units/ButtonUnit";
import ViewUnit from "../units/ViewUnit";
import {
  TitleIconEdit,
  LiteralIconEdit,
  ImageIconEdit,
} from "../format/ButtonFormat";
import { ComposedIconEdit } from "../format/IconFormat";
import {
  HEXValueEdit,
  Base64ValueEdit,
  SwitchValueEdit,
} from "../format/ValueFormat";
import { ReactComponent as Themes } from "../assets/svg/themes.svg";

const PanelTests: React.FC<{}> = () => {
  return (
    <div className="myhAppContent-panel">
      <Row
        gutter={[
          { xs: 8, sm: 8, md: 8, lg: 8 },
          { xs: 8, sm: 8, md: 8, lg: 8 },
        ]}
      >
        <Col xs={24} sm={24} md={12} lg={6}>
          <CardStd title="Test topic pub and sub">
            <InputUnit
              pubtopic="myhelloiot/testtopic"
              subtopic="myhelloiot/testtopic"
            />
          </CardStd>
        </Col>
        <Col xs={24} sm={24} md={12} lg={6}>
          <CardStd title="Test topic only sub">
            <InputUnit subtopic="myhelloiot/testtopic" />
          </CardStd>
        </Col>
        <Col xs={24} sm={24} md={12} lg={6}>
          <CardStd title="Test topic only pub">
            <InputUnit pubtopic="myhelloiot/testtopic" />
          </CardStd>
        </Col>
        <Col xs={24} sm={24} md={12} lg={6}>
          <CardStd title="Test topic Hexadecimal">
            <InputUnit
              pubtopic="myhelloiot/testtopic"
              subtopic="myhelloiot/testtopic"
              format={HEXValueEdit()}
            />
          </CardStd>
        </Col>
        <Col xs={24} sm={24} md={12} lg={6}>
          <CardStd title="Test topic Base64">
            <InputUnit
              pubtopic="myhelloiot/testtopic"
              subtopic="myhelloiot/testtopic"
              format={Base64ValueEdit()}
            />
          </CardStd>
        </Col>
        <Col xs={24} sm={24} md={12} lg={6}>
          <CardStd>
            <ButtonUnit
              pubtopic="myhelloiot/testtopic"
              format={LiteralIconEdit("Sends 123", Buffer.from("123"))}
            />
          </CardStd>
        </Col>
        <Col xs={24} sm={24} md={12} lg={6}>
          <CardStd>
            <ButtonUnit
              pubtopic="myhelloiot/testtopic"
              format={ImageIconEdit(Themes, Buffer.from("ABC"))}
            />
          </CardStd>
        </Col>
        <Col xs={24} sm={24} md={12} lg={6}>
          <CardStd>
            <ButtonUnit
              pubtopic="myhelloiot/testtopic"
              format={TitleIconEdit(Themes, "Sends XYZ", Buffer.from("XYZ"))}
            />
          </CardStd>
        </Col>
        <Col xs={24} sm={24} md={12} lg={6}>
          <CardStd title="Light switch">
            <div
              className="myh-value myh-value-padding"
              style={{
                display: "flex",
                justifyContent: "center",
                backgroundColor: "#e1e1e1",
                borderRadius: "15px",
              }}
            >
              <ViewUnit
                subtopic="myhelloiot/testswitch"
                format={ComposedIconEdit(SwitchValueEdit(), BulbIconFormat())}
              />
            </div>
            <div
              className="myh-value myh-value-padding"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <SwitchUnit
                pubtopic="myhelloiot/testswitch"
                puboptions={{ retain: true }}
                subtopic="myhelloiot/testswitch"
              />
            </div>
          </CardStd>
        </Col>
        <Col xs={24} sm={24} md={12} lg={6}>
          <CardStd title="Switch button">
            <ButtonUnit
              pubtopic="myhelloiot/testswitch"
              puboptions={{ retain: true }}
              subtopic="myhelloiot/testswitch"
            />
          </CardStd>
        </Col>
        <Col xs={24} sm={24} md={12} lg={6}>
          <CardStd title="Switch bolt">
            <ButtonUnit
              pubtopic="myhelloiot/testswitch"
              puboptions={{ retain: true }}
              subtopic="myhelloiot/testswitch"
              format={ComposedIconEdit(
                SwitchValueEdit(),
                ThuderboltIconFormat()
              )}
            />
          </CardStd>
        </Col>
        <Col xs={24} sm={24} md={12} lg={6}>
          <CardStd title="Switch on and off">
            <Row gutter={8}>
              <Col span={12}>
                <ButtonUnit
                  pubtopic="myhelloiot/testswitch"
                  puboptions={{ retain: true }}
                  format={LiteralIconEdit("ON", Buffer.from("1"))}
                />
              </Col>
              <Col span={12}>
                <ButtonUnit
                  pubtopic="myhelloiot/testswitch"
                  puboptions={{ retain: true }}
                  format={LiteralIconEdit("OFF", Buffer.from("0"))}
                />
              </Col>
            </Row>
          </CardStd>
        </Col>
      </Row>
    </div>
  );
};

export default PanelTests;
