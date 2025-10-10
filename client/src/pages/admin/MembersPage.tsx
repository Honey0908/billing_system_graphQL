import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function MembersPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Firm Members</h1>
          <p className="text-muted-foreground mt-1">
            Manage your team members and staff
          </p>
        </div>
        <Button>Add Member</Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {/* Sample Member Cards */}
        {[1, 2, 3, 4, 5].map((id) => (
          <Card key={id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    M{id}
                  </div>
                  <div>
                    <CardTitle>Member {id}</CardTitle>
                    <CardDescription>member{id}@example.com</CardDescription>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm">
                    Remove
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm font-semibold text-muted-foreground">
                    Role
                  </p>
                  <p className="text-sm">Staff</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-muted-foreground">
                    Status
                  </p>
                  <p className="text-sm text-green-600">Active</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-muted-foreground">
                    Joined
                  </p>
                  <p className="text-sm">Jan 2025</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-muted-foreground">
                    Permissions
                  </p>
                  <p className="text-sm">Standard</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
