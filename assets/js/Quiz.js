/**
 * @author
 * @version
 * @todo À compléter!!!
 */
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Quiz {
        constructor() {
            this.questionActive = 1;
            this.pointage = 0;
            this.Q1 = document.getElementById('Q1');
            this.Q2 = document.getElementById('Q2');
            this.Q3 = document.getElementById('Q3');
            this.btnValiderQuiz = document.getElementById('validerQuiz');
            //Créer une promesse
            console.log('hello');
            this.initialiser();
            this.Q1.querySelector('.btn_next').addEventListener('click', this.cliquerBoutonProchaineQuestion.bind(this));
            this.Q2.querySelector('.btn_next').addEventListener('click', this.cliquerBoutonProchaineQuestion.bind(this));
        }
        /**
         * Définit l'état initial de l'App en version "riche"
         */
        initialiser() {
            console.log('in');
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
    }
    exports.Quiz = Quiz;
});
//# sourceMappingURL=Quiz.js.map