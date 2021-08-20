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

import React from "react";
import { Col } from "antd";
import ButtonMessage, { ButtonMessageProps } from "./ButtonMessage";

type PublishingProps = {
  messages: ButtonMessageProps[];
  className?: string;
};

const Publishing: React.FC<PublishingProps> = ({ messages, className }) => {
  return (
    <>
      {messages.map((props) => (
        <Col className={className} xs={24} sm={12} md={6} lg={4}>
          <ButtonMessage {...props} />
        </Col>
      ))}
    </>
  );
};
export default Publishing;
