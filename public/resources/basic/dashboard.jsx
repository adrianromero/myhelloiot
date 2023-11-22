{
  /* Basic units example. */
}

<DashboardPage title="Basic units">
  <InputCard
    title="Temperature pub/sub"
    topic="myhelloiot/temperature"
    puboptions={{ retain: true }}
    format={Celsius()}
  />
  <Card title="Select temperature">
    <ViewUnit topic="myhelloiot/temperature" format={Celsius()} />
    <SliderUnit
      topic="myhelloiot/temperature"
      puboptions={{ retain: true }}
      format={Celsius()}
    />
  </Card>
  <Card title="Temperature buttons">
    <ButtonUnit
      topic="myhelloiot/temperature"
      puboptions={{ retain: true }}
      format={Celsius()}
      icon="+"
    />
    <ButtonUnit
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
      ...Celsius(),
    })}
  />
</DashboardPage>;
