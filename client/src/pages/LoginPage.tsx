import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserRole } from "@/graphql/graphql";
import { useAuthActions } from "@/hooks/useAuth";
import { ROUTES } from "@/constants/routes";
import { LOGIN } from "@/graphql/mutations";

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuthActions();
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [loginMutation, { loading, error }] = useMutation(LOGIN, {
    onCompleted: async (data) => {
      if (data?.login?.token) {
        // Login and fetch user data
        await login(data.login.token);

        // Redirect based on user role from the login response
        if (data.login.user?.role === UserRole.Admin) {
          navigate(ROUTES.ADMIN_DASHBOARD);
        } else if (data.login.user?.role === UserRole.Staff) {
          navigate(ROUTES.STAFF_DASHBOARD);
        } else {
          // This should not happen if users only have ADMIN or STAFF roles
          console.error("Unknown user role:", data.login.user?.role);
          navigate(ROUTES.AUTH.LOGIN);
        }
      }
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation({
      variables: {
        email: formData.email,
        password: formData.password,
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">
              Sign in to your account
            </CardTitle>
            <CardDescription className="text-center">
              Enter your email and password to access your account
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                  {error.message || "Login failed. Please try again."}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 pt-6">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Signing in..." : "Sign in"}
              </Button>
              <div className="text-center text-sm">
                Don't have an account?{" "}
                <Link
                  to={ROUTES.AUTH.SIGNUP}
                  className="text-blue-600 hover:text-blue-500"
                >
                  Sign up
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
