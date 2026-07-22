const fs = require('fs');
const path = require('path');

const postsDir = path.join(__dirname, 'content', 'posts');
const outputFile = path.join(__dirname, 'posts-index.json');

try {
  // Ensure content/posts directory exists
  if (!fs.existsSync(postsDir)) {
    fs.mkdirSync(postsDir, { recursive: true });
  }

  const files = fs.readdirSync(postsDir);
  const posts = [];

  files.forEach(file => {
    if (file.endsWith('.json')) {
      const filePath = path.join(postsDir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      try {
        const postData = JSON.parse(content);
        // Save the slug/id (filename without .json)
        postData.id = path.basename(file, '.json');
        posts.push(postData);
      } catch (err) {
        console.error(`Error parsing JSON in file: ${file}`, err);
      }
    }
  });

  // Sort posts by date descending (latest first)
  posts.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));

  fs.writeFileSync(outputFile, JSON.stringify(posts, null, 2), 'utf8');
  console.log(`Successfully built posts index with ${posts.length} articles.`);

  // --- BUILD OBITUARIOS INDEX ---
  const obituariosDir = path.join(__dirname, 'content', 'obituarios');
  const obituariosOutputFile = path.join(__dirname, 'obituarios-index.json');

  // Ensure content/obituarios directory exists
  if (!fs.existsSync(obituariosDir)) {
    fs.mkdirSync(obituariosDir, { recursive: true });
  }

  const obituariosFiles = fs.readdirSync(obituariosDir);
  const obituarios = [];

  obituariosFiles.forEach(file => {
    if (file.endsWith('.json')) {
      const filePath = path.join(obituariosDir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      try {
        const data = JSON.parse(content);
        data.id = path.basename(file, '.json');
        obituarios.push(data);
      } catch (err) {
        console.error(`Error parsing JSON in obituary file: ${file}`, err);
      }
    }
  });

  // Sort by filename descending (latest date first)
  obituarios.sort((a, b) => b.id.localeCompare(a.id));

  fs.writeFileSync(obituariosOutputFile, JSON.stringify(obituarios, null, 2), 'utf8');
  console.log(`Successfully built obituarios index with ${obituarios.length} items.`);

} catch (err) {
  console.error('Error building index:', err);
  process.exit(1);
}
