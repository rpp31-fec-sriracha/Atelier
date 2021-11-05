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