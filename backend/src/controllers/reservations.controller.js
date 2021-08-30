const reservationsCtrl = {};

const Reservation = require('../models/Reservation');

reservationsCtrl.getReservations = async (req, res) => {
    const reservations = await Reservation.find();
    res.json(reservations)
};

reservationsCtrl.createReservation= async (req, res) => {
    const {id_user, id_book, book, author, student}= req.body;
    const newReservation = new Reservation({id_user, id_book, book, author, student})
    await newReservation.save();
    res.json({message: 'Reservation Saved'})
};

reservationsCtrl.getReservation = async (req, res) => {
    const id = req.params.id;
    const reservation = await Reservation.findById(id);
    res.json(reservation)
};

reservationsCtrl.getReservationsByUser = async (req, res) => {
    const id = req.params.id;
    const reservation = await Reservation.find({id_user: id});
    res.json(reservation)
};

reservationsCtrl.deleteReservation  = async (req, res) => {
    const id = req.params.id;
    await Reservation.findByIdAndDelete(id)
    res.json({message: 'Reservation Deleted'})
};

reservationsCtrl.updateReservation = async (req, res) => {
    const id = req.params.id;
    const {id_user, id_book, book, author, student} = req.body;
    await Reservation.findByIdAndUpdate(id, {id_user, id_book, book, author, student})
    res.json({message: 'Reservation Updated'})
};

module.exports = reservationsCtrl;