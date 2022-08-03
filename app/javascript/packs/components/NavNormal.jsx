import React from "react";

import { authenticationService } from "../services/authentication.service";

export default class NavNormal extends React.Component{

    logOut(){
        authenticationService.logout();
        location.reload(true);
    }
    render(){
        return (
            <div className="navigation">
                <span className="">Hello {authenticationService.currentUserValue.username}!</span>
                <span>Profile</span>
                <span>Log Out</span>
            </div>
        )
            
    }
}
