import React, { useState, useEffect } from 'react';
import { fetchData } from './utils/api';
import KanbanBoard from './components/KanbanBoard';
import Dropdown from './components/Dropdown';
import { dropdownOptions } from './constants';
import Loader from './components/Loader';

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedValues, setSelectedValues] = useState({
    dropdown1: 'status',
    dropdown2: null,
  });

  const handleSelect = (dropdownKey, value) => {
    setSelectedValues((prev) => ({
      ...prev,
      [dropdownKey]: value, // Update the value for the specific dropdown
    }));
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchData();
        setTickets(data.tickets);
        setUsers(data.users);
      } catch (err) {
        setError('Failed to load data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Handle the ticket drop event
  const handleTicketDrop = (ticketId, newGroup) => {
    const updatedTickets = tickets.map((ticket) => {
      if (ticket.id === ticketId) {
        return { ...ticket, [selectedValues.dropdown1]: newGroup }; // Update the group based on the selected groupBy field
      }
      return ticket;
    });

    setTickets(updatedTickets);
  };

  if (loading) {
    return <Loader/>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <>
      <Dropdown
      dropdownOptions={dropdownOptions}
      selected={selectedValues}
      handleSelect={handleSelect}
      />
      <KanbanBoard
        tickets={tickets}
        groupBy={selectedValues.dropdown1}
        onTicketDrop={handleTicketDrop} // Pass the drop handler to KanbanBoard
      />
    </>
  );
};

export default App;
