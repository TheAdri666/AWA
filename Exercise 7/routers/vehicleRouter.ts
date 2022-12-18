import { Router } from 'express';
import * as VehicleCtrl from '../controllers/vehicleController' ;

const vehicleRouter: Router = Router();

vehicleRouter
  .route('/add')
  .post(VehicleCtrl.addVehicle);

vehicleRouter
  .route('/search/:model')
  .get(VehicleCtrl.getVehicle);

export default vehicleRouter;
