import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Navigation from './components/Navigation';
import BookList from './components/BookList';
import CreateBook from './components/CreateBook';
import UserList from './components/UserList';
import CreateUser from './components/CreateUser';


function App() {
  return (
    <div className="">
      <Router>
          <Navigation/>
          <Route path="/" exact component={BookList}/>
          <Route path="/users" exact component={UserList}/>
          <Route path="/edit-book/:id" exact component={CreateBook}/>
          <Route path="/create-book" exact component={CreateBook}/>
          <Route path="/edit-user:id" exact component={CreateUser}/>
          <Route path="/create-user" exact component={CreateUser}/>
      </Router>
    </div>
    
  );
}

export default App;
