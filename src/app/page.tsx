import Dashboard from "@/components/dashboard/Dashboard"
import ProtectedRoute from "@/utils/ProtectedRoutes"

export default function Home() {
  return (
    <ProtectedRoute>
      <div className="w-full">
        <Dashboard />
      </div>
    </ProtectedRoute>
  )
}
