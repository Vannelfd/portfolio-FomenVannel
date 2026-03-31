const bcrypt = require('bcryptjs')
const prisma = require('./src/prismaClient')

async function createAdmin() {
  const hashedPassword = await bcrypt.hash('Lesprinteur5', 10)

  const admin = await prisma.admin.create({
    data: {
      email: 'fomensmith@gmail.com',
      password: hashedPassword
    }
  })

  console.log('Admin créé avec succès :', admin.email)
  process.exit(0)
}

createAdmin()