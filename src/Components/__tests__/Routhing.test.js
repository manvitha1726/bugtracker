import React from 'react';
import { render, fireEvent, getAllByText, getAllByTestId, getByTestId } from '@testing-library/react';
import { Router } from 'react-router-dom';
import Home from '../Home';
import ProjectScreen from '../ProjectScreen';
 
describe('Navigating components', () => {
test('Navigation to page', () => {
    render(<Home/>);
  
    // const link = document.getElementById('projects-route-id');
  
    expect(window.location.href).toBe("http://localhost/")
    // fireEvent.click(link);

    // expect(window.location.href).toBe("http://localhost/projects");

    // expect(history.location.pathname).toBe('/projects');

    // // expect(history.location.pathname).toBe('/');
    // fireEvent.click(getByText('Explore Projects'));
    // expect(history.location.pathname).toBe('/projects')
  }); 
});
