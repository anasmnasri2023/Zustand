import React, { Suspense, useState } from 'react';
import './App.css'
import Events from './UseCase/Events';
import { Routes, Route, Link } from 'react-router-dom';
import NavigationBar from './UseCase/NavigationBar';
import AddEvent from './UseCase/AddEvent';
import UpdateEvent from './UseCase/UpdateEvent';
import EventDetails from './UseCase/EventDetails';
import Compteur from './ComposantCours/zustandExemples/Compteur';
import Cart from './ComposantCours/zustandExemples/Cart';
import Favorites from './UseCase/Favorites';

function App() {
  return (
    <>
     <React.Suspense fallback={<h1> Loading ...</h1>}>
      <NavigationBar />

      <Routes>
        <Route path='/cartzustand' element={<Cart />} />
        <Route path='/compteur' element={<Compteur />} />
        <Route path='/favorites' element={<Favorites />} />
        <Route path='/events'>
            <Route index element={<Events />} />
            <Route path=':name' element={<EventDetails />} />
            <Route path='/events/add' element={<AddEvent/>}/>
            <Route path='/events/update/:id' element={<UpdateEvent/>}/>
        </Route>
        <Route
          path="*"
          element={<img src="/images/notfound.jfif" width="100%" />}
        />
      </Routes>
    </React.Suspense>
    </>
  )
}

export default App