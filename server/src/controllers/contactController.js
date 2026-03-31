const prisma = require('../prismaClient')
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

const envoyerMessage = async (req, res) => {
  try {
    const { nom, email, sujet, message } = req.body

    const nouveauMessage = await prisma.message.create({
      data: { nom, email, sujet, message }
    })

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: 'Nouveau message de ' + nom + ' — ' + sujet,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #F8FAFF; border-radius: 12px;">
          <h2 style="color: #378ADD; margin-bottom: 8px;">Nouveau message depuis ton portfolio</h2>
          <hr style="border: none; border-top: 1px solid #DBEAFE; margin-bottom: 20px;"/>
          <p><strong>Nom :</strong> ${nom}</p>
          <p><strong>Email :</strong> ${email}</p>
          <p><strong>Sujet :</strong> ${sujet}</p>
          <div style="margin-top: 16px; padding: 16px; background: #FFFFFF; border-radius: 8px; border: 1px solid #DBEAFE;">
            <p><strong>Message :</strong></p>
            <p style="color: #475569; line-height: 1.7;">${message}</p>
          </div>
          <hr style="border: none; border-top: 1px solid #DBEAFE; margin-top: 20px;"/>
          <p style="font-size: 12px; color: #94a3b8;">Message recu depuis portfolio-fomenvannel.vercel.app</p>
        </div>
      `,
    })

    res.status(201).json({ message: 'Message envoye avec succes', data: nouveauMessage })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Erreur serveur', error })
  }
}

const getTousLesMessages = async (req, res) => {
  try {
    const messages = await prisma.message.findMany({
      orderBy: { createdAt: 'desc' }
    })
    res.json(messages)
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error })
  }
}

module.exports = { envoyerMessage, getTousLesMessages }