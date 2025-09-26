// ----- USER EDIT: Set your Firebase config below -----
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-Z-6DmDqYUqwWe_diVd7SUuBKU7mDfZ0",
  authDomain: "portfolio-a3346.firebaseapp.com",
  projectId: "portfolio-a3346",
  storageBucket: "portfolio-a3346.firebasestorage.app",
  messagingSenderId: "78300566731",
  appId: "1:78300566731:web:d49567253c5d6e607f374e",
  measurementId: "G-9KYQCTYVXT"
};
// ----------------------------------------------------

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Animated background (moving dots)
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
function resize(){canvas.width=innerWidth;canvas.height=innerHeight}
addEventListener('resize',resize);resize();
const dots = [];
for(let i=0;i<120;i++){dots.push({x:Math.random()*canvas.width,y:Math.random()*canvas.height,vx:(Math.random()-0.5)*0.4,vy:(Math.random()-0.5)*0.4,r:1+Math.random()*2})}
function bgAnimate(){ctx.clearRect(0,0,canvas.width,canvas.height);for(const d of dots){d.x+=d.vx;d.y+=d.vy;if(d.x<0)d.x=canvas.width;if(d.x>canvas.width)d.x=0;if(d.y<0)d.y=canvas.height;if(d.y>canvas.height)d.y=0;ctx.beginPath();ctx.arc(d.x,d.y,d.r,0,Math.PI*2);ctx.fillStyle='rgba(124,231,200,0.08)';ctx.fill();}requestAnimationFrame(bgAnimate)}
bgAnimate();

// Reveal on scroll
const revealElems = document.querySelectorAll('.reveal, .reveal-up');
const io = new IntersectionObserver((entries)=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:0.12}});
revealElems.forEach(el=>io.observe(el));

// Contact form
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
contactForm.addEventListener('submit',async (e)=>{
  e.preventDefault();
  const data = {
    name:contactForm.name.value.trim(),
    email:contactForm.email.value.trim(),
    message:contactForm.message.value.trim(),
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  };
  try{
    await db.collection('contacts').add(data);
    formStatus.textContent='Message sent — thanks!';
    contactForm.reset();
  }catch(err){console.error(err);formStatus.textContent='Could not send — check console.'}
});

// Auth modal
const authModal = document.getElementById('authModal');
const signinBtn = document.getElementById('signinBtn');
const closeAuth = document.getElementById('closeAuth');
signinBtn.addEventListener('click',()=>authModal.classList.remove('hidden'));
closeAuth.addEventListener('click',()=>authModal.classList.add('hidden'));

// Sign in logic
document.getElementById('emailSignIn').addEventListener('click',async ()=>{
  const e=document.getElementById('authEmail').value;const p=document.getElementById('authPass').value;
  try{await auth.signInWithEmailAndPassword(e,p);authModal.classList.add('hidden')}catch(err){alert(err.message)}
});
document.getElementById('googleSignIn').addEventListener('click',async ()=>{
  const provider = new firebase.auth.GoogleAuthProvider();
  try{await auth.signInWithPopup(provider);authModal.classList.add('hidden')}catch(err){alert(err.message)}
});

// Update sign-in button
auth.onAuthStateChanged(u=>{
  if(u){signinBtn.textContent = 'Signed in';signinBtn.classList.add('ghost');}else{signinBtn.textContent='Sign in';signinBtn.classList.remove('ghost')}
})

document.getElementById('year').textContent = new Date().getFullYear();
