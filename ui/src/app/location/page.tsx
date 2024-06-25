import { Box, Stack, Row, Gradient, Text, Input, Button, Table, Dropdown, KPI, Maps, Icon } from "../../components/ui";
import { NavigationHeader, NavigationFooter, NavigationSocials, NavItem } from "../../components/ui";

const Location = () => (
  <Row>
              <Navigation/>

    <Stack>
        <Gradient/>
    <Header/>
    <Row>
    <LocationTable/>
    <LocationOverview/>
    </Row>
    </Stack>
    </Row>

)

const Navigation = () => (
  <Box className="h-screen flex flex-col">
  <NavigationHeader />

  {/* Navigation Main (add new content here) */}
  <Box className="flex-grow bg-slate-100 overflow-auto">
    <Row>
      <NavItem type="dashboard" title="Dashboard" />
      <Icon type="notification" className="text-red-500 self-end mr-2" />
    </Row>
    <NavItem type="history" title="History" href="#" />
    <NavItem type="cameraswap" title="Camera" href="#" />
    <NavItem type="insights" title="Insights" href="#" />
  </Box>
  {/* end of Navigation main */}

  <NavigationSocials />
  <NavigationFooter />
</Box>
)

const Header = () => (
        <Row className="place-content-between mb-10">
          <Text size="4xl" weight={"semibold"} className="mb-5">
            LOCATIONS
          </Text>
          <Text size="2xl" weight={"semibold"} className="mb-5">
            Organisation name
          </Text>
        </Row>
  );

  const LocationTable = () => (
    <Stack className="w-1/2 gap-y-4">
    <Row className="h-7 gap-3">
      <Dropdown
        options={[{ value: "filter", label: "Filter" }]}
        className="border-2 rounded-[5px]"
      />
      <Input></Input>
      <Button />
      <Text>5/7</Text>
      <Button />
    </Row>
  </Stack>
);

const LocationOverview = () => (
    <Stack className="w-1/2 gap-5">
    <Row className="gap-x-5">
      <KPI
        firstValue={27}
        secondValue={31}
        label="People"
      />
      <Stack className="w-1/2 border">
        <Button variant="solid" width="full">
          Add location
        </Button>
      </Stack>
    </Row>
    <Maps
      width={525}
      height={525}
      defaultCenter={[50.879, 4.6997]}
      defaultZoom={11}
      markerLocation={[50.879, 4.6997]}
    />
  </Stack>
);



  export default Location