import React, { FC } from "react"; // FC functional control.

import { Row, Col } from "antd";

import { NumberValueEdit } from "../mqtt/ValueFormat";
import InputCard from "../units/InputCard";
import ViewCard from "../units/ViewCard";
import SliderCard from "../units/SliderCard";
import ProgressCard from "../units/ProgressCard";
import { ToIconFormat, ToIconFormatNumber } from "../mqtt/IconFormat";
import {
  DashboardIconFormat,
  LinearIconFormat,
  SimpleIconFormat,
  CircularIconFormat,
} from "../mqtt/GaugeFormat";

const PanelTestNumbers: FC<{}> = () => (
  <div style={{ padding: "24px" }}>
    <Row gutter={[8, 8]}>
      <Col span={6}>
        <InputCard
          title="El switch de number send"
          topicpub="myhelloiot/number"
          format={NumberValueEdit({ style: "unit", unit: "celsius" })}
        />
      </Col>
      <Col span={6}>
        <ViewCard
          title="El viewer de number receive"
          topicsub="myhelloiot/number"
          format={ToIconFormat(
            NumberValueEdit({
              style: "unit",
              unit: "celsius",
            })
          )}
        />
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
        <ProgressCard
          title="El progress"
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
        <ViewCard
          title="Primer gauge"
          topicsub="myhelloiot/number"
          format={LinearIconFormat(
            { title: "First gauge", min: -10, max: 60, step: 5 },
            {
              style: "unit",
              unit: "celsius",
            }
          )}
        />
      </Col>
      <Col span={6}>
        <ViewCard
          title="Segundo gauge"
          topicsub="myhelloiot/number"
          format={DashboardIconFormat(
            { title: "Second gauge", min: -10, max: 60 },
            {
              style: "unit",
              unit: "celsius",
            }
          )}
        />
      </Col>
      <Col span={6}>
        <ViewCard
          title="Third gauge"
          topicsub="myhelloiot/number"
          format={SimpleIconFormat(
            { title: "Third gauge", min: -10, max: 60 },
            {
              style: "unit",
              unit: "celsius",
            }
          )}
        />
      </Col>
      <Col span={6}>
        <ViewCard
          title="Fourth gauge"
          topicsub="myhelloiot/number"
          format={CircularIconFormat(
            { title: "Fourth gauge", min: -10, max: 60, step: 5 },
            {
              style: "unit",
              unit: "celsius",
            }
          )}
        />
      </Col>
    </Row>
  </div>
);
export default PanelTestNumbers;
