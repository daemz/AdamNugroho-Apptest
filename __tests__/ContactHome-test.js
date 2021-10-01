// __tests__/Intro-test.js
import React from 'react';
import renderer from 'react-test-renderer';
import ContactHome from '../src/Screens/Contacts';

// test('renders correctly', () => {
//   const tree = renderer.create(<ContactHome />).toJSON();
//   expect(tree).toMatchSnapshot();
// });

it('renders correctly', () => {
  renderer.create(<ContactHome />);
});