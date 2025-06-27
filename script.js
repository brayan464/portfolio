// Données des compétences descriptions
const competences = {
    html: {
        nom: "HTML5",
        description: "HTML5 (HyperText Markup Language 5) est la dernière version principale du langage de balisage utilisé pour structurer et présenter le contenu web. Il introduit de nouveaux éléments sémantiques, des API pour des applications web complexes, et une meilleure prise en charge multimédia."
    },
    css: {
        nom: "CSS3",
        description: "CSS3 (Cascading Style Sheets niveau 3) permet de styliser le contenu HTML. Il introduit de nouvelles fonctionnalités comme les animations, les transitions, les gradients, les ombres, et le responsive design avec les media queries."
    },
    javascript: {
        nom: "JavaScript",
        description: "JavaScript est un langage de programmation qui permet d'implémenter des fonctionnalités complexes sur les pages web. Il peut manipuler le DOM, gérer les événements, faire des requêtes asynchrones (AJAX) et bien plus encore."
    },
    git: {
        nom: "Git",
        description: "Git est un système de contrôle de version distribué qui permet de suivre les modifications du code source pendant le développement. Il facilite la collaboration entre développeurs et le gestion des différentes versions d'un projet."
    },
    responsive: {
        nom: "Design Responsive",
        description: "Le design responsive permet aux sites web de s'adapter automatiquement à la taille de l'écran du dispositif utilisé (ordinateur, tablette, smartphone). Il utilise des techniques comme les media queries, les grilles flexibles et les images adaptatives."
    },
    python: {
        nom: "Python",
        description: "Python est un langage de programmation interprété, multi-paradigme et multiplateforme. Il favorise la lisibilité du code avec une syntaxe claire et intuitive. Il est largement utilisé en développement web, analyse de données, intelligence artificielle et automatisation."
    }
};

// Initialisation des compteurs de clics
let compteursClics = {};

// Au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    // Récupére et initialiser à 0
    for (const competence in competences) {
        compteursClics[competence] = parseInt(localStorage.getItem(`compteur_${competence}`)) || 0;
    }
    
    // mets à jours 
    updateCompteurs();
    
    
    const boutons = document.querySelectorAll('.competence-btn');
    boutons.forEach(bouton => {
        bouton.addEventListener('click', function() {
            const competence = this.dataset.competence;
            afficherDescription(competence);
            
            // Incrémenter le compteur et sauvegarder
            compteursClics[competence]++;
            localStorage.setItem(`compteur_${competence}`, compteursClics[competence]);
            
            // Mettre à jour l'affichage
            updateCompteurs();
        });
    });
});

// Fonction pour afficher la description d'une compétence
function afficherDescription(competence) {
    const descriptionDiv = document.getElementById('description-competence');
    const data = competences[competence];
    
    descriptionDiv.innerHTML = `
        <h3>${data.nom}</h3>
        <p>${data.description}</p>
    `;
    
    // Animation
    descriptionDiv.style.animation = 'none';
    void descriptionDiv.offsetWidth; // Trigger reflow
    descriptionDiv.style.animation = 'fadeIn 0.5s ease';
}

// Fonction pour mettre à jour l'affichage des compteurs
function updateCompteurs() {
    const compteurList = document.getElementById('compteur-clics');
    compteurList.innerHTML = '';
    
    for (const competence in competences) {
        const nom = competences[competence].nom;
        const count = compteursClics[competence] || 0;
        
        const li = document.createElement('li');
        li.innerHTML = `<span>${nom}</span> <span>(${count} clic${count !== 1 ? 's' : ''})</span>`;
        compteurList.appendChild(li);
    }
}

// Ajout d'une animation CSS via JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);