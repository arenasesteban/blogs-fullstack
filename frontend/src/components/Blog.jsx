import { useState } from 'react';

const Blog = ({ blog, handleLike, handleRemove }) => {
    const [showDetails, setShowDetails] = useState(false);

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    }

    const handleBlogLikes = () => {
        handleLike(blog.id, {
            user: blog.user.id,
            title: blog.title,
            author: blog.author,
            url: blog.url,
            likes: blog.likes + 1
        });
    }

    const handleBlogRemove = () => {
        handleRemove(blog);
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
                        <button onClick={handleBlogLikes}>Like</button>
                    </div>
                    <div>{blog.user.name}</div>
                    <button onClick={handleBlogRemove}>Remove</button>
                </div>
            )}
        </div>
    );
}

export default Blog;