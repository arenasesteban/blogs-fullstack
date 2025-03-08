import { useState } from "react";

const BlogForm = ({ handleCreateBlog }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        handleCreateBlog({ title, author, url });

        setTitle('');
        setAuthor('');
        setUrl('');
    } 

    return (
        <form onSubmit={handleSubmit}>
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
    );
}

export default BlogForm;