import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm/>)
});

test('renders the contact form header', ()=> {
    render(<ContactForm/>);
    const head = screen.queryByText('Contact Form');
    expect(head).toBeInTheDocument();
    expect(head).toHaveTextContent(/Contact Form/);
    expect(head).toBeTruthy();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm/>);
    const name = screen.getByLabelText(/First Name*/i);
    userEvent.type(name, '1234');
    const error = screen.queryByText(/error:/i);
    expect(error).toBeInTheDocument();
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm/>);
    const butt = screen.getByRole('button');
    userEvent.click(butt);
    const error1 = screen.queryByText(/error: firstName must have at least 5 characters./i);
    expect(error1).toBeInTheDocument();
    const error2 = screen.queryByText(/error: email must be a valid email address./i);
    expect(error2).toBeInTheDocument();
    const error3 = screen.queryByText(/error: lastName is a required field./i);
    expect(error3).toBeInTheDocument();

});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render (<ContactForm/>);
    const first = screen.getByLabelText(/First Name*/i);
    userEvent.type(first, "DrDeeds");
    const last = screen.getByLabelText(/Last Name*/i);
    userEvent.type(last, 'Dartagnan');
    const butt = screen.getByRole('button');
    userEvent.click(butt);
    const error3 = screen.queryByText(/error: email must be a valid email address./i);
    expect(error3).toBeInTheDocument();

});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render (<ContactForm/>);
    const email = screen.getByLabelText(/Email*/i);
    userEvent.type(email, 'bruh');
    const error3 = screen.queryByText(/error: email must be a valid email address./i);
    expect(error3).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render (<ContactForm/>);
    const butt = screen.getByRole('button');
    userEvent.click(butt);
    const error3 = screen.queryByText(/error: lastName is a required field./i);
    expect(error3).toBeInTheDocument();
    

});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render (<ContactForm/>);
    const first = screen.getByLabelText(/First Name*/i);
    userEvent.type(first, "DrDeeds");
    const last = screen.getByLabelText(/Last Name*/i);
    userEvent.type(last, 'Dartagnan');
    const email = screen.getByLabelText(/Email*/i);
    userEvent.type(email, 'bruh@bruh.com');
    const butt = screen.getByRole('button');
    userEvent.click(butt);
    const first1 = screen.queryByText(/DrDeeds/i);
    const email1 = screen.queryByText(/bruh@bruh.com/i);
    const last1 = screen.queryByText(/Dartagnan/i);
    expect(first1).toBeInTheDocument();
    expect(email1).toBeInTheDocument();
    expect(last1).toBeInTheDocument();
});

test('renders all fields text when all fields are submitted.', async () => {
    render (<ContactForm/>);
    const first = screen.getByLabelText(/First Name*/i);
    userEvent.type(first, "DrDeeds");
    const last = screen.getByLabelText(/Last Name*/i);
    userEvent.type(last, 'Dartagnan');
    const email = screen.getByLabelText(/Email*/i);
    userEvent.type(email, 'bruh@bruh.com');
    const msg = screen.getByLabelText(/Message*/i);
    userEvent.type(msg, 'bruh bruh bruh');
    const butt = screen.getByRole('button');
    userEvent.click(butt);
    const first1 = screen.queryByText(/DrDeeds/i);
    const email1 = screen.queryByText(/bruh@bruh.com/i);
    const last1 = screen.queryByText(/Dartagnan/i);
    const msg1 = screen.queryByText(/message:/i);
    expect(first1).toBeInTheDocument();
    expect(email1).toBeInTheDocument();
    expect(last1).toBeInTheDocument();
    expect(msg1).toBeInTheDocument();
});