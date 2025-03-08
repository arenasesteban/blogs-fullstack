import Notification from './Notification';

const LoginForm = ({ username, password, handleUsernameChange, handlePasswordChange, handleSubmit, message }) => {
    return (
        <div>
        <h2>Log in to application</h2>
        <Notification type={message.type} content={message.content} />
        <form onSubmit={handleSubmit}>
            <div>
                Username:
                <input type="text" value={username} name='Username' onChange={handleUsernameChange}/>
            </div>
            <div>
                Password:
                <input type="text" value={password} name='Password' onChange={handlePasswordChange}/>
            </div>
            <button type='submit'>Login</button>
        </form>
    </div>
    );
}

export default LoginForm;