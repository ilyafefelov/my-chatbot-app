declare module '@/services/chatServices' {
    export function sendMessageToWit(message: string): Promise<{ response?: { text: string } }>;
}