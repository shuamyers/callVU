const BASE_URL = 'http://localhost:3000';


function startTracking(fileName) {
	console.log(fileName)
	return axios
		.post(`${BASE_URL}/start`, {fileName})
		.then(res => res.data)
		.catch(err => {
			console.error(err);
		});
}
function stopTracking(fileName) {
	return axios
		.post(`${BASE_URL}/stop`, {fileName})
		.then(res => res.data)
		.catch(err => {
			console.error(err);
		});
}
function status(userId) {
	return axios
		.get(`${BASE_URL}/status`)
		.then(res => res.data)
		.catch(err => {
			console.error(err);
		});
}

export default{
    startTracking,
    stopTracking,
    status
}