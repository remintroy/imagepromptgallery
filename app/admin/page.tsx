import { Suspense } from "react";
import AdminDashboard from "../../components/AdminDashboard";

export default function AdminPage() {
  return (
    <Suspense fallback={<div>Loading admin dashboard...</div>}>
      <AdminDashboard />
    </Suspense>
  );
}
