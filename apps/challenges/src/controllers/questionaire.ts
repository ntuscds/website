import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Question, { QuestionReq } from "../model/question";
import { isValidObjectId } from "../utils/db";
import QuestionService from "../service/questionService";
import { isValidQuestionRequest } from "../utils/validator";
import { z } from "zod";
import { Logger } from "nodelogger";

// @desc    Get questions
// @route   GET /api/question
// @access  Public
const getQuestions = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // We pass in empty object, meaning that we GetQuestions without setting any filters.
    // This means we will return all questions in our db.
    try {
      const questions = await QuestionService.GetQuestions({});

      res.status(200).json(questions);
    } catch (err) {
      Logger.error("QuestionnaireController.GetQuestions error", err);
      next(err);
    }
  }
);

// @desc    Get active questions
// @route   GET /api/activity/active
// @access  Public
const getActiveQuestions = asyncHandler(async (req: Request, res: Response) => {
  const questions = await QuestionService.GetQuestions({ isActive: true });

  res.status(200).json(questions);
});

// @desc    Get question
// @route   GET /api/question/:id
// @access  Public
const getQuestion = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const questionId = req.params.id;

    try {
      const question = await QuestionService.getQuestionByID(questionId);

      res.status(200).json(question);
    } catch (error) {
      Logger.error("QuestionnaireController.GetQuestion error", error);
      next(error);
    }
  }
);

const getUserSpecificQuestion = asyncHandler(
  async (req: Request, res: Response) => {
    const { userID } = req.params;
    const questionId = req.params.id;

    try {
      const question = await QuestionService.getUserSpecificQuestion(
        userID,
        questionId
      );

      if (!question) {
        res.status(404).json({ message: "Question not found" });
        return;
      }

      res.status(200).json(question);
    } catch (error) {
      Logger.error(
        "QuestionnaireController.GetUserSpecificQuestion error",
        error
      );
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

// @desc    Set question
// @route   POST /api/question
// @access  Private
const setQuestion = asyncHandler(async (req: Request, res: Response) => {
  try {
    const question = isValidQuestionRequest.parse(req.body);

    const createQuestionReq: QuestionReq = {
      ...question,
      question_date: new Date(question.question_date),
      expiry: new Date(question.expiry),
    };

    const resp = await QuestionService.createQuestion(createQuestionReq);

    res.status(resp.status).json(resp);
  } catch (err) {
    if (err instanceof z.ZodError) {
      const message = err.issues.map((issue) => issue.message).join(", ");
      res.status(400).json({ message });
      return;
    }

    Logger.error("QuestionnaireController.SetQuestion error", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// @desc    Update question
// @route   PUT /api/question/:id
// @access  Private
const updateQuestion = asyncHandler(async (req: Request, res: Response) => {
  const questionId = req.params.id;
  if (!isValidObjectId(questionId)) {
    res.status(400).json({ message: "Invalid question ID" });
    return;
  }
  try {
    const question = await Question.findById(questionId);

    if (!question) {
      res.status(404).json({ message: "Question not found" });
      return;
    }

    const toBeUpdateQuestion = isValidQuestionRequest.parse(req.body);

    const updateQuestionReq: QuestionReq = {
      ...toBeUpdateQuestion,
      question_date: new Date(question.question_date),
      expiry: new Date(question.expiry),
    };

    const updatedQuestion = await Question.findByIdAndUpdate(
      questionId,
      updateQuestionReq,
      { new: true }
    );

    res.status(200).json(updatedQuestion);
  } catch (error) {
    Logger.error("QuestionnaireController.UpdateQuestion error", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// @desc    Delete question
// @route   DELETE /api/question/:id
// @access  Private
const deleteQuestion = asyncHandler(async (req: Request, res: Response) => {
  const questionId = req.params.id;

  if (!isValidObjectId(questionId)) {
    res.status(400).json({ message: "Invalid question ID" });
    return;
  }

  try {
    const question = await Question.findById(questionId);

    if (!question) {
      res.status(404).json({ message: "Question not found" });
      return;
    }

    await question.remove();

    res.status(200).json({ message: "Question deleted" });
  } catch (error) {
    Logger.error("QuestionnaireController.DeleteQuestion error", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const QuestionController = {
  getQuestion,
  getUserSpecificQuestion,
  getQuestions,
  getActiveQuestions,
  setQuestion,
  updateQuestion,
  deleteQuestion,
};

export { QuestionController as default };