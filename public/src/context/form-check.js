/* Oranit Madar 207973488 */
/* Raziel houri 305427874 */


const form=document.getElementById('form');
const email=document.getElementById('email');
const password=document.getElementById('password');
const confirm_password=document.getElementById('confirm_password');


form.addEventListener('submit', e => {
    e.preventDefault();

    ValidateInputs();
});


const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
};

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};


const ValidateInputs = () => {

    const emailvalue = email.value.trim();
    const passwordvalue=password.value.trim();
    const confirm_passwordValue=confirm_password.value.trim();

    if(emailvalue === ''){
        setError(email,'Email is required');
    }else if (!isValidEmail(emailvalue)) {
        setError(email, 'Provide a valid email address');
    }else{
        setSuccess(email);
    }

    if(passwordvalue === ''){
        setError(password,'password is required');
    }else if(passwordvalue.length < 8){
        setError(password,'password must be at least 8 characters.');
    }else{
        setSuccess(password);
    }

    if(confirm_passwordValue=== ''){
        setError(confirm_password,'please confirm your password');
    }else if(passwordvalue !== confirm_passwordValue){
        setError(confirm_password,'passwords doesnt match');
    }else{
        setSuccess(confirm_password);
    }

};