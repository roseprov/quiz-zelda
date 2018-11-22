/**
 * @author
 * @version
 * @todo À compléter!!!
 */

export class Quiz {

    private questionActive: number = 1;
    private pointage: number = 0;
    private objJSONQuiz: JSON;

    public constructor() {

    }

    /**
     * Définit l'état initial de l'App en version "riche"
     */
    private initialiser() {
        // Cacher le bouton de soumission du formulaire
        $('#validerQuiz').hide();
        // Cacher toutes les questions
        // ...
        // Afficher première question
        // ...
    }

    /**
     * Affiche une question
     * @param {number} noQuestion -> le numéro de la question à afficher
     */
    private afficherQuestion(no: number) {

    }

    private cliquerBoutonValiderMonChoix(evenement: Event) {

    }

    private cliquerBoutonProchaineQuestion(evenement: Event) {

    }

    private afficherResultatsFinaux() {

    }

    private cliquerRecommencerQuiz(evenement: Event) {

    }

}