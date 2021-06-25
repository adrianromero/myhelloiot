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

const sampledata = `{/* Gauges example. */}
<DashboardTitle className="myhDashboard">
  <CCard title="Select temperature">
    <ViewUnit
      subtopic="myhelloiot/temperature"
      format={NumberIconFormat({
        style: "unit",
        unit: "celsius",
      })}
    />
    <SliderUnit
      pubtopic="myhelloiot/temperature"
      puboptions={{ retain: true }}
      subtopic="myhelloiot/temperature"
      numberValidation={{ min: -10, max: 60, step: 1 }}
    />
  </CCard>
  <CCard title="Liquid gauge card">
    <ViewUnit
      subtopic="myhelloiot/temperature"
      format={LiquidIconFormat(
        {
          title: "Liquid gauge",
          min: -10,
          max: 60,
        },
        {
          style: "unit",
          unit: "celsius",
        }
      )}
    />
  </CCard>
  <CCard title="Dashboard gauge card">
    <ViewUnit
      subtopic="myhelloiot/temperature"
      format={DashboardIconFormat(
        { title: "Dashboard gauge", min: -10, max: 60 },
        {
          style: "unit",
          unit: "celsius",
        }
      )}
    />
  </CCard>
  <CCard title="Metro gauge card">
    <ViewUnit
      subtopic="myhelloiot/temperature"
      format={MetroIconFormat(
        {
          title: "Metro gauge",
          min: -10,
          max: 60,
          step: 1,
          labelstep: 5,
        },
        {
          style: "unit",
          unit: "celsius",
        }
      )}
    />
  </CCard>
</DashboardTitle>
`;

export default sampledata;
