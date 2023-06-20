import { render, screen } from '@testing-library/react';

import Footer from '../Footer';


describe('Rendering of components ', () => {

  test('renders learn react link', () => {
    render(<Footer />);
    const linkElement = screen.getByText(/Copyright © 2023 - All rights reserved by Syren/i);
    expect(linkElement).toBeInTheDocument();
    });
    
    it('should be placed at the bottom of the page', () => {
      render(<Footer />);
  
      const footer = screen.getByTestId('footer');
  
      const { bottom } = footer.getBoundingClientRect();
  
      expect(bottom).toBe(0);
    });
  
});