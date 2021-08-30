import React, { Component, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Cookies from 'universal-cookie';
import axios from 'axios';

const cookies = new Cookies();

export const Navigation = () => {

    const history = useHistory();
    const ROLE = cookies.get('role');
    const SESSION_ID = cookies.get('id');

    const logout = () => {
        cookies.remove('id');
        cookies.remove('role');
        history.replace('/login');
    }

    const [user, setuser] = useState({})

    async function getData() {
        const res2 = await axios.get(`https://my-u-library-mern.herokuapp.com/api/users/${SESSION_ID}`);
        setuser(res2.data);
    }

    useEffect(() => {
        getData()
    }, [])

    return (



        <nav class="navbar navbar-expand navbar-light bg-light">
            <div class="container">
                <div className="d-flex">
                    <Link className="navbar-brand" to="/">
                        <img src="https://images-na.ssl-images-amazon.com/images/I/3112PVTrnDL.png" alt="" width="30" height="" className="d-inline-block align-text-top" />
                        My U Library
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav d-flex">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Books</Link>
                            </li>
                            {ROLE == 1 &&
                                <li className="nav-item">
                                    <Link className="nav-link" to="/users">Users</Link>
                                </li>
                            }

                            <li className="nav-item">
                                <Link className="nav-link" to="/reservations">Reservations</Link>
                            </li>


                        </ul>
                    </div>
                </div>
                <div class="d-flex">
                    <a className="nav-link" >{user.first_name + " " + user.last_name}</a>
                    <div className="navbar-nav d-flex">
                        <li className="nav-item">
                            <a style={{ cursor: 'pointer' }} onClick={logout} className="nav-link" tabIndex="-1">Logout</a>
                        </li>
                    </div>
                </div>
            </div>
        </nav>
    )
}
