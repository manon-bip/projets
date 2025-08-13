// Sélection des éléments DOM
const pages = {
    accueil: document.querySelector("#accueil"),
    page_01: document.querySelector("#page_01"),
    page_02: document.querySelector("#page_02"),
    page_03: document.querySelector("#page_03"),
    page_04: document.querySelector("#page_04"),
    page_05: document.querySelector("#page_05"),
    page_06: document.querySelector("#page_06"),
    page_07: document.querySelector("#page_07"),
    page_08: document.querySelector("#page_08"),
    page_09: document.querySelector("#page_09"),
    page_10: document.querySelector("#page_10")
};

let popupsOuverts = []; // Référence aux fenêtres popups ouvertes
let pageActuelle = "";  // ID de la page actuellement visible

// Configuration des pop-ups avec plusieurs popups par page
const popupConfig = {
    page_01: [

        {
            width: 27, 
            height: 28,
            left: 60, 
            top: 47, 
            customHtml: "<p class='texte_popup'>Petite, j’allais sur Internet avec un gros ordinateur gris dans le salon. Je n’utilisais que MSN et j’envoyais plein de WIZZS à ma famille quand il ne me répondaient pas.</p>"
        },
        {
            width: 24,
            height: 55,
            left: 10, 
            top: 30, 
            customHtml: "<img src='images/Popup_01_bitmap.jpg' class='image_popup'>"
        }
    ],
    page_02: [

        {
            width: 28.5, 
            height: 31,
            left: 8, 
            top: 67.5, 
            customHtml: "<p class='texte_popup'>J’ai découvert Moviestarplanet, une sorte de réseau social pour enfant où le but était de devenir “riche et célèbre”. Ma grand mère avait accepté de m’acheter un abonnement VIP pour que je puisse acheter plus de vêtements.</p>"
        },
        {
            width: 24,
            height: 55,
            left: 42, 
            top: 7, 
            customHtml: "<img src='images/Popup_02_bitmap.jpg' class='image_popup'>"
        }
    ],
    page_03: [

        {
            width: 34, 
            height: 28,
            left: 60, 
            top: 47, 
            customHtml: "<p class='texte_popup'>Quand je suis devenue une adolescente solitaire les jeux ne me suffisaient plus. Je me suis plongée à corps perdu dans les réseaux sociaux, notamment Twitter et Skype. J’avais l’impression de pouvoir y être qui je voulais.</p>"
        },
        {
            width: 24,
            height: 55,
            left: 10, 
            top: 40, 
            customHtml: "<img src='images/Popup_03_bitmap.jpg' class='image_popup'>"
        }
    ],
    page_04: [

        {
            width: 24,
            height: 55,
            left: 8, 
            top: 40, 
            customHtml: "<img src='images/Popup_04.1_bitmap.jpg' class='image_popup'>"
        },
        {
            width: 24,
            height: 55,
            left: 62, 
            top: 59, 
            customHtml: "<img src='images/Popup_04.2_bitmap.jpg' class='image_popup'>"
        },
        {
            width: 24,
            height: 55,
            left: 77, 
            top: 39, 
            customHtml: "<img src='images/Popup_04.3_bitmap.jpg' class='image_popup'>"
        },
        {
            width: 30, 
            height: 30,
            left: 15, 
            top: 22, 
            customHtml: "<p class='texte_popup'>Quand je regardais des animes illégalement, il y avait parfois des chats auxquels on pouvait participer. Je ne pouvais jamais m’empêcher d’envoyer au moins un message, même si je n’avais rien de particulier ou d’intéressant à dire.</p>"
        },
    ],
    page_05: [
        {
            width: 24,
            height: 55,
            left: 10, 
            top: 7, 
            customHtml: "<img src='images/Popup_05_bitmap.jpg' class='image_popup'>"
        },
        {
            width: 24.9, 
            height: 39,
            left: 63, 
            top: 50, 
            customHtml: "<p class='texte_popup'>Avant même de m’intéresser au code, j’ai tenté de créer mon propre blog pour parler d’un anime spécifique. J’ai utilisé des systèmes qui proposaient des templates de sites. Je n’ai jamais compris pourquoi je ne recevais aucune visite et pourquoi mon site n’était pas trouvable sur Google. En fait il n’était pas en ligne.</p>"
        },
    ],    
    page_06: [
        {
            width: 24,
            height: 55,
            left: 75, 
            top: 39.5, 
            customHtml: "<img src='images/Popup_06_bitmap.jpg' class='image_popup'>"
        },
        {
            width: 23, 
            height: 39,
            left: 7, 
            top: 57, 
            customHtml: "<p class='texte_popup'>Moi qui n’ai pas un cerveau très mathématique j’ai mis un peu de temps à comprendre comment écrire du texte pouvait produire des choses visuelles. Et moi je ne peux pas me résoudre à reproduire bêtement, je dois comprendre sinon je ne peux pas avancer. Je me suis donc acharnée.</p>"
        },
    ],
    page_07: [
        {
            width: 24,
            height: 55,
            left: 7, 
            top: 32, 
            customHtml: "<img src='images/Popup_07_bitmap.jpg' class='image_popup'>"
        },
        {
            width: 40.5, 
            height: 28,
            left: 60, 
            top: 49, 
            customHtml: "<p class='texte_popup'>Déjà sur les jeux en lignes, je ne me sentais pas satisfaite des limites qu’on m’imposait. J’essayais par tous les moyens possible de tricher. Parfois en exploitant simplement des failles, ou en allant jusqu’à utiliser des logiciels. Je pouvais me donner de l’argent à l’infini.</p>"
        },
    ],  
    page_08: [
        {
            width: 24,
            height: 55,
            left: 62, 
            top: 57.5, 
            customHtml: "<img src='images/Popup_08_bitmap.jpg' class='image_popup'>"
        },
        {
            width: 25, 
            height: 33,
            left: 10, 
            top: 27, 
            customHtml: "<p class='texte_popup'>Pendant que j’apprenais à coder en bac pro, j’ai créé de nombreux tests de codes humoristiques que je faisais ensuite tester à mes camarades. Je n’ai rien conservé de toutes ces petites créations. Ça ne me semblait pas important à l’époque.</p>"
        },
    ],  
    page_09: [
        {
            width: 24,
            height: 55,
            left: 22, 
            top: 3, 
            customHtml: "<img src='images/Popup_09.1_bitmap.jpg' class='image_popup'>"
        }, 
        {
            width: 24,
            height: 55,
            left: 0, 
            top: 50, 
            customHtml: "<img src='images/Popup_09.2_bitmap.jpg' class='image_popup'>"
        }, 
        {
            width: 24,
            height: 55,
            left: 0, 
            top: 18, 
            customHtml: "<img src='images/Popup_09.3_bitmap.jpg' class='image_popup'>"
        }, 
        {
            width: 24,
            height: 55,
            left: 90, 
            top: 60, 
            customHtml: "<img src='images/Popup_09.4_bitmap.jpg' class='image_popup'>"
        }, 
        {
            width: 20, 
            height: 42,
            left: 70, 
            top: 40, 
            customHtml: "<p class='texte_popup'>Il y a quelque chose d’un peu indescriptible et de profondément intime dans ces sites, selon moi. Les idées, les formes sont souvent très crues, sans filtre. C’est comme si le créateur lui-même avait mis son site dans le creux de ma main. En les parcourant, je jurerais pouvoir regarder directement dans leurs yeux. </p>"
        },
    ],
    page_10: [

        {
            width: 10, 
            height: 10,
            left: 60, 
            top: 47, 
            customHtml: "<p class='texte_popup'>Merci d'avoir lu.</p>"
        },
        {
            width: 24,
            height: 55,
            left: 35, 
            top: 35, 
            customHtml: "<img src='images/Popup_10_bitmap.jpg' class='image_popup'>"
        }
    ],
};

