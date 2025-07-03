// ContactForm.tsx
import React, { useState, useEffect } from 'react';
import '../styles/App.css';

export interface Contact {
  username: string;
  email: string;
  phone: string;
}

interface Props {
  onSubmit: (form: Contact) => void;
  initialData?: Contact | null;
}

const ContactForm: React.FC<Props> = ({ onSubmit, initialData }) => {
  const [form, setForm] = useState<Contact>({ username: '', email: '', phone: '' });

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  return (
    <form onSubmit={e => { e.preventDefault(); onSubmit(form); setForm({ username: '', email: '', phone: '' }); }}>
      <input
        placeholder="Userame"
        value={form.username}
        onChange={e => setForm({ ...form, username: e.target.value })}
        required
      />
      <input
        placeholder="Email"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
        required
      />
      <input
        placeholder="Phone"
        value={form.phone}
        onChange={e => setForm({ ...form, phone: e.target.value })}
        required
      />
      <button type="submit">{initialData ? 'Update' : 'Add'} Contact</button>
    </form>
  );
};

export default ContactForm;
