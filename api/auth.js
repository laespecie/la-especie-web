export default function handler(req, res) {
  const client_id = process.env.OAUTH_CLIENT_ID;
  const redirect_uri = process.env.REDIRECT_URI || `https://${req.headers.host}/api/callback`;
  const url = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${encodeURIComponent(redirect_uri)}&scope=repo,user`;
  res.redirect(url);
}
