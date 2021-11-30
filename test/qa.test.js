/**
 * @jest-environment jsdom
 */
import 'regenerator-runtime/runtime';
import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor, within, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import axios from 'axios';
import dummyData from './qaData.js';
import httpRequest from '../client/src/components/Questions/httpRequest.js';

import App from '../client/src/App.jsx'
import Questions from '../client/src/components/Questions/Questions.jsx';
import SearchQuestions from '../client/src/components/Questions/SearchQuestions.jsx';
import QuestionList from '../client/src/components/Questions/QuestionList.jsx';
import QuestionEntry from '../client/src/components/Questions/QuestionList.jsx';
import AnswerEntry from '../client/src/components/Questions/AnswerEntry.jsx';

import AnswerModal from '../client/src/components/Questions/AnswerModal.jsx';
import ImageModal from '../client/src/components/Questions/ImageModal.jsx';
import QuestionModal from '../client/src/components/Questions/QuestionModal.jsx';


describe('Unit Tests', () => {

  test('renders Search Component', () => {
    const placeholderText = 'HAVE A QUESTION? SEARCH FOR ANSWERS...';
    render(<SearchQuestions />);
    expect(screen.getByPlaceholderText(placeholderText)).toBeInTheDocument();
  });

  test('renders QuestionList Component with 2 questions & 2 answers on initial load, If there\'re questions', () => {
    render(<QuestionList questions={dummyData.resultsA} productInfo={dummyData.product_id} />);
    expect(screen.getAllByText(/Q:/)).toHaveLength(2);
    expect(screen.getAllByText(/A:/)).toHaveLength(2);
  });

  test('should not display a button, if there are 2 or less questions to the given product', () => {
    render(<QuestionList questions={dummyData.resultsC} productInfo={dummyData.product_id} />);
    expect(screen.queryByRole('button', { name: /MORE ANSWERED QUESTIONS/i })).not.toBeInTheDocument();
  });

  test('should display a button, if there\'re more than 2 questions to the given product', () => {
    render(<QuestionList questions={dummyData.resultsA} productInfo={dummyData.product_id} />);
    expect(screen.getByRole('button', { name: /MORE ANSWERED QUESTIONS/i })).toBeInTheDocument();
  });

  test('should display a button if there\'s no questions to the given product', () => {
    render(<QuestionList questions={dummyData.resultsB} productInfo={dummyData.product_id} />);
    expect(screen.getByRole('button', { name: /ADD A QUESTION +/i })).toBeInTheDocument();
  })

});





