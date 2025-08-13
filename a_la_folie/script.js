// --------------------------------------------------
// CONFIGURATION DES QUESTIONS
// --------------------------------------------------

const questions = [
    createQuestion("QUEL EST VOTRE NOM DE FAMILLE ?", [], "", true),
    createQuestion("QUEL EST VOTRE PRÉNOM ?", ["John"], "La réponse attendue est : John", false),
    createQuestion("QUELLE EST VOTRE ADRESSE MAIL ?", [], "", true, "choix", ["oui", "non"]),
    createQuestion("QUELLE EST VOTRE ADRESSE POSTALE ?", [], 'Réponse en <a href="https://usefulwebtool.com/fr/convertir-texte-en-binaire" target="_blank">binaire</a> uniquement', false, "nombre"),
    createQuestion("QUEL EST VOTRE NUMERO DE TÉLÉPHONE ?", [], "Je vais pas t'appeler t'inquiètes, juste donne", false, "nombre"),
    createQuestion("NUMÉRO DE CARTE BLEUE ? JUSTE COMME ÇA", [], "Allez stpppp je te jure j'achète rien", false, "nombre"),
    createQuestion("QUELLE EST VOTRE COULEUR PRÉFÉRÉE ?", ["vert"], "Non", false, "choix", ["gris", "vert"]),
    createQuestion("ÇA VA ?", ["vert"], "Non", false, "choix", ["gris", "vert"]),
    createQuestion("QUEL EST VOTRE ANIMAL PRÉFÉRÉ ?", ["pomme"], "", true, "choix", ["pomme", "banane", "orange"]),
    createQuestion("QUELLE EST LA CAPITALE DU PANAMA ?", ["Panama"], '<a href="https://fr.wikipedia.org/wiki/Panama" target="_blank">Cherche</a> au pire', false),
];

// --------------------------------------------------
// VARIABLES GLOBALES
// --------------------------------------------------

let questionIndex = 0;
let reponsesDonnees = [];

// --------------------------------------------------
// FONCTION POUR CRÉER UNE QUESTION
// --------------------------------------------------

function createQuestion(texte, reponse = [], messageErreur = "", passAutomatique = false, typeValidation = "texte", options = []) {
    return { texte, reponse, messageErreur, passAutomatique, typeValidation, options };
}

// --------------------------------------------------
// FONCTION POUR AFFICHER LA QUESTION ACTUELLE
// --------------------------------------------------

function afficherQuestion() {
    const questionActuelle = questions[questionIndex];
    const questionContainer = document.getElementById('question-container');
    const responseContainer = document.getElementById('response-container');
    const submitButton = document.getElementById('submit-button');
    const h1 = document.querySelector('h1');

    document.getElementById('message-erreur').textContent = '';
    responseContainer.innerHTML = '';

    questionContainer.innerHTML = `<p>${questionActuelle.texte}</p>`;
    afficherChampOuOptions(questionActuelle);

    h1.classList.remove('hidden');
    submitButton.style.display = 'inline-block';

    genererElementsAleatoires();
}

// --------------------------------------------------
// FONCTION POUR AFFICHER LE CHAMP OU LES OPTIONS
// --------------------------------------------------

function afficherChampOuOptions(question) {
    const responseContainer = document.getElementById('response-container');
    if (['choix', 'checkbox'].includes(question.typeValidation)) {
        afficherOptionsOuCheckbox(question.options, question.typeValidation);
    } else {
        afficherChampSaisie();
    }
}

// --------------------------------------------------
// FONCTION POUR AFFICHER LES OPTIONS OU CHECKBOX
// --------------------------------------------------

function afficherOptionsOuCheckbox(options, type) {
    const responseContainer = document.getElementById('response-container');
    options.forEach((option, index) => {
        const input = document.createElement('input');
        input.type = type === 'checkbox' ? 'checkbox' : 'radio';
        input.name = type === 'checkbox' ? `checkbox-${index}` : 'choix';
        input.value = option;
        input.id = `${type}-${index}`;

        const label = document.createElement('label');
        label.htmlFor = input.id;
        label.textContent = option;

        responseContainer.appendChild(input);
        responseContainer.appendChild(label);
        responseContainer.appendChild(document.createElement('br'));
    });
}

