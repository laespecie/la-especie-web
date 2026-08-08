export default async function handler(req, res) {
  const namespace = 'laespecie';
  
  // Get date components in Chile timezone to reset the counter daily based on local time
  const formatter = new Intl.DateTimeFormat('es-CL', {
    timeZone: 'America/Santiago',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
  const parts = formatter.formatToParts(new Date());
  const day = parts.find(p => p.type === 'day').value;
  const month = parts.find(p => p.type === 'month').value;
  const year = parts.find(p => p.type === 'year').value;
  const dateKey = `${day}_${month}_${year}`;
  const key = `visits_${dateKey}`;
  const cookieName = `visited_${dateKey}`;
  
  // Check if the user has already been counted today
  const cookies = req.headers.cookie || '';
  const hasVisitedToday = cookies.includes(`${cookieName}=1`);
  
  let count = 0;
  try {
    if (!hasVisitedToday) {
      // Increment the daily counter
      const response = await fetch(`https://api.counterapi.dev/v1/${namespace}/${key}/up`);
      const data = await response.json();
      count = data.count;
      
      // Set cookie for 24 hours to prevent recount
      res.setHeader('Set-Cookie', `${cookieName}=1; Path=/; Max-Age=86400; SameSite=Lax; Secure`);
    } else {
      // Just read the current daily counter value
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
