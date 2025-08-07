import ChangePassword from "../../../components/changePassword";
import ProtectedRoute from "../../../components/ProtectedRoute";

function RecruiterChangePasswordContent() {
  return (
    <div>
      <ChangePassword />;
    </div>
  );
}

export default function RecruiterChangePasswordPage() {
  return (
    <ProtectedRoute allowedRoles={['company']}>
      <RecruiterChangePasswordContent />
    </ProtectedRoute>
  );
}
