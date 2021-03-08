"use strict";

const { Router } = require("express");
const tripControllers = require("./trips.controllers");
const tripRouter = Router();

tripRouter.get("/", tripControllers.listTrips);

// tripRouter.get("/:tripId", tripControllers.validateId, tripControllers.getById);
// tripRouter.post("/", tripControllers.validateTrip, tripControllers.addContact);
// tripRouter.delete(
//   "/:tripId",
//   tripControllers.validateId,
//   tripControllers.removeTrip
// );
// tripRouter.patch(
//   "/:tripId",
//   tripControllers.validateId,
//   tripControllers.validateTrip,
//   tripControllers.updateTrip
// );

module.exports = tripRouter;
