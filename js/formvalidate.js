/*
 * Form validator
 *
 * Gemaakt door Dein Dehouwer
 * 
 */

/* Variabelen */
let errors = [];


/* Verberg alle alert boxen */
hideElements();



/* Hoofdfunctie */

document.getElementById('btnSubmit').addEventListener('click', validateForm);


/* Functies */

function validateForm() {

    // Reset uitvoeren voordat de checks beginnen!
    errors = [];
    hideElements();

    // Controleer of het veld is ingevuld
    checkEmptyField(document.formulier.voornaam.value, "Het veld voornaam is vereist.<br />");
    checkEmptyField(document.formulier.naam.value, "Het veld naam is vereist.<br />");
    checkEmptyField(document.formulier.gebruikersnaam.value, "Het veld gebruikersnaam is vereist.<br />");
    checkEmptyField(document.formulier.adres.value, "Het veld adres is vereist.<br />");
    checkEmptyField(document.formulier.land.value, "Het veld land is vereist.<br />");
    checkEmptyField(document.formulier.provincie.value, "Het veld provincie is vereist.<br />");
    checkEmptyField(document.formulier.wachtwoord.value, "Het veld wachtwoord is vereist.<br />");
    checkEmptyField(document.formulier.herhaalwachtwoord.value, "Het veld herhaal wachtwoord is vereist.<br />");

    // Controleer het emailadres
    validateEmail(document.formulier.email.value);

    // Wachtwoordcontrole
    validatePassword(document.formulier.wachtwoord.value);

    // Is wachtwoord hetzelfde ?
    if (document.formulier.wachtwoord.value != document.formulier.herhaalwachtwoord.value) {
        errors.push("Je wachtwoorden komen niet overeen.<br />");
    }

    // Controleer postcode
    validatePC(document.formulier.postcode.value);

    // Gaat de gebruiker akkoord met de voorwaarden?
    if (!document.getElementById("akkoord").checked) {
        errors.push("Je moet de algemene voorwaarden accepteren.<br />");
    }

    validatePayment(document.formulier.betaling);

    // Zijn er foutmeldingen?
    if (Array.isArray(errors) && errors.length) {
        document.getElementById('alert-error-box').classList.remove('hidden');
        document.getElementById('errors').innerHTML = errors.join(""); // Join toevoegen om comma's te verwijderen
    } else {
        // Alles is good to go
        document.getElementById('alert-success-box').classList.remove('hidden');
        document.getElementById('alert-info-box').classList.remove('hidden');

       document.getElementById("info").innerHTML = "Je betalingswijze is " + document.formulier.betaling.value;
    }

    event.preventDefault(); // Blijkbaar zeer essentieel

}

function hideElements() {
    document.getElementById('alert-error-box').classList.add('hidden');
    document.getElementById("alert-success-box").classList.add("hidden");
    document.getElementById("alert-info-box").classList.add("hidden");
}

function checkEmptyField(veld, melding) {
    if (veld.length < 1) {
        errors.push(melding);
        return true;
    } else {
        return false;
    }
}

function validateEmail(emailadres) {
    // Regex for the win!
    // Moet beginnen met letter of cijfer, daarna kan . - _ letters en cijfers voorkomen tot het @ teken, hierna moet er terug een letter of cijfer voorkomen
    // daarna kan . - _ letters en cijfers voorkomen tot het . teken, hierna kunnen enkel nog letters voorkomen van 2 tot 16 karakters lang 
    let regex = /^[a-zA-Z0-9]{1}[a-zA-Z0-9-_\.]*[@]{1}[a-zA-Z0-9]{1}[a-zA-Z0-9-_\.]*[\.]{1}[a-zA-Z]{2,16}/gim;

    if (regex.test(emailadres) === false) {
        errors.push("E-mailadres is niet correct.<br />");
    }
}

function validatePassword(wachtwoord) {
    if (wachtwoord.length < 8) {
        errors.push("Het wachtwoord is te kort.<br />");
    }
}

function validatePayment(veld) {
    if (veld[0].checked == false && veld[1].checked == false && veld[2].checked == false && veld[3].checked == false) {
        errors.push("Betalingswijze is ongeldig.<br />");
    }
}

function validatePC(veld) {
    if (checkEmptyField(veld, "Het veld postcode is vereist.<br />") == true) {
        // Afhandeling gebeurt al in de functie
    } else if (veld < 1000 || veld > 9999) {
        errors.push("De waarde van postcode moet tussen 1000 en 9999 liggen.<br />");
    }
}