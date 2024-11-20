export const transformApiData = (data, groupByKey, columnName, orderBy, users) => {
  // Sort the data based on the specified order
  if (orderBy === "title") {
    data = sortTicketsByTitle(data);
  } else if (orderBy === "priority") {
    data = sortTicketsByPriorityDesc(data);
  }

  // Deep clone columnName to avoid mutating the original
  const transformedColumnName = JSON.parse(JSON.stringify(columnName));

  // Initialize the users column with objects for each user only if it is empty
  if (groupByKey === "users" && transformedColumnName.users.options.length === 0) {
    users.forEach((user) => {
      transformedColumnName.users.options.push({
        label: user.name,
        id: user.id,
        available: user.available,
        data: [], // Initialize with an empty array
      });
    });
  }

  // Populate columns with tickets based on the grouping key
  data?.forEach((item) => {
    const groupValue = item[groupByKey];

    if (groupValue) {
      if (groupByKey === "users") {
        // Find the user group matching the userId in the ticket
        const userGroup = transformedColumnName.users.options.find(
          (option) => option.id === groupValue
        );
        if (userGroup) {
          userGroup.data.push(item);
        }
      } else {
        // Handle other groupings like priority or status
        const group = transformedColumnName[groupByKey]?.options.find(
          (option) => option.label === groupValue || option?.weight === groupValue
        );
        if (group) {
          group.data.push(item);
        }
      }
    }
  });

  return transformedColumnName;
};

// Sort tickets alphabetically by title
export const sortTicketsByTitle = (tickets) => {
  return tickets.slice().sort((a, b) => {
    const titleA = a.title.toLowerCase();
    const titleB = b.title.toLowerCase();
    return titleA.localeCompare(titleB);
  });
};

// Sort tickets by priority in descending order
export const sortTicketsByPriorityDesc = (tickets) => {
  return tickets.slice().sort((a, b) => b.priority - a.priority);
};


export const mapTicketsWithUsers = (tickets, users) => {
  // Create a user map for quick lookup
  const userMap = users.reduce((acc, user) => {
    acc[user.id] = user;
    return acc;
  }, {});

  // Map tickets to include user details
  return tickets.map((ticket) => {
    const user = userMap[ticket.userId];
    return {
      ...ticket,
      user, // Attach user details
    };
  });
};
