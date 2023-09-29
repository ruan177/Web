import React, { useState } from 'react';
import { Button, Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

export interface User {
  id: number;
  username: string;
  email: string;
  isAdmin: boolean;
}

interface UsersTableProps {
  activeTab: string;
  usersData: User[] | undefined;
  isUsersEditMode: boolean;
  selectedUsers: number[];
  handleUsersEdit: () => void;
  handleUserDelete: () => void;
  handleUserSelect: (userId: number) => void;
  handleUsersCancel: () => void;
  handleUsersSave: () => void;
  setUsersData: (updatedUsers: User[]) => void;
}

const UsersTable: React.FC<UsersTableProps> = ({
  activeTab,
  usersData,
  isUsersEditMode,
  selectedUsers,
  handleUsersEdit,
  handleUserDelete,
  handleUserSelect,
  handleUsersCancel,
  handleUsersSave,
  setUsersData
}) => {
  return (
    <>
      {activeTab === 'users' && (
        <>
          <h3 className="font-bold text-lg mb-4 flex items-center justify-between">
            Users
            <div className="space-x-2">
              <Button variant="contained" color="primary" onClick={handleUsersEdit}>
                Edit
              </Button>
              {isUsersEditMode && (
                <Button variant="contained" color="secondary" onClick={handleUserDelete}>
                  Delete
                </Button>
              )}
            </div>
          </h3>
          <TableContainer component={Paper}>
            <Table aria-label="users table">
              <TableHead>
                <TableRow>
                  {isUsersEditMode && <TableCell></TableCell>}
                  <TableCell>Username</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Is Admin</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {usersData?.map((user) => (
                  <TableRow key={user.id}>
                    {isUsersEditMode && (
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedUsers.includes(user.id)}
                          onChange={() => handleUserSelect(user.id)}
                        />
                      </TableCell>
                    )}
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      {isUsersEditMode ? (
                        <TableCell>
                          <select
                            value={user.isAdmin ? 'true' : 'false'}
                            onChange={(event) => {
                              const updatedUsers = usersData.map((u) =>
                                u.id === user.id ? { ...u, isAdmin: event.target.value === 'true' } : u
                              );
                              setUsersData(updatedUsers);
                            }}
                          >
                            <option value="true">true</option>
                            <option value="false">false</option>
                          </select>
                        </TableCell>
                      ) : (
                        <TableCell>{user.isAdmin ? 'Yes' : 'No'}</TableCell>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {isUsersEditMode && (
            <div className="flex mt-2 items-center space-x-2">
              <Button variant="contained" color="error" onClick={handleUsersCancel}>
                Cancel
              </Button>
              <Button variant="contained" color="success" onClick={handleUsersSave}>
                Save
              </Button>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default UsersTable;
