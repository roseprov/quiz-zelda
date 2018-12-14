/**
 * @author Rose Provencher <roseprovencher02@gmail.com>
 * @version 1.0
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    //TODO:Commentaires
    class Quiz {
        constructor() {
            //Attributs
            this.questionActive = 1;
            this.questionsReussi = 0;
            this.pointage = 0;
            this.Q1 = document.getElementById('Q1');
            this.Q2 = document.getElementById('Q2');
            this.Q3 = document.getElementById('Q3');
            this.refArrChoixQ1 = Array.apply(null, document.querySelectorAll('[name=Q1]'));
            this.refArrChoixQ2 = Array.apply(null, document.querySelectorAll('[name=Q2]'));
            this.refArrChoixQ3 = Array.apply(null, document.querySelectorAll('[name=Q3]'));
            this.btnValiderQuiz = document.getElementById('validerQuiz');
            //Lier le fichier JSON
            this.getJSON();
            this.initialiser();
            //Écouteurs d'événements
            for (let intCpt = 0; intCpt < this.refArrChoixQ1.length; intCpt++) {
                // this.refArrChoixQ1[intCpt].addEventListener('blur', this.validerChoixReponseQ1.bind(this));
                this.refArrChoixQ1[intCpt].addEventListener('click', this.validerChoixReponseQ1.bind(this));
            }
            for (let intCpt = 0; intCpt < this.refArrChoixQ2.length; intCpt++) {
                // this.refArrChoixQ2[intCpt].addEventListener('blur', this.validerChoixReponseQ2.bind(this));
                this.refArrChoixQ2[intCpt].addEventListener('click', this.validerChoixReponseQ2.bind(this));
            }
            for (let intCpt = 0; intCpt < this.refArrChoixQ3.length; intCpt++) {
                // this.refArrChoixQ3[intCpt].addEventListener('blur', this.validerChoixReponseQ3.bind(this));
                this.refArrChoixQ3[intCpt].addEventListener('click', this.validerChoixReponseQ3.bind(this));
            }
        }
        /**
         * Promesse pour le fetch du fichier JSON
         */
        getJSON() {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    let promesse = yield fetch('assets/js/objJSONquiz.json');
                    let reponse = yield promesse.json();
                    this.objJSONQuiz = reponse;
                }
                catch (erreur) {
                    console.error(erreur);
                }
            });
        }
        /**
         * Définit l'état initial de l'App en version "riche"
         */
        initialiser() {
            // Cacher toutes les questions
            this.Q2.style.display = 'none';
            this.Q3.style.display = 'none';
            // Afficher première question
            this.afficherQuestion(this.questionActive);
            // Cacher le bouton de soumission du formulaire
            this.btnValiderQuiz.style.display = 'none';
        }
        /**
         * Affiche une question
         * @param {number} noQuestion -> le numéro de la question à afficher
         */
        afficherQuestion(no) {
            document.getElementById('Q' + no).style.display = 'block';
            document.querySelector('.indicateurQuestion')
                .innerHTML = 'Question ' + no + ' de 3';
        }
        /**
         * Cache une question
         * @param no Numéro de la quesstion
         */
        cacherQuestion(no) {
            document.getElementById('Q' + no).style.display = 'none';
        }
        /**
         * Actions lorsque le bouton soumettre est cliqué
         * @param evenement Élément/Input écouté
         */
        cliquerBoutonSoumettreMesChoix(evenement) {
            this.cacherQuestion(this.questionActive);
            this.afficherResultatsFinaux(evenement);
        }
        /**
         * Actions lorsque le bouton Suivant est cliqué
         * @param evenement Élément/Input écouté
         */
        cliquerBoutonProchaineQuestion(evenement) {
            this.cacherQuestion(this.questionActive);
            this.questionActive++;
            this.afficherQuestion(this.questionActive);
        }
        /**
         * Affichage de la section résultats
         */
        afficherResultatsFinaux(evenement) {
            const resultats = document.querySelector('.sectionResultats');
            console.log(resultats.innerHTML);
            resultats
                .parentElement
                .querySelector('.zonePointage')
                .remove();
            resultats
                .parentElement
                .querySelector('.indicateurQuestion')
                .remove();
            resultats
                .innerHTML =
                `<div class="pageResultats">
                <div class="containerResultats">
                    <h1 hidden>Résultats</h1>
                    <p class="titreResultat">Vous avez terminé le quiz!</p>
                    <div class="information">
                        <p>Vous avez obtenu ${this.pointage} sur 100 rupees!</p>
                        <p>${this.questionsReussi} sur 3 questions de réussi!</p>
                    </div>
                    <div class="btnRecommencer">
                        <a href="quiz.html" class="bouton">Recommencer le quiz</a>
                    </div>
                </div>
            </div>`;
            resultats
                .closest('body')
                .className = 'bg_resultats';
        }
        /**
         * Validations de la première question
         * @param evenement Élément/Input écouté
         */
        validerChoixReponseQ1(evenement) {
            const element = evenement.currentTarget;
            const imgContenu = '<source srcset="assets/images/img_q1_rep_w200.png 1x, assets/images/img_q1_rep_w400.png 2x">' +
                '<img src="assets/images/img_q1_rep_w200.png" alt="Image de Link avec son ocarina">';
            let arrIsChecked = new Array();
            this.refArrChoixQ1.forEach((input) => {
                arrIsChecked.push(input.checked);
                input.disabled = true;
            });
            if (arrIsChecked.indexOf(true) == -1) {
                this.afficherErreur(element);
            }
            else {
                this.afficherRetroactionReponse(element, 1, imgContenu);
            }
        }
        /**
         * Validations de la deuxième question
         * @param evenement Élément/Input écouté
         */
        validerChoixReponseQ2(evenement) {
            const element = evenement.currentTarget;
            const imgContenu = '<source media="(min-width:601px)" srcset="assets/images/img_q2_rep_w322.png">' +
                '<source media="(max-width:600px)" srcset="assets/images/img_q2_rep_w161.png 1x, assets/images/img_q2_rep_w322.png 2x">' +
                '<img src="assets/images/img_q2_rep_w322.png" alt="Déesses du Triforce">';
            let arrIsChecked = new Array();
            this.refArrChoixQ2.forEach((input) => {
                arrIsChecked.push(input.checked);
                input.disabled = true;
            });
            if (arrIsChecked.indexOf(true) == -1) {
                this.afficherErreur(element);
            }
            else {
                this.afficherRetroactionReponse(element, 2, imgContenu);
            }
        }
        /**
         * Validations de la troisième question
         * @param evenement Élément/Input écouté
         */
        validerChoixReponseQ3(evenement) {
            const element = evenement.currentTarget;
            const imgContenu = '<source srcset="assets/images/img_q3_rep_w132.png 1x, assets/images/img_q3_rep_w264.png 2x">' +
                '<img src="assets/images/img_q3_rep_w264.png" alt="Ooccoo et Ooccoo Jr.">';
            let arrIsChecked = new Array();
            this.refArrChoixQ3.forEach((input) => {
                arrIsChecked.push(input.checked);
                input.disabled = true;
            });
            if (arrIsChecked.indexOf(true) == -1) {
                this.afficherErreur(element);
            }
            else {
                this.afficherRetroactionReponse(element, 3, imgContenu);
            }
        }
        //TODO: Optimiser cette methode, la répartir en plusieurs méthodes
        /**
         * Affichage de la réponse et de ses explications
         * @param element Élément écouté
         * @param noQuestion Numéro de la question
         * @param imgContenu Balises de l'image réponse
         */
        afficherRetroactionReponse(element, noQuestion, imgContenu) {
            const bonneReponse = this.objJSONQuiz['bonnesReponses'][noQuestion - 1];
            const explications = element.closest('section').querySelector('.reponse');
            const arrChoix = element.closest('.choixReponses').querySelectorAll('.choix');
            let couleurRetroaction = "#7CC66C";
            let retroaction = 'positive';
            let rupees = this.objJSONQuiz['pointsReponse'][noQuestion - 1];
            // Création du bouton
            this.creerBouton(noQuestion, explications);
            //Surligner la bonne réponse
            element.closest('.choixReponses')
                .querySelector('[value=' + bonneReponse + ']')
                .closest('.choix')
                .querySelector('.label')
                .style = 'border: 2px solid #7CC66C;';
            element.closest('.choixReponses')
                .querySelector('[value=' + bonneReponse + ']')
                .closest('.choix')
                .classList.add('bonneReponse');
            //Vérifier la rétroaction de la question
            if (element.value != bonneReponse) {
                retroaction = 'negative';
                couleurRetroaction = '#C03E3E';
                element
                    .closest('.choix')
                    .querySelector('.label')
                    .style = 'border:2px solid #C03E3E;';
                element
                    .closest('.choix')
                    .classList.add('mauvaiseReponse');
            }
            else {
                this.questionsReussi += 1;
                this.pointage += parseInt(rupees);
            }
            arrChoix.forEach(element => {
                console.log(element);
                if (!(element.classList[1] == 'bonneReponse' || element.classList[1] == 'mauvaiseReponse')) {
                    element
                        .querySelector('.hover')
                        .classList.add('slideOutUp');
                }
            });
            //Insérer les informations dans les balises appropriées
            explications
                .querySelector('.retroaction')
                .innerHTML = this.objJSONQuiz['retroactions'][retroaction];
            if (element.value == bonneReponse) {
                explications
                    .querySelector('.retroaction')
                    .innerHTML += ` + ${rupees} rupees`;
            }
            explications
                .querySelector('.retroaction')
                .style = 'text-shadow: 0 1px 3px rgba(0,0,0,0.3);';
            explications
                .querySelector('.retroaction')
                .style.color = couleurRetroaction;
            explications
                .querySelector('.imgReponse')
                .innerHTML = imgContenu;
            explications
                .querySelector('.explication')
                .innerHTML = this.objJSONQuiz['explications']['Q' + noQuestion];
            document.querySelector('.pointage').innerHTML = this.pointage.toString();
            explications
                .classList.add('slideInUpReponse');
        }
        /**
         * Création du bouton SUIVANT ou SOUMETTRE
         * @param noQuestion Numéro de la question
         * @param explications Section des explications
         */
        creerBouton(noQuestion, explications) {
            const button = document.createElement('button');
            button.type = 'button';
            //Si c'est la dernière question
            if (noQuestion == 3) {
                button.classList.add('btn_soumettre', 'bouton');
                button.innerHTML = 'Soumettre les résultats';
                //console.log('in');
                explications
                    .appendChild(button)
                    .addEventListener('click', this.cliquerBoutonSoumettreMesChoix.bind(this));
            }
            else {
                button.classList.add('btn_next', 'bouton');
                button.innerHTML = 'Prochaine question';
                explications
                    .appendChild(button)
                    .addEventListener('click', this.cliquerBoutonProchaineQuestion.bind(this));
            }
        }
        /**
         * Affichage de l'erreur (si non coché)
         * @param element Input HTML écouté
         */
        afficherErreur(element) {
            this.effacerErreur(element);
            const pErreur = element.closest('section').querySelector('.erreur');
            console.log((pErreur.innerHTML == '') + '//' + pErreur.innerHTML);
            pErreur.innerHTML = '<span class="erreur__contenu">'
                + this.objJSONQuiz['messages']['pasDeReponse'] + '</span>';
        }
        /**
         * Effacer le message d'erreur déjà présent
         * @param element : Input HTML écouté
         */
        effacerErreur(element) {
            element.closest('section').querySelector('.erreur').innerHTML = '';
        }
    }
    exports.Quiz = Quiz;
});
//# sourceMappingURL=Quiz.js.map