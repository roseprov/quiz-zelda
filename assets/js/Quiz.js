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
            this.questionActive = 1;
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
                this.refArrChoixQ1[intCpt].addEventListener('blur', this.validerChoixReponseQ1.bind(this));
                this.refArrChoixQ1[intCpt].addEventListener('click', this.validerChoixReponseQ1.bind(this));
            }
            for (let intCpt = 0; intCpt < this.refArrChoixQ2.length; intCpt++) {
                this.refArrChoixQ2[intCpt].addEventListener('blur', this.validerChoixReponseQ2.bind(this));
                this.refArrChoixQ2[intCpt].addEventListener('click', this.validerChoixReponseQ2.bind(this));
            }
            for (let intCpt = 0; intCpt < this.refArrChoixQ3.length; intCpt++) {
                this.refArrChoixQ3[intCpt].addEventListener('blur', this.validerChoixReponseQ3.bind(this));
                this.refArrChoixQ3[intCpt].addEventListener('click', this.validerChoixReponseQ3.bind(this));
            }
            this.Q1.querySelector('.btn_next').addEventListener('click', this.cliquerBoutonProchaineQuestion.bind(this));
            this.Q2.querySelector('.btn_next').addEventListener('click', this.cliquerBoutonProchaineQuestion.bind(this));
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
            // Cacher le bouton de soumission du formulaire
            this.btnValiderQuiz.style.display = 'none';
            // Cacher toutes les questions
            this.Q2.style.display = 'none';
            this.Q3.style.display = 'none';
            // Afficher première question
            this.afficherQuestion(this.questionActive);
        }
        /**
         * Affiche une question
         * @param {number} noQuestion -> le numéro de la question à afficher
         */
        afficherQuestion(no) {
            document.getElementById('Q' + no).style.display = 'block';
        }
        /**
         * Cache une question
         * @param no
         */
        cacherQuestion(no) {
            document.getElementById('Q' + no).style.display = 'none';
        }
        cliquerBoutonValiderMonChoix(evenement) {
        }
        cliquerBoutonProchaineQuestion(evenement) {
            this.cacherQuestion(this.questionActive);
            this.questionActive++;
            this.afficherQuestion(this.questionActive);
        }
        afficherResultatsFinaux() {
        }
        cliquerRecommencerQuiz(evenement) {
        }
        validerChoixReponseQ1(evenement) {
            const element = evenement.currentTarget;
            let arrIsChecked = new Array();
            this.refArrChoixQ1.forEach((input) => {
                arrIsChecked.push(input.checked);
            });
            if (arrIsChecked.indexOf(true) == -1) {
                this.afficherErreur(element);
            }
        }
        validerChoixReponseQ2(evenement) {
            const element = evenement.currentTarget;
            let arrIsChecked = new Array();
            this.refArrChoixQ2.forEach((input) => {
                arrIsChecked.push(input.checked);
            });
            if (arrIsChecked.indexOf(true) == -1) {
                this.afficherErreur(element);
            }
        }
        validerChoixReponseQ3(evenement) {
            const element = evenement.currentTarget;
            let arrIsChecked = new Array();
            this.refArrChoixQ3.forEach((input) => {
                arrIsChecked.push(input.checked);
            });
            if (arrIsChecked.indexOf(true) == -1) {
                this.afficherErreur(element);
            }
        }
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