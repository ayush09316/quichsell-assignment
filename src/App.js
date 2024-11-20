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
    groupBy: 'status',
    orderBy: null,
  });

  // Load the selected values from localStorage when the component mounts
  useEffect(() => {
    const savedSelectedValues = JSON.parse(localStorage.getItem('selectedValues'));
    if (savedSelectedValues) {
      setSelectedValues(savedSelectedValues);
    }
  }, []);

  const handleSelect = (value, index) => {
    const newSelectedValues = { ...selectedValues };

    if (index === 0) {
      newSelectedValues.groupBy = value;
    } else {
      newSelectedValues.orderBy = value;
    }

    // Update the state with the new selected values
    setSelectedValues(newSelectedValues);

    // Persist the selected values to localStorage
    localStorage.setItem('selectedValues', JSON.stringify(newSelectedValues));
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
        return { ...ticket, [selectedValues.groupBy]: newGroup }; // Update the group based on the selected groupBy field
      }
      return ticket;
    });

    setTickets(updatedTickets);
  };

  if (loading) {
    return <Loader />;
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
        users={users}
        groupBy={selectedValues.groupBy}
        orderBy={selectedValues.orderBy}
        onTicketDrop={handleTicketDrop} 
      />
    </>
  );
};

export default App;
