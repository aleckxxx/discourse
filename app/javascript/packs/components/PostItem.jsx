import React from "react";
import moment from "moment";
export default class PostItem extends React.Component{

    constructor(props){
        super(props);
        let {post} = props;
        this.state = {
            title: post.title,
            body: post.body,
            published: moment(post.created_at).format("MMM Do YY") 
        }
    }
    render(){
        return (
            <tr class="border-bottom">
                <td>
                    <h3>{this.state.title}</h3>
                    <p>{this.state.body}</p>
                </td>
                <td>{this.state.published}</td>
            </tr>
        )
    }
}