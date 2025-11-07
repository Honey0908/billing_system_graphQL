import { useQuery } from "@apollo/client/react";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LoadingPage } from "@/components/ui/loading";
import { AddMemberModal } from "@/components/members/AddMemberModal";
import { DeleteMemberModal } from "@/components/members/DeleteMemberModal";
import { MemberCard } from "@/components/members/MemberCard";
import { GET_USERS } from "@/graphql/queries";

export default function MembersPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deleteModalUser, setDeleteModalUser] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const { data, loading, refetch } = useQuery(GET_USERS);

  const users = data?.users || [];

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Team Members</h1>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Member
        </Button>
      </div>

      {users.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-8">
          No members found. Add your first team member.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user) => (
            <MemberCard
              key={user.id}
              user={user}
              onDelete={() =>
                setDeleteModalUser({ id: user.id, name: user.name })
              }
            />
          ))}
        </div>
      )}

      <AddMemberModal
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        onSuccess={() => {
          refetch();
          setIsAddModalOpen(false);
        }}
      />

      <DeleteMemberModal
        open={!!deleteModalUser}
        onOpenChange={(open) => !open && setDeleteModalUser(null)}
        user={deleteModalUser}
        onSuccess={() => {
          refetch();
          setDeleteModalUser(null);
        }}
      />
    </div>
  );
}
