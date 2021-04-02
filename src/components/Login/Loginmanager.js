import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
export const inititliazeLoginFramework = () => {
       if (!firebase.apps.length) {   
          firebase.initializeApp(firebaseConfig);
    }
    else {
        firebase.app(); // if already initialized, use that one
    }
}
//Sign up and Sign in

export const signUp = (email,password) => {
    return   firebase.auth().createUserWithEmailAndPassword(email,password)
        .then(res => {
            const { displayName, photoURL, email } = res.user;
            const User = {
                displayName: displayName,
                email: email,
                photo: photoURL,
                isSignedIn: true,
                error:''
            }
                return User;
              })
        .catch((error) => {
            const User ={};
            User.error =error.message;
            User.isSignedIn =false;
            return User;
        });
    // event.preventDefault();
    // event.target.reset();
}
export const signIn = (email,password) => {
   return  firebase.auth().signInWithEmailAndPassword(email,password)
        .then((res) => {
            const { displayName, photoURL, email } = res.user;
            const User = {
                displayName: displayName,
                email: email,
                photo: photoURL,
                isSignedIn: true,
                error:''
            }
                return User;
        })
        .catch((error) => {
            const user={};
           user.error=error.message;
           user.isSignedIn=false;
           return user;
        });
    // event.preventDefault();
    // event.target.reset();
}

//google sign in 

export const googleSignIn = () => {
    const googleprovider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(googleprovider)
        .then(res => {
            const { displayName, photoURL, email } = res.user;
            const signedInUser = {
                displayName: displayName,
                email: email,
                photo: photoURL,
                isSignedIn: true,
                error:''
            }
            // setUser(signedInUser);
            // console.log(displayName, email, photoURL);
            return signedInUser;
        })
        .catch(error => {
            const user={};
            user.error=error.message;
            user.isSignedIn=false;
            return user;
        })
    // console.log(user, "user sign in")
}
// facebook Sign In:

export const facebookSignIn = () => {
    const fbprovider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(fbprovider)
        .then((res) => {
            var credential = res.credential;
            var accessToken = credential.accessToken;
            console.log(res.user,"facebook res.user")
            var user=res.user;
            user.error='';
            user.isSignedIn= true;
            return user;
            }
            // setUser(fbUser);
            // console.log(fbuser, "fb sign in")
        )
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
            const user={};
            user.error=error.message;
            user.isSignedIn=false;
            return user;
        });
}
//sign out
export const signOut = event => {
    return firebase.auth().signOut()
        .then(() => {
            const signedOutUser = {
                isSignedIn: false,
                displayName: '',
                photo: '',
                email: '',
                password: '',
                error: '',
                isValid: false
            }
            // setUser(signedOutUser);
            // console.log(user, "user is signed up")
            return signedOutUser;
        })
        .catch((error) => {
            const user={};
            user.error=error.message;
            user.isSignedIn=true;
            return user;
        });

}



export const githubSignIn = () => {
    const githubprovider = new firebase.auth.GithubAuthProvider();
    return firebase.auth().signInWithPopup(githubprovider)
        .then((res) => {
            var credential = res.credential;
            var token = credential.accessToken;
            // var githubuser = res.user;
            console.log(res.user,"github user")
            const { displayName, photoURL, email } = res.user;
            var accessToken = credential.accessToken;
            const githubUser = {
                displayName: displayName,
                email: email,
                photo: photoURL,
                isSignedIn: true
            }
            // setUser(githubUser);
            return githubUser;
            // ...
        }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
            const user={};
            user.error=error.message;
            user.isSignedIn=false;
            return user;
        });
}
export const updateUsername = name => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
        displayName: name
    }).then(function () {
        
        console.log("Username updated successfully");
    }).catch(function (error) {
        
        console.log(error)
    });
}
export const storeAuthToken = () => {
    firebase.auth().currentUser.getIdToken(true)
      .then(function (idToken) {
        sessionStorage.setItem('token',idToken)
      })
      .catch(function (error) {
      });
  }