const BASE_URL =
  import.meta.env.VITE_API_URL ||
  'https://portfolio-xof8.onrender.com';

const getAuthHeaders = (
  { isJson = true } = {}
) => {
  const headers = {};
  const token =
    localStorage.getItem(
      'authToken'
    );

  if (isJson) {
    headers[
      'Content-Type'
    ] = 'application/json';
  }

  if (token) {
    headers.Authorization =
      `Token ${token}`;
  }

  return headers;
};

const handleResponse =
  async response => {
    if (
      response.status === 204
    )
      return null;

    const contentType =
      response.headers.get(
        'content-type'
      ) || '';

    const data =
      contentType.includes(
        'application/json'
      )
        ? await response.json()
        : await response.text();

    if (!response.ok) {
      const message =
        typeof data ===
        'string'
          ? data
          : data.detail ||
            data
              .non_field_errors?.[0] ||
            'Something went wrong';

      throw {
        status:
          response.status,
        message,
        errors: data,
      };
    }

    return data;
  };

const buildProjectFormData =
  projectData => {
    const formData =
      new FormData();

    [
      'title',
      'description',
      'tech_stack',
      'order',
      'project_progress',
      'status',
    ].forEach(field => {
      const value =
        projectData[field];

      if (
        value !==
          undefined &&
        value !== null &&
        value !== ''
      ) {
        formData.append(
          field,
          value
        );
      }
    });

    [
      'github_url',
      'live_url',
      'image_url',
    ].forEach(field => {
      if (
        projectData[
          field
        ] !== undefined &&
        projectData[
          field
        ] !== null
      ) {
        formData.append(
          field,
          projectData[
            field
          ]
        );
      }
    });

    if (
      Array.isArray(
        projectData.existing_image_ids
      )
    ) {
      projectData.existing_image_ids.forEach(
        id => {
          formData.append(
            'existing_image_ids',
            id
          );
        }
      );
    }

    if (
      projectData.sync_existing_images
    ) {
      formData.append(
        'sync_existing_images',
        '1'
      );
    }

    if (
      Array.isArray(
        projectData.new_images
      )
    ) {
      projectData.new_images.forEach(
        file => {
          formData.append(
            'new_images',
            file
          );
        }
      );
    }

    return formData;
  };

export const api = {
  login: async (
    username,
    password
  ) => {
    const res =
      await fetch(
        `${BASE_URL}/api/login/`,
        {
          method: 'POST',
          headers:
            getAuthHeaders(),
          body: JSON.stringify(
            {
              username,
              password,
            }
          ),
        }
      );

    const data =
      await handleResponse(
        res
      );

    if (data?.token) {
      localStorage.setItem(
        'authToken',
        data.token
      );

      localStorage.setItem(
        'authUsername',
        data.username
      );
    }

    return data;
  },

  logout: () => {
    localStorage.removeItem(
      'authToken'
    );

    localStorage.removeItem(
      'authUsername'
    );
  },

  isAuthenticated:
    () =>
      !!localStorage.getItem(
        'authToken'
      ),

  getUsername: () =>
    localStorage.getItem(
      'authUsername'
    ),

  getProjects:
    async () => {
      const res =
        await fetch(
          `${BASE_URL}/api/projects/`,
          {
            method: 'GET',
            headers:
              getAuthHeaders(
                {
                  isJson: false,
                }
              ),
          }
        );

      return handleResponse(
        res
      );
    },

  createProject:
    async projectData => {
      const res =
        await fetch(
          `${BASE_URL}/api/projects/`,
          {
            method: 'POST',
            headers:
              getAuthHeaders(
                {
                  isJson: false,
                }
              ),
            body:
              buildProjectFormData(
                projectData
              ),
          }
        );

      return handleResponse(
        res
      );
    },

  updateProject:
    async (
      id,
      projectData
    ) => {
      const res =
        await fetch(
          `${BASE_URL}/api/projects/${id}/`,
          {
            method: 'PUT',
            headers:
              getAuthHeaders(
                {
                  isJson: false,
                }
              ),
            body:
              buildProjectFormData(
                projectData
              ),
          }
        );

      return handleResponse(
        res
      );
    },

  deleteProject:
    async id => {
      const res =
        await fetch(
          `${BASE_URL}/api/projects/${id}/`,
          {
            method: 'DELETE',
            headers:
              getAuthHeaders(
                {
                  isJson: false,
                }
              ),
          }
        );

      return handleResponse(
        res
      );
    },

  getExperiences:
    async () => {
      const res =
        await fetch(
          `${BASE_URL}/api/experience/`,
          {
            method: 'GET',
            headers:
              getAuthHeaders(
                {
                  isJson: false,
                }
              ),
          }
        );

      return handleResponse(
        res
      );
    },

  createExperience:
    async expData => {
      const res =
        await fetch(
          `${BASE_URL}/api/experience/`,
          {
            method: 'POST',
            headers:
              getAuthHeaders(),
            body:
              JSON.stringify(
                expData
              ),
          }
        );

      return handleResponse(
        res
      );
    },

  updateExperience:
    async (
      id,
      expData
    ) => {
      const res =
        await fetch(
          `${BASE_URL}/api/experience/${id}/`,
          {
            method: 'PUT',
            headers:
              getAuthHeaders(),
            body:
              JSON.stringify(
                expData
              ),
          }
        );

      return handleResponse(
        res
      );
    },

  deleteExperience:
    async id => {
      const res =
        await fetch(
          `${BASE_URL}/api/experience/${id}/`,
          {
            method: 'DELETE',
            headers:
              getAuthHeaders(
                {
                  isJson: false,
                }
              ),
          }
        );

      return handleResponse(
        res
      );
    },

  getSkills:
    async () => {
      const res =
        await fetch(
          `${BASE_URL}/api/skills/`,
          {
            method: 'GET',
            headers:
              getAuthHeaders(
                {
                  isJson: false,
                }
              ),
          }
        );

      return handleResponse(
        res
      );
    },

  createSkill:
    async skillData => {
      const res =
        await fetch(
          `${BASE_URL}/api/skills/`,
          {
            method: 'POST',
            headers:
              getAuthHeaders(),
            body:
              JSON.stringify(
                skillData
              ),
          }
        );

      return handleResponse(
        res
      );
    },

  updateSkill:
    async (
      id,
      skillData
    ) => {
      const res =
        await fetch(
          `${BASE_URL}/api/skills/${id}/`,
          {
            method: 'PUT',
            headers:
              getAuthHeaders(),
            body:
              JSON.stringify(
                skillData
              ),
          }
        );

      return handleResponse(
        res
      );
    },

  deleteSkill:
    async id => {
      const res =
        await fetch(
          `${BASE_URL}/api/skills/${id}/`,
          {
            method: 'DELETE',
            headers:
              getAuthHeaders(
                {
                  isJson: false,
                }
              ),
          }
        );

      return handleResponse(
        res
      );
    },

  chat: async ({
    message,
    history,
  }) => {
    const res =
      await fetch(
        `${BASE_URL}/api/chat/`,
        {
          method: 'POST',
          headers:
            getAuthHeaders(),
          body:
            JSON.stringify(
              {
                message,
                history,
              }
            ),
        }
      );

    return handleResponse(
      res
    );
  },

  resume: async () => {
    const res =
      await fetch(
        `${BASE_URL}/api/resume/`,
        {
          method: 'GET',
          headers:
            getAuthHeaders(
              {
                isJson: false,
              }
            ),
        }
      );

    return handleResponse(
      res
    );
  },
};