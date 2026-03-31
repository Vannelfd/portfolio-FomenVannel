const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const prisma = require('../prismaClient')

const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const admin = await prisma.admin.findUnique({ where: { email } })
    if (!admin) return res.status(404).json({ message: 'Admin non trouvé' })

    const motDePasseValide = await bcrypt.compare(password, admin.password)
    if (!motDePasseValide) return res.status(401).json({ message: 'Mot de passe incorrect' })

    const token = jwt.sign(
      { id: admin.id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.json({ token, message: 'Connexion réussie' })
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error })
  }
}

module.exports = { login }