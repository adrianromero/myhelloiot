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

const sampledata = `{/* Gauges example. */}

<DashboardPage title="Gauges">
  <Card title="Select temperature">
    <ViewUnit
      topic="myhelloiot/temperature"
      format={Celsius()}
    />
    <SliderUnit
      topic="myhelloiot/temperature"
      format={Celsius()}
    />
  </Card>
  <ViewCard 
    title="Liquid gauge card"
    topic="myhelloiot/temperature"
    format={LiquidIconFormat({
      title: "Liquid gauge", 
      ...Celsius()
     })}
  />
  <ViewCard 
    title="Control gauge card"
    topic="myhelloiot/temperature"
    format={ControlIconFormat({
      title: "Control gauge", 
      ...Celsius()
     })}
  />
  <ViewCard 
    title="Fuel gauge card"
    topic="myhelloiot/temperature"
    format={FuelIconFormat({
      title: "Fuel gauge", 
      ...Celsius(),
      step: 2
    })}
  />
  <ViewCard 
    title="Progress gauge card"
    topic="myhelloiot/temperature"
    format={ProgressIconFormat({
      title: "Progress gauge", 
      ...Celsius()
    })}
  />
  <ViewCard 
    title="Linear gauge card"
    topic="myhelloiot/temperature"
    format={LinearIconFormat({
      title: "Linear gauge", 
      ...Celsius(),
      step: 2
    })}
  />
  <ViewCard 
    title="Dashboard gauge card"
    topic="myhelloiot/temperature"
    format={DashboardIconFormat({
      title: "Dashboard gauge", 
      ...Celsius()
    })}
  />
  <ViewCard 
    title="Simple gauge card"
    topic="myhelloiot/temperature"
    format={SimpleIconFormat({
      title: "Simple gauge", 
      ...Celsius()
    })}
  />
  <ViewCard 
    title="Circular gauge card"
    topic="myhelloiot/temperature"
    format={CircularIconFormat({
      title: "Circular gauge", 
      ...Celsius()
    })}
  />
  <ViewCard 
    title="Metro gauge card"
    topic="myhelloiot/temperature"
    format={MetroIconFormat({
      title: "Metro gauge", 
      ...Celsius()
    })}
  />
  <ViewCard 
    title="Space gauge card"
    topic="myhelloiot/temperature"
    format={SpaceIconFormat({
      title: "Space gauge", 
      ...Celsius()
    })}
  />
  <ViewCard 
    title="Dial gauge card"
    topic="myhelloiot/temperature"
    format={DialIconFormat({
      title: "Dial gauge", 
      ...Celsius()
    })}
  />
</DashboardPage>
`;

export default sampledata;
