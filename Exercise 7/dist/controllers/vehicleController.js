"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVehicle = exports.addVehicle = void 0;
const vehicles = [];
function addVehicle(req, res) {
    const body = req.body;
    let vehicle;
    if ('bodyType' in body && 'wheelCount' in body) {
        vehicle = Object.assign({}, body);
    }
    else if ('draft' in body) {
        vehicle = Object.assign({}, body);
    }
    else if ('wingspan' in body) {
        vehicle = Object.assign({}, body);
    }
    else {
        vehicle = Object.assign({}, body);
    }
    vehicles.push(vehicle);
    res.status(201).send('Vehicle added');
}
exports.addVehicle = addVehicle;
function getVehicle(req, res) {
    const model = req.params.model;
    const vehicle = vehicles.find((v) => v.model === model);
    if (vehicle) {
        res.status(200).send(vehicle);
    }
    else {
        res.status(404).send({ message: 'Vehicle not found' });
    }
}
exports.getVehicle = getVehicle;
