export const transformApiData = (data, groupByKey, columnName, orderBy) => {
  // Sort the data based on the specified order
  if (orderBy === "title") {
    data = sortTicketsByTitle(data);
  } else if (orderBy === "priority") {
    data = sortTicketsByPriorityDesc(data);
  }

  // Deep clone columnName to avoid mutating the original
  const transformedColumnName = JSON.parse(JSON.stringify(columnName));

  // Populate columns with tickets based on the grouping key
  data?.forEach((item) => {
    const groupValue = item[groupByKey];
    if (groupValue) {
      const group = transformedColumnName[groupByKey]?.options.find(
        (option) => option.label === groupValue || option?.weight === groupValue
      );

      if (group) {
        group.data.push(item);
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
