/**
 * @author Rose Provencher <roseprovencher02@gmail.com>
 * @version 1.0
 */

//TODO:Commentaires
    //TODO Régler doublon du bouton suivant causé par input.checked

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
        // this.Q1.querySelector('.btn_next').addEventListener('click', this.cliquerBoutonProchaineQuestion.bind(this));
        // this.Q2.querySelector('.btn_next').addEventListener('click', this.cliquerBoutonProchaineQuestion.bind(this));
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
        // const button:HTMLButtonElement = document.createElement('button');

        // Cacher le bouton de soumission du formulaire
        this.btnValiderQuiz.style.display = 'none';
        // Cacher toutes les questions
        this.Q2.style.display = 'none';
        this.Q3.style.display = 'none';
        // Afficher première question
        this.afficherQuestion(this.questionActive);
        //Afficher bouton prochaine question
        // button.className = 'btn_next';
        // button.innerHTML = 'Prochaine question';
        // button.type = 'button';
        // document
        //     .getElementById('Q1')
        //     .appendChild(button)
        //     .addEventListener('click', this.cliquerBoutonProchaineQuestion.bind(this))
    }

    /**
     * Affiche une question
     * @param {number} noQuestion -> le numéro de la question à afficher
     */
    private afficherQuestion(no: number):void {
        document.getElementById('Q'+no).style.display = 'block';
        document.querySelector('.indicateurQuestion')
            .innerHTML = 'Question ' + no + ' de 3';
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
        const imgContenu =
            '<source srcset="assets/images/img_q1_rep_w200.png 1x, assets/images/img_q1_rep_w400.png 2x">' +
            '<img src="assets/images/img_q1_rep_w200.png" alt="Image de Link avec son ocarina">';
        let arrIsChecked:Array<boolean> = new Array();
        this.refArrChoixQ1.forEach((input) => {
            arrIsChecked.push(input.checked);
            input.disabled = true;
        });


        if(arrIsChecked.indexOf(true) == -1){
            this.afficherErreur(element);
        } else {
            this.afficherRetroactionReponse(element, 1, imgContenu);
        }
    }

    private validerChoixReponseQ2(evenement):void{
        const element:HTMLInputElement = evenement.currentTarget;
        const imgContenu =
            '<source media="(min-width:601px)" srcset="assets/images/img_q2_rep_w322.png">' +
            '<source media="(max-width:600px)" srcset="assets/images/img_q2_rep_w161.png 1x, assets/images/img_q2_rep_w322.png 2x">' +
            '<img src="assets/images/img_q2_rep_w322.png" alt="Déesses du Triforce">';

        let arrIsChecked:Array<boolean> = new Array();

        this.refArrChoixQ2.forEach((input) => {
            arrIsChecked.push(input.checked);
            input.disabled = true;
        });

        if(arrIsChecked.indexOf(true) == -1){
            this.afficherErreur(element);
        } else {
            this.afficherRetroactionReponse(element, 2, imgContenu);
        }
    }

    private validerChoixReponseQ3(evenement):void{
        const element:HTMLInputElement = evenement.currentTarget;
        const imgContenu =
            '<source srcset="assets/images/img_q3_rep_w132.png 1x, assets/images/img_q3_rep_w264.png 2x">' +
            '<img src="assets/images/img_q3_rep_w264.png" alt="Ooccoo et Ooccoo Jr.">';

        let arrIsChecked:Array<boolean> = new Array();

        this.refArrChoixQ3.forEach((input) => {
            arrIsChecked.push(input.checked);
            input.disabled = true;
        });

        if(arrIsChecked.indexOf(true) == -1){
            this.afficherErreur(element);
        } else {
            this.afficherRetroactionReponse(element, 3, imgContenu);
        }
    }

    private afficherRetroactionReponse(element:HTMLInputElement, noQuestion:number, imgContenu:string):void {
        let retroaction:string = 'positive';
        const explications:HTMLElement = element.closest('section')
            .querySelector('.q'+noQuestion+'__reponse');
        // Création du bouton
        const button:HTMLButtonElement = document.createElement('button');
        button.type = 'button';
        if(noQuestion == 3){
            button.className = 'btn_soumettre';
            button.innerHTML = 'Soumettre les résultats';

            explications
                .appendChild(button)
                .addEventListener('click', this.afficherResultatsFinaux.bind(this));
        } else {
            button.className = 'btn_next';
            button.innerHTML = 'Prochaine question';

            explications
                .appendChild(button)
                .addEventListener('click', this.cliquerBoutonProchaineQuestion.bind(this));
        }

        element.closest('.choixReponses')
            .querySelector('[value=' + this.objJSONQuiz['bonnesReponses'][noQuestion-1] + ']')
            .closest('li')
            .style = 'border: 1px solid green';

        //Vérifier la rétroaction de la question
        if(element.value != this.objJSONQuiz['bonnesReponses'][noQuestion-1]){
            retroaction = 'negative';
        }

        //Insérer les informations dans les balises appropriées
        explications
            .querySelector('.retroaction')
            .innerHTML = this.objJSONQuiz['retroactions'][retroaction];
        explications
            .querySelector('.img_rep')
            .innerHTML = imgContenu;
        explications
            .querySelector('.explication')
            .innerHTML = this.objJSONQuiz['explications']['Q'+noQuestion];

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