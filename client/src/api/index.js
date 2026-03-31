import axios from 'axios'

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
})

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const getProjets = () => API.get('/projets')
export const getProjet = (id) => API.get(`/projets/${id}`)
export const creerProjet = (data) => API.post('/projets', data)
export const modifierProjet = (id, data) => API.put(`/projets/${id}`, data)
export const supprimerProjet = (id) => API.delete(`/projets/${id}`)

export const login = (data) => API.post('/auth/login', data)

export const envoyerMessage = (data) => API.post('/contact', data)
export const getMessages = () => API.get('/contact')