/*
MYHELLOIOT
Copyright (C) 2021-2022 Adrián Romero
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

const loggingsampledata = `{/* Logging example. */}

<Dashboard title="Logging">
  <PanelFlex>
    <Card title="myhelloiot/testing/topic1">
      <InputUnit pubtopic="myhelloiot/testing/topic1" />
    </Card>
    <Card title="myhelloiot/testing/topic2 (Retain)">
      <InputUnit pubtopic="myhelloiot/testing/topic2" puboptions={{ retain: true }} />
    </Card>
    <Card title="myhelloiot/testing/topic3">
      <ButtonMessage pubtopic="myhelloiot/testing/topic3" puboptions={{ qos: 0 }} value="QoS Zero">QoS Zero</ButtonMessage>
      <ButtonMessage pubtopic="myhelloiot/testing/topic3" puboptions={{ qos: 1 }} value="QoS One">QoS One</ButtonMessage>
      <ButtonMessage pubtopic="myhelloiot/testing/topic3" puboptions={{ qos: 2 }} value="QoS Two">QoS Two</ButtonMessage>
    </Card>
    <Card title="myhelloiot/testing/topic4">
      <div style={{display: "flex", margin: "4px"}}>
        <div style={{flex: "1 1 auto"}}>Testing topic 4: </div>
        <div style={{flex: "0 1 auto"}}>
          <SwitchUnit
            pubtopic="myhelloiot/testing/topic4"
          />
        </div>
      </div>
    </Card>
    <Card className="myhDashboardPage-all">
      <LogTool subtopic="myhelloiot/testing/#" suboptions={{ qos: 2 }}/>
    </Card>
  </PanelFlex>
</Dashboard>
`;

export default loggingsampledata;
