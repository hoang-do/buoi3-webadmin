import LoginForm from "../components/auth/LoginForm"
import RegisterForm from "../components/auth/RegisterForm"

const Auth = ({authRoute}) => {
    let body
    body = (
        <>
        
        {authRoute === 'login' && <LoginForm />}
        {authRoute === 'register' && <RegisterForm />}
        </>
    )
    return (
        <div className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                    <h1>Hello Admin</h1>
                    <h4>Welcome to Newwave Solutions JSC</h4>
                    {body}
                </div>
            </div>
        </div>
    )
}
export default Auth