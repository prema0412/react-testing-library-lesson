import Form from './Form';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

it("should render the form", () => {
    // 1. Arrange
    render(<Form />);

    //2. Act
    const form = screen.getByRole("form")

    //3. Assert
    expect(form).toBeInTheDocument();
})


it("should render the basic input fields", () => {
    // 1. Arrange
    render(<Form />);

    //2. Act
    // getBy.....
    //use i at the end for case insensitive search for getByRole
    const nameInput = screen.getByRole("textbox", { name: /name/i });
    // const emailInput = screen.getByRole("textbox", { name: /email/i })
    const emailInput = screen.getByPlaceholderText( /e.g. test@test.com/i  )
    //3. Assert

    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeTruthy();

    //getAllBy...

    const inputs = screen.getAllByRole("textbox");
    inputs.forEach(input => {
        expect(input).toBeInTheDocument();
        
    })
})  

    it("should not render error message on load", () => {

        render(<Form />)
        const errorMessage = screen.queryByText(/Sorry something went wrong/i)
        expect(errorMessage).toBeFalsy();
        expect(errorMessage).not.toBeInTheDocument();
    })

    it("should not render success message on load", () => {

        render(<Form />)
        const successMessage = screen.queryByText(/Thank you for submitting! We'll be in touch/i)
        expect(successMessage).toBeFalsy();
        expect(successMessage).not.toBeInTheDocument();
    })

   it("should not submit the form with invalid fields", () => {

        render(<Form />)
        const errorMessage = screen.queryByText(/Sorry something went wrong/i)
        const successMessage = screen.queryByText(/Thank you for submitting! We'll be in touch/i)
        const nameInput = screen.getByRole("textbox", { name: /name/i });
        userEvent.type(nameInput, "");

        const emailInput = screen.getByRole("textbox", { name: /email/i });
        userEvent.type(emailInput,"notvalidemail");

        const button = screen.getByRole("button", { name: /sign in/i });
        userEvent.click(button);

        //Assert
        expect(errorMessage).toBeTruthy;
        expect(successMessage).toBeFalsy;
        //expect the error text to be dislayed
   })

   it("should accept the form with valid fields", () => {

    render(<Form />)
    const successMessage = screen.queryByText(/Thank you for submitting! We'll be in touch/i)
    const errorMessage = screen.queryByText(/Sorry something went wrong/i)
    const nameInput = screen.getByRole("textbox", { name: /name/i });
    userEvent.type(nameInput, "Prema");

    const emailInput = screen.getByRole("textbox", { name: /email/i });
    userEvent.type(emailInput,"prema.chhaya@gmail.com");

    const button = screen.getByRole("button", { name: /sign in/i });
    userEvent.click(button);

    //Assert
    expect(successMessage).toBeTruthy;
    expect(errorMessage).toBeFalsy;
    //expect the success text to be dislayed
})

   