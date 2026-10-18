import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to resolve modules from multiple potential node_modules locations
function findModule(name) {
  const candidates = [
    path.resolve(__dirname, 'node_modules', name),
    path.resolve(__dirname, '../../manage/backend/node_modules', name),
    path.resolve(__dirname, '../manage/backend/node_modules', name),
    path.resolve(__dirname, 'manage/backend/node_modules', name),
    path.resolve(process.cwd(), 'manage/backend/node_modules', name),
    path.resolve(process.cwd(), 'node_modules', name),
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) {
      return require(c);
    }
  }
  return require(name);
}

// Locate and load .env from manage/backend
function loadEnv() {
  const envCandidates = [
    path.resolve(__dirname, '../../manage/backend/.env'),
    path.resolve(__dirname, '../manage/backend/.env'),
    path.resolve(__dirname, 'manage/backend/.env'),
    path.resolve(process.cwd(), 'manage/backend/.env'),
    path.resolve(__dirname, '.env'),
    path.resolve(process.cwd(), '.env'),
  ];
  for (const envPath of envCandidates) {
    if (fs.existsSync(envPath)) {
      try {
        const dotenv = findModule('dotenv');
        dotenv.config({ path: envPath });
        console.log(`Loaded environment from: ${envPath}`);
        return;
      } catch (err) {
        console.warn(`Failed to parse ${envPath}:`, err.message);
      }
    }
  }
}

// Locate the viewers frontend data directory
function findDataDir() {
  const candidates = [
    path.resolve(__dirname, 'src/assets/data'),
    path.resolve(__dirname, 'viewers/frontend/src/assets/data'),
    path.resolve(__dirname, '../viewers/frontend/src/assets/data'),
    path.resolve(__dirname, '../../viewers/frontend/src/assets/data'),
    path.resolve(process.cwd(), 'viewers/frontend/src/assets/data'),
    path.resolve(process.cwd(), 'src/assets/data'),
  ];
  for (const d of candidates) {
    if (fs.existsSync(d)) {
      return d;
    }
  }
  const fallback = path.resolve(__dirname, 'src/assets/data');
  fs.mkdirSync(fallback, { recursive: true });
  return fallback;
}

const collections = [
  'abouts',
  'categories',
  'cvs',
  'educations',
  'experiences',
  'projects',
  'skills',
  'testimonials'
];

async function updateData() {
  console.log('--- Synchronizing Portfolio DB Data ---');
  loadEnv();

  const MONGODB_URI = process.env.MONGODB_URI

  const targetDir = findDataDir();
  console.log(`Target directory: ${targetDir}`);

  const mongoose = findModule('mongoose');
  const { EJSON } = mongoose.mongo.BSON;

  console.log('Connecting to MongoDB...');
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB successfully.\n');

  for (const collName of collections) {
    const docs = await mongoose.connection.db.collection(collName).find({}).toArray();
    const serialized = docs.map((doc) => EJSON.serialize(doc));
    const targetFile = path.join(targetDir, `portfolio.${collName}.json`);

    let oldCount = 0;
    if (fs.existsSync(targetFile)) {
      try {
        oldCount = JSON.parse(fs.readFileSync(targetFile, 'utf8')).length;
      } catch {
        oldCount = 0;
      }
    }

    fs.writeFileSync(targetFile, JSON.stringify(serialized, null, 2) + '\n', 'utf8');
    console.log(`  [OK] portfolio.${collName}.json: ${oldCount} -> ${docs.length} documents`);
  }

  await mongoose.disconnect();
  console.log('\nAll portfolio data successfully synchronized with MongoDB!\n');
}

updateData().catch((err) => {
  console.error('\nSync failed with error:', err);
  process.exit(1);
});