// jest.mock('axios');
xdescribe('Integration Tests', () => {

  test('should open a modal when user clicks add answer button', () => {
    render(<QuestionEntry question={dummyData.resultsA[2]} productInfo={dummyData.product_id} />)
    const addA = screen.getByRole('button', { name: /Add Answer/i });
    userEvent.click(addA)

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  test('should open a modal when user clicks add question button', () => {
    render(<QuestionList questions={dummyData.resultsA} productInfo={dummyData.product_id} />)
    const addQ = screen.getByRole('button', { name: /ADD A QUESTION +/i });
    userEvent.click(addQ)
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  test('should hide a button when user loads up all the questions', () => {
    render(<QuestionList questions={dummyData.resultsA} productInfo={dummyData.product_id} />)

    const moreQ = screen.getByRole('button', { name: /MORE ANSWERED QUESTIONS/i });
    for (let i = 0; i < dummyData.results.length; i++) {
      userEvent.click(moreQ)
    }
    expect(moreQ).not.toBeInTheDocument();
  });

  test('should display error message when requirements have not been met in Modal', () => {
    render(<QuestionModal isOpen={true} productInfo={dummyData.product_id} ><div>teset</div></QuestionModal>)

    expect(screen.getByLabelText('question')).toHaveErrorMessage(/You must enter the following/i)
    expect(screen.getByLabelText('nickname')).toHaveErrorMessage(/You must enter the following/i)
    expect(screen.getByLabelText('email')).toHaveErrorMessage(/You must enter the following/i)
  });

  test('should allow users to add a new question to given product', () => {
    render(<QuestionModal isOpen={true} productInfo={dummyData.product_id} />);
    const question = screen.getByLabelText('Your Question');
    const nickname = screen.getByLabelText('What is your nickname');
    const email = screen.getByLabelText('Your email');
    const submit = screen.getByRole('button', { name: /Submit question/i });

    userEvent.type(question, 'Is this durable?');
    userEvent.type(nickname, 'BunnyBurn');
    userEvent.type(email, 'bunny@aol.com');
    userEvent.click(submit);

    expect(screen.getByText('Is this durable?')).toBeInTheDocument();
    expect(screen.getByText('BunnyBurn')).toBeInTheDocument();
    expect(screen.getByText('bunny@aol.com')).toBeInTheDocument();

    render(<QuestionList questions={dummyData.resultsA} productInfo={dummyData.product_id}/>);

    expect(screen.getByRole('feed')).toHaveTextContent('Is this durable?');
  });

  test('should allow users to add a new answer to given question', () => {
    render(<AnswerModal question={dummyData.resultsA[1]} isOpen={true} productInfo={dummyData.product_id} />);

    const questionId = 513739;
    const newAnswer = {
      id: questionId,
      body: 'Overstock',
      name: 'Seller',
      email: 'nushoes@shop.com',
      photos: [
        'https://ucarecdn.com/00977bf8-9eb4-4897-996c-063900c1b19b/',
        'https://ucarecdn.com/081cec79-a762-417b-afd8-a2c8fe30d15e/'
      ]
    };
    const onSuccess = 'Thank you for submitting your answer!';

    axios.post(questionId, newAnswer).mockResolvedValue(onSuccess);

    const answer = screen.getByLabelText('Your Answer');
    const nickname = screen.getByLabelText('What is your nickname');
    const email = screen.getByLabelText('Your email');
    const photo = screen.getByLabelText('Upload your photos');
    const submit = screen.getByRole('button', { name: /Submit answer/i });

    userEvent.type(answer, 'We have overstock');
    userEvent.type(nickname, 'Seller');
    userEvent.type(email, 'nushoes@shop.com');
    userEvent.click(photo);
    userEvent.click(submit);

    waitFor(() => {
      expect(screen.getByText('We have overstock')).toBeInTheDocument();
    });
    expect(httpRequest.addAnswer).toBeCalledTimes(1);
    expect(httpRequest.addAnswer).toBeCalledWith('/addAnswer', newAnswer, expect.stringContaining(onSuccess));
  });

  test('should display filtered questions when user types', () => {
    render(<QuestionList questions={dummyData.resultsA} productInfo={dummyData.product_id} />);
    userEvent.type(screen.getByRole('search'), 'fabric');

    expect(screen.getByRole('feed')).toHaveTextContent('fabric');
  });

  test('should fetched data from Q&A API', async () => {
    // setup
    axios.get.mockResolvedValue(dummyData.resultsA);
    // work
    return httpRequest.getQuestion(dummyData.product_id)
      .then((data) => {
        expect(data).toEqual(dummyData.resultsA);
        expect(axios.get).toBeCalledTimes(1);
        expect(axios.get).toBeCalledWith('/api/qa/questions', { params: { product_id: dummyData.product_id, count: 20 } });
      })
  });

  test('should display 2 questions to given product on initial render', async () => {
    // setup
    axios.get.mockResolvedValue(dummyData.resultsA);
    render(<QuestionList questions={dummyData.resultsA} productInfo={dummyData.product_id} />);
    render(<Questions currentProductId={dummyData.product_id} productInfo={dummyData.product_id} />);
    // work
    await waitFor(() => expect(screen.getByText('What fabric is the bottom made of?')).toBeInTheDocument());
    expect(screen.getAllByText(/Q:+/gi)).toHaveLength(2);
  });

  test('should display rest of questions upon clicking the button', () => {

    render(<QuestionList questions={dummyData.resultsA} productInfo={dummyData.product_id} />);

    const addQueston = screen.getByRole('button', { name: /MORE ANSWERED QUESTIONS/i });
    userEvent.click(addQueston);

    expect(screen.getAllByText(/Q:+/gi)).toHaveLength(4);
  });

});



