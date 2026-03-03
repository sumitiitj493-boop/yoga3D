/**
 * Yoga 3D App - API Integration Module
 * Handles all backend API calls with authentication
 */

const API_BASE = window.location.origin;

class YogaAPI {
    constructor() {
        this.token = localStorage.getItem('yogaToken');
        this.user = JSON.parse(localStorage.getItem('yogaUser'));
    }

    // Helper method for API calls
    async request(endpoint, options = {}) {
        const headers = {
            'Content-Type': 'application/json',
            ...(this.token && { 'Authorization': `Bearer ${this.token}` })
        };

        const config = {
            ...options,
            headers: { ...headers, ...options.headers }
        };

        try {
            const response = await fetch(`${API_BASE}${endpoint}`, config);
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || 'Request failed');
            }
            
            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    // ========== AUTHENTICATION ==========
    
    async register(userData) {
        const data = await this.request('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData)
        });
        
        this.token = data.token;
        this.user = data.user;
        localStorage.setItem('yogaToken', data.token);
        localStorage.setItem('yogaUser', JSON.stringify(data.user));
        
        return data;
    }

    async login(credentials) {
        const data = await this.request('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify(credentials)
        });
        
        this.token = data.token;
        this.user = data.user;
        localStorage.setItem('yogaToken', data.token);
        localStorage.setItem('yogaUser', JSON.stringify(data.user));
        
        return data;
    }

    logout() {
        this.token = null;
        this.user = null;
        localStorage.removeItem('yogaToken');
        localStorage.removeItem('yogaUser');
        window.location.href = '/';
    }

    async getMe() {
        const data = await this.request('/api/auth/me');
        this.user = data.data;
        localStorage.setItem('yogaUser', JSON.stringify(data.data));
        return data.data;
    }

    async updateProfile(updates) {
        const data = await this.request('/api/auth/updatedetails', {
            method: 'PUT',
            body: JSON.stringify(updates)
        });
        
        this.user = data.data;
        localStorage.setItem('yogaUser', JSON.stringify(data.data));
        return data.data;
    }

    async toggleFavorite(asanaId) {
        const data = await this.request(`/api/auth/favorites/${asanaId}`, {
            method: 'POST'
        });
        
        this.user = data.data;
        localStorage.setItem('yogaUser', JSON.stringify(data.data));
        return data.data;
    }

    isAuthenticated() {
        return !!this.token;
    }

    // ========== ASANAS ==========

    async getAllAsanas() {
        return await this.request('/api/asanas');
    }

    async getAsana(id) {
        return await this.request(`/api/asanas/${id}`);
    }

    // ========== PROGRESS ==========

    async getAllProgress() {
        return await this.request('/api/progress');
    }

    async getAsanaProgress(asanaId) {
        return await this.request(`/api/progress/${asanaId}`);
    }

    async recordPractice(asanaId, sessionData) {
        return await this.request(`/api/progress/${asanaId}`, {
            method: 'POST',
            body: JSON.stringify(sessionData)
        });
    }

    async updateNotes(asanaId, notes) {
        return await this.request(`/api/progress/${asanaId}/notes`, {
            method: 'PUT',
            body: JSON.stringify({ notes })
        });
    }

    async getUserStats() {
        return await this.request('/api/progress/stats/user');
    }
}

// Export singleton instance
const yogaAPI = new YogaAPI();

// Make available globally
window.yogaAPI = yogaAPI;