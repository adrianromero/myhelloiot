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
  <CCard title="Control gauge card">
    <ViewUnit
      subtopic="myhelloiot/temperature"
      format={ControlIconFormat(
        {
          title: "Control gauge",
          min: -10,
          max: 60,
          step: 5,
          labelstep: 10,
        },
        {
          style: "unit",
          unit: "celsius",
        }
      )}
    />
  </CCard>
  <CCard title="Fuel gauge card">
    <ViewUnit
      subtopic="myhelloiot/temperature"
      format={FuelIconFormat(
        {
          title: "Fuel gauge",
          min: -10,
          max: 60,
          step: 5,
          labelstep: 10,
        },
        {
          style: "unit",
          unit: "celsius",
        }
      )}
    />
  </CCard>
  <CCard title="Progress gauge card">
    <ViewUnit
      subtopic="myhelloiot/temperature"
      format={ProgressIconFormat(
        {
          title: "Progress gauge",
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
  <CCard title="Linear gauge card">
    <ViewUnit
      subtopic="myhelloiot/temperature"
      format={LinearIconFormat(
        {
          title: "Linear gauge",
          min: -10,
          max: 60,
          step: 5,
          labelstep: 70,
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
  <CCard title="Simple gauge card">
    <ViewUnit
      subtopic="myhelloiot/temperature"
      format={SimpleIconFormat(
        { title: "Simple gauge", min: -10, max: 60 },
        {
          style: "unit",
          unit: "celsius",
        }
      )}
    />
  </CCard>
  <CCard title="Circular gauge card">
    <ViewUnit
      subtopic="myhelloiot/temperature"
      format={CircularIconFormat(
        { title: "Circular gauge", min: -10, max: 60, step: 5 },
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
  <CCard title="Space gauge card">
    <ViewUnit
      subtopic="myhelloiot/temperature"
      format={SpaceIconFormat(
        {
          title: "Space gauge",
          min: -10,
          max: 60,
          step: 1,
        },
        {
          style: "unit",
          unit: "celsius",
        }
      )}
    />
  </CCard>
  <CCard title="Dial gauge card">
    <ViewUnit
      subtopic="myhelloiot/temperature"
      format={DialIconFormat(
        {
          title: "Dial gauge",
          min: -10,
          max: 60,
          step: 1,
          labelstep: 10,
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
