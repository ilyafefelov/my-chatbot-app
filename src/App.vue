

<script setup>
import { ref } from 'vue';
import './index.css'; // Import Tailwind CSS
import { sendMessageToWit } from './services/chatServices.js';

const userInput = ref('');
const messages = ref([]);

const handleSendMessage = async () => {
  if (userInput.value.trim()) {
    try {
      const response = await sendMessageToWit(userInput.value);
      const botResponse = response?.response?.text;
      console.log('botResponse:', botResponse);
      messages.value.push({ text: userInput.value, sender: 'user' });
      messages.value.push({ text: botResponse, sender: 'bot' });
      userInput.value = ''; // Clear input after sending
    } catch (error) {
      console.error('Sending message failed:', error);
    }
  }
};
</script>

<template>
  <div class="w-full h-screen max-h-screen bg-teal-900 flex items-center justify-center p-4">
    <div class="p-2 w-full max-w-md flex flex-col h-400px md:h-full md:min-h-[500px] ma bg-white/60 shadow-lg rounded-lg">
      <div class="flex-grow overflow-y-auto mb-4 p-2 bg-orange-100/50 rounded-lg max-h-screen" style="max-height: calc(100vh - 4rem);">
        <div v-for="(message, index) in messages" :key="index" class="my-2 p-2 bg-white rounded-lg shadow">
          <span :class="message.sender === 'user' ? 'text-orange-700' : 'text-green-700'">
            {{ message.text }}
          </span>
        </div>
      </div>
      <form @submit.prevent="handleSendMessage" class="flex">
        <input v-model="userInput" type="text" placeholder="Type a message..." class="w-12 sm:w-auto flex-grow p-2 rounded-l-lg border-2 border-orange-500 outline-none focus:border-orange-700">
        <button type="submit" class="bg-orange-500 hover:bg-orange-700 text-white py-2 px-4 rounded-r-lg">
          Send
        </button>
      </form>
    </div>
  </div>
</template>


<style scoped>
/* Custom class for the chat window height */
.h-400px {
  height: 400px; /* Ensures a minimum height of 500px */
}

/* Responsive adjustment for smaller screens */
@media (max-width: 768px) {
  .h-500px {
    height: 100vh; /* Takes full viewport height on smaller devices */
  }
}
</style>
