<template>
	<div class="Messages">
		<pre class="Messages__Container">{{ messages | json }}</pre>
	</div>
</template>
<script>
export default {
	props: ['socket'],

	data() {
		return {
			messages: []
		}
	},

	methods: {
		tellUserHasConnected(data) {
			this.addInternalMessage('you are now connected to channel: ' + data.channel);
			this.addInternalMessage('your current nick is: ' + data.nick);
		},

		tellIfUserIsHere(data) {
			if(data.result){
				this.addInternalMessage('yup, '+data.nick+' is here.');
				return;
			} 

			this.addInternalMessage('nope, not here.')
		},

		addInternalMessage(message) {
			this.addMessage("lawl: " + message.toLowerCase());
		},

		addMessage(message) {
			this.messages.push(message.toLowerCase());
			let $msgContainer = document.querySelector('#app .Messages__Container');

			// we have to wait a bit for data to get sent to the container
			setTimeout(function() {
				$msgContainer.scrollTop = $msgContainer.scrollHeight;
			}, 1);
		},

		subscribeToEvents() {
	        this.socket.on('message-retrieve', this.addMessage.bind(this));
	        this.socket.on('message-internal', this.addInternalMessage.bind(this));
	        this.socket.on('user-sync', this.tellUserHasConnected.bind(this));
	        this.socket.on('user-here', this.tellIfUserIsHere.bind(this));
		}
	},

	ready() {
		this.subscribeToEvents();
	}
}
</script>

<style></style>