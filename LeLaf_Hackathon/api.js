// api.js
export const fetchData = async () => {
    try {
      const response = await fetch('http://172.20.10.2:3000/profile/');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };
  