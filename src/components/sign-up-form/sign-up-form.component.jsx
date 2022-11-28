

import { useState } from "react";
import {
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''

};

const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert('passwords dont match');
            return;
        }
        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, { displayName });

            resetFormFields();
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('Cannot create user, email already in use')
            } else {

            }
        }

        //confirm pass matches
        //if auth
        //create user documnet


    }


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
        console.log(formFields);
    };

    return (
        <div>
            <h1>Sign Up with email and password</h1>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label='Display Name'
                    name="displayName"
                    type="text"
                    required
                    value={displayName}
                    onChange={handleChange} />

                <FormInput
                    label='Email'
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={handleChange} />

                <FormInput
                    label='Password'
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={handleChange} />

                <FormInput
                    label='Confirm Password'
                    name="confirmPassword"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={handleChange} />

                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default SignUpForm;