import React from "react";
import {Link} from "react-router-dom";
export default class Header extends React.Component{
    
    render(){
        return <div className="d-flex justify-content-center shadow-sm w-100 clearfix">
            <div className="content d-flex justify-content-between w-75 p-3">
                <div className="title align-middle">
                    Ellitest
                </div>
                <div className="navigation">
                    <Link to="/auth"  className="btn btn-primary mr-2">Sign Up</Link>
                    <Link to="/auth" className="btn btn-primary mr-2">Log In</Link>
                </div>
            </div>
        </div>
    }
}