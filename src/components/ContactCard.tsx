import React from 'react';
import '../styles/App.css';

interface Props {
  contact: any;
  onEdit: () => void;
  onDelete: () => void;
}

const ContactCard: React.FC<Props> = ({ contact, onEdit, onDelete }) => {
  return (
    <div style={{ border: '1px solid gray', margin: '10px', padding: '10px' }}>
      <p>{contact.username}</p>
      <p>{contact.email}</p>
      <p>{contact.phone}</p>
      <button onClick={onEdit}>Edit</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

export default ContactCard;
