const Note = require('../models/noteModel');
const mongoose = require('mongoose');
const schedule = require('node-schedule');
const moment = require('moment');

exports.create = (req, res) => {
    const reminder = req.body.reminder;
    const note = new Note({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        content: req.body.content,
        attachment: req.file.path,
        reminder: reminder,
        reminderFlag: req.body.reminderFlag
    });
    note
        .save()
        .then( result => {
            const date = moment(reminder, "YYYY-MM-DD HH:mm").toDate(); //2018-12-25 21:36
 
            const scheduleJob = schedule.scheduleJob(date, function(){
                console.log('This is a Reminder!');
            });
            res.status(200).json({
                status: "success",
                note: result
            });
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                status: "error",
                error: err
            });
        });
};

exports.findAll = (req, res, next) => {
    Note.find()
        .exec()
        .then( result => {
            if(result.length >= 0) {
                res.status(200).json({
                    status: "success",
                    notes: result
                });
            } else {
                res.status(404).json({
                    status: "error",
                    error: "No result found"
                });
            }
            
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                status: "error",
                error: err
            });
        });
};

exports.findOne = (req, res, next) => {
    const id = req.params.noteId;
    Note.findById(id)
        .exec()
        .then( result => {
            if(result) {
                res.status(200).json({
                    status: "success",
                    note: result
                });
            } else {
                res.status(404).json({
                    status: "error",
                    error: "Result not found"
                });
            }
            
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                status: "error",
                error: err
            });
        });
};

exports.update = (req, res, next) => {
    const id = req.params.noteId;
    const op = {};
    if(req.body.title)
        op['title'] = req.body.title;
    if(req.body.content)
        op['content'] = req.body.content;
    if(req.body.reminderFlag)
        op['reminderFlag'] = req.body.reminderFlag;
    Note.update({_id: id}, { $set: op })
        .exec()
        .then( result => {
            res.status(200).json({
                status: "success",
                message: "Successfully deleted"
            });  
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                status: "error",
                error: err
            });
        });
};

exports.delete = (req, res, next) => {
    const id = req.params.noteId;
    Note.remove({_id: id})
        .exec()
        .then( result => {
            res.status(200).json({
                status: "success",
                message: "Successfully deleted"
            });  
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                status: "error",
                error: err
            });
        });
};


