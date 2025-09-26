const ADMIN_EMAIL = 'ztenkammu@gmail.com'; // <-- change this to your admin email

firebase.initializeApp(firebaseConfig);
const authAdmin = firebase.auth();
const dbAdmin = firebase.firestore();

const adminEmailView = document.getElementById('adminEmailView');
const adminSignOut = document.getElementById('adminSignOut');
const contactsList = document.getElementById('contactsList');

adminSignOut.addEventListener('click',()=>authAdmin.signOut());

// Ensure only admin can view
authAdmin.onAuthStateChanged(async user=>{
  if(!user){
    const provider = new firebase.auth.GoogleAuthProvider();
    try{await authAdmin.signInWithPopup(provider)}catch(e){console.error('Admin sign-in failed',e)}
  }
  if(user && user.email!==ADMIN_EMAIL){
    alert('This admin panel is restricted. Signed out.');
    await authAdmin.signOut();
    location.href = 'index.html';
  } else if(user){
    adminEmailView.textContent = user.email;
    loadContacts();
  }
});

async function loadContacts(){
  contactsList.innerHTML = '<div class="muted">Loading…</div>';
  try{
    const snap = await dbAdmin.collection('contacts').orderBy('createdAt','desc').limit(200).get();
    contactsList.innerHTML = '';
    snap.forEach(doc=>{
      const d = doc.data();
      const row = document.createElement('div'); row.className='contact-row';
      row.innerHTML = `<strong>${escapeHtml(d.name||'—')}</strong> <span class="small muted">${d.email||''} — ${d.createdAt?new Date(d.createdAt.seconds*1000).toLocaleString():'—'}</span><p>${escapeHtml(d.message||'')}</p>`;
      contactsList.appendChild(row);
    });
    if((await dbAdmin.collection('contacts').get()).size===0) contactsList.innerHTML='<div class="muted">No contacts yet.</div>';
  }catch(err){console.error(err);contactsList.innerHTML='<div class="muted">Error loading contacts</div>'}
}

function escapeHtml(s){if(!s) return '';return s.replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
