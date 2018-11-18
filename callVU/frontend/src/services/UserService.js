 const BASE_URL = (process.env.NODE_ENV !== 'development') ? '' : 'http://localhost:3000';



function login(userInfo) {
	return axios
		.post(`${BASE_URL}/login`, userInfo)
		.then(res => res.data)
		.catch(err => {
			throw new Error(err)
		});
}

function logout() {
	return axios
		.post(`${BASE_URL}/logout`)
		.then(res => res.data)
		.catch(err => {
			console.log(err);
		});
}


export default{
	login,
	logout
}