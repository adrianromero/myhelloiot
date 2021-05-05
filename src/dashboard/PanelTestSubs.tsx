import React, { useState, FC } from "react"; // FC functional control.
import { Row, Col, Switch } from "antd";
import CardStd from "../units/CardStd";
import InputUnit from "../units/InputUnit";

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
            <CardStd title="cosita">
              <InputUnit
                topicpub="myhelloiot/cosita"
                topicsub="myhelloiot/cosita"
              />
            </CardStd>
          </Col>
        )}
        {!checked && (
          <Col span={4}>
            <CardStd title="number">
              <InputUnit
                topicpub="myhelloiot/number"
                topicsub="myhelloiot/number"
              />
            </CardStd>
          </Col>
        )}
        <Col span={4}>
          <CardStd title="Online">
            <InputUnit
              topicpub="myhelloiot/online"
              topicsub="myhelloiot/online"
            />
          </CardStd>
        </Col>
      </Row>
    </div>
  );
};
export default PanelTestSubs;
