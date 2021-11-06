import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, cleanup, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Questions from '../client/src/components/Questions/Questions.jsx';
import SearchQuestions from '../client/src/components/Questions/SearchQuestions.jsx';
import QuestionList from '../client/src/components/Questions/QuestionList.jsx';
import QuestionEntry from '../client/src/components/Questions/QuestionList.jsx';
import AnswerModal from '../client/src/components/Questions/AnswerModal.jsx';
import QuestionModal from '../client/src/components/Questions/QuestionModal.jsx';
import dummyData from './QA-dummydata.js'

afterEach(cleanup);

describe('Individual Question', () => {
  test('should display question body that is fetched data from API', () => {
    const { container, getByTestId } = render(<QuestionEntry />);
    expect(getByTestId('q-body')).toHaveTextContent('What fabric is the bottom made of?');
  });
  // test('a', () => {
  //   render(<QuestionEntry />);
  //   // expect();
  // });
  // test('b', () => {
  //   render(<AnswerEntry />);
  //   // expect();
  // });

});



describe.only('Search Question', () => {
  const placeholderText = 'HAVE A QUESTION? SEARCH FOR ANSWERS...';

  test(`should display input field for user to enter & placeholder reading text reading ${placeholderText}`, () => {
    const { getByRole } = render(<SearchQuestions />);
    expect(screen.getByRole('search')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(placeholderText)).toBeInTheDocument();
  });
});

describe('Questions', () => {
  test('should display add question button', () => {
    const { getByRole } = render(<Questions />);
    expect(screen.getByRole('add-quesiton')).toBeInTheDocument();
  });
  // test('should display Modal window upon clicking', () => {
  //   const { container, queryByRole } = render(<Questions />);
  //   expect(screen.queryByRole('q-modal')).toBeNull();
  // })
});

describe('Questions List', () => {

  test('should display the button, if there are more than 2 questions for the given product', () => {
    render(<QuestionList />);
    screen.debug();

  });

  test('should not display the button, if there are 2 or less questions for the given product', () => {
    // render(<QuestionList />);
    // screen.debug();

  });

  test('should display 2 questions on initial render', () => {
    // render(<QuestionList />);
    // screen.debug();
    // // userEvent.click(screen.getByText('MORE ANSWERED QUESTIONS'));
    // expect(await screen.findByRole('list')).toBeInTheDocument();
  });

  // test('should display an Answer Modal window upon clicking', () => {
  //   render(<AnswerModal />);
  //   expect();
  // });

});

