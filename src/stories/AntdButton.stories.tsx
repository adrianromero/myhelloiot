import React, { useState, MouseEvent } from "react"; // FC functional control.
import { Story, Meta } from "@storybook/react";

import "antd/dist/antd.css";

import { Moment } from "moment";
import { Button, DatePicker, message } from "antd";

export default {
  title: "Antd/Button",
  component: Button,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as Meta;

export const ButtonStory: Story<void> = () => {
  const [date, setDate] = useState<Moment | null>(null);
  const handleChange = (value: Moment | null) => {
    message.info(
      `Selected Date: ${value ? value.format("YYYY-MM-DD") : "None"}`
    );
    setDate(value);
  };

  const handleClick = (e: MouseEvent<HTMLElement>) =>
    message.info("Man hecho cli...");

  return (
    <div className="App">
      <DatePicker onChange={handleChange} />
      <div style={{ marginTop: 16 }}>
        Selected Date: {date ? date.format("YYYY-MM-DD") : "None"}
      </div>
      <Button type="primary" onClick={handleClick}>
        Button
      </Button>
    </div>
  );
};
