import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ThemeProvider, useTheme } from "@/components/theme-provider";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </Button>
  );
}

function AppContent() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">shadcn/ui + Tailwind v4</h1>
          <ThemeToggle />
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Welcome to shadcn/ui</CardTitle>
            <CardDescription>
              Beautiful components built with Tailwind CSS v4
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              This is an example of shadcn/ui components working with Tailwind
              CSS v4.
            </p>
            <div className="flex gap-2">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
