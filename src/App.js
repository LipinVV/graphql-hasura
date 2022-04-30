import React from 'react';
import {Users} from "./Users";
import {Route, Routes} from "react-router";
import {Navigation} from "./Navigation";
import {User} from "./Users/User";
import {Admin} from "./Admin";
import {createTheme, ThemeProvider} from "@mui/material";
import './App.css';

const theme = createTheme({
    components: {
        MuiButton: {
            variants: [
                {
                    props: {
                        variant: 'pagination'
                    },
                    style: {
                        backgroundColor: 'white',
                        cursor: 'pointer',
                        color: 'black',
                        height: '100%',
                        ":hover": {
                            backgroundColor: 'cornflowerblue'
                        }
                    }
                }
            ]
        }
    }
});

function App() {
    return (
       <ThemeProvider theme={theme}>
           <div className="App">
               <Routes>
                   <Route path='/' element={<Navigation />}/>
                   <Route path='/admin' element={<Admin />}/>
                   <Route path='/users' element={<Users />}/>
                   <Route path='/users/:user/:id' element={<User />}/>
                   {/*<Route path="*" element={<NoMatch />} />*/}
               </Routes>
           </div>
       </ThemeProvider>
    );
}

export default App;
