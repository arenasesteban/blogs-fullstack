import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const user = await loginService.login({ username, password });

            localStorage.setItem('loggedBlogappUser', JSON.stringify(user));

            setUser(user);
            setUsername('');
            setPassword('');
        } catch(error) {
            console.log(error);
        }
    }

    const handleLogout = (e) => {
        e.preventDefault(e);

        localStorage.removeItem('loggedBlogappUser');
        setUser(null);
    }

    useEffect(() => {
        const fetchBlogs = async () => {
            const blogs = await blogService.getAll();
            setBlogs(blogs);
        }

        fetchBlogs();
    }, []);

    if(user === null) {
        return (
            <div>
                <h2>Log in to application</h2>
                <form onSubmit={handleLogin}>
                    <div>
                        Username
                        <input type="text" value={username} name='Username' onChange={e => setUsername(e.target.value)}/>
                    </div>
                    <div>
                        Password
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
            <p>
                {user.name} logged in
                <button onClick={handleLogout}>Logout</button>
            </p> 
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
    </div>
    )
}

export default App