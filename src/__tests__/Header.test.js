import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Header from '../Components/Header';
import { BrowserRouter } from 'react-router-dom';

describe('Running Test for Header Component', () => {
    it.skip('Check Component Loaded', () => {
        render(
            <BrowserRouter><Header /></BrowserRouter>
        )
    });



    it('Check Component Content', () => {
        render(
        <BrowserRouter>
            <Header />
        </BrowserRouter>
        )
        const headerHeading = screen.queryAllByTestId('heading');
        expect(headerHeading).toBe("Issue Tracker")
    })
});