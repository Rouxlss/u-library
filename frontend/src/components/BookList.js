import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'

import Cookies from 'universal-cookie';
const cookies = new Cookies();

export const BookList = () => {

    const SESSION_ID = cookies.get('id');

    const [user, setuser] = useState({})

    const [book, setbook] = useState([]);
    const [role, setrole] = useState(null)
    const [reservation, setreservation] = useState({});
    const [search, setsearch] = useState('');

    async function getData() {
        const res = await axios.get('http://localhost:4000/api/books');
        setbook(res.data);
        const res2 = await axios.get(`http://localhost:4000/api/users/${SESSION_ID}`);
        setuser(res2.data);
    }

    async function searchData(search) {
        const books = await axios.get(`http://localhost:4000/api/books/search/${search}`);
        setbook(books.data);
    }

    useEffect(() => {
        setrole(cookies.get('role'));
        getData();
    }, [])

    useEffect(() => {
        if (search != '') {
            searchData(search);
        } else {
            getData();

        }
    }, [search])

    const deleteBook = async (id) => {
        await axios.delete(`http://localhost:4000/api/books/${id}`);
        getData();
    }

    const reserveBook = async (book) => {

        const { title, author, year, genre, stock } = book;

        await axios.post('http://localhost:4000/api/reservations/', {
            id_user: SESSION_ID,
            id_book: book._id,
            book: book.title,
            author: book.author,
            student: user.first_name + " " + user.last_name,
            status: 1
        });

        await axios.put(`http://localhost:4000/api/books/${book._id}`, {
            title,
            author,
            year,
            genre,
            stock: stock - 1
        });

        getData();
    }

    return (
        <>
            {role == 1 &&
                <div>

                    <div className="container-sm p-5">
                        <h4>Books</h4>
                        <Link to="/create-book" className="btn btn-info mb-5">Create Book</Link>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Author</th>
                                    <th scope="col">Genre</th>
                                    <th scope="col">Published Year</th>
                                    <th scope="col">Stock</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    book.map((book, index) => (
                                        <tr>
                                            <th scope="row">{index + 1}</th>
                                            <td>{book.title}</td>
                                            <td>{book.author}</td>
                                            <td>{book.genre}</td>
                                            <td>{book.year}</td>
                                            <td>{book.stock}</td>
                                            {role == 1 &&
                                                <td>
                                                    <button
                                                        onClick={() => deleteBook(book._id)}
                                                        className="btn btn-danger mr-2" style={{ marginRight: 5 }}>
                                                        <i className="fas fa-trash"></i>
                                                    </button>
                                                    <Link className="btn btn-success"
                                                        to={"/edit-book/" + book._id}
                                                    >
                                                        <i className="fas fa-edit"></i>
                                                    </Link>
                                                </td>
                                            }
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            }

            {
                role == 2 &&
                <div className="container p-5" style={{ width: 70 + "%", margin: "auto" }}>
                    <h1 className="mb-4">Books available</h1>
                    <div>
                        <div className="input-group flex-nowrap">
                            <span className="input-group-text" id="addon-wrapping">
                                <i className="fas fa-search"></i>
                            </span>
                            <input type="text" className="form-control" onChange={(e) => setsearch(e.target.value)}
                                placeholder="Search books by title, author and genre" aria-label="Username" aria-describedby="addon-wrapping" />
                        </div>
                    </div>
                    <div className="mb-5 justify-content-center p-5 row">
                        {
                            book.map((book, index) => (
                                book.stock != 0 &&
                                <div className="card" style={{ width: 18 + "rem", margin: 10 }}>
                                    <div className="card-body">
                                        <h5 className="card-title">{book.title} </h5>
                                        <small className="card-text">{book.stock} in stock</small>
                                        <p className="card-text">Author: {book.author}</p>
                                        <p className="card-text">Genre: {book.genre}</p>
                                        <a onClick={() => reserveBook(book)} className="btn btn-primary">Reserve</a>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            }
        </>
    )
}
