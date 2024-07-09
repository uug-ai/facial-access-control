'use client';

import React, { ChangeEvent, useState, useEffect } from 'react';
import { Stack, Text, Input, Button, Row } from "../../../components/ui";

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

interface EditLocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  location: Location;
  onSave: (location: Location) => void;
  onDelete: (id: number) => void;
}

const EditLocationModal: React.FC<EditLocationModalProps> = ({ isOpen, onClose, location, onSave, onDelete }) => {
  const [editedLocation, setEditedLocation] = useState<Location>(location);

  useEffect(() => {
    setEditedLocation(location);
  }, [location]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedLocation({ ...editedLocation, [name]: value });
  };

  const handleSave = () => {
    onSave(editedLocation);
    onClose();
  };

  const handleDelete = () => {
    onDelete(editedLocation.id);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="p-8 border w-96 shadow-lg rounded-md bg-white relative">
        <div className="text-center">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 px-2 py-1 bg-red-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            X
          </button>
          <Text size="2xl" weight="bold" className="mb-4">Edit Location</Text>
          <Stack className="gap-4 mt-7">
            <Stack>        
              <Text>Name</Text>
              <Input name="name" placeholder="Name" value={editedLocation.name} onChange={handleInputChange}/>
            </Stack>
            <Stack>        
              <Text>Address</Text>          
              <Input name="address" placeholder="Address" value={editedLocation.address} onChange={handleInputChange}/>
            </Stack>
            <Stack>
              <Text>City</Text>
              <Input name="city" placeholder="City" value={editedLocation.city} onChange={handleInputChange}/>        
            </Stack>
            <Stack>
              <Text>Head</Text>
              <Input name="head" placeholder="Head" value={editedLocation.head} onChange={handleInputChange}/>
            </Stack>
            <Stack>
              <Text>Head Phone</Text>
              <Input name="personPhone" placeholder="Person Phone" value={editedLocation.personPhone} onChange={handleInputChange}/>
            </Stack>
            <Stack>
              <Text>Location Phone</Text>
              <Input name="locationPhone" placeholder="Location Phone" value={editedLocation.locationPhone} onChange={handleInputChange} className="mb-5"/>
            </Stack>
            <Row className='gap-2 text-sm'>
            <Button onClick={handleSave}>
              Save
            </Button>
            <Button onClick={handleDelete}>
              Delete
            </Button>
            </Row>
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default EditLocationModal;
