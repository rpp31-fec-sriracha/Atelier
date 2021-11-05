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
  waitFor(() => expect(screen.findAllByRole('heading', {level: 3}).filter((h) => h === 'Slacker\'s Slacks'))[0].toHaveTextContent('Slacker\'s Slacks'))
  // waitFor(() => screen.findAllByRole('heading', {level: 3}))
    .then((m) => {
      // expect(screen.findAllByRole('heading', {level: 3}).some((h) => h === 'Slacker\'s Slacks').toBeTrue());
      console.log(m);
    })
    .catch((err) => console.log(err));
});