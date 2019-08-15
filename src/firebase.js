import firebase from 'firebase/app'
// Add the Firebase products that you want to use
const auth = firebase.auth();
let firestore = firebase.firestore();
const settings = {
   timestampsInSnapshots: true
};
firestore.settings(settings);


var user = firebase.auth().currentUser;
let wheel = document.querySelector('.content__wrapper');
let opred = document.querySelector('.opred');
let button = document.querySelector('.wheel__controller');
let mail = document.querySelector('.email');
let pass = document.querySelector('.pass');
let modal = document.querySelector('.modal');
let registration = document.querySelector('.registration');
let mail_head = document.querySelector('.mail_head');

auth.onAuthStateChanged(function (user) {
   if (user) {
      setupUI(user);
   } else {

      setupUI();

   }
});

const setupUI = (user) => {
   if (!user) {
      modal.style.visibility = "visible";
   } else {
      mail_head.textContent = user.email;
      button.style.visibility = "visible";
   }
}




let btnSignIn = document.querySelector('.log_button');
//нажатие на кнопку вход'
btnSignIn.addEventListener("click", function (e) {
   let email = mail.value;
   let password = pass.value;
   const promise = auth.signInWithEmailAndPassword(email, password).then(cred => {
      modal.style.visibility = "hidden";
      button.style.visibility = "visible";
   }).catch(function (error) {
      document.querySelector(".err").innerHTML = "Error! Please, check your login and password"
   });
   promise.catch(e => console.log(e.message));

});

let btnReg = document.querySelector('.reg_button');
let reg_mail = document.querySelector('.email_reg');
let reg_pass = document.querySelector('.pass_reg');


btnReg.addEventListener('click', function (e) {
   let email = reg_mail.value;
   let password = reg_pass.value;
   auth.createUserWithEmailAndPassword(email, password).then(cred => {
      firestore.collection('users').doc(cred.user.uid).set({
         email: reg_mail.value,
         spins : 1

      });
      registration.style.visibility = "hidden";
      button.style.visibility = "visible";
   }).catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == 'auth/weak-password') {
         document.querySelector('.err').innerHTML = 'Пароль неверный.';
      } else {
         document.querySelector('.err').innerHTML = errorMessage;

      }

   });

});
let exit = document.querySelector('.exit');
  //нажатие на кнопку выйти
  exit.addEventListener("click", function (e) {
   auth.signOut().then(() => {});

   location.reload();
});