/*
MYHELLOIOT
Copyright (C) 2021 Adrián Romero
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

const lightssampledata = `{/* Light switches example. */}
<DashboardGrid>
  <CCard title="Light switches">
    <Row>
      <Col flex="0 1 auto">
        <ViewUnit
          subtopic="myhelloiot/testswitch1"
          format={BulbIconFormat()}
        />
      </Col>
      <Col flex="1 1 auto">Light test 1: </Col>
      <Col flex="0 1 auto">
        <SwitchUnit
          pubtopic="myhelloiot/testswitch1"
          puboptions={{ retain: true }}
          subtopic="myhelloiot/testswitch1"
        />
      </Col>
    </Row>
    <Row>
      <Col flex="0 1 auto">
        <ViewUnit
          subtopic="myhelloiot/testswitch2"
          format={BulbIconFormat()}
        />
      </Col>
      <Col flex="1 1 auto">Light test 2: </Col>
      <Col flex="0 1 auto">
        <SwitchUnit
          pubtopic="myhelloiot/testswitch2"
          puboptions={{ retain: true }}
          subtopic="myhelloiot/testswitch2"
        />
      </Col>
    </Row>
    <Row>
      <Col flex="0 1 auto">
        <ViewUnit
          subtopic="myhelloiot/testswitch3"
          format={BulbIconFormat()}
        />
      </Col>
      <Col flex="1 1 auto">Light test 3: </Col>
      <Col flex="0 1 auto">
        <SwitchUnit
          pubtopic="myhelloiot/testswitch3"
          puboptions={{ retain: true }}
          subtopic="myhelloiot/testswitch3"
        />
      </Col>
    </Row>
  </CCard>
  <CCard title="Light test 1">
    <ButtonUnit
      pubtopic="myhelloiot/testswitch1"
      puboptions={{ retain: true }}
      subtopic="myhelloiot/testswitch1"
      format={SwitchIconValueFormat()}
    />
  </CCard>
  <CCard title="Light test 2">
    <ButtonUnit
      pubtopic="myhelloiot/testswitch2"
      puboptions={{ retain: true }}
      subtopic="myhelloiot/testswitch2"
      format={SwitchIconValueFormat({icon:faStar})}
    />
  </CCard>
  <CCard title="Light test 3">
    <ButtonUnit
      pubtopic="myhelloiot/testswitch3"
      puboptions={{ retain: true }}
      subtopic="myhelloiot/testswitch3"
      format={SwitchIconValueFormat({icon:faBolt})}
    />
  </CCard>
</DashboardGrid>
`;

export default lightssampledata;
