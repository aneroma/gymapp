'use strict';

const accounts = require ('./accounts.js');
const logger = require('../utils/logger');
const memberStore = require('../models/member-store');
const assessmentStore = require('../models/assessment-store');
const uuid = require('uuid');

const trainerdash = {
  index(request, response) {
    logger.info('trainer dashboard rendering');
    const loggedInUser = accounts.getCurrentTrainer(request);
    const viewData = {
      title: 'Trainer Dashboard',
      member: memberStore.getAllMembers(loggedInUser.id),
    };
    logger.info('about to render', memberStore.getAllMembers());
    response.render('trainerdash', viewData);
  },


  getMemberAssessments(request,response){
    const member = request.params.id;
    assessmentStore.getMemberAssessmets(memberId)
    response.redirect('/dashboard')
  },


  deleteMember(request, response) {
    const memberId = request.params.id;
    logger.debug(`Deleting Member ${memberId}`);
    memberStore.removeMember(memberId);
    response.redirect('/trainerdash');
  },

  viewMember(request, response){
    const memberId = request.params.id;
    logger.debug('Member id = ', memberId);
    const viewData = {
      title: 'Member Assessments',
      member: memberStore.getMemberById(memberId),
      assessments: assessmentStore.getMemberAssessments(memberId),
    };
    response.render('trainerassessment', viewData);
  },

  addComment(request, response)
  {
    const assessmentId = assessmentStore.getAssessment(request);
    const comment = request.body;

    assessmentId.comment = request.body.comment,
      assessmentStore.store.save();

    response.render('trainerdash');

  },

};

module.exports = trainerdash;