import React from 'react'

interface AuthLoyoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLoyoutProps) {
  return (
    <div className="h-screen bg-[url('/images/dental_cabinets.webp')] bg-cover">{children}</div>
  )
}
