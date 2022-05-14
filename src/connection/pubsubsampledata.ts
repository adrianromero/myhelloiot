/*
MYHELLOIOT
Copyright (C) 2022 Adrián Romero
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

const pubsubsampledata = `{
  /* Publish / subscribe example. */
}
<Dashboard title="Publish / subscribe">
  <DashboardContent>
    <Publisher
      className="myhLayoutContent-panel"
      prefixtopic="myhelloiot/testing/"
    />
    <LogTool
      className="myhLayoutContent-panel"
      subtopic="myhelloiot/testing/#"
      suboptions={{ qos: 2 }}
    />
  </DashboardContent>
</Dashboard>
`;

export default pubsubsampledata;
