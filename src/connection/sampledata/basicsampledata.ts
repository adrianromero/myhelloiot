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

const pubsubsampledata = `{/* Basic units example. */}

<DashboardPage title="Basic units">
  <InputCard
    title="Temperature pub/sub"
    topic="myhelloiot/temperature"
    puboptions={{ retain: true }}
    format={Celsius()}
  />
  <Card title="Select temperature">
    <ViewUnit
      topic="myhelloiot/temperature"
      format={Celsius()}
    />
    <SliderUnit
      topic="myhelloiot/temperature"
      puboptions={{ retain: true }}
      format={Celsius()}
    />
  </Card>
  <Card title="Temperature buttons">
    <ButtonUnit
      className="myhButtonCard"
      topic="myhelloiot/temperature"
      puboptions={{ retain: true }}
      format={Celsius()}
      icon="+"
    />
    <ButtonUnit
      className="myhButtonCard"
      topic="myhelloiot/temperature"
      puboptions={{ retain: true }}
      format={Celsius({ step: -1 })}
      icon="-"
    />
  </Card>
  <ViewCard 
    title="Dashboard gauge card"
    topic="myhelloiot/temperature"
    format={DashboardIconFormat({
      title: "Dashboard gauge", 
      ...Celsius()
    })}
  />
</DashboardPage>
`;

export default pubsubsampledata;
