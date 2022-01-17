import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react'
const axios = require('axios');

const Comment = ({comment}) => {
    return (
        <div className="comment">
            <span className="name">{comment.name}</span>
            <span>{comment.body}</span>
            <span className="email">{comment.email}</span>
        </div>
    );
};

const AddComment = ({addComment}) => {
    return (
        <button className="add-component-btn"
                onClick={() => {addComment({email: "peri91d@gmail.com", body: "lorem lorem", name: "Alex New Comment"})}}>
            Add comment
        </button>
    );
};


const App = () => {
    const [comments, setCommentsData] = useState([]);
    let startCount = 0

    const fetchComments = async () => {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/comments?_start=${startCount}&_end=${startCount + 20}`);
        setCommentsData(old => [...old, ...response.data]);
    }

    const addComment = ({email, body, name}) => {
        setCommentsData(old => [...[{email,body,name}],...old]);
        // i would be expect to add the comment in case of getting results and not errors;

        axios.post(`test.steps.me/test/testAssignComment`, {
            params: {
                email,
                body,
                name
            }
        })
            .then(response => response.status)
            .catch(err => console.warn(err));
    }

    useEffect(() => {
        fetchComments()
        window.addEventListener("scroll", loadMoreComments);
    }, []);

    const loadMoreComments = () => {
        if (window.innerHeight + document.documentElement.scrollTop === document.scrollingElement.scrollHeight) {
            startCount = startCount + 20;
            fetchComments();
        }
    }

    return (
        <div className="app">
            <AddComment addComment={addComment}/>
            <div className="comment-list">
                {comments.map((comment, index) => (
                    <Comment
                        key={index}
                        index={index}
                        comment={comment}
                    />
                ))}
            </div>
        </div>
    );
}

export default App;
