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

const lightssampledata = `{/* Light switches example. */}

<DashboardPage title="Light switches">
  <ButtonCard title="Light test 1"
    topic="myhelloiot/testswitch1"
    puboptions={{ retain: true }}
    format={SwitchIconValueFormat()}
  />
  <ButtonCard title="Light test 2"
    topic="myhelloiot/testswitch2"
    puboptions={{ retain: true }}
    format={SwitchIconValueFormat({icon:faStar})}
  />
  <ButtonCard title="Light test 3"
    topic="myhelloiot/testswitch3"
    puboptions={{ retain: true }}
    format={SwitchIconValueFormat({icon:faBolt})}
  />
  <Card title="Light switches">
    <div style={{display: "flex", margin: "4px"}}>
      <div style={{flex: "0 1 40px", textAlign: "center"}}>
        <ViewUnit
          subtopic="myhelloiot/testswitch1"
          format={BulbIconFormat()}
        />
      </div>
      <div style={{flex: "1 1 auto"}}>Light test 1: </div>
      <div style={{flex: "0 1 auto"}}>
        <SwitchUnit
          pubtopic="myhelloiot/testswitch1"
          puboptions={{ retain: true }}
          subtopic="myhelloiot/testswitch1"
        />
      </div>
    </div>
    <div style={{display: "flex", margin: "4px"}}>
      <div style={{flex: "0 1 40px", textAlign: "center"}}>
        <ViewUnit
          subtopic="myhelloiot/testswitch2"
          format={SwitchIconFormat({icon:faStar})}
        />
      </div>
      <div style={{flex: "1 1 auto"}}>Light test 2: </div>
      <div style={{flex: "0 1 auto"}}>
        <SwitchUnit
          pubtopic="myhelloiot/testswitch2"
          puboptions={{ retain: true }}
          subtopic="myhelloiot/testswitch2"
        />
      </div>
    </div>
    <div style={{display: "flex", margin: "4px"}}>
      <div style={{flex: "0 1 40px", textAlign: "center"}}>
        <ViewUnit
          subtopic="myhelloiot/testswitch3"
          format={SwitchIconFormat({icon:faBolt})}
        />
      </div>
      <div style={{flex: "1 1 auto"}}>Light test 3: </div>
      <div style={{flex: "0 1 auto"}}>
        <SwitchUnit
          pubtopic="myhelloiot/testswitch3"
          puboptions={{ retain: true }}
          subtopic="myhelloiot/testswitch3"
        />
      </div>
    </div>      
  </Card>
</DashboardPage>
`;

export default lightssampledata;
