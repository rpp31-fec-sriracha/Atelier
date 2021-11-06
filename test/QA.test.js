import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Questions from '../client/src/components/Questions/Questions.jsx';
import SearchQuestions from '../client/src/components/Questions/SearchQuestions.jsx';
import QuestionList from '../client/src/components/Questions/QuestionList.jsx';
import QuestionEntry from '../client/src/components/Questions/QuestionList.jsx';
import AnswerModal from '../client/src/components/Questions/AnswerModal.jsx';
import QuestionModal from '../client/src/components/Questions/QuestionModal.jsx';

afterEach(cleanup);

describe('Search Question', () => {
  const placeholderText = 'HAVE A QUESTION? SEARCH FOR ANSWERS...';

  test(`should display input field for user to enter & placeholder reading text reading ${placeholderText}`, () => {
    const { getByRole } = render(<SearchQuestions />);
    expect(screen.getByRole('search')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(placeholderText)).toBeInTheDocument();
  });
});

test('should have Add an Question button, and display Modal window upon clicking', () => {
  render(<QuestionModal />);
  expect();
});

describe.only('Questions List', () => {

  test('should display 2 questions on initial render', async () => {
    render(<QuestionList />);
    screen.debug();
    // userEvent.click(screen.getByText('MORE ANSWERED QUESTIONS'));
    expect(await screen.findByRole('list')).toBeInTheDocument();
  });

  test('should display an Answer Modal window upon clicking', () => {
    render(<AnswerModal />);
    expect();
  });

});

describe('Individual Question', () => {
  test('a', () => {
    render(<QuestionEntry />);
    // expect();
  });
  test('b', () => {
    render(<AnswerEntry />);
    // expect();
  });
};
