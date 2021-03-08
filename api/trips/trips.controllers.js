"use strict";

const tripModel = require("./trips.model");
// const Joi = require("joi");
const {
  Types: { ObjectId },
} = require("mongoose");

async function listTrips(req, res, next) {
  try {
    const listTrips = await tripModel.find();
    return res.status(200).json(listTrips);
  } catch (error) {
    next(error);
  }
}

async function getById(req, res, next) {
  try {
    const tripId = req.params.tripId;
    const tripById = await tripModel.findById(tripId);

    if (!tripById) {
      return res.status(404).send();
    }

    return res.status(200).json(tripById);
  } catch (error) {
    next(error);
  }
}

async function addTrip(req, res, next) {
  try {
    const tripCreate = await tripModel.create(req.body);
    return res.status(201).json(tripCreate);
  } catch (error) {
    next(error);
  }
}

async function removeContact(req, res, next) {
  try {
    const contactId = req.params.contactId;
    const deleteContact = await contactModel.findByIdAndDelete(contactId);

    if (!deleteContact) {
      return res.status(404).send();
    }

    return res.status(204).json(deleteContact);
  } catch (error) {
    next(error);
  }
}
async function updateContact(req, res, next) {
  try {
    const contactId = req.params.contactId;
    const updateContact = await contactModel.findByIdAndUpdate(
      contactId,
      req.body
    );
    if (!updateContact) {
      return res.status(404).send();
    }
    console.log(updateContact);
    return res.status(204).send(updateContact);
  } catch (error) {
    next(error);
  }
}

function validateId(req, res, next) {
  const { contactId } = req.params;

  if (!ObjectId.isValid(contactId)) {
    return res.status(400).send();
  }
  next();
}

module.exports = {
  listTrips,
  getById,
  addTrip,
  //   removeContact,
  //   updateContact,
  validateId,
};
