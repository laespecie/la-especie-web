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
} catch (err) {
  console.error('Error building posts index:', err);
  process.exit(1);
}
