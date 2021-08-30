const { Router } = require('express');
const router = Router();

const {getUsers, createUser, updateUser, deleteUser, getUser, getUserByEmail} 
= require('./../controllers/users.controller');

router.route('/')
    .get(getUsers)
    .post(createUser)
    
router.route('/auth/:email')
    .get(getUserByEmail)

router.route('/:id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser)


module.exports = router;