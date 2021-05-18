import React from "react";
import { Row, Col } from "antd";
import { BulbIconFormat, ThuderboltIconFormat } from "../format/IconFormat";
import PanelGrid, { CCard } from "./PanelGrid";
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
    <PanelGrid>
      <CCard title="Test topic pub and sub">
        <InputUnit
          pubtopic="myhelloiot/testtopic"
          subtopic="myhelloiot/testtopic"
        />
      </CCard>
      <CCard title="Test topic only sub">
        <InputUnit subtopic="myhelloiot/testtopic" />
      </CCard>
      <CCard title="Test topic only pub">
        <InputUnit pubtopic="myhelloiot/testtopic" />
      </CCard>
      <CCard title="Test topic Hexadecimal">
        <InputUnit
          pubtopic="myhelloiot/testtopic"
          subtopic="myhelloiot/testtopic"
          format={HEXValueEdit()}
        />
      </CCard>
      <CCard title="Test topic Base64">
        <InputUnit
          pubtopic="myhelloiot/testtopic"
          subtopic="myhelloiot/testtopic"
          format={Base64ValueEdit()}
        />
      </CCard>
      <CCard>
        <ButtonUnit
          pubtopic="myhelloiot/testtopic"
          format={LiteralIconEdit("Sends 123", Buffer.from("123"))}
        />
      </CCard>
      <CCard>
        <ButtonUnit
          pubtopic="myhelloiot/testtopic"
          format={ImageIconEdit(Themes, Buffer.from("ABC"))}
        />
      </CCard>
      <CCard>
        <ButtonUnit
          pubtopic="myhelloiot/testtopic"
          format={TitleIconEdit(Themes, "Sends XYZ", Buffer.from("XYZ"))}
        />
      </CCard>
      <CCard title="Light switch">
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
      </CCard>
      <CCard title="Switch button">
        <ButtonUnit
          pubtopic="myhelloiot/testswitch"
          puboptions={{ retain: true }}
          subtopic="myhelloiot/testswitch"
        />
      </CCard>
      <CCard title="Switch bolt">
        <ButtonUnit
          pubtopic="myhelloiot/testswitch"
          puboptions={{ retain: true }}
          subtopic="myhelloiot/testswitch"
          format={ComposedIconEdit(SwitchValueEdit(), ThuderboltIconFormat())}
        />
      </CCard>
      <CCard title="Switch on and off">
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
      </CCard>
    </PanelGrid>
  );
};

export default PanelTests;
