import { useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import User from './User'
import CreateUser from './CreateUser'
import UpdateUser from './UpdateUser'
import Welcom from './Welcom';
import Sdpt from './Sdpt';



function App() {
  return (
    <>
      <Sdpt></Sdpt>
      <Welcom></Welcom>
      <Routes>
        <Route path="/" element={<User />} />
        <Route path="/create" element={<CreateUser />} />
        <Route path="/update" element={<UpdateUser />} />
      </Routes>

    </>
  )
}

export default App
