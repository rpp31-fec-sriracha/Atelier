/**
 * @jest-environment jsdom
 */
import React from 'react';
import {rest} from 'msw';
import {setupServer} from 'msw/node';
import {render, fireEvent, waitFor, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import { unmountComponentAtNode } from 'react-dom';
import Overview from '../client/src/components/Overview/Overview.jsx';
import dummyData from './overviewData.js';
import ImageGallery from '../client/src/components/Overview/ImageGallery.jsx';

jest.mock('../client/src/components/Overview/ImageGallery.jsx', () => {
  return function DummyGallery(props) {
    return (<div><p>Image Gallery</p></div>);
  };
});

jest.mock('../client/src/components/Overview/AddToCart.jsx', () => {
  return function DummyGallery(props) {
    return (<div><p>Add To Cart</p></div>);
  };
});

jest.mock('../client/src/components/Overview/ProductInfo.jsx', () => {
  return function DummyGallery(props) {
    return (<div><p>Add To Cart</p></div>);
  };
});

const server = setupServer(
  rest.get('/api/products', (req, res, ctx) => {
    return res(ctx.json(dummyData[0]));
  }),
  rest.get('/api/products', (req, res, ctx) => {
    return res(ctx.json(dummyData[1]));
  }),
  rest.get('/api/cart', (req, res, ctx) => {
    return res(ctx.json([]));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

it('should render with dummy data', () => {
  render(<Overview productInfo={dummyData[0]} productStyles={dummyData[1]} averageReview={3.25} currentProductId={59558} numReviews={21} />);
  waitFor(() => expect(queryByText('Pumped Up Kicks')).toBe(true))
    .then(() => expect(screen.findByTestId('productName')).toHaveTextContent('Slacker\'s Slacks'))
    .catch((err) => console.log(err));
});