"use strict";

const tripModel = require("./trips.model");
const Joi = require("joi");
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
    const contactId = req.params.contactId;
    const contactById = await contactModel.findById(contactId);

    if (!contactById) {
      return res.status(404).send();
    }

    return res.status(200).json(contactById);
  } catch (error) {
    next(error);
  }
}
async function addContact(req, res, next) {
  try {
    const contactCreate = await contactModel.create(req.body);
    return res.status(201).json(contactCreate);
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

function validateContact(req, res, next) {
  const validationRules = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    subscription: Joi.string().required(),
    password: Joi.string().required(),
  });
  const val = validationRules.validate(req.body);
  if (val.error) {
    return res.status(400).send(val.error.details[0].message);
  }
  next();
}
function validateUpdateContact(req, res, next) {
  const validationRules = Joi.object({
    name: Joi.string(),
    email: Joi.string(),
    phone: Joi.string(),
    subscription: Joi.string(),
    password: Joi.string(),
  });
  const val = validationRules.validate(req.body);
  if (val.error) {
    return res.status(400).send(val.error.details[0].message);
  }
  next();
}

module.exports = {
  listTrips,
  //   getById,
  //   addContact,
  //   removeContact,
  //   updateContact,
  //   validateId,
  //   validateContact,
  //   validateUpdateContact,
};
