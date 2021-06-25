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

const sampledata = `{/* Full unit samples, input, buttons, gauges, ... */}
<Dashboard className="myhDashboard">
  <DashboardMenu icon={<BuildFilled />} name="Messaging example">
    <PanelGrid>
      <CCard title="Testing topic pub and sub">
        <InputUnit
          pubtopic="myhelloiot/testingtopic"
          subtopic="myhelloiot/testingtopic"
        />
      </CCard>
      <CCard title="Testing topic only sub">
        <InputUnit subtopic="myhelloiot/testingtopic" />
      </CCard>
      <CCard title="Testing topic only pub">
        <InputUnit pubtopic="myhelloiot/testingtopic" />
      </CCard>
      <CCard title="Testing topic Hexadecimal">
        <InputUnit
          pubtopic="myhelloiot/testingtopic"
          subtopic="myhelloiot/testingtopic"
          format={HEXValueFormat()}
        />
      </CCard>
      <CCard title="Testing topic Base64">
        <InputUnit
          pubtopic="myhelloiot/testingtopic"
          subtopic="myhelloiot/testingtopic"
          format={Base64ValueFormat()}
        />
      </CCard>
      <CCard>
        <ButtonUnit
          pubtopic="myhelloiot/testingtopic"
          format={LiteralIconValueFormat("Sends 123", Buffer.from("123"))}
        />
      </CCard>
      <CCard>
        <ButtonUnit
          pubtopic="myhelloiot/testingtopic"
          format={ImageIconValueFormat(Themes, Buffer.from("ABC"))}
        />
      </CCard>
      <CCard>
        <ButtonUnit
          pubtopic="myhelloiot/testingtopic"
          format={TitleIconValueFormat(Themes, "Sends XYZ", Buffer.from("XYZ"))}
        />
      </CCard>
    </PanelGrid>
  </DashboardMenu>
  <DashboardMenu icon={<BulbFilled />} name="Lights Example">
    <PanelGrid>
      <CCard title="Light switch">
        <div
          className="myh-value myh-value-padding"
          style={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "#e1e1e1",
            borderRadius: "15px",
          }}
        >
          <ViewUnit
            subtopic="myhelloiot/testswitch"
            format={BulbIconFormat()}
          />
        </div>
        <div
          className="myh-value myh-value-padding"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <SwitchUnit
            pubtopic="myhelloiot/testswitch"
            puboptions={{ retain: true }}
            subtopic="myhelloiot/testswitch"
          />
        </div>
      </CCard>
      <CCard title="Switch button">
        <ButtonUnit
          pubtopic="myhelloiot/testswitch"
          puboptions={{ retain: true }}
          subtopic="myhelloiot/testswitch"
        />
      </CCard>
      <CCard title="Switch bolt">
        <ButtonUnit
          pubtopic="myhelloiot/testswitch"
          puboptions={{ retain: true }}
          subtopic="myhelloiot/testswitch"
          format={SwitchIconValueFormat(ThuderboltIconFormat())}
        />
      </CCard>
      <CCard title="Switch on and off">
        <Row gutter={8}>
          <Col span={12}>
            <ButtonUnit
              pubtopic="myhelloiot/testswitch"
              puboptions={{ retain: true }}
              format={LiteralIconValueFormat("ON", Buffer.from("1"))}
            />
          </Col>
          <Col span={12}>
            <ButtonUnit
              pubtopic="myhelloiot/testswitch"
              puboptions={{ retain: true }}
              format={LiteralIconValueFormat("OFF", Buffer.from("0"))}
            />
          </Col>
        </Row>
      </CCard>
    </PanelGrid>
  </DashboardMenu>
  <DashboardMenu icon={<DashboardFilled />} name="Gauges Example">
    <PanelGrid>
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
    </PanelGrid>
  </DashboardMenu>
</Dashboard>
`;

export default sampledata;
