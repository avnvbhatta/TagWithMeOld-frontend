import React from "react"
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from "axios"

function LogIn(){

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
                onSubmit={fields => {
                    axios.post('http://localhost:8848/user/login', fields)
                        .then((res) => {
                            console.log("RESPONSE RECEIVED: ", res);
                        })
                        .catch((err) => {
                            console.log("AXIOS ERROR: ", err);
                        })
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
                    </Form>
                )}
            />
        </div>
    )
    
}


export default LogIn