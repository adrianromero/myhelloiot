export const samplejsx = `
<Dashboard disconnectMenu>
  <DashboardMenu  icon={<BulbFilled />} name="Application example">
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
          format={LiteralIconEdit("Sends 123", Buffer.from("123"))}
        />
      </CCard>
    </PanelGrid>
  </DashboardMenu>
  <DashboardMenu  icon={<BulbFilled />} name="Test Panel">
    <PanelTests />
  </DashboardMenu>
  <DashboardMenu icon={<DashboardFilled />} name="Test Gauges">
    <PanelTestNumbers />
  </DashboardMenu>
</Dashboard>
`;
