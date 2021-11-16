/**
 * @jest-environment jsdom
 */
import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { unmountComponentAtNode } from 'react-dom';
import Reviews from '../client/src/components/Reviews/Reviews.jsx';
import IndividualReviewTile from '../client/src/components/Reviews/IndividualReviewTile.jsx';
import sampleReviewData from './reviewsData.js';

const server = setupServer(
  rest.get('/reviews', (req, res, ctx) => {
    return res(ctx.json(sampleReviewData[0]));
  }),
  rest.get('/reviews/meta', (req, res, ctx) => {
    return res(ctx.json(sampleReviewData[1]));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

it('should render with sample data', () => {
  render(<Reviews />);
  waitFor(() => findByText('Keyword Search Bar'))
    .then(() => expect(screen.findByTestId('numReviews')).toHaveTextContent('3'))
    .catch((err) => console.log(err));
});

describe('Individual Reviews', () => {
  describe('renders an individual review', () => {
    let sampleReview = sampleReviewData[0].results[0];

    render(<IndividualReviewTile currentReview={sampleReview}></IndividualReviewTile>);
    // screen.debug();

    waitFor(() => findByText('Report'))
      .then(() => expect(screen.findByTestId('helpful-count')).toHaveTextContent('2'))
      .catch((err) => console.log(err));
  });
});