
import '../../styles/global.css'
import Navigation from '../../components/tables/navigation';
import UsersTable from '../../components/tables/usersTable';
import CoursesTable from '../../components/tables/coursesTable';
import {useAdmin} from '../../hooks/admin/useAdmin'
import { useAuth } from '../../context/loginContext';

export const Admin = () => {
  const {
    activeTab,
    setActiveTab,
    selectedUsers,
    selectedCourses,
    isUsersEditMode,
    isCoursesEditMode,
    usersData,
    setUsersData,
    coursesData,
    setCoursesData,
    handleUsersEdit,
    handleCoursesEdit,
    handleUsersCancel,
    handleCoursesCancel,
    handleUsersSave,
    handleCoursesSave,
    handleUserDelete,
    handleCourseDelete,
    handleUserSelect,
    handleCourseSelect,
    userPage,
    setUserPage,
    courseTotalPages,
    coursePage,
    displayedCourses,
    setCoursePage,
    displayedUsers,
    userTotalPages
  } = useAdmin();


  return (

    <div className="flex h-screen">
      <Navigation
        setActiveTab={setActiveTab}
        activeTab={activeTab}
      />
      <div className=" w-full p-4 ml-10 mr-10">
        <UsersTable
          activeTab={activeTab}
          usersData={usersData}
          isUsersEditMode={isUsersEditMode}
          selectedUsers={selectedUsers}
          handleUsersEdit={handleUsersEdit}
          handleUserDelete={handleUserDelete}
          handleUserSelect={handleUserSelect}
          handleUsersCancel={handleUsersCancel}
          handleUsersSave={handleUsersSave}
          setUsersData={setUsersData} 
          userPage={userPage}
          setUserPage={setUserPage}
          displayedUsers={displayedUsers || []}
          userTotalPages={userTotalPages}
          />

        <CoursesTable
          activeTab={activeTab}
          coursesData={coursesData}
          isCoursesEditMode={isCoursesEditMode}
          selectedCourses={selectedCourses}
          handleCoursesEdit={handleCoursesEdit}
          handleCourseDelete={handleCourseDelete}
          handleCourseSelect={handleCourseSelect}
          handleCoursesCancel={handleCoursesCancel}
          handleCoursesSave={handleCoursesSave}
          setCoursesData={setCoursesData}
          coursePage={coursePage}
          setCoursePage={setCoursePage}
          displayedCourses={displayedCourses}
          courseTotalPages={courseTotalPages}
        />
      </div>
    </div>
  );
};

export default Admin;