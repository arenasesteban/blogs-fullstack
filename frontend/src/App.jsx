import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable'

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
            <LoginForm 
                username={username} 
                password={password}
                handleUsernameChange={(e) => setUsername(e.target.value)}
                handlePasswordChange={(e) => setPassword(e.target.value)} 
                handleSubmit={handleLogin}
                message={message}
            />
        );
    }

    return (
        <div>
            <h2>Blogs</h2>
            <Notification type={message.type} content={message.content} />
            <p>
                {user.name} logged in
                <button onClick={handleLogout}>Logout</button>
            </p>
            <Togglable buttonLabel='New Blog'>
                <BlogForm 
                    title={title}
                    author={author}
                    url={url}
                    handleTitleChange={(e) => setTitle(e.target.value)}
                    handleAuthorChange={(e) => setAuthor(e.target.value)}
                    handleUrlChange={(e) => setUrl (e.target.value)}
                    handleSubmit={handleCreateBlog}
                />
            </Togglable>
            <div>
                {blogs.map(blog =>
                    <Blog key={blog.id} blog={blog} />
                )}
            </div>
    </div>
    )
}

export default App