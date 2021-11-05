/**
 * @jest-environment jsdom
 */
import React from 'react';
import {render} from '@testing-library/react';
import '@testing-library/jest-dom';
import { unmountComponentAtNode } from 'react-dom';
import ProductInfoBottom from '../client/src/components/Overview/ProductInfoBottom.jsx';

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