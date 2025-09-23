import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

export const AuthContainer = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <LoginForm /> <SignUpForm />
    </div>
  );
};
