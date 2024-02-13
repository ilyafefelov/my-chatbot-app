import axios from 'axios';
// import { Wit } require 'node-wit';

// const API_URL = 'https://yourapi.endpoint/chat';const axios = require('axios');

export const sendMessageToWit = async (message) => {
    console.log('Sending message to Wit.ai:', message);
try {
    const response = await axios.post('https://api.wit.ai/event?v=20240213&session_id=prodwbp&context_map=%7B%7D', {
        type: 'message',
        message: message
    }, {
        headers: {
            'Authorization': 'Bearer 2FRBXS5WS2NETCO5MHTE6V7D3NKM55OS',
            'Content-Type': 'application/json'
        }
    });
    console.log('Received data:', response.data);
    return response.data;
} catch (error) {
    console.error('Error sending message to Wit.ai:', error);
    throw error;
}
};

// sendMessageToWit('Hello, world!')
//   .then(data => console.log('Received data:', data))
//   .catch(error => console.error('An error occurred:', error));
// const WIT_TOKEN = '2FRBXS5WS2NETCO5MHTE6V7D3NKM55OS';

// const witClient = new Wit({ accessToken: WIT_TOKEN });

// export const sendMessage = async (message) => {
//     try {
//         const response = await axios.post(`${API_URL}/send`, { message });
//         return response.data;
//     } catch (error) {
//         console.error('Error sending message:', error);
//         throw error;
//     }
// };

// export const sendMessage = async (message) => {
//     try {
//         const response = await witClient.message(message);
//         console.log('Processed message:', response);
//         return response;
//     } catch (error) {
//         console.error('Error processing message:', error);
//         throw error;
//     }
// };curl ^
//   -H "Authorization: Bearer 2FRBXS5WS2NETCO5MHTE6V7D3NKM55OS" ^
//   "https://api.wit.ai/message?v=20240213&q="
