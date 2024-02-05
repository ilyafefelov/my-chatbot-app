<template>
  <div class="w-full h-screen max-h-screen bg-blue-700 flex items-center justify-center p-4">
    <div class="p-2 w-full max-w-md flex flex-col h-400px md:h-full md:min-h-[500px] ma bg-white shadow-lg rounded-lg">
      <div class="flex-grow overflow-y-auto mb-4 p-2 bg-blue-100 rounded-lg max-h-screen" style="max-height: calc(100vh - 4rem);">
        <div v-for="(message, index) in messages" :key="index" class="my-2 p-2 bg-white rounded-lg shadow">
          <span :class="message.sender === 'user' ? 'text-blue-700' : 'text-green-700'">
            {{ message.text }}
          </span>
        </div>
      </div>
      <form @submit.prevent="sendMessage" class="flex">
        <input v-model="userInput" type="text" placeholder="Type a message..." class="w-12 sm:w-auto flex-grow p-2 rounded-l-lg border-2 border-blue-500 outline-none focus:border-blue-700">
        <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-r-lg">
          Send
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import './index.css'; // Import Tailwind CSS

export default {
  setup() {
    const userInput = ref('');
    const messages = ref([]);

    const sendMessage = () => {
      if (userInput.value.trim()) {
        messages.value.push({ text: userInput.value, sender: 'user' });
        userInput.value = ''; // Clear input after sending

        // Simulate a bot response
        setTimeout(() => {
          const botMessage = {
            text: "I'm a chatbot, and I'm here to help you!",
            sender: 'bot',
          };
          messages.value.push(botMessage);
        }, 1000);
      }
    };

    return { userInput, messages, sendMessage };
  },
};
</script>

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
