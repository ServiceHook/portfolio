document.addEventListener('DOMContentLoaded', () => {

    // --- GSAP ANIMATIONS ---
    gsap.registerPlugin(ScrollTrigger);

    // Hero Animation
    gsap.from('.hero-text h1', { duration: 1, y: -50, opacity: 0, ease: 'power3.out' });
    gsap.from('.hero-text p', { duration: 1, y: -30, opacity: 0, delay: 0.5, ease: 'power3.out' });

    // Section Title and Content Animations on Scroll
    gsap.utils.toArray('.container').forEach(section => {
        gsap.from(section.querySelector('h2'), {
            scrollTrigger: { trigger: section, start: 'top 80%' },
            opacity: 0,
            y: 50,
            duration: 1
        });
        gsap.from(section.querySelectorAll('.project-card, .skill-item, .about-content > *, form > *'), {
            scrollTrigger: { trigger: section, start: 'top 70%' },
            opacity: 0,
            y: 50,
            duration: 0.5,
            stagger: 0.2
        });
    });

    // --- FIREBASE CONTACT FORM ---
    const db = firebase.firestore();
    const contactForm = document.getElementById('contact-form');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = contactForm.name.value;
        const email = contactForm.email.value;
        const message = contactForm.message.value;

        db.collection('contacts').add({
            name,
            email,
            message,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
            alert('Your message has been sent successfully! I will get back to you soon.');
            contactForm.reset();
        })
        .catch((error) => {
            alert('An error occurred. Please try again.');
            console.error("Error adding document: ", error);
        });
    });

});
