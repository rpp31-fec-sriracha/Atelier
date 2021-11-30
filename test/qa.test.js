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

import Questions from '../client/src/components/Questions/Questions.jsx';
import SearchQuestions from '../client/src/components/Questions/SearchQuestions.jsx';
import QuestionList from '../client/src/components/Questions/QuestionList.jsx';
import QuestionEntry from '../client/src/components/Questions/QuestionList.jsx';
import AnswerEntry from '../client/src/components/Questions/AnswerEntry.jsx';

import AnswerModal from '../client/src/components/Questions/AnswerModal.jsx';
import ImageModal from '../client/src/components/Questions/ImageModal.jsx';
import QuestionModal from '../client/src/components/Questions/QuestionModal.jsx';


xdescribe('Unit Tests', () => {

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



jest.mock('axios');
describe('Integration Tests', () => {

  xtest('should open a modal when user clicks add answer button', async () => {
    render(<QuestionList questions={dummyData.resultsC} />)
    const addA = screen.getAllByRole('button', { name: /Add Answer/i });
    userEvent.click(addA[0])

    expect(await screen.findByText('Submit your Answer')).toBeInTheDocument();
  });

  xtest('should open a modal when user clicks add question button', async () => {
    render(<QuestionList questions={dummyData.resultsA} productInfo={dummyData.product_id} />)
    const addQ = screen.getByRole('button', { name: /ADD A QUESTION +/i });
    userEvent.click(addQ)

    expect(await screen.findByText('Ask Your Question')).toBeInTheDocument();
  });

  xtest('should hide a button when user loads up all the questions', async () => {
    render(<QuestionList questions={dummyData.resultsA} productInfo={dummyData.product_id} />)

    const moreQ = screen.getByRole('button', { name: /MORE ANSWERED QUESTIONS/i });
    for (let i = 0; i < dummyData.resultsA.length; i++) {ß
      userEvent.click(moreQ)
    }
    expect(await moreQ).not.toBeInTheDocument();
  });

  xtest('should display a warning message when requirements have not been met in Question Modal', async () => {
    render(<QuestionModal isOpen={true} productInfo={dummyData.product_name} />)

    const submit = screen.getByRole('button', { name: /Submit question/i });
    userEvent.click(submit)

    expect(await screen.findByText(/You must enter the following/i)).toBeVisible();
  });

  xtest('should display a warning message when requirements have not been met in Answer Modal', async () => {
    render(<AnswerModal question={dummyData.resultsD} isOpen={true} productInfo={dummyData.product_name} />)

    const submit = screen.getByRole('button', { name: /Submit answer/i });
    userEvent.click(submit)

    expect(await screen.findByText(/You must enter the following/i)).toBeVisible()
  });

  test('should allow users to add a new question to given product', async () => {
    const handleAdd = jest.fn();
    const close = jest.fn();
    render(<QuestionModal isOpen={true} productInfo={dummyData.product_name} handleAddQuestion={handleAdd} closeModal={close}/>);

    const question = screen.getByLabelText(/Your Question/);
    const nickname = screen.getByLabelText(/What is your nickname/);
    const email = screen.getByLabelText(/Your email/);
    const submit = screen.getByRole('button', { name: /Submit question/i });

    userEvent.type(question, 'Is this durable?');
    userEvent.type(nickname, 'BunnyBurn');
    userEvent.type(email, 'bunny@aol.com');


    const q = {
      question: question.value,
      nickname: nickname.value,
      email: email.value
    }
    const onSuccess = 'Thank you for submitting your question!';

    userEvent.click(submit);
    axios.request.mockResolvedValueOnce(onSuccess)

    httpRequest.addQuestion(dummyData.product_id, q)
      .then((result) => {
        expect(result).toEqual(onSuccess);
        expect(axios.request).toBeCalledTimes(1);
        expect(axios.request).toBeCalledWith(
          {
            method: 'post',
            url: '/addQuestion',
            data: {
              body: q.question,
              name: q.nickname,
              email: q.email,
              product_id: Number(dummyData.product_id)
            }
          })
      })
      .catch(err => console.log(err))
    expect(await question).toHaveDisplayValue('Is this durable?')
    expect(await nickname).toHaveDisplayValue('BunnyBurn')
    expect(await email).toHaveDisplayValue('bunny@aol.com')
  });

  xtest('should allow users to add a new answer to given question', () => {
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

  xtest('should display filtered questions when user types', () => {
    render(<QuestionList questions={dummyData.resultsA} productInfo={dummyData.product_id} />);

    const search = screen.getByPlaceholderText('HAVE A QUESTION? SEARCH FOR ANSWERS...')
    userEvent.type(search, 'fabric');

    expect(screen.getAllByTestId('Q-body')).toHaveLength(1);
  });

  xtest('should not display non-existing filtered questions when user types', () => {
    render(<QuestionList questions={dummyData.resultsA} productInfo={dummyData.product_id} />);

    const search = screen.getByPlaceholderText('HAVE A QUESTION? SEARCH FOR ANSWERS...')
    userEvent.type(search, 'non existing word');

    expect(screen.queryAllByTestId('found')).toHaveLength(0);
  });

  xtest('should fetched data from Q&A API', async () => {
    // setup
    axios.get.mockResolvedValue(dummyData.resultsA);
    // work
    httpRequest.getQuestion(dummyData.product_id)
      .then((data) => {
        expect(data).toEqual(dummyData.resultsA);
        expect(axios.get).toBeCalledTimes(1);
        expect(axios.get).toBeCalledWith('/api/qa/questions', { params: { product_id: dummyData.product_id, count: 20 } });
      })
  });


  xtest('should display 2 more questions upon clicking the button', () => {

    render(<QuestionList questions={dummyData.resultsA} productInfo={dummyData.product_id} />);

    const addQueston = screen.getByRole('button', { name: /MORE ANSWERED QUESTIONS/i });
    userEvent.click(addQueston);

    expect(screen.getAllByText(/Q:+/gi)).toHaveLength(4);
  });

});



