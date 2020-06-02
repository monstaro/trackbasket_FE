import React from 'react';
import CompletedModal from '../screens/CompletedModal';
import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(<CompletedModal />).toJSON();
  expect(tree).toMatchSnapshot();
});
