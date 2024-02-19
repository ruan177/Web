import React from 'react';
import { Button, Checkbox, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAdminCourses } from '../../hooks/admin/useAdminCourses';

interface Course {
  id: number;
  name: string;
  description: string;
  isAproved: boolean;
}

interface CoursesTableProps {
  activeTab: string;

}

const CoursesTable: React.FC<CoursesTableProps> = ({activeTab}) => {
  const {
    coursesData,
    isCoursesEditMode,
    selectedCourses,
    handleCoursesEdit,
    handleCourseDelete,
    handleCourseSelect,
    handleCoursesCancel,
    handleCoursesSave,
    setCoursesData,
    coursePage,
    setCoursePage,
    displayedCourses,
    courseTotalPages } = useAdminCourses();
  return (
    <>
      {activeTab === 'courses' && (
        <>
          <h3 className="font-bold text-lg mb-4 flex items-center justify-between">
            Courses
            <div className="space-x-2">
              <Button
                style={{ backgroundColor: 'white', color: 'black', border: '1px solid black' }}
                onClick={handleCoursesEdit}
              >
                Edit
              </Button>
              {isCoursesEditMode && (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleCourseDelete}
                  style={{ backgroundColor: 'black', color: 'white' }}
                >
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
                {displayedCourses?.map((course) => (
                  <TableRow key={course.id}>
                    {isCoursesEditMode && (
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedCourses.includes(course.id)}
                          onChange={() => handleCourseSelect(course.id)}
                        />
                      </TableCell>
                    )}
                    <TableCell ><Link to={`/courses/${course.id}`}>{course.name}</Link></TableCell>
                    <TableCell>{course.description}</TableCell>
                    <TableCell>
                      {isCoursesEditMode ? (
                        <TableCell>
                          <select
                            value={course.isAproved ? 'true' : 'false'}
                            onChange={(event) => {
                              const updatedCourses = displayedCourses.map((u) =>
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
          <Pagination count={courseTotalPages} page={coursePage} onChange={(event, value) => setCoursePage(value)} />


          {isCoursesEditMode && (
            <div className="flex mt-2 items-center space-x-2">
              <Button
                variant="contained"
                color="secondary"
                onClick={handleCoursesCancel}
                style={{ backgroundColor: 'white', color: 'black', border: '1px solid black' }}>
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleCoursesSave}
                style={{ backgroundColor: 'black', color: 'white' }}>
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
