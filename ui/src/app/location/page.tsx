'use client';

import React, { useState, ChangeEvent } from "react";
import { Box, Stack, Row, Gradient, Text, Button, KPI, Maps, Icon, IconLocationAdd, Input } from "../../components/ui";
import { NavigationHeader, NavigationFooter, NavigationSocials, NavItem } from "../../components/ui";
import Modal from "./components/modal";
import LocationTable from "./components/locationTable";
import { getCoordinates } from "./lib/geolocation";

interface Location {
  id: number;
  name: string;
  address: string;
  city: string;
  head: string;
  personPhone: string;
  locationPhone: string;
  lat?: number;
  lon?: number;
}

const Location = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newLocation, setNewLocation] = useState<Omit<Location, 'id'>>({
    name: '',
    address: '',
    city: '',
    head: '',
    personPhone: '',
    locationPhone: ''
  });
  const [selectedCoordinates, setSelectedCoordinates] = useState<{ lat: number, lon: number }>({ lat: 50.879, lon: 4.6997 });

  const handleShowModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewLocation({ ...newLocation, [name]: value });
  };

  const handleAddLocation = async () => {
    try {
      const address = `${newLocation.address}, ${newLocation.city}`;
      const { lat, lon } = await getCoordinates(address);

      const locationWithCoordinates: Location = {
        id: locations.length + 1, // Generate a temporary ID
        ...newLocation,
        lat,
        lon,
      };

      setLocations([...locations, locationWithCoordinates]);
      console.log('New location added', locationWithCoordinates);
      handleCloseModal();
    } catch (error) {
      console.error('Failed to add location', error);
    }
  };

  const handleLocationClick = (location: Location) => {
    if (location.lat && location.lon) {
      setSelectedCoordinates({ lat: location.lat, lon: location.lon });
    }
  };

  return (
    <>
      <Row>
        <Navigation />
        <Stack className="h-screen">
          <Gradient />
          <Header />
          <Row className="gap-10 px-10 pt-5 h-full">
            <LocationTable locations={locations} onLocationClick={handleLocationClick} />
            <LocationOverview onShowModal={handleShowModal} selectedCoordinates={selectedCoordinates} />
          </Row>
        </Stack>
      </Row>
      
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <Text size="2xl" weight="bold" className="mb-4">Add New Location</Text>
        <Stack className="gap-4 mt-7">
          <Stack>        
            <Text>Name</Text>
            <Input name="name" placeholder="Name" value={newLocation.name} onChange={handleInputChange}/>
          </Stack>
          <Stack>        
            <Text>Address</Text>          
            <Input name="address" placeholder="Address" value={newLocation.address} onChange={handleInputChange}/>
          </Stack>
          <Stack>
            <Text>City</Text>
            <Input name="city" placeholder="City" value={newLocation.city} onChange={handleInputChange}/>        
          </Stack>
          <Stack>
            <Text>Head</Text>
            <Input name="head" placeholder="Head" value={newLocation.head} onChange={handleInputChange}/>
          </Stack>
          <Stack>
            <Text>Head Phone</Text>
            <Input name="personPhone" placeholder="Person Phone" value={newLocation.personPhone} onChange={handleInputChange}/>
          </Stack>
          <Stack>
            <Text>Location Phone</Text>
            <Input name="locationPhone" placeholder="Location Phone" value={newLocation.locationPhone} onChange={handleInputChange} className="mb-5"/>
          </Stack>
          <Button onClick={handleAddLocation}>
            Add location
          </Button>
        </Stack>
      </Modal>
    </>
  );
};

const Navigation = () => (
  <Box className="h-screen flex flex-col">
    <NavigationHeader />
    <Box className="flex-grow bg-slate-100 overflow-auto">
      <Row>
        <NavItem type="dashboard" title="Dashboard" />
        <Icon type="notification" className="text-red-500 self-end mr-2" />
      </Row>
      <NavItem type="history" title="History" href="#" />
      <NavItem type="cameraswap" title="Camera" href="#" />
      <NavItem type="insights" title="Insights" href="#" />
    </Box>
    <NavigationSocials />
    <NavigationFooter />
  </Box>
);

const Header = () => (
  <Row className="place-content-between pt-10 px-10">
    <Text size="4xl" weight={"semibold"} className="mb-5">
      LOCATIONS
    </Text>
    <Text size="2xl" weight={"semibold"} className="mb-5">
      Organisation name
    </Text>
  </Row>
);

interface LocationOverviewProps {
  onShowModal: () => void;
  selectedCoordinates: { lat: number, lon: number };
}

const LocationOverview: React.FC<LocationOverviewProps> = ({ onShowModal, selectedCoordinates }) => (
  <Stack className="w-1/2 gap-5">
    <Row className="gap-x-5 h-1/4">
      <KPI firstValue={27} secondValue={31} label="People" />
      <Stack className="w-1/2 border">
        <IconLocationAdd
          className="self-center text-primary-950/[.7] cursor-pointer"
          height="5em"
          width="5em"
          onClick={onShowModal}
        />
        <Button variant="solid" width="full" onClick={onShowModal}>
          Add location
        </Button>
      </Stack>
    </Row>
    <Maps
      width={495}
      height={504}
      defaultCenter={[selectedCoordinates.lat, selectedCoordinates.lon]}
      defaultZoom={11}
      markerLocation={[selectedCoordinates.lat, selectedCoordinates.lon]}
    />
  </Stack>
);

export default Location;
