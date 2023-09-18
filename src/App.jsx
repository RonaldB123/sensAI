import './App.css';
import { Route, Routes } from 'react-router-dom';
import { StudentAssignmentsPage } from './components/StudentAssignmentsPage';
import ClassesList from './components/ClassesList';
import { Header } from './components/Header';
import { Navbar } from './components/Navbar';
import { DisplayStudentAssignment } from './components/DisplayStudentAssignment';
import { StudentLessonsPage } from './components/StudentLessonsPage';
import Login from './components/Login';
import Signup from './components/Signup';
import TeacherLessonsClassList from './components/TeacherLessonsClassList';

import { getUser } from './utils/api';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

import { useState, useEffect } from 'react';

function App() {
  const [user, setUser] = useState(null);
  // console.log('🚀 ~ App ~ user:', user);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const { user: fetchedUser } = await getUser(user.email);
        setUser(fetchedUser);
      } else {
        setUser(null);
        console.log('user is logged out');
      }
    });
  }, []);
  return (
    <>
      {/* <Header /> Most likely used for home page/login */}
      <Navbar />
      <Routes>
        <Route
          path='/student/assignments'
          element={<StudentAssignmentsPage />}
        />
        <Route path='/teachers/home' element={<ClassesList />} />
        <Route
          path='/student/assignments/:assignment_id'
          element={<DisplayStudentAssignment />}
        />
        <Route path='/student/lessons' element={<StudentLessonsPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route
          path='/teacher/lessons/:class_id'
          element={<TeacherLessonsClassList user={user} />}
        />
      </Routes>
    </>
  );
}

export default App;
