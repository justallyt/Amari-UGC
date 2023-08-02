export  const ssEvents = new EventSource(import.meta.env.VITE_EVENT_URL, { 
    withCredentials: true
});