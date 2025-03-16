
import React,{ Suspense, useState } from 'react';
import './App.css'
import Events from './UseCase/Events';
import { Routes , Route ,Link} from 'react-router-dom';
import NavigationBar from './UseCase/NavigationBar';
import AddEvent from './UseCase/AddEvent';
import UpdateEvent from './UseCase/UpdateEvent';
import EventDetails from './UseCase/EventDetails';
import Compteur from './ComposantCours/zustandExemples/Compteur';
import Cart from './ComposantCours/zustandExemples/Cart';

function App() {
  

  return (
    <>
     {/* <Events /> */}
     {/* <ColorBox initialColor="red"  /> */}
     {/* <a href='/test/colorbox/oumeima/twin'>Colobox with ancer</a> */}
     {/* <Link to='/test/colorbox/oumeima/twin' reloadDocument>Colobox with Link</Link>
     <Suspense fallback={<p>Loading...</p>}>
     <Routes>
      <Route path="/test" > 
        <Route path="colorbox/:username/:classe" element={<ColorBox initialColor="red" />} />
        <Route  path="counter" element={<Counter step="5" />} />
      </Route>
      <Route path="*" element={<p>404 not found</p>} />
     </Routes>
     </Suspense> */}
     <React.Suspense fallback={<h1> Loading ...</h1>}>
      <NavigationBar />

      <Routes>
      <Route path='/cartzustand' element={<Cart />} />
      <Route path='/compteur' element={<Compteur />} />
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
