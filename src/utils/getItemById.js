
export function getItemById(data, id) {
  if (!Array.isArray(data)) {
    console.error("Invalid categories data. Expected an array.");
    return null;
  }

  return data.find(item => item?.id === id) || null;
}
