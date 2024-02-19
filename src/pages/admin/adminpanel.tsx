
import '../../styles/global.css'
import Navigation from '../../components/tables/navigation';
import UsersTable from '../../components/tables/usersTable';
import CoursesTable from '../../components/tables/coursesTable';
import { useState } from 'react';

export const Admin = () => {
  const [activeTab, setActiveTab] = useState<'users' | 'courses'>('users');
    
  return (

    <div className="flex h-screen">
      <Navigation
         activeTab={activeTab}
         setActiveTab={setActiveTab}/>
      <div className=" w-full p-4 ml-10 mr-10">
        <UsersTable
          activeTab={activeTab}
          />
        <CoursesTable
          activeTab={activeTab}
        />
      </div>
    </div>
  );
};

export default Admin;