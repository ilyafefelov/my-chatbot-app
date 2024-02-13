import { mount } from '@vue/test-utils';
import App from './App.vue';

describe('App', () => {
  it('renders the chat window', () => {
    const wrapper = mount(App);
    const chatWindow = wrapper.find('.bg-white/60');
    expect(chatWindow.exists()).toBe(true);
  });

  it('displays user and bot messages', async () => {
    const wrapper = mount(App);
    const userInput = wrapper.find('input[type="text"]');
    const sendButton = wrapper.find('button');
    const messageList = wrapper.find('.bg-orange-100/50');

    // Simulate user input and send message
    userInput.setValue('Hello');
    sendButton.trigger('submit');

    // Wait for bot response
    await wrapper.vm.$nextTick();

    // Check if user and bot messages are displayed
    const messages = messageList.findAll('.my-2');
    expect(messages.length).toBe(2);
    expect(messages[0].text()).toBe('Hello');
    expect(messages[0].classes()).toContain('text-orange-700');
    expect(messages[1].text()).toBe('Bot response');
    expect(messages[1].classes()).toContain('text-green-700');
  });

  it('scrolls to the bottom when a new message is added', async () => {
    const wrapper = mount(App);
    const userInput = wrapper.find('input[type="text"]');
    const sendButton = wrapper.find('button');
    const messageList = wrapper.find('.bg-orange-100/50');

    // Simulate user input and send message
    userInput.setValue('Hello');
    sendButton.trigger('submit');

    // Wait for bot response
    await wrapper.vm.$nextTick();

    // Check if message list is scrolled to the bottom
    expect(messageList.element.scrollTop).toBe(messageList.element.scrollHeight);
  });
});