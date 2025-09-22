const mongoose = require('mongoose');
const { type } = require('os');
const Schema = mongoose.Schema;

const submissionSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    
    problemId: {
        type: Schema.Types.ObjectId,
        ref: 'Problem',
        required: true
    },

    code:{
        type: String,
        required: true
    },

    language: {
        type: String,
        required: true,
        enum: ['javascript', 'cpp', 'java']
    },

    status: {
        type: String,
        enum: ['pending', 'accepted', 'wrong', 'error'],
        default: 'pending'
    },

    runtime: {
        type: String,   //in miliSecond
        default: 0
    },

    memory: {
        type: String,   //in kB
        default: 0
    },

    errorMessage: {
        type: String,
        default: ''
    },

    testCasesPassed: {
        type: Number,
        default: 0
    },

    testCasesTotal: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})

const Submission = mongoose.model('submission', submissionSchema);

module.exports = Submission;