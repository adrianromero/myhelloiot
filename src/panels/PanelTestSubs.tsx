import React, { useState, FC } from "react"; // FC functional control.
import { Row, Col, Switch } from "antd";
import InputCard from "../units/InputCard";

const PanelTestSubs: FC<{}> = () => {
  const [checked, setChecked] = useState<boolean>(false);

  return (
    <div style={{ padding: "24px" }}>
      <Row gutter={[8, 8]}>
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
        <Col span={4}>
          <InputCard
            title="Online"
            topicpub="myhelloiot/online"
            topicsub="myhelloiot/online"
          />
        </Col>
      </Row>
    </div>
  );
};
export default PanelTestSubs;
