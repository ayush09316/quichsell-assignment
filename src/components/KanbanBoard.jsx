import React from "react";
import TicketCard from "./TicketCard";
import { columnName } from "../constants";
import {mapTicketsWithUsers, transformApiData } from "../utils";

const KanbanBoard = ({ tickets, groupBy, onTicketDrop,orderBy ,users}) => {
  const updatedtickets = mapTicketsWithUsers(tickets, users);
  const updatedColumnName = transformApiData(updatedtickets, groupBy, columnName,orderBy,users);

  const handleDragStart = (e, ticketId) => {
    e.dataTransfer.setData("ticketId", ticketId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetGroup) => {
    e.preventDefault();
    const ticketId = e.dataTransfer.getData("ticketId");
    onTicketDrop(ticketId, targetGroup);
  };

  return (
    <div className="kanban-board">
      <div className="kanban-columns">
        {updatedColumnName[groupBy]?.options?.map((group, i) => (
          <div
            key={i}
            className="kanban-column"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, group.label)}
          >
            <div className="column-header">
              <div className="column-name">
                <img alt="icon" src={group.icon} className="column-icon" />
                <p>{group.label}</p>
                <h5>{group.data.length}</h5>
              </div>
              <div className="column-header-btns">
                <button>
                  <img alt="icon" src="./add.svg" />
                </button>
                <button>
                  <img alt="icon" src="./menu.svg" />
                </button>
              </div>
            </div>

            {group.data?.map((ticket) => (
              <TicketCard
                key={ticket.id}
                ticket={ticket}
                handleDragStart={handleDragStart}
                flag={groupBy === "status"}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
