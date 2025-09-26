# FutrPortfolio — Setup & Deploy


## What you'll get
- Animated single-page portfolio with contact form
- Firebase Authentication (Google + Email/Password)
- Contacts saved to Firestore (collection `contacts`)
- Admin panel (`admin.html`) that requires an admin email to view submissions
- Easy deploy on GitHub Pages


## Quick setup
1. Create a Firebase project: https://console.firebase.google.com
2. Enable **Authentication** providers: Email/Password and Google.
3. Create a Firestore database (start in test mode for development).
4. Copy your Firebase config and paste into `script.js` and `admin.js` (replace the placeholder `firebaseConfig`).
5. Set `ADMIN_EMAIL` in `admin.js` to the email you want to use for admin access.
6. Commit these files to a GitHub repository.
7. In the repository's **Settings → Pages** set the source to the `main` branch and `/ (root)` folder — GitHub Pages will publish your site.


## Security notes
- Firestore rules should be tightened for production. Example minimal rules:


```
service cloud.firestore {
match /databases/{database}/documents {
match /contacts/{doc} {
allow create: if true; // allow public to submit
allow read: if request.auth != null && request.auth.token.email == "youremail@example.com"; // only admin
}
}
}
```
Replace `youremail@example.com` with your admin email.


## Admin access
- Admin uses Google Sign-In (configured in Firebase). After sign-in the admin panel will check the email and load submissions if it matches `ADMIN_EMAIL`.


## Deploying to GitHub Pages
1. Push the files to a new GitHub repo.
2. In GitHub repo Settings → Pages, choose branch `main` and folder `/ (root)`.
3. Save — GitHub will give you a site URL like `https://username.github.io/repo`.


## Customization
- Update colors, copy, and projects in `index.html` and `style.css`.
- Replace the simple background with Lottie or particles.js if desired.
