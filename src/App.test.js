import { render, screen } from '@testing-library/react';
import App from './App';
import Home from './Components/Home';

test('renders learn react link', () => {
  render(<Home />);
  const linkElement = screen.getByText(/Copyright © 2023 - All rights reserved by Syren/i);
  expect(linkElement).toBeInTheDocument();
});
