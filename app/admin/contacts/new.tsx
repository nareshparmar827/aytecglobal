'use client';

import { useForm } from 'react-hook-form';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function NewContactPage() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  async function onSubmit(data: any) {
    const { error } = await supabase.from('contacts').insert([data]);
    if (!error) router.push('/admin/contacts');
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Add New Contact</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <input {...register('name')} placeholder="Name" className="border p-2" required />
        <input {...register('email')} placeholder="Email" className="border p-2" required />
        <input {...register('phone')} placeholder="Phone" className="border p-2" />
        <textarea {...register('message')} placeholder="Message" className="border p-2" />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Save</button>
      </form>
    </div>
  );
}
