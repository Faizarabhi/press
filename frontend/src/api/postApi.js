import axios from 'axios'

const API_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api'

export const fetchValidatedPosts = async () => {
  const response = await axios.get(`${API_URL}/posts/validated`)
  return response.data
}
