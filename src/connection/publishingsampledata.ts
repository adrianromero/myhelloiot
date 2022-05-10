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

const pubsampledata = `{/* Publishing example. */}
<Dashboard title="Publishing">
  <DashboardContent >
    <PanelGrid>
      <CCard title="myhelloiot/testing/topic1">
        <InputUnit pubtopic="myhelloiot/testing/topic1" />
      </CCard>
      <CCard title="myhelloiot/testing/topic2 (Retain)">
        <InputUnit pubtopic="myhelloiot/testing/topic2" puboptions={{ retain: true }} />
      </CCard>
      <CCard title="myhelloiot/testing/topic3">
        <ButtonMessage pubtopic="myhelloiot/testing/topic3" puboptions={{ qos: 0 }} value="QoS Zero">QoS Zero</ButtonMessage>
        <ButtonMessage pubtopic="myhelloiot/testing/topic3" puboptions={{ qos: 1 }} value="QoS One">QoS One</ButtonMessage>
        <ButtonMessage pubtopic="myhelloiot/testing/topic3" puboptions={{ qos: 2 }} value="QoS Two">QoS Two</ButtonMessage>
      </CCard>
      <CCard title="myhelloiot/testing/topic4">
      <span>Switch on and off: </span>
        <SwitchUnit
          pubtopic="myhelloiot/testing/topic4"
        />
      </CCard>
    </PanelGrid>
    <LogTool className="myhLayoutContent-panel" subtopic="myhelloiot/testing/#" suboptions={{ qos: 2 }}/>
  </DashboardContent >
</Dashboard>
`;

export default pubsampledata;
