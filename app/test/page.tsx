export default function TestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-blue-600">Test Page</h1>
        <p className="text-gray-600">If you can see this, your deployment is working!</p>
        <div className="mt-4 p-4 bg-white rounded-lg shadow">
          <p className="text-sm text-gray-500">Current time: {new Date().toLocaleString()}</p>
        </div>
      </div>
    </div>
  )
} 