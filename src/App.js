import React from 'react';
import {Users} from "./components/Users";
import {Route, Routes, useLocation} from "react-router";
import {Navigation} from "./components/Navigation";
import {User} from "./components/Users/User";
import {Admin} from "./components/Admin";
import {ThemeProvider} from "@mui/material";
import {NoMatch} from "./components/NoMatch";
import {Charts} from "./components/Charts";
import {theme} from "./theme/theme";
import './App.css';
import {WelcomeBlock} from "./components/WelcomeBlock";


function App() {
    const path = useLocation();

    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                <Routes>
                    <Route path='/' element={<Navigation/>}>
                        <Route path='/admin' element={<Admin/>}/>
                        <Route path='/users' element={<Users/>}/>
                        <Route path='/users/:user/:id' element={<User/>}/>
                        <Route path='/charts' element={<Charts />}/>
                    </Route>
                    <Route path="*" element={<NoMatch />} />
                </Routes>
                {path.pathname === '/' && <WelcomeBlock/>}
            </div>
        </ThemeProvider>
    );
}

export default App;