// --------------------------------------------------
// FONCTION POUR AFFICHER UN CHAMP DE SAISIE
// --------------------------------------------------

function afficherChampSaisie() {
    const responseContainer = document.getElementById('response-container');
    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'reponse';
    responseContainer.appendChild(input);
    input.focus();

    input.addEventListener('keydown', event => {
        if (event.key === 'Enter') verifierReponse();
    });
}

// --------------------------------------------------
// FONCTION POUR VÉRIFIER LA RÉPONSE
// --------------------------------------------------

function verifierReponse() {
    const questionActuelle = questions[questionIndex];
    const reponseUtilisateur = recupererReponseUtilisateur(questionActuelle);

    if (questionActuelle.passAutomatique || verifierReponseSelonType(questionActuelle, reponseUtilisateur)) {
        reponsesDonnees.push({ question: questionActuelle.texte, reponse: reponseUtilisateur || 'Passé' });
        passerALaQuestionSuivante();
    } else {
        afficherMessageErreur(questionActuelle.messageErreur);
    }
}

// --------------------------------------------------
// FONCTION POUR RÉCUPÉRER LA RÉPONSE UTILISATEUR
// --------------------------------------------------

function recupererReponseUtilisateur(question) {
    if (['choix', 'checkbox'].includes(question.typeValidation)) {
        const selectedElement = document.querySelector('#response-container input:checked');
        return selectedElement ? selectedElement.value : 'Aucune sélection';
    } else {
        return document.getElementById('reponse') ? document.getElementById('reponse').value : '';
    }
}

// --------------------------------------------------
// FONCTION POUR VÉRIFIER LA RÉPONSE SELON LE TYPE DE VALIDATION
// --------------------------------------------------

function verifierReponseSelonType(question, reponseUtilisateur) {
    switch (question.typeValidation) {
        case 'choix': return verifierChoix(question.reponse, reponseUtilisateur);
        case 'checkbox': return verifierCheckbox(question.reponse, reponseUtilisateur);
        case 'nombre': return estUnNombre(reponseUtilisateur.trim());
        default: return question.reponse.some(r => r.toLowerCase() === reponseUtilisateur.trim().toLowerCase());
    }
}

// --------------------------------------------------
// FONCTION POUR VÉRIFIER LES BOUTONS RADIO
// --------------------------------------------------

function verifierChoix(reponseCorrecte, reponseUtilisateur) {
    return reponseCorrecte.includes(reponseUtilisateur.toLowerCase());
}

// --------------------------------------------------
// FONCTION POUR VÉRIFIER LES CASES À COCHER
// --------------------------------------------------

function verifierCheckbox(reponsesCorrectes, reponseUtilisateur) {
    const checkedValues = reponseUtilisateur.split(',').map(val => val.trim().toLowerCase());
    return checkedValues.length > 0 && reponsesCorrectes.every(val => checkedValues.includes(val.toLowerCase())) &&
        checkedValues.every(val => reponsesCorrectes.includes(val.toLowerCase()));
}

// --------------------------------------------------
// FONCTION POUR VÉRIFIER SI UNE CHAÎNE EST UN NOMBRE
// --------------------------------------------------

function estUnNombre(valeur) {
    return !isNaN(valeur.replace(/\s/g, '')) && valeur !== '';
}

// --------------------------------------------------
// FONCTION POUR PASSER À LA QUESTION SUIVANTE
// --------------------------------------------------

function passerALaQuestionSuivante() {
    questionIndex++;
    if (questionIndex < questions.length) {
        afficherQuestion();
    } else {
        afficherMessageFinal();
    }
}

// --------------------------------------------------
// FONCTION POUR AFFICHER UN MESSAGE D'ERREUR
// --------------------------------------------------

function afficherMessageErreur(message) {
    document.getElementById('message-erreur').innerHTML = message;
}

// --------------------------------------------------
// FONCTION POUR AFFICHER LE MESSAGE FINAL ET LE BOUTON IMPRIMER
// --------------------------------------------------

