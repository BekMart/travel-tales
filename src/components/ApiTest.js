import React from 'react';
import api from '../api/axios';

const ApiTest = () => {
  const handleTestRequest = async () => {
    try {
      const response = await api.get('/');
      console.log('✅ API Response:', response.data);
    } catch (error) {
      console.error('❌ API Error:', error);
    }
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <h3>API Test</h3>
      <button onClick={handleTestRequest}>Test API Connection</button>
    </div>
  );
};

export default ApiTest;
