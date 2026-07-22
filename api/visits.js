export default async function handler(req, res) {
  const namespace = 'laespecie';
  const key = 'visits';
  
  // Check if the cookie 'visited_today' is set
  const cookies = req.headers.cookie || '';
  const hasVisitedToday = cookies.includes('visited_today=1');
  
  let count = 0;
  try {
    if (!hasVisitedToday) {
      // Increment the counter
      const response = await fetch(`https://api.counterapi.dev/v1/${namespace}/${key}/up`);
      const data = await response.json();
      count = data.count;
      
      // Set cookie to expire at midnight
      const now = new Date();
      const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
      res.setHeader('Set-Cookie', `visited_today=1; Path=/; Expires=${midnight.toUTCString()}; SameSite=Lax; Secure`);
    } else {
      // Just get the current counter value
      const response = await fetch(`https://api.counterapi.dev/v1/${namespace}/${key}`);
      const data = await response.json();
      count = data.count;
    }
  } catch (err) {
    console.error("Counter API error:", err);
    count = 0;
  }
  
  res.status(200).json({ count });
}
