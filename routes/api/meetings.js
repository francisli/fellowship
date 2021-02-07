'use strict';

const express = require('express');
const HttpStatus = require('http-status-codes');

const interceptors = require('../interceptors');
const models = require('../../models');

const router = express.Router();

router.get('/', async function(req, res) {
  const options = {
    order: [['startsAt', 'ASC']]
  };
  if (req.query.cohortId) {
    options.where = {
      CohortId: req.query.cohortId
    };
  }
  switch (req.query.include) {
  case 'link':
    options.include = models.Link;
  default:
    break;
  }
  const meetings = await models.Meeting.findAll(options);
  res.json(meetings);
});

router.post('/', interceptors.requireAdmin, async function(req, res) {
  const meeting = models.Meeting.build(req.body);
  try {
    await meeting.save();
    res.status(HttpStatus.CREATED).json(meeting);
  } catch (error) {
    res.status(HttpStatus.UNPROCESSABLE_ENTITY).json(error);
  }
});

router.get('/:id', async function(req, res) {
  const meeting = await models.Meeting.findByPk(req.params.id);
  if (meeting) {
    res.json(meeting);
  } else {
    res.status(HttpStatus.NOT_FOUND).end();
  }
});

router.patch('/:id', interceptors.requireAdmin, async function(req, res) {
  const meeting = await models.Meeting.findByPk(req.params.id);
  if (meeting) {
    try {
      await meeting.update(req.body);
      res.status(HttpStatus.OK).end();  
    } catch (error) {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).json(error);
    }
  } else {
    res.status(HttpStatus.NOT_FOUND).end();
  }
})

router.delete('/:id', interceptors.requireAdmin, async function(req, res) {
  const meeting = await models.Meeting.findByPk(req.params.id);
  if (meeting) {
    await meeting.destroy();
    res.status(HttpStatus.OK).end();
  } else {
    res.status(HttpStatus.NOT_FOUND).end();
  }
});

module.exports = router;
