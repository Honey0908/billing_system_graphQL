import { useActionState, useTransition } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ROUTES } from "@/constants/routes";

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginState {
  data: LoginFormData;
  errors?: Partial<LoginFormData>;
  message?: string;
}

export default function LoginPage() {
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();

  // Login action using React 19 useActionState
  const loginAction = async (
    _prevState: LoginState,
    formData: FormData
  ): Promise<LoginState> => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Basic validation
    const errors: Partial<LoginFormData> = {};
    if (!email.trim()) errors.email = "Email is required";
    if (!password) errors.password = "Password is required";

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      errors.email = "Please enter a valid email address";
    }

    if (Object.keys(errors).length > 0) {
      return {
        data: { email, password: "" },
        errors,
        message: "Please fix the errors above",
      };
    }

    try {
      // TODO: Implement actual login logic with GraphQL
      console.log("Login attempt:", { email, password });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // TODO: Handle login response and redirect to dashboard
      startTransition(() => {
        navigate(ROUTES.DASHBOARD);
      });

      return {
        data: { email, password: "" },
        message: "Login successful! Redirecting...",
      };
    } catch {
      return {
        data: { email, password: "" },
        errors: { email: "Invalid credentials" },
        message: "Login failed. Please try again.",
      };
    }
  };

  const [state, formAction] = useActionState(loginAction, {
    data: { email: "", password: "" },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Sign in to your account
          </CardTitle>
          <CardDescription className="text-center">
            Enter your email and password to access your billing system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="admin@company.com"
                defaultValue={state.data.email}
                required
              />
              {state.errors?.email && (
                <p className="text-sm text-destructive">{state.errors.email}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                defaultValue={state.data.password}
                required
              />
              {state.errors?.password && (
                <p className="text-sm text-destructive">{state.errors.password}</p>
              )}
            </div>
            {state.message && (
              <div className={`text-sm ${state.errors ? 'text-destructive' : 'text-green-600'}`}>
                {state.message}
              </div>
            )}
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Signing in..." : "Sign in"}
            </Button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Button variant="link" asChild className="p-0 h-auto">
                <Link to={ROUTES.AUTH.SIGNUP}>Create a new firm account</Link>
              </Button>
            </p>
          </div>
          <div className="mt-4 text-center">
            <Button variant="link" asChild className="p-0 h-auto">
              <Link to={ROUTES.HOME}>← Back to Home</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
