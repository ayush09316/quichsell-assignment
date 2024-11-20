const BASE_URL = 'https://api.quicksell.co/v1/internal/frontend-assignment';

/**
 * Fetch data from the API and return the tickets and users.
 * @returns {Promise<{tickets: Array, users: Array}>} - The fetched data
 */
export const fetchData = async () => {
  try {
    const response = await fetch(BASE_URL);

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();

    // Validate the response structure
    if (!data.tickets || !data.users) {
      throw new Error('Invalid API response format');
    }

    return data; // Return tickets and users as is
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
