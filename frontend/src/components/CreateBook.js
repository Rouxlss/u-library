import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

export const CreateBook = () => {
    const [book, setbook] = useState({})
    const [editing, setediting] = useState(null)
    const { id } = useParams();
    const history = useHistory();

    useEffect(async () => {

        if (id) {
            setediting(true)
            const book = await axios.get('https://my-u-library-mern.herokuapp.com/api/books/' + id);
            await setediting(true)
            setbook(book.data)
        }

    }, [id])

    const create = () => {
  
        if (editing) {
            
            const updateBook = async () => {
                if (book) {
                    await axios.put(`https://my-u-library-mern.herokuapp.com/api/books/${id}`, book)
                    history.push(`/`);
                }
            }
            
            updateBook();
            
        } else {
            
            const insertBook = async () => {
                if (book) {
                    await axios.post('https://my-u-library-mern.herokuapp.com/api/books', book)
                    history.push(`/`);
                }
            }
            
            insertBook();
        }
    
        
    }

    return (
        <div class="container-sm p-5">
            <div className="mb-3">
                <label for="title" className="form-label">Title</label>
                <input type="text"
                    value={book.title}
                    onChange={
                        (e) => setbook({ ...book, title: e.target.value })}
                    className="form-control" id="title" aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
                <label for="author"
                    className="form-label">Author</label>
                <input type="text"
                    value={book.author}
                    onChange={
                        (e) => setbook({ ...book, author: e.target.value })}
                    className="form-control" id="author" aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
                <label for="genre"
                    className="form-label">Genre</label>
                <input type="text"
                    value={book.genre}
                    onChange={
                        (e) => setbook({ ...book, genre: e.target.value })}
                    className="form-control" id="genre" aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
                <label for="year"
                    className="form-label">Published Year</label>
                <input type="number"
                    value={book.year}
                    onChange={
                        (e) => setbook({ ...book, year: e.target.value })}
                    className="form-control" id="year" aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
                <label for="stock"
                    className="form-label">Stok</label>
                <input type="number"
                    value={book.stock}
                    onChange={
                        (e) => setbook({ ...book, stock: e.target.value })}
                    className="form-control" id="stock" aria-describedby="emailHelp" />
            </div>

            {editing && <button onClick={create} className="btn btn-success">Update</button> || <button onClick={create} className="btn btn-primary">Submit</button>}
            <hr />

        </div>
    )
}
