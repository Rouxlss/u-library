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

    const returnBook = async(resv) => {

        const {_id, id_user, id_book, book, author, student, status} = resv;
        await axios.put(`http://localhost:4000/api/reservations/${_id}`, {
            _id, 
            id_user, 
            id_book, 
            book, author, 
            student, 
            status:0
        });
        getData();

    }

    const returnToStock = async (resv) => {

        const {_id, id_book} = resv;

        const book = await axios.get(`http://localhost:4000/api/books/${id_book}`);
        const { title, author, year, genre, stock } =  book.data;

        await axios.delete(`http://localhost:4000/api/reservations/${_id}`);

        await axios.put(`http://localhost:4000/api/books/${id_book}`, { 
            title, 
            author, 
            year, 
            genre, 
            stock: stock+1
        });

        getData();
    }

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
                                <div>
                                    <p className="card-text">Reserved By: {res.student}</p>
                                    {
                                        res.status == 0 &&
                                        <a onClick={()=>returnToStock(res)} className="btn btn-warning">Return to Stock</a>
                                    }
                                </div>
                            }
                            {
                                info.role == 2 && res.status == 1 &&  
                                <a onClick={()=>returnBook(res)} className="btn btn-primary">Return Book</a>
                            }
                            {
                                info.role == 2 && res.status == 0 &&  
                                <p className="card-text text-success">Returned <i class="far fa-check-circle"></i></p>
                            }

                        </div>
                    </div>
                ))
            }
        </div>
    )
}
