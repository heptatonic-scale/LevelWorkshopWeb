const { createClient } = window.supabase;
const url = 'https://lnjyyayadwtotbkbreon.supabase.co';
const key = 'sb_publishable_ekeVp8CVVv3khd7k3EUfmg_qy1XB5wq';

const cl = createClient(url, key); // TODO: make this with seperate environement vars

async function check() {
	const currentUser = localStorage.getItem("logged_as");
	if (currentUser) {
		document.getElementById("result").textContent = "logged in as " + currentUser;
	}
}

async function register() {
	const username = document.getElementById("username").value;
	const password = document.getElementById("password").value;	
	
	const hash = await hashString(password);
	
	const { data, error } = await cl
		.from("users").insert([
		{
			username: username,
			hash: hash
		}
		]);
		
		
	if (error) {
		document.getElementById("result").textContent = error;
		console.error(error);
	}
	
	console.log("registerd");
}

async function login() {
	const username = document.getElementById("username").value;
	const password = document.getElementById("password").value;	
	
	const hash = await hashString(password);
	
	const { data, error } = await cl
		.from("users").select("*")
		.eq("username", username)
		.eq("hash", hash)
		.maybeSingle();
		

		
	if (error || !data) {
		document.getElementById("result").textContent = "Incorrect username or password.";
		console.error(error);
		return;
	}
	
	
	
	localStorage.setItem("logged_as", data.username);
	
	document.getElementById("result").textContent = "logged in as " + data.username;
	console.log("logged in as", data.username);
	
	window.location.href = "homepage.html";
}

async function hashString(message) {
    // Convert the string into an ArrayBuffer
    const msgBuffer = new TextEncoder().encode(message);
    
    // Hash the data
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    
    // Convert the buffer to a byte array
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    
    // Convert bytes to a hexadecimal string
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

check();