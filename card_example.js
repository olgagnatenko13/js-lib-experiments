// import { Card } from "./card_3.js";
import { Card } from './card_3.js';

// import { Payment } from "./payment_2.js";
import { Payment } from './payment.js';

console.log('start main script');

var card = new Card({
    // a selector or DOM element for the form where users will
    // be entering their information
    form: '.target-form', // *required*
    // a selector or DOM element for the container
    // where you want the card to appear
    container: '.card-wrapper', // *required*

    // formSelectors: {
    //     numberInput: 'input#number', // optional — default input[name="number"]
    //     expiryInput: 'input#expiry', // optional — default input[name="expiry"]
    //     cvcInput: 'input#cvc', // optional — default input[name="cvc"]
    //     nameInput: 'input#name' // optional - defaults input[name="name"]
    // },

    width: 200, // optional — default 350px
    formatting: true, // optional - default true

    // Strings for translation - optional
    messages: {
        validDate: 'valid\ndate', // optional - default 'valid\nthru'
        monthYear: 'mm/yy', // optional - default 'month/year'
    },

    // Default placeholders for rendered fields - optional
    // placeholders: {
    //     number: '•••• •••• •••• •••• •••',
    //     name: 'Full Name',
    //     expiry: '••/••',
    //     cvc: '•••'
    // },

    masks: {
        cardNumber: '•' // optional - mask card number
    },

    // if true, will log helpful messages for setting up Card
    debug: true // optional - default false
});

handleCardNumberChange = (event) => {
    console.log('handleCardNumberChange', event.target.value);
    // console.log('card', card);
}

getIsValid = (val, validatorName) => {
    let isValid, objVal;
    if (validatorName === "expiry") {
        objVal = Payment.fns.cardExpiryVal(val);
        isValid = Payment.fns.validateCardExpiry(objVal.month, objVal.year);
    } else if (validatorName === "cvv") {
        isValid = Payment.fns.validateCardCVC(val, this.card.cardType);
    } else if (validatorName === "cardNumber") {
        isValid = Payment.fns.validateCardNumber(val);
    } else if (validatorName === "cardholderName") {
        isValid = val !== "";
    }
    return isValid;
};

window.onload = () => {
    const nameInput = document.querySelector('input[name="number"]');
    console.log('nameInput', nameInput);
    nameInput.addEventListener('change', (event) => {
        console.log('card name change');
        console.log(event.target.value);
        console.log('card', card);
    });
    const expiryInput = document.querySelector('input[name="expiry"]');
    expiryInput.addEventListener('change', (event) => {
        console.log('expiry change');
        console.log(event.target.value);
        let isValid =  getIsValid(event.target.value, 'expiry');
        console.log('getIsValid', isValid);
        if (!isValid) {
            console.log('invalid');
            document.querySelector('input[name="expiry"]').setCustomValidity('Invalid expiry date');
            document.querySelector('input[name="expiry"]').reportValidity();
        }
    });    
}
