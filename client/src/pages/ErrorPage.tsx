import { Link, useRouteError, isRouteErrorResponse } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ROUTES } from "@/constants/routes";

export default function ErrorPage() {
  const error = useRouteError();

  let errorMessage: string;
  let errorStatus: string | number = "Error";

  if (isRouteErrorResponse(error)) {
    errorMessage =
      error.statusText || error.data?.message || "Something went wrong";
    errorStatus = error.status;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else {
    errorMessage = "An unknown error occurred";
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-6xl font-bold text-destructive">
            {errorStatus}
          </CardTitle>
          <CardDescription className="text-lg">
            Oops! Something went wrong
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">{errorMessage}</p>
          <div className="space-y-2">
            <Button asChild className="w-full">
              <Link to={ROUTES.HOME}>Go Home</Link>
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => window.location.reload()}
            >
              Refresh Page
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
