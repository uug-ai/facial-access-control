'use client';

import React, { ChangeEvent } from 'react';
import { Text, Stack, Input, Button } from '../../../components/ui';

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

interface AddLocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: () => void;
  newLocation: Omit<Location, 'id'>;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const AddLocationModal: React.FC<AddLocationModalProps> = ({ isOpen, onClose, onAdd, newLocation, handleInputChange }) => {
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
          <Text size="2xl" weight="bold" className="mb-4">Add New Location</Text>
          <Stack className="gap-4 mt-7">
            <Stack>
              <Text>Name</Text>
              <Input name="name" placeholder="Name" value={newLocation.name} onChange={handleInputChange} />
            </Stack>
            <Stack>
              <Text>Address</Text>
              <Input name="address" placeholder="Address" value={newLocation.address} onChange={handleInputChange} />
            </Stack>
            <Stack>
              <Text>City</Text>
              <Input name="city" placeholder="City" value={newLocation.city} onChange={handleInputChange} />
            </Stack>
            <Stack>
              <Text>Head</Text>
              <Input name="head" placeholder="Head" value={newLocation.head} onChange={handleInputChange} />
            </Stack>
            <Stack>
              <Text>Head Phone</Text>
              <Input name="personPhone" placeholder="Person Phone" value={newLocation.personPhone} onChange={handleInputChange} />
            </Stack>
            <Stack>
              <Text>Location Phone</Text>
              <Input name="locationPhone" placeholder="Location Phone" value={newLocation.locationPhone} onChange={handleInputChange} className="mb-5" />
            </Stack>
            <Button onClick={onAdd}>
              Add location
            </Button>
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default AddLocationModal;