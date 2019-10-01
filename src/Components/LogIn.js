import React from "react"
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Auth from "../Helpers/Auth"

function LogIn(props){
    
    function signUp(){
        props.history.push("/signup")
    }

    
    return(
        <div>
            <Formik
                initialValues={{
                    email: '',
                    password: ''
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string()
                        .email('Email is invalid')
                        .required('Email is required'),
                    password: Yup.string()
                        .required('Password is required')
                })}
                onSubmit={async fields => {
                    await Auth.login(fields);                  

                    /*Logic for authentication
                        //If token received, redirect to home, otherwise login.
                    */
                   if(Auth.isAuthenticated()){
                        props.history.push("/home")
                    }
                    else{
                        props.history.push("/login")
                    }
                }}
                render={({ errors, status, touched }) => (
                    <Form>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                            <ErrorMessage name="email" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                            <ErrorMessage name="password" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary" style={{"width":"100%"}}>Log In</button>
                        </div>
                        <div className="form-group">
                            <button onClick={signUp} className="btn btn-primary" style={{"width":"100%"}}>New User? Sign Up!</button>
                        </div>
                    </Form>
                )}
            />
        </div>
    )
    
}


export default LogIn