import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface DataProps {
    userId: number;
    id: number;
    title: string;
    body: string;
}

interface PostsProviderProps {
    children: ReactNode;
}

interface PostContextData {
    data: DataProps[];
    createPost: (post: PostInput) => Promise<void>;
}

type PostInput = Omit<DataProps, 'id' | 'userId'>;

const PostsContext = createContext<PostContextData>(
    {} as PostContextData
);

export function PostsProvider({ children }: PostsProviderProps) {
    const [data, setData] = useState<DataProps[]>([]);

    async function createPost(postInput: PostInput) {
        // const response = await api.post('/posts', {
        //     ...PostInput,
        //     createdAt: new Date()
        // });

        // const { post } = response.data;
        // setData([...data, post]);
    }

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(json => {
                setData(json);
            })
    }, []);

    return (
        <PostsContext.Provider value={{ data, createPost }}>
            {children}
        </PostsContext.Provider>
    );
}

export function usePosts() {
    const context = useContext(PostsContext);

    return context;
}