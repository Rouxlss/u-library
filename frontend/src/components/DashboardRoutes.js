import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Cookies from 'universal-cookie';

import { BookList } from './BookList';
import { CreateBook } from './CreateBook';
import { UserList } from './UserList';
import { CreateUser } from './CreateUser';
import { Navigation } from './Navigation';
import { ReservationList } from './ReservationList';

import { useHistory } from 'react-router-dom';

const cookies = new Cookies();

export const DashboardRoutes = () => {

    const history = useHistory();

    const SESSION_ID = cookies.get('id');

    if(!SESSION_ID){
        history.replace(`/login`);
    }

    return (
        <>  
            <Navigation />
            <Route path="/" exact component={BookList} />
            <Route path="/books" exact component={BookList} />
            <Route path="/users" exact component={UserList} />
            <Route path="/reservations" exact component={ReservationList} />
            <Route path="/edit-book/:id" exact component={CreateBook} />
            <Route path="/create-book" exact component={CreateBook} />
            <Route path="/edit-user/:id" exact component={CreateUser} />
            <Route path="/create-user" exact component={CreateUser} />
        </>
    )
}
