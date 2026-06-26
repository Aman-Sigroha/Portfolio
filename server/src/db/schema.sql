-- =============================================
-- Portfolio Database Schema
-- =============================================

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id          SERIAL PRIMARY KEY,
  title       VARCHAR(200)  NOT NULL,
  subtitle    VARCHAR(200),
  description TEXT          NOT NULL,
  tags        TEXT[]        DEFAULT '{}',
  github      VARCHAR(500),
  live        VARCHAR(500),
  image_url   VARCHAR(500),
  featured    BOOLEAN       DEFAULT false,
  sort_order  INTEGER       DEFAULT 0,
  created_at  TIMESTAMPTZ   DEFAULT NOW(),
  updated_at  TIMESTAMPTZ   DEFAULT NOW()
);

-- Contact messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(200)  NOT NULL,
  email       VARCHAR(300)  NOT NULL,
  company     VARCHAR(200),
  service     VARCHAR(100),
  message     TEXT          NOT NULL,
  read        BOOLEAN       DEFAULT false,
  created_at  TIMESTAMPTZ   DEFAULT NOW()
);

-- Skills table (optional — for dynamic skills page)
CREATE TABLE IF NOT EXISTS skills (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(100)  NOT NULL,
  category    VARCHAR(100)  NOT NULL,  -- e.g. 'Frontend', 'Backend', 'Database', 'DevOps'
  level       SMALLINT      DEFAULT 80 CHECK (level BETWEEN 0 AND 100),
  icon        VARCHAR(100),
  sort_order  INTEGER       DEFAULT 0
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects (featured);
CREATE INDEX IF NOT EXISTS idx_contact_messages_read ON contact_messages (read);
CREATE INDEX IF NOT EXISTS idx_skills_category ON skills (category);

-- ── Seed Data ──────────────────────────────────

INSERT INTO projects (title, subtitle, description, tags, github, featured, sort_order) VALUES
(
  'Care4Crisis',
  'Blockchain Donation Platform',
  'Built a blockchain donation platform enabling secure and transparent on-chain transactions. Automated smart contract fund distribution workflows reducing manual operational effort by 85%.',
  ARRAY['React.js', 'Node.js', 'Ethereum', 'Solana', 'Web3.js'],
  'https://github.com/Aman-Sigroha/Care4Crisis',
  true,
  1
),
(
  'AI-Powered KYC System',
  'Identity Verification Platform',
  'Created AI-based KYC verification workflows using OCR, facial recognition, and liveness detection. Implemented async pipelines enabling scalable concurrent identity verification at 99%+ uptime.',
  ARRAY['FastAPI', 'Python', 'Docker', 'OpenCV', 'OCR'],
  'https://github.com/Aman-Sigroha/kyc',
  true,
  2
),
(
  'Yacht Charter API',
  'Scalable Backend Platform',
  'Engineered scalable REST APIs integrating 38+ advanced yacht search filters and external Nausys API services. Improved backend throughput by 40% using aggregation pipelines and async I/O.',
  ARRAY['Node.js', 'Express', 'MongoDB', 'REST API', 'Nausys'],
  NULL,
  true,
  3
)
ON CONFLICT DO NOTHING;

INSERT INTO skills (name, category, level, sort_order) VALUES
-- Frontend
('React.js', 'Frontend', 92, 1),
('Next.js', 'Frontend', 88, 2),
('Tailwind CSS', 'Frontend', 90, 3),
('TypeScript', 'Frontend', 82, 4),
('HTML5 / CSS3', 'Frontend', 95, 5),
-- Backend
('Node.js', 'Backend', 90, 1),
('Express.js', 'Backend', 90, 2),
('FastAPI', 'Backend', 85, 3),
('REST APIs', 'Backend', 95, 4),
('WebSockets', 'Backend', 78, 5),
-- Databases
('PostgreSQL', 'Database', 85, 1),
('MongoDB', 'Database', 88, 2),
('MySQL', 'Database', 75, 3),
('SQL', 'Database', 88, 4),
-- DevOps & Tools
('Docker', 'DevOps', 80, 1),
('Git / GitHub', 'DevOps', 92, 2),
('Railway', 'DevOps', 82, 3),
('Vercel', 'DevOps', 85, 4),
('AWS', 'DevOps', 70, 5),
-- Languages
('JavaScript', 'Languages', 95, 1),
('TypeScript', 'Languages', 82, 2),
('Python', 'Languages', 85, 3),
('Java', 'Languages', 70, 4)
ON CONFLICT DO NOTHING;
