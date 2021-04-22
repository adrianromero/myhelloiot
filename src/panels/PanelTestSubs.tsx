import React, { useState, FC } from "react"; // FC functional control.
import { Row, Col, Switch } from "antd";
import InputCard from "../units/InputCard";

const PanelTestSubs: FC<{}> = () => {
  const [checked, setChecked] = useState<boolean>(false);

  return (
    <Row gutter={[8, 8]} style={{ padding: "24px" }}>
      <Col>
        <Switch checked={checked} onChange={setChecked} />
      </Col>
      {checked && (
        <Col span={4}>
          <InputCard
            title="cosita"
            topicpub="myhelloiot/cosita"
            topicsub="myhelloiot/cosita"
          />
        </Col>
      )}
      {!checked && (
        <Col span={4}>
          <InputCard
            title="number"
            topicpub="myhelloiot/number"
            topicsub="myhelloiot/number"
          />
        </Col>
      )}
    </Row>
  );
};
export default PanelTestSubs;
