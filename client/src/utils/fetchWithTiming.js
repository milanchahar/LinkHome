export const fetchWithTiming = async (url, options = {}) => {
  const start = Date.now();
  const response = await fetch(url, options);
  const duration = Date.now() - start;
  const data = await response.json();
  return { data, duration, ok: response.ok, status: response.status };
};
