var $environmentMeta = document.querySelector('meta[name="environment"]');
var address = "http://188.166.55.158:3000";
if($environmentMeta.getAttribute('content') == 'local') {
    address = "http://192.168.10.10:3000";
}

var Vue = require('vue');
var socket = require('socket.io-client')(address);

import Messages from './components/messages.vue';
import Commandline from './components/commandline.vue';
import SocketMessenger from './classes/SocketMessenger';

new Vue({
    el: "#app",

    components: {
    	Messages,
        Commandline
    },

    data: {
        socket: socket,
        username: '',
        channel: '',
    },

    methods: {
    	syncUser: function(data) {
            this.username = data.nick;
            this.channel = data.channel;
    	},

    	subscribeToEvents: function() {
	        socket.on('user-sync', this.syncUser.bind(this));
    	}
    },

    ready: function() {
    	this.subscribeToEvents();
    }
});