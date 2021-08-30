import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom'
import Cookies from 'universal-cookie';

const cookies = new Cookies();


export const ReservationList = () => {

    const [reserv, setreserv] = useState([]);
    const [info, setinfo] = useState({})

    async function getData() {

        const ROLE = cookies.get('role');
        const SESSION_ID = cookies.get('id');

        setinfo({
            role: ROLE,
            sessionid: SESSION_ID
        })

        if (ROLE == "1") {
            const res = await axios.get('http://localhost:4000/api/reservations');
            setreserv(res.data);
        } else if (ROLE == "2") {
            const res = await axios.get(`http://localhost:4000/api/reservations/user/${SESSION_ID}`);
            setreserv(res.data);
        }
    }

    useEffect(() => {

       

        getData();

    }, [])

    return (
        <div className="container justify-content-center p-5 row" style={{ width: 70 + "%", margin: "auto" }}>
            <h1 className="mb-4">Reserved Books</h1>
            {
                reserv.map((res) => (
                    <div className="card" style={{ width: 18 + "rem", margin: 10 }}>
                        <div className="card-body">
                            <h5 className="card-title">{res.book}</h5>
                            <p className="card-text">Author: {res.author}</p>
                            {
                                info.role == 1 && 
                                <p className="card-text">Reserved By: {res.student}</p>
                            }
                            <a className="btn btn-primary">Return Book</a>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
