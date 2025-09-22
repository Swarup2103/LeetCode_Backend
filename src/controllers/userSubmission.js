const Problem = require('../models/problem');

const submitCode = async(req,res) =>{
    try{
        const userId = req.result._id;
        const problemId = req.params.id;

        const{code, language} = req.body;

        if(!userId || !code || !problemId || !language)
            return res.status(400).send("Some Field is Missing...");

        const problem = await Problem.findById(problemId);
        //now we can access hidden testcases

        //firstly save submitted code to DB, status: pending
        

    }
    catch(err){

    }
}

module.exports = submitCode;