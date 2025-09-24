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

interface SignupFormData {
  // Firm details
  firmName: string;
  firmAddress: string;
  firmContact: string;
  firmEmail: string;

  // Admin details
  adminName: string;
  adminContact: string;
  adminPassword: string;
  confirmPassword: string;
}

interface SignupState {
  data: SignupFormData;
  errors?: Partial<SignupFormData>;
  message?: string;
}

export default function SignupPage() {
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();

  // Signup action using React 19 useActionState
  const signupAction = async (
    _prevState: SignupState,
    formData: FormData
  ): Promise<SignupState> => {
    const data: SignupFormData = {
      firmName: formData.get("firmName") as string,
      firmAddress: formData.get("firmAddress") as string,
      firmContact: formData.get("firmContact") as string,
      firmEmail: formData.get("firmEmail") as string,
      adminName: formData.get("adminName") as string,
      adminContact: formData.get("adminContact") as string,
      adminPassword: formData.get("adminPassword") as string,
      confirmPassword: formData.get("confirmPassword") as string,
    };

    // Validation logic
    const errors: Partial<SignupFormData> = {};

    // Required field validation
    if (!data.firmName.trim()) errors.firmName = "Firm name is required";
    if (!data.firmAddress.trim()) errors.firmAddress = "Firm address is required";
    if (!data.firmContact.trim()) errors.firmContact = "Firm contact is required";
    if (!data.firmEmail.trim()) errors.firmEmail = "Firm email is required";
    if (!data.adminName.trim()) errors.adminName = "Admin name is required";
    if (!data.adminContact.trim()) errors.adminContact = "Admin contact is required";
    if (!data.adminPassword) errors.adminPassword = "Password is required";
    if (!data.confirmPassword) errors.confirmPassword = "Please confirm password";

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (data.firmEmail && !emailRegex.test(data.firmEmail)) {
      errors.firmEmail = "Please enter a valid email address";
    }

    // Password validation
    if (data.adminPassword && data.adminPassword.length < 6) {
      errors.adminPassword = "Password must be at least 6 characters";
    }

    // Password confirmation
    if (data.adminPassword !== data.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    // Phone number validation (basic)
    const phoneRegex = /^[+]?[\d\s\-()]{10,}$/;
    if (data.firmContact && !phoneRegex.test(data.firmContact)) {
      errors.firmContact = "Please enter a valid phone number";
    }
    if (data.adminContact && !phoneRegex.test(data.adminContact)) {
      errors.adminContact = "Please enter a valid phone number";
    }

    if (Object.keys(errors).length > 0) {
      return {
        data: { ...data, adminPassword: "", confirmPassword: "" },
        errors,
        message: "Please fix the errors above",
      };
    }

    try {
      // TODO: Implement actual signup logic with GraphQL
      console.log("Signup attempt:", data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // TODO: Handle signup response and redirect to dashboard
      startTransition(() => {
        navigate(ROUTES.DASHBOARD);
      });

      return {
        data: { ...data, adminPassword: "", confirmPassword: "" },
        message: "Account created successfully! Redirecting...",
      };
    } catch {
      return {
        data: { ...data, adminPassword: "", confirmPassword: "" },
        errors: { firmEmail: "Failed to create account" },
        message: "Signup failed. Please try again.",
      };
    }
  };

  const [state, formAction] = useActionState(signupAction, {
    data: {
      firmName: "",
      firmAddress: "",
      firmContact: "",
      firmEmail: "",
      adminName: "",
      adminContact: "",
      adminPassword: "",
      confirmPassword: "",
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Create Your Firm Account
          </CardTitle>
          <CardDescription className="text-center">
            Set up your billing system by providing firm and admin details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-6">
            {/* Firm Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground border-b pb-2">
                Firm Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firmName">Firm Name *</Label>
                  <Input
                    id="firmName"
                    name="firmName"
                    placeholder="ABC Company Pvt Ltd"
                    defaultValue={state.data.firmName}
                    className={state.errors?.firmName ? "border-destructive" : ""}
                  />
                  {state.errors?.firmName && (
                    <p className="text-sm text-destructive">
                      {state.errors.firmName}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="firmEmail">Firm Email *</Label>
                  <Input
                    id="firmEmail"
                    name="firmEmail"
                    type="email"
                    placeholder="info@company.com"
                    defaultValue={state.data.firmEmail}
                    className={state.errors?.firmEmail ? "border-destructive" : ""}
                  />
                  {state.errors?.firmEmail && (
                    <p className="text-sm text-destructive">
                      {state.errors.firmEmail}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="firmAddress">Firm Address *</Label>
                <Input
                  id="firmAddress"
                  name="firmAddress"
                  placeholder="123 Business Street, City, State, PIN"
                  defaultValue={state.data.firmAddress}
                  className={state.errors?.firmAddress ? "border-destructive" : ""}
                />
                {state.errors?.firmAddress && (
                  <p className="text-sm text-destructive">
                    {state.errors.firmAddress}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="firmContact">Firm Contact Number *</Label>
                <Input
                  id="firmContact"
                  name="firmContact"
                  placeholder="+91 9876543210"
                  defaultValue={state.data.firmContact}
                  className={state.errors?.firmContact ? "border-destructive" : ""}
                />
                {state.errors?.firmContact && (
                  <p className="text-sm text-destructive">
                    {state.errors.firmContact}
                  </p>
                )}
              </div>
            </div>

            {/* Admin Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground border-b pb-2">
                Admin Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="adminName">Admin Name *</Label>
                  <Input
                    id="adminName"
                    name="adminName"
                    placeholder="John Doe"
                    defaultValue={state.data.adminName}
                    className={state.errors?.adminName ? "border-destructive" : ""}
                  />
                  {state.errors?.adminName && (
                    <p className="text-sm text-destructive">
                      {state.errors.adminName}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="adminContact">Admin Contact *</Label>
                  <Input
                    id="adminContact"
                    name="adminContact"
                    placeholder="+91 9876543210"
                    defaultValue={state.data.adminContact}
                    className={state.errors?.adminContact ? "border-destructive" : ""}
                  />
                  {state.errors?.adminContact && (
                    <p className="text-sm text-destructive">
                      {state.errors.adminContact}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="adminPassword">Admin Password *</Label>
                  <Input
                    id="adminPassword"
                    name="adminPassword"
                    type="password"
                    placeholder="Minimum 6 characters"
                    defaultValue={state.data.adminPassword}
                    className={state.errors?.adminPassword ? "border-destructive" : ""}
                  />
                  {state.errors?.adminPassword && (
                    <p className="text-sm text-destructive">
                      {state.errors.adminPassword}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password *</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Re-enter password"
                    defaultValue={state.data.confirmPassword}
                    className={
                      state.errors?.confirmPassword ? "border-destructive" : ""
                    }
                  />
                  {state.errors?.confirmPassword && (
                    <p className="text-sm text-destructive">
                      {state.errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {state.message && (
              <div className={`text-sm ${state.errors ? 'text-destructive' : 'text-green-600'}`}>
                {state.message}
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Creating Account..." : "Create Firm Account"}
            </Button>
          </form>

          <div className="mt-6 text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Button variant="link" asChild className="p-0 h-auto">
                <Link to={ROUTES.AUTH.LOGIN}>Sign in here</Link>
              </Button>
            </p>
            <Button variant="link" asChild className="p-0 h-auto">
              <Link to={ROUTES.HOME}>← Back to Home</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
