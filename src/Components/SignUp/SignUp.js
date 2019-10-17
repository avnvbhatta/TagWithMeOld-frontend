import React from "react"
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from "axios"
import "Components/SignUp/styles.signup.scss"

function SignUp(props){
        return(
            <div className="signup-container">
                <div className="login-logo">
                    <img src="logo192.png" alt="app-logo"/>
                </div>
                <div className="signup-form">
                    <Formik
                        initialValues={{
                            first_name: '',
                            last_name: '',
                            email: '',
                            password1: '',
                            password2: ''
                        }}
                        validationSchema={Yup.object().shape({
                            first_name: Yup.string()
                                .required('First Name is required'),
                            last_name: Yup.string()
                                .required('Last Name is required'),
                            email: Yup.string()
                                .email('Email is invalid')
                                .required('Email is required'),
                            password1: Yup.string()
                                .required('Password is required'),
                            password2:  Yup.string()
                                .oneOf([Yup.ref('password1'), null], 'Passwords must match')
                                .required('Confirm Password is required')
                        })}
                        onSubmit={fields => {
                            axios.post('http://localhost:8848/user/register', fields)
                                .then((res) => {
                                    console.log("RESPONSE RECEIVED: ", res);
                                    props.history.push("/confirm")
                                })
                                .catch((err) => {
                                    console.log("AXIOS ERROR: ", err);
                                })
                        }}
                        render={({ errors, status, touched }) => (
                            <Form>
                                <div className="form-group">
                                    <Field name="first_name" type="text" placeholder="First Name" className={'form-control' + (errors.first_name && touched.first_name ? ' is-invalid' : '')} />
                                    <ErrorMessage name="first_name" component="div" className="invalid-feedback" />
                                </div>
                                <div className="form-group">
                                    <Field name="last_name" type="text" placeholder="Last Name"  className={'form-control' + (errors.last_name && touched.last_name ? ' is-invalid' : '')} />
                                    <ErrorMessage name="last_name" component="div" className="invalid-feedback" />
                                </div>
                                <div className="form-group">
                                    <Field name="email" type="text" placeholder="Email" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                    <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                </div>
                                <div className="form-group">
                                    <Field name="password1" type="password" placeholder="Password" className={'form-control' + (errors.password1 && touched.password1 ? ' is-invalid' : '')} />
                                    <ErrorMessage name="password1" component="div" className="invalid-feedback" />
                                </div>
                                <div className="form-group">
                                    <Field name="password2" type="password" placeholder="Confirm Password"  className={'form-control' + (errors.password2 && touched.password2 ? ' is-invalid' : '')} />
                                    <ErrorMessage name="password2" component="div" className="invalid-feedback" />
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary" style={{"width":"100%"}} >Sign Up</button>
                                </div>
                            </Form>
                        )}
                    />
                </div>
            </div>
            
        )
}

export default SignUp