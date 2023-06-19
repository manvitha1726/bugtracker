import {render,fireEvent,screen} from '@testing-library/react'
import Header from '../Header'


describe('Header component', () => {
    it('should render the header text', () => {
      const { getByText } = render(<Header />);
      
      const headerElement = getByText(/Issue Tracking Tool/i);
      expect(headerElement).toBeInTheDocument();
    });
  });