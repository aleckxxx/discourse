import { handleResponse } from "../helpers/handleResponse";

function getPosts(){
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };

    return fetch('/api/v1/posts',requestOptions).then(handleResponse).then((data)=>{
        return data;
    })
}
export const postservice = {
    getPosts
}
    
