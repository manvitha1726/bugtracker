import { render, screen } from '@testing-library/react';
import App from '../../App';
import Home from '../Home';


describe('Rendering of components ', () => {

  test('renders learn react link', () => {
    render(<Home />);
    const linkElement = screen.getByText(/Explore Projects/i);
    expect(linkElement).toBeInTheDocument();
    });
  
});

describe('creating snapshorts of components ', () => {

  test('Home Component matches snapshot', () => {
      const { asFragment } = render(<Home />);
      expect(asFragment()).toMatchSnapshot();
    });

});
