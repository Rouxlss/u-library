import React, { useState } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const Login = () => {

    const [email, setemail] = useState('');
    const history = useHistory();
    const [error, seterror] = useState({
        show: false,
        msg: ''
    })

    async function validate_email() {
        if (email != "") {
            const { data } = await axios.get(`https://my-u-library-mern.herokuapp.com/api/users/auth/` + email);
            if (data) {
                cookies.set('id', data._id, { path: "/" });
                cookies.set('role', data.role, { path: "/" });
                history.replace(`/books`);
            } else {
                seterror({
                    show: true,
                    msg: 'User not exist'
                });
                setTimeout(() => {
                    seterror({
                        ...error,
                        show: false
                    })
                }, 2000);
            };
        } else {
            seterror({
                show: true,
                msg: 'Empty email'
            });
            setTimeout(() => {
                seterror({
                    ...error,
                    show: false
                })
            }, 2000);
        }
    }

    const login = () => {
        validate_email();
    }


    return (
        <>
            {
                error.show == true &&
                <div class="alert alert-danger" role="alert"
                    style={{
                        position: "absolute",
                        right: 20,
                        top: 20
                    }}
                >
                    {error.msg}
                </div>
            }
            <div className="container p-5" style={{ maxWidth: 500 }}>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email address</label>
                    <input
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                        type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">Sign in with your email.</div>
                </div>
                <button onClick={login} type="submit" className="btn btn-primary">Login</button>
            </div>
        </>
    )
}
