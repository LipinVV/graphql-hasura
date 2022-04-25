import React from 'react';
import {Users} from "./Users";
import {Route, Routes} from "react-router";
import {Navigation} from "./Navigation";
import {User} from "./Users/User";
import {Admin} from "./Admin";

import './App.css';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path='/' element={<Navigation />}/>
                <Route path='/admin' element={<Admin />}/>
                <Route path='/users' element={<Users />}/>
                <Route path='/users/:user/:id' element={<User />}/>
                {/*<Route path="*" element={<NoMatch />} />*/}
            </Routes>
        </div>
    );
}

export default App;
