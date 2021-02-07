'use strict';

const express = require('express');
const HttpStatus = require('http-status-codes');

const interceptors = require('../interceptors');
const models = require('../../models');

const router = express.Router();

router.get('/', async function(req, res) {
  const cohorts = await models.Cohort.findAll({
    order: [['startsOn', 'DESC']]
  });
  res.json(cohorts);
});

router.post('/', interceptors.requireAdmin, async function(req, res) {
  const cohort = models.Cohort.build(req.body);
  try {
    await cohort.save();
    res.status(HttpStatus.CREATED).json(cohort);
  } catch (error) {
    res.status(HttpStatus.UNPROCESSABLE_ENTITY).json(error);
  }
});

router.get('/:id', async function(req, res) {
  const cohort = await models.Cohort.findByPk(req.params.id);
  if (cohort) {
    res.json(cohort);
  } else {
    res.status(HttpStatus.NOT_FOUND).end();
  }
});

router.patch('/:id', interceptors.requireAdmin, async function(req, res) {
  const cohort = await models.Cohort.findByPk(req.params.id);
  if (cohort) {
    try {
      await cohort.update(req.body);
      res.status(HttpStatus.OK).end();  
    } catch (error) {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).json(error);
    }
  } else {
    res.status(HttpStatus.NOT_FOUND).end();
  }
})

router.delete('/:id', interceptors.requireAdmin, async function(req, res) {
  const cohort = await models.Cohort.findByPk(req.params.id);
  if (cohort) {
    await cohort.destroy();
    res.status(HttpStatus.OK).end();
  } else {
    res.status(HttpStatus.NOT_FOUND).end();
  }
});

module.exports = router;
