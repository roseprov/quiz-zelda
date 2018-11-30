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
    class Quiz {
        constructor() {
            //Créer une promesse
            this.questionActive = 1;
            this.pointage = 0;
            this.Q1 = document.getElementById('Q1');
            this.Q2 = document.getElementById('Q2');
            this.Q3 = document.getElementById('Q3');
            this.btnValiderQuiz = document.getElementById('validerQuiz');
            this.getJSON();
            this.initialiser();
            this.Q1.querySelector('.btn_next').addEventListener('click', this.cliquerBoutonProchaineQuestion.bind(this));
            this.Q2.querySelector('.btn_next').addEventListener('click', this.cliquerBoutonProchaineQuestion.bind(this));
        }
        getJSON() {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    let promesse = yield fetch('assets/js/objJSONquiz.json');
                    let reponse = yield promesse.json();
                    this.objJSONQuiz = reponse;
                    console.log(this.objJSONQuiz);
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
            console.log('in');
            console.log(this.objJSONQuiz);
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
    }
    exports.Quiz = Quiz;
});
//# sourceMappingURL=Quiz.js.map