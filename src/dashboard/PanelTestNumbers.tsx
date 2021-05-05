import React, { FC } from "react"; // FC functional control.

import { Row, Col } from "antd";

import { NumberValueEdit } from "../mqtt/ValueFormat";
import CardStd from "../units/CardStd";
import InputUnit from "../units/InputUnit";
import ViewUnit from "../units/ViewUnit";
import SliderCard from "../units/SliderCard";
import { ToIconFormat, ToIconFormatNumber } from "../mqtt/IconFormat";
import {
  DashboardIconFormat,
  LinearIconFormat,
  SimpleIconFormat,
  CircularIconFormat,
  MetroIconFormat,
  ProgressIconFormat,
} from "../mqtt/GaugeFormat";

const PanelTestNumbers: FC<{}> = () => (
  <div style={{ padding: "24px" }}>
    <Row gutter={[8, 8]}>
      <Col span={6}>
        <CardStd title="El switch de number send">
          <InputUnit
            topicpub="myhelloiot/number"
            format={NumberValueEdit({ style: "unit", unit: "celsius" })}
          />
        </CardStd>
      </Col>
      <Col span={6}>
        <CardStd title="El viewer de number receive">
          <ViewUnit
            topicsub="myhelloiot/number"
            format={ToIconFormat(
              NumberValueEdit({
                style: "unit",
                unit: "celsius",
              })
            )}
          />
        </CardStd>
      </Col>
      <Col span={6}>
        <SliderCard
          title="El slider de number receive"
          topicpub="myhelloiot/number"
          topicsub="myhelloiot/number"
          format={ToIconFormatNumber(
            ToIconFormat(
              NumberValueEdit({
                style: "unit",
                unit: "celsius",
              })
            ),
            { min: -10, max: 60, step: 1 }
          )}
        />
      </Col>
      <Col span={6}>
        <CardStd title="Progress gauge card">
          <ViewUnit
            topicsub="myhelloiot/number"
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
      <Col span={6}>
        <CardStd title="Linear gauge card">
          <ViewUnit
            topicsub="myhelloiot/number"
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
      <Col span={6}>
        <CardStd title="Dashboard gauge card">
          <ViewUnit
            topicsub="myhelloiot/number"
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
      <Col span={6}>
        <CardStd title="Simple gauge card">
          <ViewUnit
            topicsub="myhelloiot/number"
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
      <Col span={6}>
        <CardStd title="Circular gauge card">
          <ViewUnit
            topicsub="myhelloiot/number"
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
      <Col span={6}>
        <CardStd title="Metro gauge card">
          <ViewUnit
            topicsub="myhelloiot/number"
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
