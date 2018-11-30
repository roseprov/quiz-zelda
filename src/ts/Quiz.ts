/**
 * @author Rose Provencher <roseprovencher02@gmail.com>
 * @version 1.0
 */

export class Quiz {

    private questionActive: number = 1;
    private pointage: number = 0;
    private objJSONQuiz: JSON;
    private Q1:HTMLElement = document.getElementById('Q1');
    private Q2:HTMLElement = document.getElementById('Q2');
    private Q3:HTMLElement = document.getElementById('Q3');
    private btnValiderQuiz = document.getElementById('validerQuiz');


    public constructor() {
        //Créer une promesse

        this.getJSON();

        this.initialiser();

        this.Q1.querySelector('.btn_next').addEventListener('click', this.cliquerBoutonProchaineQuestion.bind(this));
        this.Q2.querySelector('.btn_next').addEventListener('click', this.cliquerBoutonProchaineQuestion.bind(this));
    }

    private async getJSON() {
        try {
            let promesse = await fetch('assets/js/objJSONquiz.json');
            let reponse = await promesse.json();
            this.objJSONQuiz = reponse;
            console.log(this.objJSONQuiz);

        } catch(erreur){
            console.error(erreur);
        }
    }

    /**
     * Définit l'état initial de l'App en version "riche"
     */
    private initialiser():void {
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
    private afficherQuestion(no: number):void {
        document.getElementById('Q'+no).style.display = 'block';
    }

    /**
     * Cache une question
     * @param no
     */
    private cacherQuestion(no:number):void {
        document.getElementById('Q'+no).style.display = 'none';
    }

    private cliquerBoutonValiderMonChoix(evenement: Event):void {

    }

    private cliquerBoutonProchaineQuestion(evenement: Event):void {
        this.cacherQuestion(this.questionActive);
        this.questionActive++;
        this.afficherQuestion(this.questionActive);
    }

    private afficherResultatsFinaux():void {

    }

    private cliquerRecommencerQuiz(evenement: Event):void {

    }

}