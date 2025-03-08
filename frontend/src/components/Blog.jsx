import { useState } from 'react';

const Blog = ({ blog, handleLike }) => {
    const [showDetails, setShowDetails] = useState(false);

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    }

    const handleClick = () => {
        handleLike(blog.id, {
            user: blog.user.id,
            title: blog.title,
            author: blog.author,
            url: blog.url,
            likes: blog.likes + 1
        });
    }

    return (
        <div className="blog">
            {blog.title} - {blog.author}
            <button onClick={toggleDetails}>
                {showDetails ? 'Hide' : 'View'}
            </button>
            {showDetails && (
                <div>
                    <div>{blog.url}</div>
                    <div>
                        Likes: {blog.likes}
                        <button onClick={handleClick}>Like</button>
                    </div>
                    <div>{blog.user.name}</div>
                </div>
            )}
        </div>
    );
}

export default Blog;