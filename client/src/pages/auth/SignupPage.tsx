import { useState } from "react";
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

export default function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SignupFormData>({
    firmName: "",
    firmAddress: "",
    firmContact: "",
    firmEmail: "",
    adminName: "",
    adminContact: "",
    adminPassword: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<SignupFormData>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof SignupFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<SignupFormData> = {};

    // Required field validation
    if (!formData.firmName.trim()) newErrors.firmName = "Firm name is required";
    if (!formData.firmAddress.trim())
      newErrors.firmAddress = "Firm address is required";
    if (!formData.firmContact.trim())
      newErrors.firmContact = "Firm contact is required";
    if (!formData.firmEmail.trim())
      newErrors.firmEmail = "Firm email is required";
    if (!formData.adminName.trim())
      newErrors.adminName = "Admin name is required";
    if (!formData.adminContact.trim())
      newErrors.adminContact = "Admin contact is required";
    if (!formData.adminPassword)
      newErrors.adminPassword = "Password is required";
    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Please confirm password";

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.firmEmail && !emailRegex.test(formData.firmEmail)) {
      newErrors.firmEmail = "Please enter a valid email address";
    }

    // Password validation
    if (formData.adminPassword && formData.adminPassword.length < 6) {
      newErrors.adminPassword = "Password must be at least 6 characters";
    }

    // Password confirmation
    if (formData.adminPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Phone number validation (basic)
    const phoneRegex = /^[+]?[\d\s\-()]{10,}$/;
    if (formData.firmContact && !phoneRegex.test(formData.firmContact)) {
      newErrors.firmContact = "Please enter a valid phone number";
    }
    if (formData.adminContact && !phoneRegex.test(formData.adminContact)) {
      newErrors.adminContact = "Please enter a valid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // TODO: Implement actual signup logic with GraphQL
    console.log("Signup attempt:", formData);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // TODO: Handle signup response and redirect to dashboard
      navigate(ROUTES.DASHBOARD);
    }, 2000);
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
                    onChange={handleInputChange}
                    className={errors.firmName ? "border-destructive" : ""}
                  />
                  {errors.firmName && (
                    <p className="text-sm text-destructive">
                      {errors.firmName}
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
                    value={formData.firmEmail}
                    onChange={handleInputChange}
                    className={errors.firmEmail ? "border-destructive" : ""}
                  />
                  {errors.firmEmail && (
                    <p className="text-sm text-destructive">
                      {errors.firmEmail}
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
                  value={formData.firmAddress}
                  onChange={handleInputChange}
                  className={errors.firmAddress ? "border-destructive" : ""}
                />
                {errors.firmAddress && (
                  <p className="text-sm text-destructive">
                    {errors.firmAddress}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="firmContact">Firm Contact Number *</Label>
                <Input
                  id="firmContact"
                  name="firmContact"
                  placeholder="+91 9876543210"
                  value={formData.firmContact}
                  onChange={handleInputChange}
                  className={errors.firmContact ? "border-destructive" : ""}
                />
                {errors.firmContact && (
                  <p className="text-sm text-destructive">
                    {errors.firmContact}
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
                    value={formData.adminName}
                    onChange={handleInputChange}
                    className={errors.adminName ? "border-destructive" : ""}
                  />
                  {errors.adminName && (
                    <p className="text-sm text-destructive">
                      {errors.adminName}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="adminContact">Admin Contact *</Label>
                  <Input
                    id="adminContact"
                    name="adminContact"
                    placeholder="+91 9876543210"
                    value={formData.adminContact}
                    onChange={handleInputChange}
                    className={errors.adminContact ? "border-destructive" : ""}
                  />
                  {errors.adminContact && (
                    <p className="text-sm text-destructive">
                      {errors.adminContact}
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
                    value={formData.adminPassword}
                    onChange={handleInputChange}
                    className={errors.adminPassword ? "border-destructive" : ""}
                  />
                  {errors.adminPassword && (
                    <p className="text-sm text-destructive">
                      {errors.adminPassword}
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
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={
                      errors.confirmPassword ? "border-destructive" : ""
                    }
                  />
                  {errors.confirmPassword && (
                    <p className="text-sm text-destructive">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Create Firm Account"}
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
