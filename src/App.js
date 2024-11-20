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

  const handleSelect = (value,index) => {
    if(index===0){
        setSelectedValues({ ...selectedValues, groupBy: value });
    }else{
        setSelectedValues({ ...selectedValues, orderBy: value });
    }
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
        groupBy={selectedValues.groupBy}
        orderBy={selectedValues.orderBy}
        onTicketDrop={handleTicketDrop} 
      />
    </>
  );
};

export default App;
