/**
 * @jest-environment jsdom
 */
// import dependencies
import React from 'react';
// import API mocking utilities from Mock Service Worker
// import {rest} from 'msw';
// import {setupServer} from 'msw/node';

// import react-testing methods
import {render, fireEvent, waitFor, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import { unmountComponentAtNode } from 'react-dom';
import ProductInfoBottom from '../client/src/components/Overview/ProductInfoBottom.jsx';
// import dummyData from './overviewData.js';

it('should render the slogan, description and feature list in ProductInfoBottom', () => {
  let slogan = 'slogan';
  let description = 'description';
  let featureList = [
    { feature: 'feature1',
      value: 'is working' },
    { feature: 'feature2',
      value: 'is also working' }
  ];
  const {container, getByText} = render(<ProductInfoBottom slogan={slogan} description={description} features={featureList} />);
  expect(getByText('slogan')).toBeInTheDocument();
  expect(getByText('description')).toBeInTheDocument();
  expect(getByText('is working')).toBeInTheDocument();
  expect(getByText('is also working')).toBeInTheDocument();

});

it('should render without any features if there are no features', () => {
  let slogan = 'slogan';
  let description = 'description';
  const {container, queryByText} = render(<ProductInfoBottom slogan={slogan} description={description} features={null} />);
  expect(queryByText('is working')).toBeNull();
});