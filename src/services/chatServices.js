import axios from "axios";

export const sendMessageToWit = async (message) => {
	// console.log('Sending message to Wit.ai:', message);
	try {
		const response = await axios.post(
			import.meta.env.VITE_WIT_AI_URL,
			{
				type: "message",
				message: message,
			},
			{
				headers: {
					Authorization: import.meta.env.VITE_WIT_AI_AUTHORIZATION,
					"Content-Type": "application/json",
				},
			}
		);
		// console.log('Received data:', response.data);
		return response.data;
	} catch (error) {
		console.error("Error sending message to Wit.ai:", error);
		throw error;
	}
};
