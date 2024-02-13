import axios from 'axios';

export const sendMessageToWit = async (message) => {
    // console.log('Sending message to Wit.ai:', message);
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
    // console.log('Received data:', response.data);
    return response.data;
} catch (error) {
    console.error('Error sending message to Wit.ai:', error);
    throw error;
}
};