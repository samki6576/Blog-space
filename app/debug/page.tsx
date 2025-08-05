"use client"

import { useState, useEffect } from "react"

export default function DebugPage() {
  const [envVars, setEnvVars] = useState<any>({})
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    setEnvVars({
      NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? "Set" : "Not Set",
      NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ? "Set" : "Not Set",
      NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? "Set" : "Not Set",
      NODE_ENV: process.env.NODE_ENV,
    })
  }, [])

  if (!isClient) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-blue-600">Debug Information</h1>
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Environment Variables</h2>
          <div className="space-y-2">
            {Object.entries(envVars).map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <span className="font-mono text-sm">{key}:</span>
                <span className={`text-sm ${value === "Not Set" ? "text-red-500" : "text-green-500"}`}>
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">System Information</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>User Agent:</span>
              <span className="text-sm text-gray-600">{navigator.userAgent}</span>
            </div>
            <div className="flex justify-between">
              <span>Window Location:</span>
              <span className="text-sm text-gray-600">{window.location.href}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 