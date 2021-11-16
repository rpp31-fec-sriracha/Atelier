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
import NewReview from '../client/src/components/Reviews/NewReview.jsx';
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
  describe('Single Review', () => {
    test('renders the name of the reviewer', () => {
      let sampleReview = sampleReviewData[0].results[0];

      render(<IndividualReviewTile currentReview={sampleReview}></IndividualReviewTile>);
      // screen.debug();
      screen.getByText(/shopaddict/);
      // screen.getByRole
    });
  });
});


describe('New Reviews', () => {
  describe('New Review text', () => {
    test('renders the product name at the top of a new review form', () => {

      let sampleCharacteristics = {"Fit":{"id":199854,"value":"3.4444444444444444"},"Length":{"id":199855,"value":"3.0000000000000000"},"Comfort":{"id":199856,"value":"3.4444444444444444"},"Quality":{"id":199857,"value":"3.7222222222222222"}};

      render(<NewReview productName={'Slacker\'s Slacks'} open={true}
        characteristics={sampleCharacteristics} productID={59556}></NewReview>);
      screen.debug();
      screen.getByText('About the Slacker\'s Slacks.');
      // screen.getByRole
    });
  });
});