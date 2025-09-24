import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { ThemeProvider, useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="fixed top-4 right-4 z-50"
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </Button>
  );
}

function RootLayoutContent() {
  return (
    <div className="min-h-screen bg-background">
      <ThemeToggle />
      <main>
        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                <p className="text-muted-foreground">Loading...</p>
              </div>
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <RootLayoutContent />
    </ThemeProvider>
  );
}
