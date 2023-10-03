/*
MYHELLOIOT
Copyright (C) 2021-2023 Adrián Romero
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

<DashboardPage title="Logging">
  <InputCard
    title="myhelloiot/testing/topic1"
    pubtopic="myhelloiot/testing/topic1"
  />
  <InputCard
    title="myhelloiot/testing/topic2 (Retain)"
    pubtopic="myhelloiot/testing/topic2"
    puboptions={{ retain: true }}
  />
  <Card title="myhelloiot/testing/topic3">
    <ButtonUnit pubtopic="myhelloiot/testing/topic3" puboptions={{ qos: 0 }} format={MessageValueFormat("QoS Zero")} icon="Qos Zero"/>
    <ButtonUnit pubtopic="myhelloiot/testing/topic3" puboptions={{ qos: 1 }} format={MessageValueFormat("QoS One")} icon="Qos One"/>
    <ButtonUnit pubtopic="myhelloiot/testing/topic3" puboptions={{ qos: 2 }} format={MessageValueFormat("QoS Two")} icon="Qos Two"/>
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
</DashboardPage>

`;

export default loggingsampledata;
