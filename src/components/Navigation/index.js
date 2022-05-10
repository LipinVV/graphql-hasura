import React from "react";
import {Outlet, Link} from "react-router-dom";
import {AppBar} from "@mui/material";
import './navigation.css';

export const Navigation = () => {

    return (
        <div className='navigation'>
            <AppBar  className='navigation__bar'>
                <ul className='navigation__links'>
                    <Link className='navigation__link' to='/users'>Users</Link>
                    <Link className='navigation__link'  to='/admin'>Admin</Link>
                    <Link className='navigation__link'  to='/charts'>Charts</Link>
                </ul>
            </AppBar >
            <hr/>
            <Outlet style={{display: 'grid'}}/>
        </div>
    )
}