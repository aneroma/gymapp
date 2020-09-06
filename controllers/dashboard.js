"use strict";
const uuid = require('uuid');
const logger = require('../utils/logger');

const accounts = require ('./accounts.js');
const assessmentStore = require('../models/assessment-store.js');
const memberStore = require('../models/member-store');
const goalStore = require('../models/goal-store.js');
const util = require ('./analytics.js');


const dashboard = {
  index: function(request, response) {
    logger.info("Member dashboard rendering");
    const loggedInMember = accounts.getCurrentMember(request);

    const viewData = {
      title: "Member Dashboard",
      assessments: assessmentStore.getMemberAssessments(loggedInMember.id),
      goal: goalStore.getMemberGoals(loggedInMember.id),
      member: memberStore.getMemberById(loggedInMember.id),
      bmi: Number(util.calculateBMI(accounts.getCurrentMember(request),assessmentStore.getMemberAssessments(loggedInMember.id))),
      idealWeightInd: util.isIdealWeight(loggedInMember),
      bmiCategory: util.determineBMICategory(loggedInMember)
    };


    logger.info("about to render", assessmentStore.getAllAssessments());
    response.render("dashboard", viewData);
  },

  addAssessment(request, response) {
    const loggedInMember = accounts.getCurrentMember(request);

    const newAssessment = {
      id: uuid.v1(),
      memberid: loggedInMember.id,
      date:  new Date(),
      weight: Number(request.body.weight),
      chest: Number(request.body.chest),
      thigh: Number(request.body.thigh),
      upperArm: Number(request.body.upperArm),
      waist: Number(request.body.waist),
      hips: Number(request.body.hips),

    };
    let newTotalMeasure = util.calcTotalMeasure(newAssessment);
    let previousTotalMeasure = loggedInMember.totalMeasure;
    loggedInMember.totalMeasure = newTotalMeasure;
    if (newTotalMeasure < previousTotalMeasure){
      newAssessment.trend = "green";
    }
    else newAssessment.trend = "red";
    assessmentStore.addAssessment(newAssessment);
    memberStore.updateCurrentWeight(loggedInMember,newAssessment);
    response.redirect('/dashboard');
  },

  deleteAssessment(request,response) {
    const id = request.params.id;
    logger.debug('Deleting assessment ${id}');
    assessmentStore.removeAssessment(id);
    response.redirect('/dashboard');
  },

  addGoal(request, response) {

    const loggedInMember = accounts.getCurrentMember(request);

    const newGoal = {
      id: uuid.v1(),
      memberid: loggedInMember.id,
      date:  new Date(),
      status:""


    };
    let newTotalMeasure = util.calcTotalMeasure(newGoal);
    response.redirect('/dashboard');
  },

};

module.exports = dashboard;
