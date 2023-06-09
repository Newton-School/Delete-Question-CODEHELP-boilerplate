const Question   = require("../models/question.js");
const jwt = require("jsonwebtoken");
const JWT_SECRET = 'NEWTONSCHOOL';

const createQuestion = async (req, res) => {

    const { questionName, topic, rating, link, status, token } = req.body;
    try{
        if(!token){
            res.status(401).json({
                status: 'fail',
                message: 'Missing token'
            });
        }
        let decodedToken;
        try{
            decodedToken = jwt.verify(token, JWT_SECRET);
        }catch(err){
            res.status(401).json({
                status: 'fail',
                message: 'Invalid token'
            });
        }
        const newQuestion = {
            questionName,
            topic,
            rating,
            link,
            status,
            creatorId: decodedToken.userId,
        };
        const question = await Question.create(newQuestion);
        res.status(200).json({
        message: 'Question added successfully to questionBank',
            questionId: question._id,
            status: 'success'
        });
    }catch(err){
        res.status(500).json({
            status: 'fail',
            message: err.message
        });
    }
}

const getQuestion = async (req, res) => {

    const token = req.body.token;
    try{
        if(!token){
            res.status(401).json({
                status: 'fail',
                message: 'Missing token'
            });
        }
        let decodedToken;
        try{
            decodedToken = jwt.verify(token, JWT_SECRET);
        }catch(err){
            res.status(401).json({
                status: 'fail',
                message: 'Invalid token'
            });
        }
        const questions = await Question.find( {creatorId : decodedToken.userId} );
        res.status(200).json({
            questions,
            status: 'success'
        });
    }catch(err){
        res.status(500).json({
            status: 'fail',
            message: err.message
        });
    }
}

/*

deleteQuestion Controller


1. delete the question with given id in req.params.

Response --> 

1. Success

200 Status code
json = {
  status: 'success',
  message: 'Question deleted successfully'
}

2. Question Doesn't exist

404 Status Code
json = {
    status: 'fail',
    message: 'Given Question doesn't exist'
}

3. Something went wrong

500 Status Code
json = {
    status: 'fail',
    message: error message
}

*/

const deleteQuestion = async (req, res) => {

    //Write yor code here.
}

module.exports = { createQuestion, getQuestion, deleteQuestion };
