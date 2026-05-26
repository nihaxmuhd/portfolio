// API Client for the Developer Portfolio
// PLACEHOLDER: Set your production backend API URL here if deploying
const BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

const getHeaders = () => {
  const headers = {
    'Content-Type': 'application/json',
  };
  const token = localStorage.getItem('authToken');
  if (token) {
    headers['Authorization'] = `Token ${token}`;
  }
  return headers;
};

const handleResponse = async (response) => {
  if (response.status === 204) return null;
  const data = await response.json();
  if (!response.ok) {
    throw {
      status: response.status,
      message: data.detail || data.non_field_errors?.[0] || 'Something went wrong',
      errors: data
    };
  }
  return data;
};

export const api = {
  // Authentication
  login: async (username, password) => {
    const res = await fetch(`${BASE_URL}/api/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await handleResponse(res);
    if (data && data.token) {
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('authUsername', data.username);
    }
    return data;
  },

  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUsername');
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('authToken');
  },

  getUsername: () => {
    return localStorage.getItem('authUsername');
  },

  // Projects CRUD
  getProjects: async () => {
    const res = await fetch(`${BASE_URL}/api/projects/`, {
      method: 'GET',
      headers: getHeaders(),
    });
    return handleResponse(res);
  },

  createProject: async (projectData) => {
    const res = await fetch(`${BASE_URL}/api/projects/`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(projectData),
    });
    return handleResponse(res);
  },

  updateProject: async (id, projectData) => {
    const res = await fetch(`${BASE_URL}/api/projects/${id}/`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(projectData),
    });
    return handleResponse(res);
  },

  deleteProject: async (id) => {
    const res = await fetch(`${BASE_URL}/api/projects/${id}/`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    return handleResponse(res);
  },

  // Experience CRUD
  getExperiences: async () => {
    const res = await fetch(`${BASE_URL}/api/experience/`, {
      method: 'GET',
      headers: getHeaders(),
    });
    return handleResponse(res);
  },

  createExperience: async (expData) => {
    const res = await fetch(`${BASE_URL}/api/experience/`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(expData),
    });
    return handleResponse(res);
  },

  updateExperience: async (id, expData) => {
    const res = await fetch(`${BASE_URL}/api/experience/${id}/`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(expData),
    });
    return handleResponse(res);
  },

  deleteExperience: async (id) => {
    const res = await fetch(`${BASE_URL}/api/experience/${id}/`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    return handleResponse(res);
  },

  // Skills CRUD
  getSkills: async () => {
    const res = await fetch(`${BASE_URL}/api/skills/`, {
      method: 'GET',
      headers: getHeaders(),
    });
    return handleResponse(res);
  },

  createSkill: async (skillData) => {
    const res = await fetch(`${BASE_URL}/api/skills/`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(skillData),
    });
    return handleResponse(res);
  },

  updateSkill: async (id, skillData) => {
    const res = await fetch(`${BASE_URL}/api/skills/${id}/`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(skillData),
    });
    return handleResponse(res);
  },

  deleteSkill: async (id) => {
    const res = await fetch(`${BASE_URL}/api/skills/${id}/`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    return handleResponse(res);
  }
};
