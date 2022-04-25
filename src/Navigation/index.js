import {Link} from "react-router-dom";

export const Navigation = () => {

    return (
        <div>
            <nav>
                <ul className='links' style={{display: 'grid', gridGap: '20px'}}>
                    <Link style={{color: 'white'}} to='/users'>Users</Link>
                    <Link style={{color: 'white'}} to='/admin'>Admin</Link>
                </ul>
            </nav>
        </div>
    )
}