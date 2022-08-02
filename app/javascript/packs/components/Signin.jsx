import React from "react";
import { authenticationService } from "../services/authentication.service";
export default class Signin extends React.Component{
    state = {
        error: null,
        isWaiting: false
    }
    authenticate(){
        this.setState({error:null,isWaiting: true});
        authenticationService.login().then(())
    }
    render(){
        return (
        <div className="form-auth shadow rounded">
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
            <div className="form-floating">
                <input type="email" className="form-control" placeholder="name@example.com"/>
                <label>Email address</label>
            </div>
            <div className="form-floating">
                <input type="password" className="form-control" placeholder="Password"/>
                <label>Password</label>
            </div>
            <button className="btn btn-primary">{this.state.isWaiting?"Sign In": <div className="spinner-border text-light"></div>}</button>
            
        </div>)
    }
}