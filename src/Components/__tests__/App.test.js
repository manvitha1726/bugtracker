import { render, screen,fireEvent } from '@testing-library/react';
import App from '../../App';
import Home from '../Home';
import IssueForm from '../IssueForm';
import IssueStatusBar from '../IssueStatusBar';


describe('Rendering of components ', () => {

  test('renders learn react link', () => {
    render(<Home />);
    const linkElement = screen.getByText(/Explore Projects/i);
    expect(linkElement).toBeInTheDocument();
    });

  // test('should handle button click event', () => {
  //   render(<IssueStatusBar />);
    
  //   const button = screen.getBytext('Add Issue');
  //   fireEvent.click(button);
      
  //   expect(/*Issue Name*/).toBeInTheDocument();
  //   });
  
});

describe('creating snapshorts of components ', () => {

  test('Home Component matches snapshot', () => {
      const { asFragment } = render(<Home />);
      expect(asFragment()).toMatchSnapshot();
    });

});
