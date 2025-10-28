'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { AdminHeader } from "@/components/admin-header"
import { AdminSidebar } from "@/components/admin-sidebar"

export default function AdminPage({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function checkAdmin() {
      console.log("✅ Starting admin check...");

      const { data } = await supabase.auth.getUser()
      if (!data.user) {
        router.push('/login')
      } else {
        setUser(data.user)
      }

      console.log("✅ Admin verified successfully");
      setLoading(false);
    }

    checkAdmin();

    async function handleLogout() {
      await supabase.auth.signOut()
      router.push('/login')
    }

  }, [router]);



  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col min-h-screen">
      <AdminHeader />
      <div className="flex flex-1">
        <AdminSidebar />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}