import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom'

import Cookies from 'universal-cookie';
const cookies = new Cookies();
const ROLE = cookies.get('role');

export const UserList = () => {

    const history = useHistory();

    if(ROLE!=1){
        history.replace(`/`);
    }

    const [user, setuser] = useState([]);

    async function getData() {
        const res = await axios.get('http://localhost:4000/api/users');
        setuser(res.data);
    }

    useEffect(() => {

        getData();

    }, [])

    const deleteUser = async (id) => {
        await axios.delete(`http://localhost:4000/api/users/${id}`);
        getData();
    }

    return (
        <>

            <div class="container-sm p-5">
                <h4>Users</h4>
                <div className="mb-5">
                    <Link to="/create-user" className="btn btn-info">Create User</Link>
                </div>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Role</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            user.map((user, index) => (
                                <tr>
                                    <th scope="row">{index + 1}</th>
                                    <td>{user.first_name + " " + user.last_name}</td>
                                    <td>{user.email}</td>
                                    <td>{
                                        user.role == 1 ? 'Librarian' : 'Student'
                                    }</td>
                                    <td>
                                        <button
                                        onClick={()=>deleteUser(user._id)} 
                                        className="btn btn-danger mr-2" style={{ marginRight: 5 }}>
                                            <i className="fas fa-trash"></i>
                                        </button>
                                        <Link className="btn btn-success"
                                        to={"/edit-user/" + user._id}
                                        >
                                            <i className="fas fa-edit"></i>
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}
