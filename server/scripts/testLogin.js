const axios = require('axios');

const testLogin = async () => {
  try {
    // Test with admin user
    console.log('Testing login with admin/password123...');
    
    const adminCredentials = {
      username: 'admin',
      password: 'password123'
    };
    
    console.log('Request payload:', JSON.stringify(adminCredentials));
    
    const response = await axios.post('http://localhost:3000/api/auth/login', adminCredentials, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Login successful!');
    console.log('Response:', JSON.stringify(response.data, null, 2));
    
    return response.data;
  } catch (error) {
    console.error('Login failed!');
    console.error('Error status:', error.response?.status);
    console.error('Error data:', JSON.stringify(error.response?.data, null, 2));
    
    // Log more details about the error
    if (error.response) {
      console.log('Response headers:', error.response.headers);
    }
    
    // Try with admin2 user
    try {
      console.log('\nTrying with admin2/password123...');
      
      const admin2Credentials = {
        username: 'admin2',
        password: 'password123'
      };
      
      console.log('Request payload:', JSON.stringify(admin2Credentials));
      
      const admin2Response = await axios.post('http://localhost:3000/api/auth/login', admin2Credentials, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Login with admin2 successful!');
      console.log('Response:', JSON.stringify(admin2Response.data, null, 2));
      
    } catch (admin2Error) {
      console.error('Login with admin2 failed!');
      console.error('Error status:', admin2Error.response?.status);
      console.error('Error data:', JSON.stringify(admin2Error.response?.data, null, 2));
    }
    
    // Try with test user
    try {
      console.log('\nTrying with test user...');
      const testUsers = await axios.get('http://localhost:3000/api/auth/test-users');
      
      if (testUsers.data && testUsers.data.users && testUsers.data.users.length > 0) {
        const testUser = testUsers.data.users[0];
        console.log(`Found test user: ${testUser.username}`);
        
        const testCredentials = {
          username: testUser.username,
          password: 'password123'
        };
        
        console.log('Request payload:', JSON.stringify(testCredentials));
        
        const testResponse = await axios.post('http://localhost:3000/api/auth/login', testCredentials, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        console.log('Login with test user successful!');
        console.log('Response:', JSON.stringify(testResponse.data, null, 2));
      } else {
        console.log('No test users found');
      }
    } catch (testError) {
      console.error('Error with test user:', testError.message);
    }
    
    throw error;
  }
};

testLogin()
  .then(() => console.log('Test completed successfully'))
  .catch(() => console.log('Test failed'));
