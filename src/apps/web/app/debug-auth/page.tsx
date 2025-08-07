'use client';
import { useAuth } from '../../hooks/useAuth';
import { getAuthData } from '../../utils/auth';

export default function DebugAuthPage() {
  const { user, loading, isAuthenticated } = useAuth();
  const authData = getAuthData();

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Debug Authentication</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Hook useAuth */}
        <div className="bg-blue-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-800">useAuth Hook</h2>
          <div className="space-y-2">
            <p><strong>Loading:</strong> {loading ? 'Yes' : 'No'}</p>
            <p><strong>isAuthenticated:</strong> {isAuthenticated ? 'Yes' : 'No'}</p>
            <p><strong>User:</strong></p>
            <pre className="bg-white p-2 rounded text-sm overflow-auto">
              {JSON.stringify(user, null, 2)}
            </pre>
          </div>
        </div>

        {/* Direct localStorage */}
        <div className="bg-green-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-green-800">localStorage (Direct)</h2>
          <div className="space-y-2">
            <p><strong>Auth Data:</strong></p>
            <pre className="bg-white p-2 rounded text-sm overflow-auto">
              {JSON.stringify(authData, null, 2)}
            </pre>
          </div>
        </div>

        {/* Raw localStorage */}
        <div className="bg-yellow-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-yellow-800">Raw localStorage</h2>
          <div className="space-y-2">
            <p><strong>authData key:</strong></p>
            <pre className="bg-white p-2 rounded text-sm overflow-auto">
              {typeof window !== 'undefined' ? localStorage.getItem('authData') : 'Server side'}
            </pre>
          </div>
        </div>

        {/* Test ProtectedRoute */}
        <div className="bg-purple-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-purple-800">ProtectedRoute Test</h2>
          <div className="space-y-2">
            <p><strong>Can access candidate dashboard:</strong></p>
            <p className="font-mono">
              {isAuthenticated && user?.role === 'candidate' ? '✅ Yes' : '❌ No'}
            </p>
            <p><strong>Can access company dashboard:</strong></p>
            <p className="font-mono">
              {isAuthenticated && user?.role === 'company' ? '✅ Yes' : '❌ No'}
            </p>
            <p><strong>Can access admin dashboard:</strong></p>
            <p className="font-mono">
              {isAuthenticated && user?.role === 'admin' ? '✅ Yes' : '❌ No'}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Actions</h2>
        <div className="space-x-4">
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Reload Page
          </button>
          <button
            onClick={() => {
              if (typeof window !== 'undefined') {
                localStorage.clear();
                window.location.reload();
              }
            }}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Clear localStorage
          </button>
        </div>
      </div>
    </div>
  );
} 