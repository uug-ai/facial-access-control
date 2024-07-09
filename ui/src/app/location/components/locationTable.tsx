// src/app/location/components/locationTable.tsx

'use client';

import React, { useState } from "react";
import { Stack, Row, Input, Button, Text } from "../../../components/ui";

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

interface LocationTableProps {
  locations: Location[];
  onLocationClick: (location: Location) => void;
}

const LocationTable: React.FC<LocationTableProps> = ({ locations, onLocationClick }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const itemsPerPage = 9;

  const columns = [
    { key: "name", title: "Name" },
  ];

  // Pagination logic
  const totalPages = Math.ceil(locations.length / itemsPerPage);
  const currentData = locations.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleRowClick = (id: number) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <Stack className="w-full gap-y-6">
      <Row className="h-7 gap-3">
        <Input placeholder="Search..." className="flex-grow" />
        <Row className="items-center place-content-end">
          <Button className="bg-white text-slate-700 text-2xl p-2 hover:bg-white" onClick={handlePrevPage} disabled={currentPage === 1}>◄</Button>
          <Text weight="bold" size="sm">{`${currentPage} / ${totalPages}`}</Text>
          <Button className="bg-white text-slate-700 text-2xl p-2 hover:bg-white" onClick={handleNextPage} disabled={currentPage === totalPages}>►</Button>
        </Row>
      </Row>
      <table className="bg-slate-700 text-white w-full text-left text-xl rounded-2xl">
        <tbody>
          {currentData.map((location: Location) => (
            <React.Fragment key={location.id}>
              <tr onClick={() => { handleRowClick(location.id); onLocationClick(location); }} className="cursor-pointer border-y-2 border-white">
                <td className="py-3 pl-2">{location.name}</td>
              </tr>
              {expandedRow === location.id && (
                <tr>
                  <td colSpan={columns.length}>
                    <Stack className="p-4 bg-white">
                      <Text>{location.city}</Text>
                      <Text>{location.address}</Text>
                      <Text>{location.locationPhone}</Text>
                      <br />
                      <Text>{location.head}</Text>
                      <Text>{location.personPhone}</Text>
                    </Stack>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </Stack>
  );
};

export default LocationTable;
