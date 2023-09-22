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

const mosquittosampledata = `{/* Mosquitto SYS topics example. */}

<DashboardPage title="Mosquitto SYS topics">
  <h3 className="myhDashboardPage-all">Broker</h3>
  <Card title="Version">
    <InputUnit subtopic="$SYS/broker/version" />
  </Card>
  <Card title="Uptime">
    <InputUnit subtopic="$SYS/broker/uptime" />
  </Card>
  <Card title="Total clients">
    <InputUnit subtopic="$SYS/broker/clients/total" format={NumberValueFormat()} />
  </Card>
  <Card title="Connected clients">
    <InputUnit subtopic="$SYS/broker/clients/connected" format={NumberValueFormat()} />
  </Card>
  <h3 className="myhDashboardPage-all">Load</h3>
  <Card title="Received">
    <InputUnit subtopic="$SYS/broker/bytes/received" format={NumberValueFormat()} />
  </Card>
  <Card title="Received in 5 min.">
    <InputUnit subtopic="$SYS/broker/load/bytes/received/5min" format={NumberValueFormat()} />
  </Card>
  <Card title="Sent">
    <InputUnit subtopic="$SYS/broker/bytes/sent" format={NumberValueFormat()} />
  </Card>
  <Card title="Sent in  5 min.">
    <InputUnit subtopic="$SYS/broker/load/bytes/sent/5min" format={NumberValueFormat()} />
  </Card>
  <h3 className="myhDashboardPage-all">Messages</h3>
  <Card title="Received">
    <InputUnit subtopic="$SYS/broker/messages/received" format={NumberValueFormat()} />
  </Card>
  <Card title="Sent">
    <InputUnit subtopic="$SYS/broker/messages/sent" format={NumberValueFormat()} />
  </Card>
  <Card title="Dropped">
    <InputUnit subtopic="$SYS/broker/messages/publish/dropped" format={NumberValueFormat()} />
  </Card>
  <Card title="Stored">
    <InputUnit subtopic="$SYS/broker/messages/stored" format={NumberValueFormat()} />
  </Card>
</DashboardPage>
`;

export default mosquittosampledata;
