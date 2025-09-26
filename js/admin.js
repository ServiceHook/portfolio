const auth = firebase.auth();
const db = firebase.firestore();
const messagesContainer = document.getElementById('messages-container');
const logoutBtn = document.getElementById('logout-btn');

// Protect the page: Check if user is logged in
auth.onAuthStateChanged(user => {
    if (user) {
        // User is signed in, load messages
        loadMessages();
    } else {
        // No user is signed in, redirect to login page
        window.location.href = 'login.html';
    }
});

// Load messages from Firestore
function loadMessages() {
    db.collection('contacts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
        messagesContainer.innerHTML = ''; // Clear existing messages
        snapshot.forEach(doc => {
            const data = doc.data();
            const messageEl = document.createElement('div');
            messageEl.classList.add('message-item');
            messageEl.innerHTML = `
                <h3>From: ${data.name} <span>(${data.email})</span></h3>
                <p>${data.message}</p>
                <small>${data.timestamp ? new Date(data.timestamp.toDate()).toLocaleString() : 'No timestamp'}</small>
            `;
            messagesContainer.appendChild(messageEl);
        });
    });
}

// Logout functionality
logoutBtn.addEventListener('click', () => {
    auth.signOut().then(() => {
        console.log('User signed out');
        window.location.href = 'login.html';
    });
});
