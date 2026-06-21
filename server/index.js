const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}))

app.use(express.json({ limit: '5mb' }))
app.use(express.urlencoded({ limit: '5mb', extended: true }))

const projetsRoutes = require('./src/routes/projetsRoutes')
const authRoutes = require('./src/routes/authRoutes')
const contactRoutes = require('./src/routes/contactRoutes')

app.use('/api/projets', projetsRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/contact', contactRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'Serveur portfolio de FOMEN Vannel operationnel !' })
})

module.exports = app

if (require.main === module) {
  const PORT = process.env.PORT || 5000
  app.listen(PORT, () => {
    console.log('Serveur demarre sur le port ' + PORT)
  })
}