import React from "react";
import { columnName } from "../constants";

const TicketCard = ({ ticket,handleDragStart,flag }) => {

  const icon= columnName.priority.options.find((item)=>item.weight===ticket.priority)?.icon;
  const statusIcon= columnName.status.options.find((item)=>item.label===ticket.status)?.icon;
  return (
    <div
      key={ticket.id}
      className="ticket-card"
      draggable
      onDragStart={(e) => handleDragStart(e, ticket.id)}
    >
      <div className="card-header">
      <h5>{ticket.id}</h5>
      <h6>{ticket.user.name[0]}</h6>
      {
        ticket.user.available ? <div className="online"/>:<div className="offline"/>
      }
      </div>
     <div className="card-title">
     {
        !flag && <img src={statusIcon} alt="icon"/>
      }
      <p>{ticket.title}</p>
     </div>
      <div className="tag-list">
      
        {
          flag && <img
          src={icon}
          alt="icon"
          className="menu-icon"
          />
        }
    
        {
      ticket.tag?.map((tag,i)=>(
        <div key={i} className="tag">
          <div className="grey-tag"/>
          {tag}
        </div>
      ))
        }</div>
    </div>
  );
};

export default TicketCard;
