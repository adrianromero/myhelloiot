import React from "react"; // FC functional control.
import { Row, Col } from "antd";
import { NumberValueEdit } from "../format/ValueFormat";
import CardStd from "../units/CardStd";
import InputUnit from "../units/InputUnit";
import ViewUnit from "../units/ViewUnit";
import SliderUnit from "../units/SliderUnit";
import { ToIconFormat } from "../format/IconFormat";
import {
  DashboardIconFormat,
  LinearIconFormat,
  SimpleIconFormat,
  CircularIconFormat,
  MetroIconFormat,
  ProgressIconFormat,
} from "../format/GaugeFormat";

const PanelTestNumbers: React.FC<{}> = () => (
  <div className="myhAppContent-panel">
    <Row
      gutter={[
        { xs: 8, sm: 8, md: 8, lg: 8 },
        { xs: 8, sm: 8, md: 8, lg: 8 },
      ]}
    >
      <Col xs={24} sm={12} md={12} lg={6}>
        <CardStd title="Select temperature">
          <InputUnit
            pubtopic="myhelloiot/temperature"
            subtopic="myhelloiot/temperature"
            format={NumberValueEdit({ style: "unit", unit: "celsius" })}
          />
        </CardStd>
      </Col>
      <Col xs={24} sm={12} md={12} lg={6}>
        <CardStd title="Select temperature">
          <ViewUnit
            subtopic="myhelloiot/temperature"
            format={ToIconFormat(
              NumberValueEdit({
                style: "unit",
                unit: "celsius",
              })
            )}
          />
          <SliderUnit
            pubtopic="myhelloiot/temperature"
            subtopic="myhelloiot/temperature"
            numberValidation={{ min: -10, max: 60, step: 1 }}
          />
        </CardStd>
      </Col>
      <Col xs={24} sm={12} md={12} lg={6}>
        <CardStd title="Progress gauge card">
          <ViewUnit
            subtopic="myhelloiot/temperature"
            format={ProgressIconFormat(
              {
                title: "Progress gauge",
                min: -10,
                max: 60,
              },
              {
                style: "unit",
                unit: "celsius",
              }
            )}
          />
        </CardStd>
      </Col>
      <Col xs={24} sm={12} md={12} lg={6}>
        <CardStd title="Linear gauge card">
          <ViewUnit
            subtopic="myhelloiot/temperature"
            format={LinearIconFormat(
              {
                title: "Linear gauge",
                min: -10,
                max: 60,
                step: 5,
                labelstep: 70,
              },
              {
                style: "unit",
                unit: "celsius",
              }
            )}
          />
        </CardStd>
      </Col>
      <Col xs={24} sm={12} md={12} lg={6}>
        <CardStd title="Dashboard gauge card">
          <ViewUnit
            subtopic="myhelloiot/temperature"
            format={DashboardIconFormat(
              { title: "Dashboard gauge", min: -10, max: 60 },
              {
                style: "unit",
                unit: "celsius",
              }
            )}
          />
        </CardStd>
      </Col>
      <Col xs={24} sm={12} md={12} lg={6}>
        <CardStd title="Simple gauge card">
          <ViewUnit
            subtopic="myhelloiot/temperature"
            format={SimpleIconFormat(
              { title: "Simple gauge", min: -10, max: 60 },
              {
                style: "unit",
                unit: "celsius",
              }
            )}
          />
        </CardStd>
      </Col>
      <Col xs={24} sm={12} md={12} lg={6}>
        <CardStd title="Circular gauge card">
          <ViewUnit
            subtopic="myhelloiot/temperature"
            format={CircularIconFormat(
              { title: "Circular gauge", min: -10, max: 60, step: 5 },
              {
                style: "unit",
                unit: "celsius",
              }
            )}
          />
        </CardStd>
      </Col>
      <Col xs={24} sm={12} md={12} lg={6}>
        <CardStd title="Metro gauge card">
          <ViewUnit
            subtopic="myhelloiot/temperature"
            format={MetroIconFormat(
              {
                title: "Metro gauge",
                min: -10,
                max: 60,
                step: 1,
                labelstep: 5,
              },
              {
                style: "unit",
                unit: "celsius",
              }
            )}
          />
        </CardStd>
      </Col>
    </Row>
  </div>
);
export default PanelTestNumbers;
