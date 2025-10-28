'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

  /* start add contact */
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
  /* start end contact */

export default function ContactsPage() {
  const [contacts, setContacts] = useState<any[]>([]);

  /* start add contact */
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  /* start end contact */


  useEffect(() => {
    fetchContacts();
  }, []);

  async function fetchContacts() {
    const { data, error } = await supabase.from('contacts').select('*').order('created_at', { ascending: false });
    if (error) console.error(error);
    else setContacts(data);
  }

  async function deleteContact(id: string) {
    await supabase.from('contacts').delete().eq('id', id);
    fetchContacts();
  }



  /*****************************/
  /* start add contact */
  async function onSubmit(data: any) {
    const { error } = await supabase.from('contacts').insert([data]);
    if (!error) router.push('/admin/contacts');
    fetchContacts();
  }
  /* end add contact */

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Contacts</h1>
      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">message</th>
            <th className="p-2">date</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((c) => (
            <tr key={c.id} className="border-t">
              <td className="p-2">{c.name}</td>
              <td className="p-2">{c.email}</td>
              <td className="p-2">{c.message}</td>
              <td className="p-2">{c.created_at}</td>
              <td className="p-2">
                <button onClick={() => deleteContact(c.id)} className="text-red-500">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

  
      <div className="p-6">
        <h1 className="text-xl font-bold mb-4">Add New Contact</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <input {...register('name')} placeholder="Name" className="border p-2" required />
          <input {...register('email')} placeholder="Email" className="border p-2" required />
          <textarea {...register('message')} placeholder="Message" className="border p-2" />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">Save</button>
        </form>
      </div>

    </div>
  );
}
