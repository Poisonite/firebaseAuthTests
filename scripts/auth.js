//auth status listener
auth.onAuthStateChanged(user => {
    if (user) {
        //Grab authenticated data
        db.collection("guides").onSnapshot(snapshot => {
            setupGuides(snapshot.docs);
            setupUI(user);
        }, err => {
            console.log(err.message);
        });
    } else {
        setupUI();
        //clears the guides section of all data (replacing it with an empty array) anytime the user is logged out
        setupGuides([]);
    }
})

//Create new guide
const createForm = document.getElementById("create-form");
createForm.addEventListener("submit", (e) => {
    e.preventDefault();

    db.collection("guides").add({
        title: createForm["title"].value,
        content: createForm["content"].value
    }).then(() => {
        //close modal and reset form
        const modal = document.getElementById("modal-create"); //sets a shorthand to get the signup modal element in the HTML
        M.Modal.getInstance(modal).close(); //Closes the signup modal (this is a materialize thing)
        createForm.reset();//Clears the form (in case it's reopened later)
    }).catch(err => {
        console.error(err.message);
    })
})

// signup
const signupForm = document.getElementById("signup-form"); //shorthand to select the form in the signup modal where data is entered
signupForm.addEventListener("submit", (e) => {
    e.preventDefault();//stops the signup modal from closing before the info in it has been collected and saved

    //get user info
    const email = signupForm["signup-email"].value; //Grabs the value of the email/username box
    const password = signupForm["signup-password"].value; //Grabs the value of the password box

    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        return db.collection("users").doc(cred.user.uid).set({
            bio: signupForm["signup-bio"].value,
            age: signupForm["signup-age"].value
        });
    }).then(() => {
        const modal = document.getElementById("modal-signup"); //sets a shorthand to get the signup modal element in the HTML
        M.Modal.getInstance(modal).close(); //Closes the signup modal (this is a materialize thing)
        signupForm.reset();//Clears the form (in case it's reopened later)
    });
})

//logout
const logout = document.getElementById("logout");
logout.addEventListener("click", (e) => {
    e.preventDefault();
    auth.signOut();
})

//login
const loginForm = document.getElementById("login-form");
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = loginForm["login-email"].value;
    const password = loginForm["login-password"].value;

    auth.signInWithEmailAndPassword(email, password).then(cred => {
        const modal = document.getElementById("modal-login"); //sets a shorthand to get the signup modal element in the HTML
        M.Modal.getInstance(modal).close(); //Closes the signup modal (this is a materialize thing)
        loginForm.reset();//Clears the form (in case it's reopened later)
    })
})