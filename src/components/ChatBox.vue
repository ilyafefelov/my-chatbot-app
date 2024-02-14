<template>
  <div class="w-full max-w-md p-4 bg-white bg-opacity-30 border-t-2 border-t-white/20  shadow-2xl rounded-lg">
    <div ref="messageList" class="flex shadow-inner shadow-yellow-900/5 flex-col min-h-48 max-h-[80vh] mb-4 p-2 bg-orange-100/50 rounded-lg">
      <transition name="fade">
        <div v-if="!messages.length" 
            class="border-2 transition-all flex items-center

                justify-center h-full flex-grow text-slate-900 text-2xl
                font-mono shadow-inner shadow-yellow-900/5 rounded-lg bg-orange-100/50"
        >
                 Hi!😊
        </div>
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
      <input v-model="userInput"
             type="text"
             placeholder="Type a message..."
             class="w-full sm:w-auto flex-grow p-2 rounded-l-lg border-2 border-r-0 border-orange-500/90 outline-none focus:border-orange-900">
      <button type="submit" class="bg-orange-500/90 hover:bg-orange-700 text-white py-2 px-4 rounded-r-lg">
        Send
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue';
import { sendMessageToWit } from '@/services/chatServices.js';

const userInput = ref('');
const messages = ref([]);
const isLoading = ref(false);
const botResponse = ref(null);
const messageList = ref(null);

const handleSendMessage = async () => {
    // Check if the user input is empty or if a request is in progress
    if (!userInput.value.trim() || isLoading.value) {
        return;
    }

    isLoading.value = true;

    const response = await sendMessageToWit(userInput.value);
    messages.value.push({ text: userInput.value, sender: 'user' });

    botResponse.value = response?.response?.text;
    if (botResponse.value) {
        setTimeout(() => {
            messages.value.push({ text: botResponse.value, sender: 'bot' });
            isLoading.value = false; // Move this inside the setTimeout
        }, 1800); // Add a delay of 1800 milliseconds (1.8 seconds)
    } else {
        isLoading.value = false; // If there's no bot response, set isLoading to false immediately
    }

    userInput.value = '';

    nextTick(() => {
        if (messageList.value) {
            messageList.value.scrollTop = messageList.value.scrollHeight;
        }
    });
};

watch(botResponse, () => {
  nextTick(() => {
    if (messageList.value) {
      messageList.value.scrollTop = messageList.value.scrollHeight;
    }
  });
});
</script>