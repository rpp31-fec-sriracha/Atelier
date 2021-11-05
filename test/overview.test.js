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

const server = setupServer(
  rest.get('/productInfo', (req, res, ctx) => {
    return res(ctx.json(dummyData[0]));
  }),
  rest.get('/productStyles', (req, res, ctx) => {
    return res(ctx.json(dummyData[1]));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

it('should render with dummy data', () => {
  render(<Overview />);
  waitFor(() => findByText('Selected Style'))
    .then(() => expect(screen.findByTestId('productName')).toHaveTextContent('Slacker\'s Slacks'))
    .catch((err) => console.log(err));
});