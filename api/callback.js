export default async function handler(req, res) {
  const code = req.query.code;
  const client_id = process.env.OAUTH_CLIENT_ID || process.env.GITHUB_CLIENT_ID;
  const client_secret = process.env.OAUTH_CLIENT_SECRET || process.env.GITHUB_CLIENT_SECRET;
  const redirect_uri = process.env.REDIRECT_URI || `https://${req.headers.host}/api/callback`;

  try {
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        client_id,
        client_secret,
        code,
        redirect_uri,
      }),
    });

    const data = await response.json();

    if (data.error) {
      return res.status(400).send(`Error de autenticación: ${data.error_description || data.error}`);
    }

    const token = data.access_token;
    if (!token) {
      return res.status(400).send(`Error: No se recibió token de acceso de GitHub. Detalles: ${JSON.stringify(data)}`);
    }
    
    // HTML callback message to Decap CMS
    const content = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="utf-8">
        <title>Autorizando...</title>
      </head>
      <body>
        <p style="text-align: center; font-family: sans-serif; margin-top: 50px; color: #666;">
          Autorización completada. Conectando con el panel...
        </p>
        <script>
          (function() {
            const token = ${JSON.stringify(token)};
            const stringMessage = 'authorization:github:success:' + JSON.stringify({ token: token, provider: 'github' });
            const objectMessage = {
              provider: "github",
              data: { token: token },
              status: "success"
            };
            
            if (window.opener) {
              window.opener.postMessage(stringMessage, '*');
              window.opener.postMessage(objectMessage, '*');
              window.close();
            } else {
              document.body.innerHTML = '<p style="text-align: center; font-family: sans-serif; margin-top: 50px; color: #cc0000;">Error: No se pudo comunicar con la ventana principal. Por favor, cierra esta pestaña e intenta de nuevo.</p>';
            }
          })();
        </script>
      </body>
      </html>
    `;
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(content);
  } catch (error) {
    console.error('OAuth Callback Error:', error);
    res.status(500).send(`Error en el servidor: ${error.message}`);
  }
}
