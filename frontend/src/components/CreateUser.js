import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

import Cookies from 'universal-cookie';
const cookies = new Cookies();

const ROLE = cookies.get('role');


export const CreateUser = () => {


    const [user, setuser] = useState({})
    const [editing, setediting] = useState(null)
    const { id } = useParams();
    const history = useHistory();

    if(ROLE!="1"){
        history.replace(`/`);
    }

    useEffect(async () => {

        if (id) {
            setediting(true)
            const user = await axios.get('https://my-u-library-mern.herokuapp.com/api/users/' + id);
            await setediting(true)
            setuser(user.data)
        }

    }, [id])

    const create = () => {
  
        if (editing) {
            
            const updateUser = async () => {
                if (user) {
                    await axios.put(`https://my-u-library-mern.herokuapp.com/api/users/${id}`, user)
                    history.push(`/users`);
                }
            }
            
            updateUser();
            
        } else {
            
            const insertUser = async () => {
                if (user) {
                    await axios.post('https://my-u-library-mern.herokuapp.com/api/users', user)
                    history.push(`/users`);
                }
            }
            
            insertUser();
        }
    
        
    }

    return (
        <div class="container-sm p-5">
            <div className="mb-3">
                <label for="first_name" className="form-label">First Name</label>
                <input type="text"
                    value={user.first_name}
                    onChange={
                        (e) => setuser({ ...user, first_name: e.target.value })}
                    className="form-control" id="first_name" aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
                <label for="last_name"
                    className="form-label">Last Name</label>
                <input type="text"
                    value={user.last_name}
                    onChange={
                        (e) => setuser({ ...user, last_name: e.target.value })}
                    className="form-control" id="last_name" aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
                <label for="email"
                    className="form-label">Email address</label>
                <input type="email"
                    value={user.email}
                    onChange={
                        (e) => setuser({ ...user, email: e.target.value })}
                    className="form-control" id="email" aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
                <label for="role" className="form-label">Role</label>
                <select
                    value={user.role}
                    onChange={
                        (e) => setuser({ ...user, role: e.target.value })}
                    class="form-select mb-3" id="role" aria-label="Default select example">
                    <option>Select a role...</option>
                    <option value="1">Librarian</option>
                    <option value="2">Student</option>
                </select>
            </div>

            {editing && <button onClick={create} className="btn btn-success">Update</button> || <button onClick={create} className="btn btn-primary">Submit</button>}
            <hr />

        </div>

    )
}
