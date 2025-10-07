import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
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
import type {
  MutationSignUpFirmArgs,
  SignUpFirmMutation,
} from "@/graphql/graphql";
import { execute } from "@/graphql/execute";
import { SIGNUP_FIRM_MUTATION } from "@/schema/mutations/firm";

interface SignupFormData {
  // Firm details
  firmName: string;
  firmEmail: string;
  firmAddress: string;
  firmPhone: string;

  // Admin details
  adminName: string;
  adminEmail: string;
  adminPassword: string;
  confirmPassword: string;
}

export default function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SignupFormData>({
    firmName: "",
    firmEmail: "",
    firmAddress: "",
    firmPhone: "",
    adminName: "",
    adminEmail: "",
    adminPassword: "",
    confirmPassword: "",
  });

  const [validationError, setValidationError] = useState<string>("");

  const signupMutation = useMutation<
    { data: SignUpFirmMutation },
    Error,
    MutationSignUpFirmArgs
  >({
    mutationFn: (data) => execute(SIGNUP_FIRM_MUTATION, data),
    onSuccess: (response) => {
      const signUpResponse = response.data;
      if (signUpResponse?.signUpFirm?.token) {
        localStorage.setItem("token", signUpResponse.signUpFirm.token);
      }
      navigate(ROUTES.AUTH.LOGIN);
    },
    onError: (error) => {
      console.error("Signup failed:", error);
    },
  });

  console.log(SIGNUP_FIRM_MUTATION, "SIGNUP_FIRM_MUTATION");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValidationError("");

    // Basic validation
    if (formData.adminPassword !== formData.confirmPassword) {
      setValidationError("Passwords do not match");
      return;
    }

    if (formData.adminPassword.length < 6) {
      setValidationError("Password must be at least 6 characters long");
      return;
    }

    // Prepare mutation variables
    const mutationData: MutationSignUpFirmArgs = {
      firmName: formData.firmName,
      firmEmail: formData.firmEmail,
      firmAddress: formData.firmAddress || undefined,
      firmPhone: formData.firmPhone || undefined,
      adminEmail: formData.adminEmail,
      adminPassword: formData.adminPassword,
      adminName: formData.adminName,
    };

    signupMutation.mutate(mutationData);
  };

  const handleInputChange =
    (field: keyof SignupFormData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

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
          <form onSubmit={handleSubmit} className="space-y-6">
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
                    value={formData.firmName}
                    onChange={handleInputChange("firmName")}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="firmEmail">Firm Email *</Label>
                  <Input
                    id="firmEmail"
                    name="firmEmail"
                    type="email"
                    placeholder="info@company.com"
                    value={formData.firmEmail}
                    onChange={handleInputChange("firmEmail")}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="firmAddress">Firm Address</Label>
                <Input
                  id="firmAddress"
                  name="firmAddress"
                  placeholder="123 Business Street, City, State, PIN"
                  value={formData.firmAddress}
                  onChange={handleInputChange("firmAddress")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="firmPhone">Firm Contact Number</Label>
                <Input
                  id="firmPhone"
                  name="firmPhone"
                  type="tel"
                  placeholder="+91 9876543210"
                  value={formData.firmPhone}
                  onChange={handleInputChange("firmPhone")}
                />
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
                    value={formData.adminName}
                    onChange={handleInputChange("adminName")}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="adminEmail">Admin Email *</Label>
                  <Input
                    id="adminEmail"
                    name="adminEmail"
                    type="email"
                    placeholder="admin@company.com"
                    value={formData.adminEmail}
                    onChange={handleInputChange("adminEmail")}
                    required
                  />
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
                    value={formData.adminPassword}
                    onChange={handleInputChange("adminPassword")}
                    minLength={6}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password *</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Re-enter password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange("confirmPassword")}
                    minLength={6}
                    required
                  />
                </div>
              </div>
            </div>

            {signupMutation.isSuccess && (
              <div className="text-sm text-green-600">
                Account created successfully! Redirecting to login...
              </div>
            )}

            {signupMutation.isError && (
              <div className="text-sm text-red-600">
                {signupMutation.error?.message ||
                  "Signup failed. Please try again."}
              </div>
            )}

            {validationError && (
              <div className="text-sm text-red-600">{validationError}</div>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={signupMutation.isPending}
            >
              {signupMutation.isPending
                ? "Creating Account..."
                : "Create Firm Account"}
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
