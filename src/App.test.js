import { render, screen } from '@testing-library/react';
import App from './App';
import Home from './Components/Home';
import Footer from './Components/Footer';


describe('Rendering of components ', () => {

  test('renders learn react link', () => {
    render(<Home />);
    const linkElement = screen.getByText(/Explore Projects/i);
    expect(linkElement).toBeInTheDocument();
    });
  
});