// Fonction pour cacher toutes les pages
function cacherToutesLesPages() {
    Object.values(pages).forEach(page => page.style.display = "none");
}

// Fonction pour fermer toutes les popups
function fermerPopups() {
    popupsOuverts.forEach(popup => popup.close());
    popupsOuverts = []; // Réinitialiser la liste des popups ouverts
}

// Fonction pour afficher la page suivante et ouvrir ses popups
function changerPage(event, direction) {
    const pageSuivanteId = event.target.getAttribute(`data-${direction}`);
    cacherToutesLesPages(); // Cacher toutes les pages
    pages[pageSuivanteId].style.display = "flex"; // Afficher la page suivante
    pageActuelle = pageSuivanteId; // Mettre à jour la page actuellement visible
    ouvrirPopups(pageActuelle); // Ouvrir toutes les popups associées à la nouvelle page
}

// Fonction pour générer et ouvrir une fenêtre popup avec des dimensions responsives
function creerPopup({ message, imageUrl, width, height, left, top, customHtml }) {
    // Calcul des dimensions en pixels basées sur la taille du viewport
    const largeurPopup = Math.round((width / 100) * window.innerWidth);   // width en vw -> pixels
    const hauteurPopup = Math.round((height / 100) * window.innerHeight); // height en vh -> pixels
    const positionLeft = Math.round((left / 100) * window.innerWidth);    // left en vw -> pixels
    const positionTop = Math.round((top / 100) * window.innerHeight);     // top en vh -> pixels

    const newPopup = window.open("", "", `width=${largeurPopup},height=${hauteurPopup},left=${positionLeft},top=${positionTop}`);

    if (newPopup) {
        newPopup.document.write(`
            <html>
            <head>
                <link rel="stylesheet" type="text/css" href="style.css">
            </head>
            <body>
                <div class="contenu_popup">
                    ${message ? `<p>${message}</p>` : ""}
                    ${imageUrl ? `<img src="${imageUrl}" alt="Image" style="max-width: 100%; height: auto;">` : ""}
                    ${customHtml || ""}
                </div>
            </body>
            </html>
        `);
        newPopup.document.close(); // Assurer que le contenu est chargé
        popupsOuverts.push(newPopup); // Ajouter à la liste des popups ouverts
    }
}

