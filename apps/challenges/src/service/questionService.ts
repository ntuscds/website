import mongoose from "mongoose";
import QuestionRepo from "../repo/questionRepo";
import { QuestionReq, GetUserSpecificQuestionResp } from "../model/question";
import ValidationService from "./validationService";
import { GeneralResp, GetQuestionsFilter, StatusCodeError } from "../types/types";
import { QuestionInputModel } from "../model/questionInput";

const GetQuestions = async (filter: GetQuestionsFilter) => {
  return await QuestionRepo.GetQuestions(filter);
};

const getQuestionByID = async (questionID: string) => {
  if (!mongoose.isValidObjectId(questionID)) {
    throw new StatusCodeError(400, "Invalid question ID");
  }
  const _id = new mongoose.Types.ObjectId(questionID);
  const question = await QuestionRepo.getQuestionByID(_id);

  if (!question) {
    throw new StatusCodeError(404, "Question not found")
  }
  return question;
};

const createQuestion = async (req: QuestionReq): Promise<GeneralResp> => {
  if (!ValidationService.getValidationFunction(req.validation_function)) {
    console.log("Invalid validation function");
    return {
      status: 400,
      message: "Invalid validation function",
      data: null,
    };
  }

  if (
    !ValidationService.getGenerateInputFunction(req.generate_input_function)
  ) {
    console.log("Invalid generate input function");
    return {
      status: 400,
      message: "Invalid generate input function",
      data: null,
    };
  }

  const question = await QuestionRepo.createQuestionByReq(req);

  return {
    status: 201,
    message: "Question created",
    data: question,
  };
};

const updateQuestionSubmissions = async (
  questionID: string,
  submissionID: string,
  isCorrect: boolean
) => {
  if (
    !mongoose.isValidObjectId(questionID) ||
    !mongoose.isValidObjectId(submissionID)
  ) {
    throw new Error("Invalid question or submission ID");
  }
  const _questionID = new mongoose.Types.ObjectId(questionID);
  const _submissionID = new mongoose.Types.ObjectId(submissionID);
  return await QuestionRepo.updateQuestionSubmissions(
    _questionID,
    _submissionID,
    isCorrect
  );
};

const saveQuestionInput = async (
  userID: string,
  seasonID: string,
  questionID: string,
  input: string[]
) => {
  const _userID = new mongoose.Types.ObjectId(userID);
  const _seasonID = new mongoose.Types.ObjectId(seasonID);
  const _questionID = new mongoose.Types.ObjectId(questionID);

  const questionInput = {
    userID: _userID,
    seasonID: _seasonID,
    questionID: _questionID,
    input: input,
  } as QuestionInputModel;
  return await QuestionRepo.saveQuestionInput(questionInput);
};

const getUserSpecificQuestion = async (
  userID: string,
  questionID: string
): Promise<GetUserSpecificQuestionResp | null> => {
  if (
    !mongoose.isValidObjectId(userID) ||
    !mongoose.isValidObjectId(questionID)
  ) {
    throw new Error("Invalid user, question or season ID");
  }

  const question = await QuestionService.getQuestionByID(questionID);
  if (!question) {
    throw new StatusCodeError(404, "Question not found");
  }

  const seasonID = question.seasonID.toString();
  const _userID = new mongoose.Types.ObjectId(userID);
  const _seasonID = new mongoose.Types.ObjectId(seasonID);
  const _questionID = new mongoose.Types.ObjectId(questionID);
  let input: string[] = [];
  const questionInput = await QuestionRepo.getQuestionInput(
    _userID,
    _seasonID,
    _questionID
  );

  if (!questionInput) {
    input = await ValidationService.generateInput(questionID);
    await saveQuestionInput(userID, seasonID, questionID, input);
  } else {
    input = questionInput.input;
  }

  const resp: GetUserSpecificQuestionResp = {
    id: question._id.toString(),
    question_no: question.question_no,
    question_title: question.question_title,
    question_desc: question.question_desc,
    question_date: question.question_date,
    seasonID: seasonID,
    question_input: input,
    expiry: question.expiry,
    points: question.points,
  };
  return resp;
};
const QuestionService = {
  GetQuestions,
  getQuestionByID,
  updateQuestionSubmissions,
  createQuestion,
  getUserSpecificQuestion,
};

export { QuestionService as default };