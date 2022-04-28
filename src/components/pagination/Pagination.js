import React, {useEffect, useState} from "react";
import './pagination.css';
import {Button} from "@mui/material";

export const Pagination = ({
                               filteredUsers,
                               currentPage,
                               setCurrentPage,
                               currentUsersOnThePage,
                               pageSize,
                               indexOfLastItem
                           }) => {


    const handleClickIncrease = () => {
        setCurrentPage(prevState => prevState + 1);
    }
    const handleClickDecrease = () => {
        setCurrentPage(prevState => prevState - 1);
    }

    useEffect(() => {
        if (currentUsersOnThePage < pageSize) {
            setCurrentPage(1);
        }
    }, [currentUsersOnThePage, pageSize, setCurrentPage])

    const [pagesLength, setPagesLength] = useState(0);
    const [pages, setPages] = useState([]);

    useEffect(() => {
        if (filteredUsers?.length > 0) {
            setPagesLength(Math.ceil(filteredUsers?.length / pageSize));
            setPages(Array(pagesLength)?.fill()?.map((element, index) => index + 1))
        }

    }, [filteredUsers, pageSize, pagesLength])

    return (
        <div className='users__pagination'>
            <section className='users-template__pagination-controls'>
                <div className='users-template__pagination-buttons'>
                    <Button
                        sx={{backgroundColor: 'white'}}
                        disabled={currentPage === 1}
                        className='users-template__pagination-button'
                        onClick={handleClickDecrease}>Previous
                    </Button>
                    {pages?.length > 0 && pages.map(number => {
                        return (
                            <Button
                                sx={{backgroundColor: 'white'}}
                                key={number}
                                onClick={() => setCurrentPage(number)}
                                disabled={currentPage === number}
                                className='users-template__pagination-button'
                            >
                                {number}
                            </Button>
                        )
                    })
                    }
                    <Button
                        sx={{backgroundColor: 'white'}}
                        disabled={indexOfLastItem >= filteredUsers?.length}
                        className='users-template__pagination-button'
                        onClick={handleClickIncrease}>Next
                    </Button>
                </div>
            </section>
        </div>
    )
}