import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const user = await loginService.login({ username, password });

            localStorage.setItem('loggedBlogappUser', JSON.stringify(user));

            blogService.setToken(user.token);
            setUser(user);
            setUsername('');
            setPassword('');
        } catch(error) { 
            setMessage({ type: 'error', content: error.response.data.error });
            setTimeout(() => setMessage({ type: null, content: null}), 5000);
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('loggedBlogappUser');
        setUser(null);
    }

    const handleCreateBlog = async (e) => {
        e.preventDefault();

        try {
            const blog = await blogService.create({ title, author, url });

            setBlogs([...blogs, blog]);
            setTitle('');
            setAuthor('');
            setUrl('');

            setMessage({ type: 'success', content: `A new blog ${blog.title} by ${blog.author} added` });
            setTimeout(() => setMessage({ type: null, content: null}), 5000);
        } catch(error) {
            setMessage({ type: 'error', content: error.response.data.error });
            setTimeout(() => setMessage({ type: null, content: null}), 5000);
        }
    }

    useEffect(() => {
        const fetchBlogs = async () => {
            const blogs = await blogService.getAll();
            setBlogs(blogs);
        }

        fetchBlogs();
    }, []);

    useEffect(() => {
        const loadUserFromLocalStorage = () => {
            const loggedBlogappUser = localStorage.getItem('loggedBlogappUser');

            if(loggedBlogappUser) {
                const user = JSON.parse(loggedBlogappUser);
                setUser(user);
                blogService.setToken(user.token);
            }
        }

        loadUserFromLocalStorage();
    }, []);

    if(user === null) {
        return (
            <div>
                <h2>Log in to application</h2>
                <Notification type={message.type} content={message.content} />
                <form onSubmit={handleLogin}>
                    <div>
                        Username:
                        <input type="text" value={username} name='Username' onChange={e => setUsername(e.target.value)}/>
                    </div>
                    <div>
                        Password:
                        <input type="text" value={password} name='Password' onChange={e => setPassword(e.target.value)}/>
                    </div>
                    <button type='submit'>Login</button>
                </form>
            </div>
        )
    }

    return (
        <div>
            <h2>Blogs</h2>
            <Notification type={message.type} content={message.content} />
            <p>
                {user.name} logged in
                <button onClick={handleLogout}>Logout</button>
            </p>
            <div>
                <form onSubmit={handleCreateBlog}>
                    <div>
                        Title:
                        <input type="text" value={title} name='Title' onChange={e => setTitle(e.target.value)} />
                    </div>
                    <div>
                        Author:
                        <input type="text" value={author} name='Author' onChange={e => setAuthor(e.target.value)} />
                    </div>
                    <div>
                        Url:
                        <input type="text" value={url} name='Url' onChange={e => setUrl(e.target.value)} />
                    </div>
                    <button type='submit'>Create</button>
                </form>
            </div>
            <div>
                {blogs.map(blog =>
                    <Blog key={blog.id} blog={blog} />
                )}
            </div>
    </div>
    )
}

export default App