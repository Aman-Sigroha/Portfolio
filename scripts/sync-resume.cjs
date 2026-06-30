const { copyFileSync, existsSync, mkdirSync } = require('fs')
const { join } = require('path')

const root = join(__dirname, '..')
const source = join(root, 'Aman Sigroha Resume.pdf')
const targets = [
  join(root, 'client', 'public', 'Aman_Sigroha_Resume.pdf'),
  join(root, 'server', 'assets', 'resume', 'Aman_Sigroha_Resume.pdf'),
]

if (!existsSync(source)) {
  console.warn('[sync-resume] Source not found:', source)
  process.exit(0)
}

mkdirSync(join(root, 'server', 'assets', 'resume'), { recursive: true })

for (const target of targets) {
  copyFileSync(source, target)
  console.log('[sync-resume] Copied to', target)
}
