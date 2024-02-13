<template>
  <div class="flex items-center justify-center min-h-screen bg-teal-900">
    <div class="w-full max-w-md p-4 bg-white bg-opacity-60 shadow-lg rounded-lg">
      <div ref="messageList" class="flex flex-col min-h-48 max-h-[80vh] overflow-y-auto mb-4 p-2 bg-orange-100/50 rounded-lg">
        <transition name="fade">
          <div v-if="!messages.length" class="border-2 transition-all flex items-center justify-center h-full flex-grow">Hi😊</div>
        </transition>
        <transition-group name="fade" tag="div" class="message-container">
          <div v-for="(message, index) in messages" :key="index" class="my-2 p-2 bg-white rounded-lg shadow">
            <span :class="message.sender === 'user' ? 'text-orange-700' : 'text-green-700'">
              {{ message.text }}
            </span>
          </div>
        </transition-group>
        <div v-if="isLoading" class="text-center mt-2">
          <span class="text-orange-500">Loading...</span>
        </div>
      </div>

      <form @submit.prevent="handleSendMessage" class="flex">
        <input v-model="userInput" type="text" placeholder="Type a message..." class="w-full sm:w-auto flex-grow p-2 rounded-l-lg border-2 border-orange-500 outline-none focus:border-orange-700">
        <button type="submit" class="bg-orange-500 hover:bg-orange-700 text-white py-2 px-4 rounded-r-lg">
          Send
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue';
import './index.css'; // Import Tailwind CSS
import { sendMessageToWit } from './services/chatServices.js';

const userInput = ref('');
const messages = ref([]);
const isLoading = ref(false);
const botResponse = ref(null);
const messageList = ref(null);

const handleSendMessage = async () => {
  if (userInput.value.trim()) {
    isLoading.value = true;
    const response = await sendMessageToWit(userInput.value);
    botResponse.value = response?.response?.text;
    messages.value.push({ text: userInput.value, sender: 'user' });
    if (botResponse.value) {
      messages.value.push({ text: botResponse.value, sender: 'bot' });
    }
    userInput.value = '';
    isLoading.value = false;

    nextTick(() => {
      if (messageList.value) {
        messageList.value.scrollTop = messageList.value.scrollHeight;
      }
    });
  }
};

watch(botResponse, () => {
  nextTick(() => {
    if (messageList.value) {
      messageList.value.scrollTop = messageList.value.scrollHeight;
    }
  });
});
</script>

<style scoped>
/* Custom class for the chat window height */
.h-400px {
  height: 400px; /* Fixed height */
}

/* Responsive adjustment for smaller screens */
@media (max-width: 768px) {
  .h-400px {
    height: 100vh; /* Full viewport height on smaller devices */
  }
}

/* Fade Transition for Single Items and Groups */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.fade-move {
  transition: transform 0.5s;
}
</style>
