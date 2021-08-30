const { Router } = require('express');
const router = Router();

const {getReservations, createReservation, updateReservation, deleteReservation, getReservation, getReservationsByUser} 
= require('./../controllers/reservations.controller');

router.route('/')
    .get(getReservations)
    .post(createReservation)

router.route('/user/:id')
    .get(getReservationsByUser)

router.route('/:id')
    .get(getReservation)
    .put(updateReservation)
    .delete(deleteReservation)

module.exports = router;