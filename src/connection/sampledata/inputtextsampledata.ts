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

const inputtextsampledata = `{/* Input text example. */}

<DashboardPage title="Input text">
  <Card title="Testing topic publication">
    <InputUnit pubtopic="myhelloiot/testingtopic" />
  </Card>
  <Card title="Testing topic pub/sub">
    <InputUnit
      pubtopic="myhelloiot/testingtopic"
      subtopic="myhelloiot/testingtopic"
    />
  </Card>
  <Card title="Testing topic Hexadecimal">
    <InputUnit
      pubtopic="myhelloiot/testingtopic"
      subtopic="myhelloiot/testingtopic"
      format={HEXValueFormat()}
    />
  </Card>
  <Card title="Testing topic subscription">
    <InputUnit subtopic="myhelloiot/testingtopic" />
  </Card>
</DashboardPage>
`;

export default inputtextsampledata;
