'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function DashboardPage() {
  const [stats, setStats] = useState({ contacts: 0 });

  useEffect(() => {
    getStats();
  }, []);

  async function getStats() {
    const { count, error } = await supabase
      .from('contacts')
      .select('*', { count: 'exact', head: true })

    if (error) console.error(error);
    else setStats({ contacts: count || 0 });
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-gray-500 text-sm">Total Contacts</h2>
          <p className="text-3xl font-bold mt-2">{stats.contacts}</p>
        </div>
      </div>
    </div>
  );
}
