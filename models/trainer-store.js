'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');

const trainerStore = {

  store: new JsonStore('./models/trainer-store.json', { trainers: [] }),
  collection: 'trainers',

  getAllTrainers() {
    return this.store.findAll(this.collection);
  },
  addTrainer() {
    this.store.add(this.collection, user);
    this.store.save();
  },
  getTrainerById(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  getTrainerByEmail(email) {
    return this.store.findOneBy(this.collection, { email: email });
  },
  getTrainersMembers(trainerid) {
    const type = "member";
    return this.store.findBy(this.collection,{type:type});//bring back all members for a trainer
  },

  getTrainerByPassword(password){
    return this.store.findOneBy(this.collection, { password: password });
  },
};

module.exports = trainerStore;
