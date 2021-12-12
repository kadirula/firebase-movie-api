import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
const firebaseConfig = {
    apiKey: "AIzaSyBzNZftuu3trn6GVj8nEI_m1KVD32vP-4I",
    authDomain: "movie-project-8f214.firebaseapp.com",
    projectId: "movie-project-8f214",
    storageBucket: "movie-project-8f214.appspot.com",
    messagingSenderId: "817561905795",
    appId: "1:817561905795:web:ecb4192eda2fc7d218c9b6",
    measurementId: "G-3Q61JLKCB4"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();


$(document).ready(function() {

    // Kayıt Olma Fonksiyonu
    $('#register-btn').click(function() {
        const email = $('#email').val();
        const password = $('#password').val();
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                window.location.href = "login.html";
            }).catch((err) => {
                alert(err.message);
            });
    });


    // Giriş Yapma Fonksiyonu
    $('#sign-in').click(function() {

        const email = $('#email').val();
        const password = $('#password').val();

        signInWithEmailAndPassword(auth, email, password).then(() => {
            window.location.href = "index.html";
        }).catch(err => {
            alert(err.message);
        });
    });


    // Çıkış Yapma Fonksiyonu
    $('#sign-out').click(function() {
        signOut(auth).then(() => {
            window.location.href = "index.html";
        }).catch(err => {
            alert(err.message);
        });
    });



    // giriş yapan kullanıcı bilgilerini yakalıyoruz. 
    onAuthStateChanged(auth, (user) => {
        console.log(user);
    });
});