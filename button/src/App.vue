<template>
    <input v-model="outbox" name="outbox" />
    <button @click="sendtoinbox">Send to Inbox</button>
    <h3>[ {{ inbox }} ]</h3>
</template>

<script>
export default {
   name: "App",
   data() {
       return { outbox: "", inbox: "empty", }
   }, 
    methods: {
        sendtoinbox() {
            this.inbox = this.outbox;
        },
    },
}
</script>