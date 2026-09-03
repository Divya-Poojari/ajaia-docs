import { getCurrentUser, ensureSeedUsers } from "@/lib/auth";
import Dashboard from "@/components/Dashboard";

export default async function Home() {
  await ensureSeedUsers();
  const user = await getCurrentUser();
  return <Dashboard currentUser={user} />;
}
