import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_CONTACTS } from '../graphql/queries';
import { CREATE_CONTACT, UPDATE_CONTACT, DELETE_CONTACT } from '../graphql/mutations';
import { useAtom } from 'jotai';
import { contactsAtom } from '../atoms/contactsAtom';
import ContactCard from '../components/ContactCard';
import ContactForm from '../components/ContactForm';
import '../styles/App.css';

const Contacts: React.FC = () => {
  const { data } = useQuery(GET_CONTACTS);
  const [contacts, setContacts] = useAtom(contactsAtom);
  const [createContact] = useMutation(CREATE_CONTACT);
  const [updateContact] = useMutation(UPDATE_CONTACT);
  const [deleteContact] = useMutation(DELETE_CONTACT);
  const [editing, setEditing] = useState<any>(null);

  useEffect(() => {
    if (data && data.contacts) {
      setContacts(data.contacts);
    }
  }, [data, setContacts]);

  const handleAddOrUpdate = async (form: any) => {
    if (editing) {
      // Remove id and __typename before sending input
      const { id, __typename, ...inputWithoutId } = form;

      const { data } = await updateContact({
        variables: { id: editing.id, input: inputWithoutId },
      });
      setContacts((prev) =>
        prev.map((c) => (c.id === editing.id ? data.updateContact : c))
      );
      setEditing(null);
    } else {
      // Remove __typename before sending input
      const { __typename, ...inputWithoutTypename } = form;

      const { data } = await createContact({
        variables: { input: inputWithoutTypename },
      });
      setContacts((prev) => [...prev, data.createContact]);
    }
  };

  const handleDelete = async (id: string) => {
    await deleteContact({ variables: { id } });
    setContacts((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div>
      <h2>My Contacts</h2>
      <ContactForm onSubmit={handleAddOrUpdate} initialData={editing} />
      {contacts
        .filter((c) => c != null)
        .map((c) => (
          <ContactCard
            key={c.id}
            contact={c}
            onEdit={() => setEditing(c)}
            onDelete={() => handleDelete(c.id)}
          />
        ))}
    </div>
  );
};

export default Contacts;