// Fonction pour ouvrir toutes les popups associées à la page actuelle
function ouvrirPopups(pageId) {
    fermerPopups(); // Fermer toutes les popups ouvertes
    if (popupConfig[pageId]) {
        popupConfig[pageId].forEach(creerPopup); // Créer les popups pour cette page
    }
}

// Fonction pour surveiller l'affichage des pages et fermer les popups si on revient à l'accueil
function checkVisibilitePage() {
    const nouvellePage = Object.keys(pages).find(pageId => pages[pageId].style.display === "flex");

    if (nouvellePage !== pageActuelle) {
        pageActuelle = nouvellePage;

        if (!popupConfig[pageActuelle]) {
            fermerPopups(); // Fermer les popups si la page n'a pas de configuration de popup
        }
    }
}

// Exécuter la vérification toutes les 500ms pour la gestion des popups
setInterval(checkVisibilitePage, 500);

// Afficher la page d'accueil au début
cacherToutesLesPages();
pages["accueil"].style.display = "flex"; // Affiche la page d'accueil initialement
pageActuelle = "accueil"; // Mettre à jour la page actuelle

// Ajouter l'événement pour le bouton "retourner à la page d'accueil"
document.querySelectorAll(".bouton_precedent").forEach(button => {
    button.addEventListener("click", event => {
        const pagePrecedenteId = event.target.getAttribute('data-prec');
        if (pagePrecedenteId === "accueil") {
            cacherToutesLesPages();
            pages["accueil"].style.display = "flex"; // Afficher la page d'accueil
            pageActuelle = "accueil"; // Mettre à jour la page actuelle
            fermerPopups(); // Fermer toutes les popups si elles sont ouvertes
        } else {
            changerPage(event, 'prec');
        }
    });
});

// Attacher les événements pour les boutons 'suivant' et 'précédent'
document.querySelectorAll(".bouton_suivant").forEach(button => {
    button.addEventListener("click", event => changerPage(event, 'suiv'));
});
