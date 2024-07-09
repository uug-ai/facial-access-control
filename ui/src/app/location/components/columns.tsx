import { ColumnProps } from "@uug-ai/ui/lib/components/Table/Table";

// Define the Location type. Adjust this to match your actual data structure.
interface Location {
  id: number;
  name: string;
  address: string;
}

export const columns: ColumnProps<Location>[] = [
  {
    key: 'id',
    title: 'ID',
    render: (column: ColumnProps<Location>, location: Location) => <span>{location.id}</span>,
  },
  {
    key: 'name',
    title: 'Name',
    render: (column: ColumnProps<Location>, location: Location) => <span>{location.name}</span>,
  },
  {
    key: 'address',
    title: 'Address',
    render: (column: ColumnProps<Location>, location: Location) => <span>{location.address}</span>,
  },
];
