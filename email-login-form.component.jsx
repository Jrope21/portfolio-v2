import React, { useState, useCallback } from 'react';
import './email-login-form.styles.scss';

import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import TextInput from '../../../commons/form-inputs/text-input/text-input.component';
import CustomButton from '../../../commons/custom-button/custom-button.component';
import useInputCollection from '../../../../js/custom-hooks/useInputCollection';
import { validateEmailSyntax } from '../../../../js/helpers/_validate-email-syntax';
import { userEmailExist } from '../../../../js/api/_user-email-exist';
import { UserActionTypes } from '../../../../redux/user/user.types';


const INITIAL_STATE = {
    email: ''
}

function EmailLoginForm() {

    let history = useHistory();
    const dispatch = useDispatch();

    const { state, updateInput } = useInputCollection(INITIAL_STATE);

    const [errorMessage, setErrorMessage] = useState(null)
    const [submitting, setSubmitting] = useState(false)

    const continueToCreateAccount = () => {
        history.push('create-account');    
    }

    const addVerifiedEmail = useCallback(
        (email) => dispatch({ type: UserActionTypes.VERIFIED_EMAIL, payload: email})
        ,[dispatch]
    )

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        let submissionEmail = state.email;

        const validEmailSyntax = validateEmailSyntax(submissionEmail)
        if(!validEmailSyntax) {
            setSubmitting(false);
            return setErrorMessage('Email must be in a valid format')
        }
      
        const emailExists = await userEmailExist(submissionEmail);

        if(emailExists) {
            addVerifiedEmail(submissionEmail);
            history.push('user-login');
        } else {
            setSubmitting(false);
            setErrorMessage("That email doesn't exist");
        }    
    }

    return (
        <div className="email-login-form module-spacer">
            {errorMessage && <p className="text error">* {errorMessage}</p>}
            <div className="form-container background action-item">            
                <h2>Sign In</h2>
                <TextInput 
                    placeholder={''} 
                    label={'Email'}
                    type={'email'}
                    name={'email'}
                    onChange={updateInput}
                    value={state.email}
                />
                <CustomButton 
                    onClick={handleSubmit}
                    type={'submit'}
                    loading={submitting}
                >
                    Continue
                </CustomButton>
                <p>By creating an account, you agree to BluPeak's Conditions of Use and Privacy Notice.</p>          
            </div>
            <div className="create-account-cta background action-item">
                <p className="headline background action-item">New to BluPeak?</p>
                <CustomButton 
                    onClick={continueToCreateAccount}
                    className="w-100"
                    altColors={true}
                >
                    Create your BluPeak Account
                </CustomButton>
            </div>
            <p className="contact">Need help? Call support at <a>+1 972-661-8881</a></p>
        </div>
    )
}

export default EmailLoginForm;