import React from 'react';
import { Button, Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

interface Course {
  id: number;
  name: string;
  description: string;
  isAproved: boolean;
}

interface CoursesTableProps {
  activeTab: string;
  coursesData: Course[] | undefined;
  isCoursesEditMode: boolean;
  selectedCourses: number[];
  handleCoursesEdit: () => void;
  handleCourseDelete: () => void;
  handleCourseSelect: (courseId: number) => void;
  handleCoursesCancel: () => void;
  handleCoursesSave: () => void;
  setCoursesData: (updatedCourses: Course[]) => void;
}

const CoursesTable: React.FC<CoursesTableProps> = ({
  activeTab,
  coursesData,
  isCoursesEditMode,
  selectedCourses,
  handleCoursesEdit,
  handleCourseDelete,
  handleCourseSelect,
  handleCoursesCancel,
  handleCoursesSave,
  setCoursesData
}) => {
  return (
    <>
      {activeTab === 'courses' && (
        <>
          <h3 className="font-bold text-lg mb-4 flex items-center justify-between">
            Courses
            <div className="space-x-2">
              <Button variant="contained" color="primary" onClick={handleCoursesEdit}>
                Edit
              </Button>
              {isCoursesEditMode && (
                <Button variant="contained" color="secondary" onClick={handleCourseDelete}>
                  Delete
                </Button>
              )}
            </div>
          </h3>
          <TableContainer component={Paper}>
            <Table aria-label="courses table">
              <TableHead>
                <TableRow>
                  {isCoursesEditMode && <TableCell></TableCell>}
                  <TableCell>Title</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Is Approved</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {coursesData?.map((course) => (
                  <TableRow key={course.id}>
                    {isCoursesEditMode && (
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedCourses.includes(course.id)}
                          onChange={() => handleCourseSelect(course.id)}
                        />
                      </TableCell>
                    )}
                    <TableCell>{course.name}</TableCell>
                    <TableCell>{course.description}</TableCell>
                    <TableCell>
                      {isCoursesEditMode ? (
                        <TableCell>
                          <select
                            value={course.isAproved ? 'true' : 'false'}
                            onChange={(event) => {
                              const updatedCourses = coursesData.map((u) =>
                                u.id === course.id ? { ...u, isAproved: event.target.value === 'true' } : u
                              );
                              setCoursesData(updatedCourses); // Update the local state directly
                            }}
                          >
                            <option value="true">true</option>
                            <option value="false">false</option>
                          </select>
                        </TableCell>
                      ) : (
                        <TableCell>{course.isAproved ? 'Yes' : 'No'}</TableCell>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {isCoursesEditMode && (
            <div className="flex mt-2 items-center space-x-2">
              <Button variant="contained" color="secondary" onClick={handleCoursesCancel}>
                Cancel
              </Button>
              <Button variant="contained" color="primary" onClick={handleCoursesSave}>
                Save
              </Button>
            </div>
          )}
        </>
      )}
  </>
  );
};

export default CoursesTable;
