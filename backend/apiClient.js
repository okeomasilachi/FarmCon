/**
 * Represents an API client for making HTTP requests to the backend server.
 */
class ApiClient {
  /**
   * Represents an API object.
   * @constructor
   * @param {string} baseURL - The base URL of the API.
   */
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  /**
   * Makes an asynchronous request to the specified endpoint.
   * @param {string} endpoint - The endpoint to send the request to.
   * @param {object} options - The options for the request.
   * @param {string} options.token - The authorization token for the request.
   * @param {object} options.headers - Additional headers for the request.
   * @returns {Promise<object>} - A promise that resolves to the JSON response from the server.
   */
  async request(endpoint, options = {}) {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${options.token || ''}`,
        ...options.headers,
      },
    });
    return response.json();
  }

  /**
   * Connects to the API using the provided email and password.
   * @param {string} email - The email address of the user.
   * @param {string} password - The password of the user.
   * @returns {Promise} A promise that resolves with the API response.
   */
  async connect(email, password) {
    const auth = btoa(`${email}:${password}`);
    console.log(auth);
    return this.request('/connect', {
      method: 'GET',
      headers: { 'Authorization': `Basic ${auth}` },
    });
  }

  /**
   * Disconnects from the server using the provided token.
   * @param {string} token - The authentication token.
   * @returns {Promise} - A promise that resolves when the disconnect request is complete.
   */
  async disconnect(token) {
    return this.request('/disconnect', {
      method: 'GET',
      token: token,
    });
  }


  /**
   * Creates a new user.
   *
   * @param {Object} userData - The user data.
   * @param {File} profilePicture - The user's profile picture.
   * @returns {Promise<Object>} - A promise that resolves to the response JSON.
   */
  async createUser(userData, profilePicture) {
    const formData = new FormData();
    Object.keys(userData).forEach(key => formData.append(key, userData[key]));
    if (profilePicture) {
      formData.append('profile_picture', profilePicture);
    }

    const response = await fetch(`${this.baseURL}/users`, {
      method: 'POST',
      body: formData,
    });

    return response.json();
  }

  /**
   * Retrieves all users from the server.
   * @returns {Promise<Array<Object>>} A promise that resolves to an array of user objects.
   */
  async getAllUsers() {
    return this.request('/users');
  }

  /**
   * Retrieves the current user information.
   *
   * @param {string} token - The authentication token.
   * @returns {Promise<Object>} - A promise that resolves to the current user object.
   */
  async getCurrentUser(token) {
    return this.request('/users/me', {
      method: 'GET',
      token: token,
    });
  }

  /**
   * Updates the user data.
   *
   * @param {Object} userData - The updated user data.
   * @param {string} token - The user's authentication token.
   * @returns {Promise} A promise that resolves with the updated user data.
   */
  async updateUser(userData, token) {
    return this.request('/users/me', {
      method: 'PUT',
      body: JSON.stringify(userData),
      token: token,
    });
  }

  /**
   * Deletes the user associated with the provided token.
   *
   * @param {string} token - The authentication token of the user.
   * @returns {Promise} A promise that resolves when the user is successfully deleted.
   */
  async deleteUser(token) {
    return this.request('/users/me', {
      method: 'DELETE',
      token: token,
    });
  }

  // Product Endpoints
  /**
   * Creates a new product.
   *
   * @param {Object} productData - The data of the product to be created.
   * @param {File} productImage - The image file of the product (optional).
   * @param {string} token - The authorization token.
   * @returns {Promise<Object>} - A promise that resolves to the response JSON.
   */
  async createProduct(productData, productImage, token) {
    const formData = new FormData();
    Object.keys(productData).forEach(key => formData.append(key, productData[key]));
    if (productImage) {
      formData.append('product_image', productImage);
    }

    const response = await fetch(`${this.baseURL}/products`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: formData,
    });

    return response.json();
  }

  /**
   * Retrieves all products from the server.
   * @returns {Promise<Array>} A promise that resolves to an array of products.
   */
  async getAllProducts() {
    return this.request('/products');
  }

  /**
   * Retrieves a product by its ID.
   *
   * @param {string} productId - The ID of the product to retrieve.
   * @param {string} token - The authentication token.
   * @returns {Promise} - A promise that resolves with the retrieved product.
   */
  async getProduct(productId, token) {
    return this.request(`/products/${productId}`, {
      method: 'GET',
      token: token,
    });
  }

  /**
   * Updates a product with the given product ID and data.
   * @param {string} productId - The ID of the product to update.
   * @param {object} productData - The data to update the product with.
   * @param {string} token - The authentication token.
   * @returns {Promise} A promise that resolves with the updated product data.
   */
  async updateProduct(productId, productData, token) {
    return this.request(`/products/${productId}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
      token: token,
    });
  }

  /**
   * Deletes a product.
   *
   * @param {string} productId - The ID of the product to delete.
   * @param {string} token - The authentication token.
   * @returns {Promise} A promise that resolves when the product is deleted.
   */
  async deleteProduct(productId, token) {
    return this.request(`/products/${productId}`, {
      method: 'DELETE',
      token: token,
    });
  }

  /**
   * Uploads a product image to the server.
   * @param {string} productId - The ID of the product.
   * @param {File} productImage - The image file to upload.
   * @param {string} token - The authentication token.
   * @returns {Promise<Object>} - A promise that resolves to the JSON response from the server.
   */
  async uploadProductImage(productId, productImage, token) {
    const formData = new FormData();
    formData.append('product_image', productImage);

    const response = await fetch(`${this.baseURL}/product/${productId}/upload`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: formData,
    });

    return response.json();
  }

  // Feedback Endpoints
  /**
   * Creates feedback.
   *
   * @param {Object} feedbackData - The feedback data to be created.
   * @returns {Promise} A promise that resolves to the created feedback.
   */
  async createFeedback(feedbackData) {
    return this.request('/feedback', {
      method: 'POST',
      body: JSON.stringify(feedbackData),
    });
  }

  /**
   * Retrieves feedback by user ID.
   *
   * @param {string} userId - The ID of the user.
   * @returns {Promise} A promise that resolves with the feedback data.
   */
  async getFeedbackByUser(userId) {
    return this.request(`/feedback/user/${userId}`);
  }

  /**
   * Retrieves feedback for a specific product.
   *
   * @param {string} productId - The ID of the product.
   * @returns {Promise} A promise that resolves with the feedback data.
   */
  async getFeedbackByProduct(productId) {
    return this.request(`/feedback/product/${productId}`);
  }

  /**
   * Deletes a feedback by its ID.
   *
   * @param {string} feedbackId - The ID of the feedback to be deleted.
   * @returns {Promise} A promise that resolves when the feedback is successfully deleted.
   */
  async deleteFeedback(feedbackId) {
    return this.request(`/feedback/${feedbackId}`, {
      method: 'DELETE',
    });
  }
}

const apiClient = new ApiClient('http://api.okeoma.tech/api');

apiClient.connect('onyedibia@gmail.com', 'password').then(response => console.log(response));
apiClient.getAllUsers().then(users => console.log(users));
