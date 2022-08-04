import React from "react";
import { authenticationService } from "../services/authentication.service";
import { postService } from "../services/post.service";
import { withRouter } from "../utils/hook-util";
import moment from "moment";
import ReplyForm from "./ReplyForm";
import ReplyItem from "./ReplyItem";
import PostDelete from "./PostDelete";
import UpdatePost from "./UpdatePost";

class PostDetail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            post: null,
            creator: null,
            replies: null,
            date: null
        };
        this.add = this.add.bind(this);
        this.isOwner = this.add.bind(this);
    }
    componentDidMount(){
        postService.findById(this.props.params.id).then((data)=>{
            this.setState({post: data,creator: data.creator, date: moment(data.published_at).fromNow(),replies: data.replies})
        })
    }
    add(reply){
        let replies = this.state.replies;
        replies.push(reply);
        this.setState({...this.state,replies: replies});
    }
    isOwner(){
        return (authenticationService.currentUserValue && (authenticationService.currentUserValue.id == this.state.post.creator_id))
    }
    render(){
        return  (
            <div className="container">
                {this.state.post && (
                <div>
                    {this.isOwner && (
                        <div className="d-flex flex-row-reverse mt-3">
                            <PostDelete post={this.state.post} />
                            <UpdatePost post={this.state.post} />
                        </div>
                    )}
                    <div className="post-summary border-bottom mt-5">
                        <h3 className="mb-3">{this.state.post.title}</h3>
                    </div>
                    <div className="border-bottom article-item mt-3">
                        <div className="d-flex justify-content-between">
                            <div className="d-flex flex-row align-items-center">
                                <div className="icon"> <i className="fa-solid fa-user"></i> </div>
                                <div className="ms-2 ml-2 c-details">
                                    <h6 className="mb-0">{this.state.creator.name}</h6> <span>{this.state.creator.username}</span>
                                </div>
                            </div>
                            <div className="text-secondary">
                                {this.state.date}
                            </div>     
                        </div>
                        <div className="article-body mt-3 mb-5">
                            {this.state.post.body}
                        </div>
                    </div>
                    {this.state.post.replies.map((reply)=> <ReplyItem reply={reply} />)}
                    <ReplyForm handleClick={this.add} id={this.state.post.id} />
                </div>
                )}
                
            </div>
        )
    }
}

export default withRouter(PostDetail);