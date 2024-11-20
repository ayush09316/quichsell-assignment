export const transformApiData = (data, groupByKey, columnName) => {
  const transformedColumnName = JSON.parse(JSON.stringify(columnName));

  // Iterate through the API data
  data?.forEach((item) => {
    const groupValue = item[groupByKey];
    
    if (groupValue) {
      const group = transformedColumnName[groupByKey]?.options.find(
        (option) =>(
          option.label === groupValue || option?.weight === groupValue
        )
      );

      if (group) {
        group.data.push(item);
      }
    }
  });

  return transformedColumnName;
};
