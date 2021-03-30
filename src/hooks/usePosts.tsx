import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import Noty from 'noty';

interface PostProps {
    userId: number;
    id: number;
    title: string;
    body: string;
}

interface CommentProps {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
}

interface PostsProviderProps {
    children: ReactNode;
}

interface PostContextData {
    posts: PostProps[];
    comments: CommentProps[];
    createPost: (post: PostInput) => Promise<void>;
    editPost: (post: PostInput, id: number) => Promise<void>;
    deletePost: (id: number) => Promise<void>;
    createComment: (comment: CommentInput) => Promise<void>;
}

type PostInput = Omit<PostProps, 'id' | 'userId'>;
type CommentInput = Omit<CommentProps, 'id' | 'userId'>;

const PostsContext = createContext<PostContextData>(
    {} as PostContextData
);

const Notify = (text: string, type: Noty.Type) => {
    new Noty({
        text,
        type,
        timeout: 4000,
        progressBar: true
    }).show();
}

export function PostsProvider({ children }: PostsProviderProps) {
    const [posts, setPosts] = useState<PostProps[]>([]);
    const [comments, setComments] = useState<CommentProps[]>([]);

    async function createPost(postInput: PostInput) {

        const response = await fetch(`${process.env.REACT_APP_API_URL}/posts`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postInput)
        });

        const newPost = {
            ...postInput,
            userId: 1,
            id: posts.length + 1
        };

        if (response.status === 200 || response.status === 201) {
            Notify('Post saved successfully.', 'success');
            setPosts([
                ...posts,
                newPost
            ]);
        } else {
            Notify('Ops, should be have a problem with a server, please try again later.', 'error');
        }
    }
    async function editPost(postInput: PostInput, id: number) {

        const updatedPost = {
            ...postInput,
            userId: 1,
            id
        };
        const newPosts = posts.filter(post => post.id !== id);
        newPosts.push(updatedPost);

        Notify('Post saved successfully.', 'success');
        setPosts(newPosts);
    }

    async function createComment(commentInput: CommentInput) {

        const response = await fetch(`${process.env.REACT_APP_API_URL}/comments`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(commentInput)
        });

        const newComment = {
            ...commentInput,
            id: comments.length + 1
        };

        if (response.status === 200 || response.status === 201) {
            Notify('Comment saved successfully.', 'success');
            setComments([
                ...comments,
                newComment
            ]);
        } else {
            Notify('Ops, should be have a problem with a server, please try again later.', 'error');
        }
    }

    async function deletePost(id: number) {
        const newPosts = posts.filter(post => post.id !== id);
        setPosts(newPosts);
        Notify('Post delete successfully.', 'success');
    }

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/posts`)
            .then(response => response.json())
            .then(json => {
                setPosts(json);
            })
    }, []);

    return (
        <PostsContext.Provider value={{
            posts,
            comments,
            createPost,
            createComment,
            editPost,
            deletePost
        }}>
            {children}
        </PostsContext.Provider>
    );
}

export function usePosts() {
    const context = useContext(PostsContext);

    return context;
}