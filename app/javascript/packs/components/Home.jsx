import React from "react";
import { authenticationService } from "../services/authentication.service";
import { postservice } from "../services/post.service";
import PostItem from "./PostItem";
export default class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            posts:[]
        }
    }
    componentDidMount(){
        postservice.getPosts().then((posts)=>{
            this.setState({
                posts: posts
            })
        })
    }
    render(){
        return (
        <div class="container">
            <div class="btn-group mt-5" role="group" aria-label="Basic outlined example">
                <button type="button" class="btn btn-outline-primary active">Latest</button>
            </div>
            {authenticationService.currentUserValue && (
                <div class="d-flex mt-3 justify-content-end">
                    <Link class="btn btn-secondary">new post</Link>
                </div>
            )}
            <table class="table mt-5">
                <thead>
                    <tr>
                        <th>Topics</th>
                        <th>Activity</th>
                    </tr>
                </thead>
                <tbody class="text-secondary">
                    {this.state.posts.map((val)=> <PostItem post={val} />)}             
                </tbody>
            </table>
        </div>
        )
    }
}