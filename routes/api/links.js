'use strict';

const express = require('express');
const HttpStatus = require('http-status-codes');
const _ = require('lodash');

const interceptors = require('../interceptors');
const models = require('../../models');

const router = express.Router();

router.get('/', async function(req, res) {
  const options = {
    order: [['position', 'ASC']]
  };
  if (req.query.meetingId) {
    options.where = {
      MeetingId: req.query.meetingId
    };
  }
  const links = await models.Link.findAll(options);
  res.json(links);
});

router.post('/', interceptors.requireAdmin, async function(req, res) {
  const link = models.Link.build(req.body);
  try {
    await link.save();
    res.status(HttpStatus.CREATED).json(link);
  } catch (error) {
    res.status(HttpStatus.UNPROCESSABLE_ENTITY).json(error);
  }
});

router.get('/:id', async function(req, res) {
  const link = await models.Link.findByPk(req.params.id);
  if (link) {
    res.json(link);
  } else {
    res.status(HttpStatus.NOT_FOUND).end();
  }
});

router.patch('/:id', interceptors.requireAdmin, async function(req, res) {
  const link = await models.Link.findByPk(req.params.id);
  if (link) {
    try {
      await link.update(_.pick(req.body, [
        'position',
        'type',
        'href',
        'desc'
      ]));
      res.status(HttpStatus.OK).end();  
    } catch (error) {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).json(error);
    }
  } else {
    res.status(HttpStatus.NOT_FOUND).end();
  }
})

router.delete('/:id', interceptors.requireAdmin, async function(req, res) {
  const link = await models.Link.findByPk(req.params.id);
  if (link) {
    await link.destroy();
    res.status(HttpStatus.OK).end();
  } else {
    res.status(HttpStatus.NOT_FOUND).end();
  }
});

module.exports = router;
