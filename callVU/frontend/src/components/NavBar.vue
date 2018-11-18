<template>
    <nav class="navbar navbar-dark bg-light">
        <a class="navbar-brand" href="#"><i class="fas fa-angle-right"></i> File Tracker</a>

        <div v-if="cookie">
            <button @click="logout()" class="btn btn-secondary">Logout</button>
        </div>

    </nav>
</template>

<script>
import userService from '../services/UserService.js';
import cookies from 'js-cookie';

export default {
    props:['cookie'],
	methods: {
		logout() {
			userService.logout().then(() => {
                 cookies.remove('connect.sid');
                 this.$emit('checkIsLoggedIn',{})
			});
		}
	}
};
</script>


<style scoped>
.navbar {
	background: #656565 !important;
}
</style>
