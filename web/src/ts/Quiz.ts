/**
 * @author Rose Provencher <roseprovencher02@gmail.com>
 * @version 1.0
 */

//TODO:Commentaires

export class Quiz {

    //Attributs
    private questionActive: number = 1;
    private questionsReussi:number = 0;
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
            // this.refArrChoixQ1[intCpt].addEventListener('blur', this.validerChoixReponseQ1.bind(this));
            this.refArrChoixQ1[intCpt].addEventListener('click', this.validerChoixReponseQ1.bind(this));
        }
        for(let intCpt = 0; intCpt < this.refArrChoixQ2.length; intCpt++){
            // this.refArrChoixQ2[intCpt].addEventListener('blur', this.validerChoixReponseQ2.bind(this));
            this.refArrChoixQ2[intCpt].addEventListener('click', this.validerChoixReponseQ2.bind(this));
        }
        for(let intCpt = 0; intCpt < this.refArrChoixQ3.length; intCpt++){
            // this.refArrChoixQ3[intCpt].addEventListener('blur', this.validerChoixReponseQ3.bind(this));
            this.refArrChoixQ3[intCpt].addEventListener('click', this.validerChoixReponseQ3.bind(this));
        }
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
    private afficherQuestion(no: number):void {
        document.getElementById('Q'+no).style.display = 'block';
        document.querySelector('.indicateurQuestion')
            .innerHTML = 'Question ' + no + ' de 3';
    }

    /**
     * Cache une question
     * @param no Numéro de la quesstion
     */
    private cacherQuestion(no:number):void {
        document.getElementById('Q'+no).style.display = 'none';
    }

    /**
     * Actions lorsque le bouton soumettre est cliqué
     * @param evenement Élément/Input écouté
     */
    private cliquerBoutonSoumettreMesChoix(evenement: Event):void {
        this.cacherQuestion(this.questionActive);
        this.afficherResultatsFinaux(evenement);
    }

    /**
     * Actions lorsque le bouton Suivant est cliqué
     * @param evenement Élément/Input écouté
     */
    private cliquerBoutonProchaineQuestion(evenement: Event):void {
        this.cacherQuestion(this.questionActive);
        this.questionActive++;
        this.afficherQuestion(this.questionActive);
    }

    /**
     * Affichage de la section résultats
     */
    private afficherResultatsFinaux(evenement):void {
        const resultats:HTMLElement = document.querySelector('.sectionResultats');

        resultats
            .closest('.conteneurQuiz')
            .querySelector('.zonePointage')
            .remove();
        resultats
            .closest('.conteneurQuiz')
            .querySelector('.indicateurQuestion')
            .remove();

        // resultats
        //     .closest('.bg_quiz')
        //     .style = "background:url('');";

        resultats
            .innerHTML =
            '<p class="resultats__titre">Vous avez terminé le quiz !</p>' +
            '<div class="resultats__statistiques">' +
            '     <p>Vous avez obtenu ' + this.pointage + ' rupees !</p>' +
            '     <p>' + this.questionsReussi + ' sur 3 questions de réussi !</p>' +
            '</div>' +
            '<a href="quiz.html" class="bouton">Recommencer le quiz</a>';
    }

    /**
     * Validations de la première question
     * @param evenement Élément/Input écouté
     */
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

    /**
     * Validations de la deuxième question
     * @param evenement Élément/Input écouté
     */
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

    /**
     * Validations de la troisième question
     * @param evenement Élément/Input écouté
     */
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

    //TODO: Optimiser cette methode, la répartir en plusieurs méthodes
    /**
     * Affichage de la réponse et de ses explications
     * @param element Élément écouté
     * @param noQuestion Numéro de la question
     * @param imgContenu Balises de l'image réponse
     */
    private afficherRetroactionReponse(element:HTMLInputElement, noQuestion:number, imgContenu:string):void {
        const bonneReponse:string = this.objJSONQuiz['bonnesReponses'][noQuestion-1];
        // const explications:HTMLElement = element.closest('section').querySelector('.q'+noQuestion+'__reponse');
        const explications:HTMLElement = element.closest('section').querySelector('.reponse');
        let couleurRetroaction = "#7CC66C";
        let retroaction:string = 'positive';
        let rupees:string = "";

        // Création du bouton
        this.creerBouton(noQuestion, explications);

        //Surligner la bonne réponse
        element.closest('.choixReponses')
            .querySelector('[value=' + bonneReponse + ']')
            .closest('.choix')
            .querySelector('.label')
            .style = 'border: 2px solid #7CC66C;';

        //Vérifier la rétroaction de la question
        if(element.value != bonneReponse){
            retroaction = 'negative';
            couleurRetroaction = '#C03E3E';
            element
                .closest('.choix')
                .querySelector('.label')
                .style = 'border:2px solid #C03E3E;';
        } else {
            this.questionsReussi += 1;
            rupees = this.objJSONQuiz['pointsReponse'][noQuestion-1];
            this.pointage += parseInt(rupees);
        }

        //Insérer les informations dans les balises appropriées
        explications
            .querySelector('.retroaction')
            .innerHTML = this.objJSONQuiz['retroactions'][retroaction];
        explications
            .querySelector('.retroaction')
            .style = 'text-shadow: 0 1px 3px rgba(0,0,0,0.3);';
        // + ' + ' + rupees;
        explications
            .querySelector('.retroaction')
            .style.color = couleurRetroaction;
        explications
            .querySelector('.imgReponse')
            .innerHTML = imgContenu;
        explications
            .querySelector('.explication')
            .innerHTML = this.objJSONQuiz['explications']['Q'+noQuestion];

    }

    /**
     * Création du bouton SUIVANT ou SOUMETTRE
     * @param noQuestion Numéro de la question
     * @param explications Section des explications
     */
    private creerBouton(noQuestion:number, explications:HTMLElement):void {
        const button:HTMLButtonElement = document.createElement('button');
        button.type = 'button';
        //Si c'est la dernière question
        if(noQuestion == 3){
            button.classList.add('btn_soumettre', 'bouton');
            button.innerHTML = 'Soumettre les résultats';
            //console.log('in');
            explications
                .appendChild(button)
                .addEventListener('click', this.cliquerBoutonSoumettreMesChoix.bind(this));
        } else {
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