function afficherMessageFinal() {
    const questionContainer = document.getElementById('question-container');
    const submitButton = document.getElementById('submit-button');
    const h1 = document.querySelector('h1');

    document.getElementById('message-erreur').textContent = '';
    h1.classList.add('hidden');
    document.querySelector('.container').classList.add('container-compte-rendu');

    let compteRenduHTML = '<h2>** COMPTE RENDU DE VOS RÉPONSES **</h2><ul>';
    reponsesDonnees.forEach(reponse => {
        compteRenduHTML += `<li><strong>${reponse.question}</strong><br>Réponse : ${reponse.reponse}</li>`;
    });
    compteRenduHTML += '</ul>';

    questionContainer.innerHTML = compteRenduHTML + '<button onclick="imprimerCompteRendu()" style="display: block; margin: 0 auto;">Imprimer le compte rendu</button>';
    submitButton.style.display = 'none';
    document.getElementById('response-container').innerHTML = '';
}

// --------------------------------------------------
// FONCTION POUR IMPRIMER LE COMPTE RENDU
// --------------------------------------------------

function imprimerCompteRendu() {
    document.querySelector('.print-message').style.display = 'block';
    window.print();
    document.querySelector('.print-message').style.display = 'none';
}

// --------------------------------------------------
// APPEL INITIAL POUR AFFICHER LA PREMIÈRE QUESTION
// --------------------------------------------------

window.onload = afficherQuestion;

// --------------------------------------------------
// FONCTION POUR GÉNÉRER DES ÉLÉMENTS ALÉATOIRES
// --------------------------------------------------

function genererElementsAleatoires() {
    console.log("Génération des éléments aléatoires...");

    const elements = [
        { type: 'ascii', content: 'euh' },
        { type: 'ascii', content: 'a' },
        { type: 'ascii', content: '???' },
        { type: 'ascii', content: '(☉_☉)' },
        { type: 'ascii', content: '✿' },
        { type: 'ascii', content: ':-)' },
        { type: 'ascii', content: 'C|_|' },
        { type: 'ascii', content: 'erreur' },
        { type: 'html', html: '<button onclick="alert(\'Arrête.\')">CLIQUEZ-MOI</button>' },
        { type: 'html', html: '<p style="font-size:2.5vw;">pluie :<br>,,,,,,,,,,,,,,,,<br>,,,,,,,,,,,,,,,,<br>,,,,,,,,,,,,,,,,<br>,,,,,,,,,,,,,,,,<br>,,,,,,,,,,,,,,,,<br>,,,,,,,,,,,,,,,,<br>,,,,,,,,,,,,,,,,</p>' },
        { type: 'image', src: 'chemin/vers/image1.jpg', alt: 'oups' },
        { type: 'image', src: 'chemin/vers/image2.jpg', alt: 'problème' },
        { type: 'image', src: 'chemin/vers/image3.jpg', alt: 'hein' },
    ];

    const container = document.getElementById('random-elements');
    const nombreElements = Math.floor(Math.random() * 3) + 10;

    console.log("Nombre d'éléments à générer : " + nombreElements);

    container.querySelectorAll('.random-element').forEach(el => el.remove());

    for (let i = 0; i < nombreElements; i++) {
        const element = elements[Math.floor(Math.random() * elements.length)];
        const div = document.createElement('div');
        div.className = 'random-element';
        div.style.position = 'absolute';
        div.style.left = `${Math.random() * 90}vw`;
        div.style.top = `${Math.random() * 90}vh`;

        switch (element.type) {
            case 'ascii':
                div.textContent = element.content;
                break;
            case 'image':
                const img = document.createElement('img');
                img.src = element.src;
                img.alt = element.alt;
                div.appendChild(img);
                break;
            case 'html':
                div.innerHTML = element.html;
                break;
        }

        container.appendChild(div);
    }
}

// --------------------------------------------------
// GESTION DE L'ÉVÉNEMENT DE SOUMISSION
// --------------------------------------------------

document.getElementById('submit-button').addEventListener('click', verifierReponse);
