import {Outlet, Link} from "react-router-dom";
import React from "react";

export const Navigation = () => {

    return (
        <div>
            <nav>
                <ul className='links' style={{display: 'grid', gridGap: '20px', gridTemplateColumns: '1fr 1fr 1fr'}}>
                    <Link style={{color: 'white', justifySelf: 'center'}} to='/users'>Users</Link>
                    <Link style={{color: 'white', justifySelf: 'center'}} to='/admin'>Admin</Link>
                    <Link style={{color: 'white', justifySelf: 'center'}} to='/charts'>Charts</Link>
                </ul>
            </nav>
            <hr/>
            <Outlet/>
        </div>
    )
}