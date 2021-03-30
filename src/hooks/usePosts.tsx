import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import Noty from 'noty';

interface DataProps {
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
    data: DataProps[];
    createPost: (post: PostInput) => Promise<void>;
    createComment: (comment: CommentInput) => Promise<void>;
}

type PostInput = Omit<DataProps, 'id' | 'userId'>;
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
    const [data, setData] = useState<DataProps[]>([]);
    const [comments, setComments] = useState<CommentProps[]>([]);

    async function createPost(postInput: PostInput) {

        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
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
            id: data.length + 1
        };

        if (response.status === 200 || response.status === 201) {
            Notify('Post saved successfully.', 'success');
            setData([
                ...data,
                newPost
            ]);
        } else {
            Notify('Ops, should be have a problem with a server, please try again later.', 'error');
        }
    }

    async function createComment(commentInput: CommentInput) {

        const response = await fetch('https://jsonplaceholder.typicode.com/comments', {
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

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(json => {
                setData(json);
            })
    }, []);

    return (
        <PostsContext.Provider value={{ data, createPost, createComment }}>
            {children}
        </PostsContext.Provider>
    );
}

export function usePosts() {
    const context = useContext(PostsContext);

    return context;
}