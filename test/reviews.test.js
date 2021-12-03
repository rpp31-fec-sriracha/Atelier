/**
 * @jest-environment jsdom
 */
import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';

import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { unmountComponentAtNode } from 'react-dom';
import Reviews from '../client/src/components/Reviews/Reviews.jsx';
import IndividualReviewTile from '../client/src/components/Reviews/IndividualReviewTile.jsx';
import NewReview from '../client/src/components/Reviews/NewReview.jsx';
import RatingBreakdown from '../client/src/components/Reviews/NewReview.jsx';
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

describe('Individual review tile test', () => {
  test('renders the name of the reviewer', () => {
    let sampleReview = sampleReviewData[0].results[0];

    render(<IndividualReviewTile currentReview={sampleReview}></IndividualReviewTile>);
    screen.getByText(/shopaddict/);
  });
});

describe('New Reviews tests', () => {
  test('renders the product name at the top of a new review form', () => {
    let sampleCharacteristics = {'Fit': {'id': 199854, 'value': '3.4444444444444444'}, 'Length': {'id': 199855, 'value': '3.0000000000000000'}, 'Comfort': {'id': 199856, 'value': '3.4444444444444444'}, 'Quality': {'id': 199857, 'value': '3.7222222222222222'}};

    render(<NewReview productName={'Slacker\'s Slacks'} open={true}
      characteristics={sampleCharacteristics} productID={59556}></NewReview>);
    screen.getByText('About the Slacker\'s Slacks.');
  });

  test('tests the validation message when the form is not filled out', () => {
    let sampleCharacteristics = {'Fit': {'id': 199854, 'value': '3.4444444444444444'}, 'Length': {'id': 199855, 'value': '3.0000000000000000'}, 'Comfort': {'id': 199856, 'value': '3.4444444444444444'}, 'Quality': {'id': 199857, 'value': '3.7222222222222222'}};
    window.alert = jest.fn();
    render(<NewReview productName={'Slacker\'s Slacks'} open={true}
      characteristics={sampleCharacteristics} productID={59556}></NewReview>);

    const selectCharacteristic = screen.getByRole('button', { name: /Submit review/ });
    userEvent.click(selectCharacteristic);

    expect(window.alert).toBeCalledWith('Please ensure that the following fields are completed correctly: Rating, Recommendation, Characteristics, Summary, Review body, Nickname, Email');
  });
});

// describe('Rating Breakdown tests', () => {
//   test('Tests that the correct characteristic descriptors are rendered', () => {
//     let sampleMetadata = {'product_id': '59556', 'ratings': {'1': '2', '2': '4', '3': '7', '4': '4', '5': '10'}, 'recommended': {'false': '5', 'true': '22'}, 'characteristics': {'Fit': {'id': 199854, 'value': '3.7000000000000000'}, 'Length': {'id': 199855, 'value': '3.1000000000000000'}, 'Comfort': {'id': 199856, 'value': '3.6666666666666667'}, 'Quality': {'id': 199857, 'value': '3.7666666666666667'}}};

//     render(<RatingBreakdown metadata={sampleMetadata} setAverageReview={() => console.log('test')}
//       averageStars={3.6} filteredReviews={sampleReviewData[0].results}
//       reviews={sampleReviewData[0].results} updateFilteredReviews={() => console.log('test2')}
//       currentFilters={[]} setCurrentFilters={() => console.log('test3')}/>);

//     screen.debug();

//     // render(<RatingBreakdown metadata={sampleMetadata} setAverageReview={this.props.setAverageReview}
//     //   averageStars={3.6} filteredReviews={sampleReviewData[0].results}
//     //   reviews={sampleReviewData[0].results} updateFilteredReviews={this.updateFilteredReviews}
//     //   currentFilters={[]} setCurrentFilters={this.setCurrentFilters}/>);
//   });
// });