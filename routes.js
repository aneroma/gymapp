'use strict';

const express = require('express');
const router = express.Router();

const accounts = require('./controllers/accounts.js');
const dashboard = require('./controllers/dashboard.js');
const trainerdash = require('./controllers/trainerdash.js');
const about = require('./controllers/about.js');


router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);

router.get('/dashboard', dashboard.index);
router.get('/dashboard/deleteAssessment/:id', dashboard.deleteAssessment);
router.post('/dashboard/addassessment', dashboard.addAssessment);
router.post('/dashboard/addgoal', dashboard.addGoal);

router.get('/trainerdash', trainerdash.index);
router.get('/member/:id', trainerdash.viewMember);
router.get('/trainerdash/deletemember/:id', trainerdash.deleteMember);
router.post('/trainerdash/addassessmentcomment/:id/Comment',trainerdash.addComment);


router.get('/about', about.index);


module.exports = router;
