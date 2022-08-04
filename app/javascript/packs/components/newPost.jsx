import Modal from 'react-modal';
import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import  {postService} from '../services/post.service';
import history from '../helpers/history';

class NewPost extends React.Component{

    constructor(props){
        super(props);
        this.state ={
            show: this.props.show
        }
    }
    handleClose(e) {
        this.setState({show: false});
    }
    handleOpen(e){
        e.preventDefault();
        this.setState({show: true});
    }
    render(){
        return (
            <span>
              <div className="d-flex mt-3 justify-content-end">
                   <button className="btn btn-secondary" onClick={this.handleOpen.bind(this)}>new post</button>
              </div>
              <Modal isOpen={this.state.show}
                ariaHideApp={false}
                className="modal-dialog modal-post modal-lg"
               onRequestClose={this.handleClose.bind(this)}
              >
                        <div className="modal-content">
                            <div className="modal-header">
                            <button onClick={this.handleClose.bind(this)} className="close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            </div>
                            <div className="modal-body">
                                <h1 className="h3 fw-normal">Write a new post!</h1>
                                <p className="mb-3">You can express herself today. Ask a question.</p>
                                <Formik
                                    initialValues={{
                                        title: '',
                                        body: ''
                                    }}
                                    validationSchema={Yup.object().shape({
                                        title: Yup.string().required('Title is required'),
                                        body: Yup.string().required('Body is required')
                                    })}
                                    onSubmit={(body, { setStatus, setSubmitting }) => {
                                        setStatus();
                                        postService.createPost(body).then(data=>{
                                            history.push("/profile");
                                        },
                                        error=>{
                                            setStatus(error.message);
                                            setErrors(error);
                                            setSubmitting(false);
                                        })
                                    }}
                                    render={({ errors, status, touched, isSubmitting }) => (
                                        <Form>
                                                {status &&
                                                <div className={'alert alert-danger'}>{status}</div>
                                                }
                                            <div className="form-group">
                                                <label htmlFor="title" className="mt-2 mb-2">Title :</label>
                                                <Field name="title" type="text" className={'form-control' + (errors.title && touched.title ? ' is-invalid' : '')} />
                                                <ErrorMessage name="title" component="div" className="invalid-feedback" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="body" className="mt-1 mb-2">Body :</label>
                                                <Field name="body" as="textarea"  className={'form-post-body form-control' + (errors.body && touched.body ? ' is-invalid' : '')} />
                                                <ErrorMessage name="body" component="div" className="invalid-feedback" />
                                            </div>
                                            <div className="d-flex w-100 flex-row-reverse form-group mt-2 mb-2">
                                                <button type="submit" className="btn btn-primary " disabled={isSubmitting}>{isSubmitting? <div className="spinner-border text-light"></div>:"Publish"}</button>
                                            </div>
                                            
                                        </Form>
                                    )}
                                />
                            </div>
                        </div>
              </Modal>
            </span>
            
        )
    }
}

export default NewPost;