export const getCoordinates = async (address: string) => {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&addressdetails=1&limit=1`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch coordinates');
  }

  const data = await response.json();
  console.log('API Response:', data); // Log the API response

  if (data && data.length > 0) {
    const { lat, lon } = data[0];
    console.log('Parsed Coordinates:', { lat, lon }); // Log the parsed coordinates
    return { lat: parseFloat(lat), lon: parseFloat(lon) };
  } else {
    throw new Error('No coordinates found for the given address');
  }
};
