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
import { SIGNUP_FIRM } from "@/graphql/mutations";

interface SignupFormData {
  firmName: string;
  firmEmail: string;
  firmAddress: string;
  firmContact: string;
  adminName: string;
  adminEmail: string;
  password: string;
  confirmPassword: string;
}

export default function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SignupFormData>({
    firmName: "",
    firmEmail: "",
    firmAddress: "",
    firmContact: "",
    adminName: "",
    adminEmail: "",
    password: "",
    confirmPassword: "",
  });

  const [signupMutation, { loading, error }] = useMutation(SIGNUP_FIRM, {
    onCompleted: (data) => {
      if (data?.signUpFirm?.user) {
        navigate("/login");
      }
    },
    onError: (error) => {
      console.error("Signup failed:", error);
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    signupMutation({
      variables: {
        firmName: formData.firmName,
        firmEmail: formData.firmEmail,
        firmAddress: formData.firmAddress,
        firmPhone: formData.firmContact,
        adminEmail: formData.adminEmail,
        adminName: formData.adminName,
        adminPassword: formData.password,
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">
              Create your account
            </CardTitle>
            <CardDescription className="text-center">
              Enter your company and admin details to get started
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                  {error.message || "Signup failed. Please try again."}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="firmName">Company Name</Label>
                <Input
                  id="firmName"
                  name="firmName"
                  type="text"
                  required
                  value={formData.firmName}
                  onChange={handleInputChange}
                  placeholder="Enter company name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="firmEmail">Company Email</Label>
                <Input
                  id="firmEmail"
                  name="firmEmail"
                  type="email"
                  required
                  value={formData.firmEmail}
                  onChange={handleInputChange}
                  placeholder="Enter company email"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="firmAddress">Company Address</Label>
                <Input
                  id="firmAddress"
                  name="firmAddress"
                  type="text"
                  required
                  value={formData.firmAddress}
                  onChange={handleInputChange}
                  placeholder="Enter company address"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="firmContact">Company Phone</Label>
                <Input
                  id="firmContact"
                  name="firmContact"
                  type="tel"
                  required
                  value={formData.firmContact}
                  onChange={handleInputChange}
                  placeholder="Enter company phone"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="adminName">Admin Name</Label>
                <Input
                  id="adminName"
                  name="adminName"
                  type="text"
                  required
                  value={formData.adminName}
                  onChange={handleInputChange}
                  placeholder="Enter admin name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="adminEmail">Admin Email</Label>
                <Input
                  id="adminEmail"
                  name="adminEmail"
                  type="email"
                  required
                  value={formData.adminEmail}
                  onChange={handleInputChange}
                  placeholder="Enter admin email"
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
                  placeholder="Enter password"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm password"
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 pt-6">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Creating account..." : "Create account"}
              </Button>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-600 hover:text-blue-500">
                  Sign in
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
