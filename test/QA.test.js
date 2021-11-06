import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import Questions from '../client/src/components/Questions/Questions.jsx';
import SearchQuestions from '../client/src/components/Questions/SearchQuestions.jsx';
import QuestionList from '../client/src/components/Questions/QuestionList.jsx';
import AnswerModal from '../client/src/components/Questions/AnswerModal.jsx';
import QuestionModal from '../client/src/components/Questions/QuestionModal.jsx';

describe.only('Search Question', () => {
  const placeholderText = 'HAVE A QUESTION? SEARCH FOR ANSWERS...';

  test(`should display input field for user to enter & placeholder reading text reading ${placeholderText}`, () => {
    const { getByRole } = render(<SearchQuestions />);
    expect(screen.getByRole('search')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(placeholderText)).toBeInTheDocument();
  });
});

describe('Questions List', () => {
  test('Add an Answer Modal', () => {
    render(<SearchQuestions />);
    expect();
  });
  test('Individual Question', () => {
    render(<SearchQuestions />);
    expect();
  });
  test('More Answered Questions', () => {
    render(<SearchQuestions />);
    expect();
  });
});
