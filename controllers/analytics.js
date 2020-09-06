'use strict';

const logger = require('../utils/logger');
const accounts = require ('./accounts.js');

const assessmentStore = require('../models/assessment-store');
const member = require('../models/member-store.js');

const maleBaseWeight = 50;
const femaleBaseWeight = 45.5;
const additionalWeight = 2.3;
let inchesOver=0;
let weightAllowed = 0;

const analytics= {

  calculateBMI(member){

    return Math.round(member.currentWeight / (member.height * member.height)*100)/100;



  },
  isIdealWeight(member){

    logger.info(`just entered isIdealWeight`);

    const height = this.heightInFeet(member.height);
    logger.info(`height is ${height}`);
    let ideal = false;
    if(member.gender === "male"){

      if(height <= 5){
        if(member.currentWeight <= 52 & member.currentWeight >=48){

          ideal = true;
        }
        else if (height >5) {

          inchesOver = height - 5 * 10;
          weightAllowed = maleBaseWeight + (inchesOver * additionalWeight);
          logger.info(`weightAllowed is ${weightAllowed}`);
          if (member.currentWeight <= weightAllowed) {
            ideal = true;
          }
        }
      }

    }
    else if (member.gender ==="female"){
      logger.info(`gender is female`);
      if(height <=5){
        logger.info(`height is < 5`);
        if(member.currentWeight <=47.5 & member.currentWeight <=43.5){
          ideal = true;
        }
      }
      else if (height >5){
        logger.info(`height is > 5`);
        inchesOver = (height - 5)*10;
        weightAllowed = femaleBaseWeight + (inchesOver * additionalWeight);
        logger.info(`weightAllowed is ${weightAllowed}`);
        if(member.currentWeight <= (weightAllowed +2) & member.currentWeight >= (weightAllowed -2)){
          ideal = true;
        }
      }
    }

    let indicatorCol = "green";
    if(!ideal){
      indicatorCol = "red"
    }
    return indicatorCol;
  },

  heightInFeet(height){
  logger.info(`height in feet method`);
  return height * 3.2808;
},

  determineBMICategory(member){

    const bmiValue = this.calculateBMI(member);
    let category = "";

    if (bmiValue <16){
      category = "SEVERELY UNDERWEIGHT";
    }
    else  if (bmiValue >=16 & bmiValue <18.5 ){
      category = "UNDERWEIGHT";
    }
    else  if (bmiValue >=18.5 & bmiValue <25 ){
      category = "NORMAL";
    }
    else  if (bmiValue >=25 & bmiValue <30 ){
      category = "OVERWEIGHT";
    }
    else  if (bmiValue >=30 & bmiValue <35 ){
      category = "MODERATELY OBESE";
    }
    else  if (bmiValue >=35 ){
      category = "SEVERELY OBESE";
    }

    return category;


  },
  calcTotalMeasure(assessment){
    return (assessment.chest + assessment.thigh + assessment.upperarm + assessment.waist + assessment.hips);
  }
};


module.exports = analytics;