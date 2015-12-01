<template>
	<input class="Commandline"
	    type="text" 
	    autofocus
	    v-model="command"
	    v-on:keydown.enter="submitCommand"
	>
</template>

<script>
	import CommandParser from "../classes/CommandParser";

	export default {
		props: ['socket'],

		data() {
			return {
				command: "",
				commandParser: null
			}
		},

		methods: {
			submitCommand() {
				this.command = this.command.trim();

				if( ! this.command.length) {
					return;
				}

				this.commandParser.parse(this.command);

				this.command = "";
			},

			subscribeToEvents() {
			}
		},

		ready() {
			this.commandParser = new CommandParser(this.socket);
			this.subscribeToEvents();
		}
	}
</script>

<style></style>