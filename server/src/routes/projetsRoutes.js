const express = require('express')
const router = express.Router()
const authMiddleware = require('../middlewares/authMiddleware')
const {
  getTousLesProjets,
  getUnProjet,
  creerProjet,
  modifierProjet,
  supprimerProjet
} = require('../controllers/projetsController')

router.get('/', getTousLesProjets)
router.get('/:id', getUnProjet)
router.post('/', authMiddleware, creerProjet)
router.put('/:id', authMiddleware, modifierProjet)
router.delete('/:id', authMiddleware, supprimerProjet)

module.exports = router