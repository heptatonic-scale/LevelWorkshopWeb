async function check() {
	const currentUser = localStorage.getItem("logged_as");
	if (currentUser) {
		document.getElementById("welcome").textContent = "Welcome, " + currentUser;
	}
}

check();