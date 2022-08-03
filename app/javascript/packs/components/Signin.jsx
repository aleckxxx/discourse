import React from "react";
import { authenticationService } from "../services/authentication.service";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {Link} from 'react-router-dom';


export default class Signin extends React.Component{

    constructor(props){
        super(props);
        if(authenticationService.currentUserValue){
            this.props.history.push("/");
        }
    }

    render(){
        const history = this.props.history;
        return (
        <div className="form-auth align-self-center shadow rounded">
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
            <Formik
                   initialValues={{
                       email: '',
                       password: ''
                   }}
                   validationSchema={Yup.object().shape({
                       email: Yup.string().required('Email is required'),
                       password: Yup.string().required('Password is required')
                   })}
                   onSubmit={({ username, password }, { setStatus, setSubmitting }) => {
                       setStatus();
                       authenticationService.login(username, password)
                                .then(
                                    (user) => {
                                    history.push("/");
                                    },
                                    error =>{
                                    setStatus(error);
                                    setSubmitting(false);
                                    }
                                )
                   }}
                   render={({ errors, status, touched, isSubmitting }) => (
                       <Form>
                            {status &&
                               <div className={'alert alert-danger'}>{status}</div>
                            }
                           <div className="form-group">
                               <label htmlFor="email" className="mt-2 mb-2">Email</label>
                               <Field name="email" type="text" className={'form-control' + (errors.username && touched.email ? ' is-invalid' : '')} />
                               <ErrorMessage name="email" component="div" className="invalid-feedback" />
                           </div>
                           <div className="form-group">
                               <label htmlFor="password" className="mt-2 mb-2">Password</label>
                               <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                               <ErrorMessage name="password" component="div" className="invalid-feedback" />
                           </div>
                           <div className="form-group mt-2 mb-2">
                               <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>{isSubmitting? <div className="spinner-border text-light"></div>:"Sign In"}</button>
                           </div>
                           
                       </Form>
                   )}
               />
            <p className="text-center">No account ? <Link to="/auth/register" className="text-primary">click here</Link></p>
        </div>)
    }
}

