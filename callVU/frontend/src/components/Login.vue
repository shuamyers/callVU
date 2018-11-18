<template>
    <div class="flex justify-center login-comp">
        <div class="card card-size">
            <div class="card-header">Login</div>
            <div class="card-body">
                <form @submit.prevent="login()">
                    <fieldset>
                        <div class="form-group">
                            <label for="userName">User Name</label>
                            <input type="text" v-model="userInfo.userName" class="form-control" id="userName" placeholder="Ex: user@user.com">
                        </div>
                        <div class="form-group">
                            <label for="userPassword">Password</label>
                            <input type="password" v-model="userInfo.password" class="form-control" id="userPassword" placeholder="Password">
                        </div>
                    </fieldset>
                    <button type="submit" class="btn btn-success">Login</button>
                    <div v-if="isUserInValid" class="text-danger">User name  Password dont mach pleas try again</div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import userService from '../services/UserService.js';
import cookies from 'js-cookie';
export default {
	data() {
		return {
			userInfo: {
				userName: '',
				password: ''
			},
			isUserInValid: false
		};
	},
	methods: {
		login() {
			userService
				.login(this.userInfo)
				.then(user => {
					cookies.get('connect.sid');
					this.$emit('checkIsLoggedIn', {});
				})
				.catch(err => {
                    this.isUserInValid = true;
					console.error(err);
				});
		}
	}
};
</script>



