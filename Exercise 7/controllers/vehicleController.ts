import { Request, Response } from 'express';

interface Vehicle {
  model: string;
  color: string;
  year: number;
  power: number;
}

interface Car extends Vehicle {
  bodyType: string;
  wheelCount: number;
}

interface Boat extends Vehicle {
  draft: number;
}

interface Plane extends Vehicle {
  wingspan: number;
}

const vehicles: Vehicle[] = [];

function addVehicle(req: Request, res: Response): void {
  const body = req.body;
  let vehicle: Vehicle;

  if ('bodyType' in body && 'wheelCount' in body) {
    vehicle = { ...body } as Car;
  } else if ('draft' in body) {
    vehicle = { ...body } as Boat;
  } else if ('wingspan' in body) {
    vehicle = { ...body } as Plane;
  } else {
    vehicle = { ...body };
  }
  vehicles.push(vehicle);
  res.status(201).send('Vehicle added');
}

function getVehicle(req: Request, res:Response): void {
  const model: string = req.params.model;
  const vehicle: Vehicle | undefined = vehicles.find((v) => v.model === model);
  if (vehicle) {
    res.status(200).send(vehicle);
  } else {
    res.status(404).send({ message: 'Vehicle not found' });
  }
}

export {
  addVehicle,
  getVehicle,
}
