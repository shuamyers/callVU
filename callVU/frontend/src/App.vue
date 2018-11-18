<template>
  <div id="app">
    <nav-bar @checkIsLoggedIn="checkIsLoggedIn" :cookie="cookie"></nav-bar>
    <div class="main-wrapper">
      <login v-if="!cookie" @checkIsLoggedIn="checkIsLoggedIn"></login>
      <file-tracker v-if="cookie"></file-tracker>
    </div>
  </div>
</template>

<script>
import Login from './components/Login';
import FileTracker from './components/FileTracker';
import NavBar from './components/NavBar';
import cookies from 'js-cookie';

export default {
	data() {
		return {
			cookie: null
		};
	},
	created() {
		this.checkIsLoggedIn();
	},
	methods: {
		checkIsLoggedIn() {
			if (cookies.get('connect.sid')) {
				this.cookie = true;
			} else {
				this.cookie = false;
			}
		}
	},
	components: {
		Login,
		FileTracker,
		NavBar
	}
};
</script>




