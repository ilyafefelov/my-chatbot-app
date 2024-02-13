<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-sky-300 p-8">
  <div class="flex flex-col items-center justify-center mb-4 rounded-lg">
      <picture>
        <source srcset="./assets/1500x500.jpg" media="(min-width: 768px)">
        <img src="./assets/1500x500.jpg" alt="My Image" class="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 h-auto rounded-lg mx-auto">
      </picture>
      <h1 class="text-4xl font-bold text-pretty text-pink-100 text-center mt-8">Full Iron Design </h1>
      <h2 class="text-3xl text-pretty text-pink-100 text-center">
        <span class="italic text-xl font-thin">w/</span>
        <span class="text-cyan-900 font-medium"> Illya Fefelov</span>
      </h2>
  </div>
  
    
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
        
        <div class="text-center mt-2 transition-all duration-300 ease-linear"
              v-if="isLoading"
        >
          <span class="text-orange-500">loading...</span>
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
    const response = await sendMessageToWit(userInput.value);
    messages.value.push({ text: userInput.value, sender: 'user' });
    
      isLoading.value = true;
    
    botResponse.value = response?.response?.text;
    if (botResponse.value) {
      setTimeout(() => {
        messages.value.push({ text: botResponse.value, sender: 'bot' });
      }, 1800); // Add a delay of 1000 milliseconds (1 second)
    }
    isLoading.value = false;
    userInput.value = '';

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
