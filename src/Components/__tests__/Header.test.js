import {render,fireEvent,screen} from '@testing-library/react'
import Header from '../Header'
import { BrowserRouter } from 'react-router-dom';


describe('Header component', () => {

    it('should render the header text', () => {
      const { getByText } = render(<BrowserRouter><Header /></BrowserRouter>);
      
      const headerElement = getByText(/Issue Tracking Tool/i);
      expect(headerElement).toBeInTheDocument();
    });

    it('should be placed at the top of the page', () => {
        render(<BrowserRouter><Header /></BrowserRouter>);
    
        const header = screen.getByTestId('header-element');
    
        // Get the top position of the header element
        const { top } = header.getBoundingClientRect();
    
        // Assert that the header is placed at the top of the page
        expect(top).toBe(0);
      });

    it("checking Header Background color", () => {
      const { getByText } = render(<BrowserRouter><Header /></BrowserRouter>);
      expect(getByText(/Issue Tracking Tool/i).parentElement).toHaveStyle(`backgroundColor: 'white'`);
      })

  });
