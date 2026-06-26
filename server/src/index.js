import app from './app.js'

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`)
  console.log(`   NODE_ENV: ${process.env.NODE_ENV || 'development'}`)
})
