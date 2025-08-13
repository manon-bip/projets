document.getElementById("askButton").addEventListener("click", getAnswer);

function getAnswer() {
    // Liste des réponses possibles
const responses = [
    // Réponses positives
    { text: "Oui, absolument !", score: 3 },
    { text: "Sans aucun doute !", score: 3 },
    { text: "C'est très probable.", score: 3 },
    { text: "Oui, c'est certain.", score: 3 },
    { text: "Tout indique que c'est vrai.", score: 3 },
    { text: "Je suis convaincu que oui.", score: 3 },
    { text: "Vous pouvez compter là-dessus.", score: 3 },
    { text: "La réponse est clairement oui.", score: 3 },

    { text: "Les signes sont favorables.", score: 2 },
    { text: "Il y a de bonnes chances.", score: 2 },
    { text: "Cela semble bien parti.", score: 2 },
    { text: "Je dirais que oui.", score: 2 },
    { text: "Les probabilités sont en votre faveur.", score: 2 },
    { text: "La situation est favorable.", score: 2 },
    { text: "Les choses penchent vers un oui.", score: 2 },
    { text: "Il est probable que oui.", score: 2 },

    { text: "Oui, mais prenez des précautions.", score: 1 },
    { text: "Cela devrait se passer comme vous le souhaitez.", score: 1 },
    { text: "Je pense que oui, mais rien n'est garanti.", score: 1 },
    { text: "Rien n'est certain, mais c'est bien parti.", score: 1 },
    { text: "Tout dépend des circonstances.", score: 1 },
    { text: "Je ne vois pas de raison pour que ce ne soit pas le cas.", score: 1 },
    { text: "Il y a quelques doutes, mais oui.", score: 1 },
    { text: "Vous avez des raisons d'y croire.", score: 1 },

    // Réponses neutres
    { text: "Peut-être, il est difficile de dire.", score: 0 },
    { text: "Impossible de le savoir pour l'instant.", score: 0 },
    { text: "Je ne suis pas sûr, posez la question à nouveau.", score: 0 },
    { text: "Reposez la question plus tard.", score: 0 },
    { text: "Le doute plane encore.", score: 0 },
    { text: "Cela pourrait aller dans les deux sens.", score: 0 },
    { text: "Les signes sont mitigés.", score: 0 },
    { text: "Il est encore trop tôt pour le dire.", score: 0 },
    { text: "La situation est incertaine pour le moment.", score: 0 },

    // Réponses négatives
    { text: "Non, certainement pas.", score: -3 },
    { text: "Je ne pense pas que cela arrivera.", score: -3 },
    { text: "Peu de chances que cela soit le cas.", score: -3 },
    { text: "Ce n'est pas dans les cartes.", score: -3 },
    { text: "La probabilité est très faible.", score: -3 },

    { text: "Les chances sont contre vous.", score: -2 },
    { text: "Il vaut mieux ne pas espérer.", score: -2 },
    { text: "Cela semble assez improbable.", score: -2 },
    { text: "La réponse est probablement non.", score: -2 },
    { text: "Il ne faut pas trop compter dessus.", score: -2 },

    { text: "Peut-être pas cette fois.", score: -1 },
    { text: "Je dirais que non.", score: -1 },
    { text: "Je ne pense pas que cela se réalisera.", score: -1 },
    { text: "Peu probable, mais pas impossible.", score: -1 },
    { text: "Les conditions ne semblent pas favorables.", score: -1 },
    { text: "Cela semble peu probable, mais tout est possible.", score: -1 },
    { text: "Les chances sont faibles.", score: -1 },
];


    // Liste des caractères spéciaux
    const specialChars = ["!", "#", "%", "&", "'", "(", "*", "-", "3", "6", ":", "<", "?", "E", "F", "I", "J", "K", "L", "M", "N", "O", "Q", "S", "T", "l", "n", "{", "|", "ª", "«", "¬", "­®", "±", "²", "´", "¸", "¹", "º", "»", "¼", "½", "¾", "¿", "À", "Á", "Â", "G", "H", "z", "R", ">", "8", "7", "$"];

    // Récupération de la question posée
    const questionInput = document.getElementById("question");
    const questionText = questionInput.value.trim();

    if (questionText === "") {
        alert("Veuillez entrer une question.");
        return;
    }

    // Sélection aléatoire d'une réponse
    const randomIndex = Math.floor(Math.random() * responses.length);
    const response = responses[randomIndex];

    // Sélection aléatoire d'un caractère spécial
    const randomCharIndex = Math.floor(Math.random() * specialChars.length);
    const selectedChar = specialChars[randomCharIndex];

    // Ajout de l'historique de la question et de la réponse
    const historyDiv = document.getElementById("history");

    const historyItem = document.createElement("div");
    historyItem.className = "history-item";

    const questionElement = document.createElement("div");
    questionElement.className = "question";
    questionElement.innerText = "Q: " + questionText;

    const responseElement = document.createElement("div");

    // Ajouter le texte "R:" avant le caractère spécial
    responseElement.innerText = "R: ";

    // Ajouter le caractère spécial avec la classe "special-char"
    const specialChar = document.createElement("span");
    specialChar.className = "special-char";
    specialChar.innerText = selectedChar;

    // Ajouter le texte de la réponse
    responseElement.appendChild(specialChar);
    responseElement.appendChild(document.createTextNode(" " + response.text));

    historyItem.appendChild(questionElement);
    historyItem.appendChild(responseElement);

    historyDiv.insertBefore(historyItem, historyDiv.firstChild);

    // Effacer le champ de texte après la soumission
    questionInput.value = "";

    // Changer la couleur de fond en fonction du score
    changeBackgroundColor(response.score);
}

function checkEnter(event) {
    if (event.key === "Enter") {
        getAnswer();
    }
}

function changeBackgroundColor(score) {
    let backgroundColor;
    if (score > 2) {
        backgroundColor = "#9CD2FC"; // Vert foncé pour les réponses très positives
    } else if (score > 0) {
        backgroundColor = "#D1FF47"; // Vert clair pour les réponses positives
    } else if (score === 0) {
        backgroundColor = "#FFFF1F"; // Jaune pour les réponses neutres
    } else if (score < 0 && score >= -2) {
        backgroundColor = "#FF8D5C"; // Orange pour les réponses négatives
    } else {
        backgroundColor = "#E7584B"; // Rouge pour les réponses très négatives
    }

    document.body.style.backgroundColor = backgroundColor;
}