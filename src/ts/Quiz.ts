/**
 * @author Rose Provencher <roseprovencher02@gmail.com>
 * @version 1.0
 */

//TODO:Commentaires

export class Quiz {

    private questionActive: number = 1;
    private pointage: number = 0;
    private objJSONQuiz: JSON;
    private Q1:HTMLElement = document.getElementById('Q1');
    private Q2:HTMLElement = document.getElementById('Q2');
    private Q3:HTMLElement = document.getElementById('Q3');
    private refArrChoixQ1: Array<HTMLInputElement> = Array.apply(null, document.querySelectorAll('[name=Q1]'));
    private refArrChoixQ2: Array<HTMLInputElement> = Array.apply(null, document.querySelectorAll('[name=Q2]'));
    private refArrChoixQ3: Array<HTMLInputElement> = Array.apply(null, document.querySelectorAll('[name=Q3]'));
    private btnValiderQuiz = document.getElementById('validerQuiz');


    public constructor() {
        //Lier le fichier JSON
        this.getJSON();
        this.initialiser();

        //Écouteurs d'événements
        for(let intCpt = 0; intCpt < this.refArrChoixQ1.length; intCpt++){
            this.refArrChoixQ1[intCpt].addEventListener('blur', this.validerChoixReponseQ1.bind(this));
            this.refArrChoixQ1[intCpt].addEventListener('click', this.validerChoixReponseQ1.bind(this));
        }
        for(let intCpt = 0; intCpt < this.refArrChoixQ2.length; intCpt++){
            this.refArrChoixQ2[intCpt].addEventListener('blur', this.validerChoixReponseQ2.bind(this));
            this.refArrChoixQ2[intCpt].addEventListener('click', this.validerChoixReponseQ2.bind(this));
        }
        for(let intCpt = 0; intCpt < this.refArrChoixQ3.length; intCpt++){
            this.refArrChoixQ3[intCpt].addEventListener('blur', this.validerChoixReponseQ3.bind(this));
            this.refArrChoixQ3[intCpt].addEventListener('click', this.validerChoixReponseQ3.bind(this));
        }
        this.Q1.querySelector('.btn_next').addEventListener('click', this.cliquerBoutonProchaineQuestion.bind(this));
        this.Q2.querySelector('.btn_next').addEventListener('click', this.cliquerBoutonProchaineQuestion.bind(this));
    }

    /**
     * Promesse pour le fetch du fichier JSON
     */
    private async getJSON() {
        try {
            let promesse = await fetch('assets/js/objJSONquiz.json');
            let reponse = await promesse.json();
            this.objJSONQuiz = reponse;

        } catch(erreur){
            console.error(erreur);
        }
    }

    /**
     * Définit l'état initial de l'App en version "riche"
     */
    private initialiser():void {
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


    private validerChoixReponseQ1(evenement):void{
        const element:HTMLInputElement = evenement.currentTarget;
        let arrIsChecked:Array<boolean> = new Array();
        this.refArrChoixQ1.forEach((input) => {
            arrIsChecked.push(input.checked);
        });

        if(arrIsChecked.indexOf(true) == -1){
            this.afficherErreur(element);
        }
    }
    private validerChoixReponseQ2(evenement):void{
        const element:HTMLInputElement = evenement.currentTarget;
        let arrIsChecked:Array<boolean> = new Array();

        this.refArrChoixQ2.forEach((input) => {
            arrIsChecked.push(input.checked);
        });

        if(arrIsChecked.indexOf(true) == -1){
            this.afficherErreur(element);
        }
    }
    private validerChoixReponseQ3(evenement):void{
        const element:HTMLInputElement = evenement.currentTarget;
        let arrIsChecked:Array<boolean> = new Array();

        this.refArrChoixQ3.forEach((input) => {
            arrIsChecked.push(input.checked);
        });

        if(arrIsChecked.indexOf(true) == -1){
            this.afficherErreur(element);
        }
    }


    private afficherErreur(element:HTMLInputElement):void{
        this.effacerErreur(element);

        const pErreur: HTMLElement = element.closest('section').querySelector('.erreur');
        console.log((pErreur.innerHTML == '') + '//' + pErreur.innerHTML);

        pErreur.innerHTML = '<span class="erreur__contenu">'
            + this.objJSONQuiz['messages']['pasDeReponse'] + '</span>';
    }

    /**
     * Effacer le message d'erreur déjà présent
     * @param element : Input HTML écouté
     */
    private effacerErreur(element:HTMLInputElement){
        element.closest('section').querySelector('.erreur').innerHTML = '';
    }



}