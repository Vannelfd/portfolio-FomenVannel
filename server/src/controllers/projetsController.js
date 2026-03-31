const prisma = require('../prismaClient')

const getTousLesProjets = async (req, res) => {
  try {
    const projets = await prisma.projet.findMany({
      orderBy: { createdAt: 'desc' }
    })
    res.json(projets)
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error })
  }
}

const getUnProjet = async (req, res) => {
  try {
    const projet = await prisma.projet.findUnique({
      where: { id: req.params.id }
    })
    if (!projet) return res.status(404).json({ message: 'Projet non trouvé' })
    res.json(projet)
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error })
  }
}

const creerProjet = async (req, res) => {
  try {
    const { titre, description, imageUrl, technologies, lienDemo, lienGithub, categorie } = req.body
    const projet = await prisma.projet.create({
      data: { titre, description, imageUrl, technologies, lienDemo, lienGithub, categorie }
    })
    res.status(201).json(projet)
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error })
  }
}

const modifierProjet = async (req, res) => {
  try {
    const { titre, description, imageUrl, technologies, lienDemo, lienGithub, categorie } = req.body
    const projet = await prisma.projet.update({
      where: { id: req.params.id },
      data: { titre, description, imageUrl, technologies, lienDemo, lienGithub, categorie }
    })
    res.json(projet)
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error })
  }
}

const supprimerProjet = async (req, res) => {
  try {
    await prisma.projet.delete({ where: { id: req.params.id } })
    res.json({ message: 'Projet supprimé avec succès' })
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error })
  }
}

module.exports = { getTousLesProjets, getUnProjet, creerProjet, modifierProjet, supprimerProjet }