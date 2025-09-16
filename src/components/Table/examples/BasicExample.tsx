import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Table, createTableBuilder, type DataItem } from '../';

// Sample data type
interface User extends DataItem {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  createdAt: Date;
  age: number;
}

// Sample data
const sampleData: User[] = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    role: 'Admin',
    status: 'active',
    createdAt: new Date('2024-01-15'),
    age: 30,
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    role: 'User',
    status: 'active',
    createdAt: new Date('2024-02-20'),
    age: 25,
  },
  {
    id: 3,
    firstName: 'Bob',
    lastName: 'Johnson',
    email: 'bob.johnson@example.com',
    role: 'User',
    status: 'inactive',
    createdAt: new Date('2024-03-10'),
    age: 35,
  },
  {
    id: 4,
    firstName: 'Bob',
    lastName: 'Johnson',
    email: 'bob.johnson@example.com',
    role: 'User',
    status: 'inactive',
    createdAt: new Date('2024-03-10'),
    age: 35,
  },
  {
    id: 5,
    firstName: 'Bob',
    lastName: 'Johnson',
    email: 'bob.johnson@example.com',
    role: 'User',
    status: 'inactive',
    createdAt: new Date('2024-03-10'),
    age: 35,
  },
  {
    id: 6,
    firstName: 'Bob',
    lastName: 'Johnson',
    email: 'bob.johnson@example.com',
    role: 'User',
    status: 'inactive',
    createdAt: new Date('2024-03-10'),
    age: 35,
  },
  {
    id: 7,
    firstName: 'Bob',
    lastName: 'Johnson',
    email: 'bob.johnson@example.com',
    role: 'User',
    status: 'inactive',
    createdAt: new Date('2024-03-10'),
    age: 35,
  },
  {
    id: 8,
    firstName: 'Bob',
    lastName: 'Johnson',
    email: 'bob.johnson@example.com',
    role: 'User',
    status: 'inactive',
    createdAt: new Date('2024-03-10'),
    age: 35,
  },
  {
    id: 9,
    firstName: 'Bob',
    lastName: 'Johnson',
    email: 'bob.johnson@example.com',
    role: 'User',
    status: 'inactive',
    createdAt: new Date('2024-03-10'),
    age: 35,
  },
  {
    id: 10,
    firstName: 'Bob',
    lastName: 'Johnson',
    email: 'bob.johnson@example.com',
    role: 'User',
    status: 'inactive',
    createdAt: new Date('2024-03-10'),
    age: 35,
  },
  {
    id: 11,
    firstName: 'Bob',
    lastName: 'Johnson',
    email: 'bob.johnson@example.com',
    role: 'User',
    status: 'inactive',
    createdAt: new Date('2024-03-10'),
    age: 35,
  },
  {
    id: 12,
    firstName: 'Bob',
    lastName: 'Johnson',
    email: 'bob.johnson@example.com',
    role: 'User',
    status: 'inactive',
    createdAt: new Date('2024-03-10'),
    age: 35,
  },
  {
    id: 13,
    firstName: 'Bob',
    lastName: 'Johnson',
    email: 'bob.johnson@example.com',
    role: 'User',
    status: 'inactive',
    createdAt: new Date('2024-03-10'),
    age: 35,
  },
  {
    id: 14,
    firstName: 'Bob',
    lastName: 'Johnson',
    email: 'bob.johnson@example.com',
    role: 'User',
    status: 'inactive',
    createdAt: new Date('2024-03-10'),
    age: 35,
  },
];

const BasicExample: React.FC = () => {
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  // Using the table builder for easy configuration
  const tableConfig = createTableBuilder<User>()
    .addColumn('firstName', 'First Name', { sortable: true, width: '150px' })
    .addColumn('lastName', 'Last Name', { sortable: true, width: '150px' })
    .addColumn('email', 'Email', { sortable: true, width: '200px' })
    .addColumn('role', 'Role', { 
      sortable: true, 
      width: '120px',
      render: (value: string) => (
        <span style={{ 
          padding: '4px 8px', 
          borderRadius: '4px',
          backgroundColor: value === 'Admin' ? '#e3f2fd' : '#f3e5f5',
          color: value === 'Admin' ? 'primary' : 'neutral'
        }}>
          {value}
        </span>
      )
    })
    .addColumn('status', 'Status', { 
      sortable: true,
      width: '100px',
      render: (value: string) => (
        <span style={{ 
          padding: '4px 8px', 
          borderRadius: '4px',
          backgroundColor: value === 'active' ? '#e8f5e8' : '#ffebee',
          color: value === 'active' ? '#2e7d32' : '#d32f2f'
        }}>
          {value}
        </span>
      )
    })
    .addColumn('age', 'Age', { sortable: true, width: '80px', align: 'right' })
    .addColumn('createdAt', 'Created', { 
      sortable: true,
      width: '120px',
      render: (value: Date) => value.toLocaleDateString()
    })
    .enableSelection('multiple', {
      selectedIds,
      onSelectionChange: setSelectedIds,
    })
    .enableSorting()
    .enableFiltering()
    .addFilter({
      key: 'firstName',
      label: 'First Name',
      type: 'text',
      placeholder: 'Search by first name...',
    })
    .addFilter({
      key: 'role',
      label: 'Role',
      type: 'select',
      options: [
        { label: 'Admin', value: 'Admin' },
        { label: 'User', value: 'User' },
      ],
    })
    .addFilter({
      key: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
      ],
    })
    .addAction({
      key: 'view',
      label: 'View',
      icon: <VisibilityIcon />,
      onClick: (user: User) => alert(`Viewing user: ${user.firstName} ${user.lastName}`),
      color: 'primary',
    })
    .addAction({
      key: 'edit',
      label: 'Edit',
      icon: <EditIcon />,
      onClick: (user: User) => alert(`Editing user: ${user.firstName} ${user.lastName}`),
      color: 'neutral',
    })
    .addAction({
      key: 'delete',
      label: 'Delete',
      icon: <DeleteIcon />,
      onClick: (user: User) => {
        if (confirm(`Are you sure you want to delete ${user.firstName} ${user.lastName}?`)) {
          alert('User deleted!');
        }
      },
      color: 'danger',
    })
    .enablePagination({
      pageSize: 10,
      pageSizeOptions: [5, 10, 25, 50],
    })
    .configureMobile({
      primaryField: 'firstName',
      secondaryField: 'email',
      tertiaryField: 'role',
      showActions: true,
    })
    .onRowClick((user: User) => {
      console.log('Row clicked:', user);
    })
    .build();

  return (
    <div style={{ padding: '20px' }}>
      <h1>Basic Table Example</h1>
      <p>Selected users: {selectedIds.size}</p>
      
      <Table
        data={sampleData}
        config={tableConfig}
        style={{ marginTop: '20px' }}
      />
    </div>
  );
};

export default BasicExample;