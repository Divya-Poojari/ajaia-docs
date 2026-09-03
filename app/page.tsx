import { getCurrentUser } from "@/lib/auth";
import Dashboard from "@/components/Dashboard";

export const dynamic = "force-dynamic";

export default async function Home() {
  const user = await getCurrentUser();

  return <Dashboard currentUser={user} />;
}