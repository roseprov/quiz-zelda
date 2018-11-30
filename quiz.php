<?php
//Associer le fichier JSON
$strDonneesJSON=file_get_contents("assets/js/objJSONquiz.json");
$arrJSON=json_decode($strDonneesJSON,true);

$arrErreurs = array();
$arrExpReponse = array();

if(isset($_GET['validerQuiz'])){
    $blnValidationsOk = true;

    for($i=1;$i<=3;$i++){
        if(isset($_GET['Q'.$i])){
            //Inscrire l'explication de la réponse
            $arrExpReponse['Q'.$i] = array(
                'explication' => $arrJSON['explications']['Q'.$i],
                'retroaction' => null
            );
            //Affichage de la rétroaction
            if($_GET['Q'.$i] == $arrJSON['bonnesReponses'][0]){
                $arrExpReponse['Q'.$i]['retroaction'] = $arrJSON['retroactions']['positive'];
            } else {
                $arrExpReponse['Q'.$i]['retroaction'] = $arrJSON['retroactions']['negative'];
            }
        } else {
            $blnValidationsOk = false;
            $arrErreurs['Q'.$i] = $arrJSON['messages']['pasDeReponse'];
        }
    }

    if($blnValidationsOk){
        header('Location: resultats.php');
    }
}

?>

<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>Quiz - The Legend of Zelda</title>
  <!--<link rel="stylesheet" href="assets/css/styles.css">-->
</head>

<body>
<!-- Canevas de départ proposé pour la version "pauvre" -->


<header role="banner">
  <h1 class="title">The Legend of Zelda<br>
    <span>Le quiz « légendaire » de la série <i>The Legend of Zelda</i></span></h1>
</header>

<main>
    <form action="quiz.php">
    <section id="Q1" class="">
      <fieldset>
        <legend>Quel est le nom de cette mélodie ?</legend>
        <ul class="choixReponses">
          <li>
            <input id="Q1A" type="radio" name="Q1" value="Q1A">
            <label for="Q1A">A. La berceuse de Zelda</label>
          </li>
          <li>
            <input id="Q1B" type="radio" name="Q1" value="Q1B">
            <label for="Q1B">B. Le chant de Saria</label>
          </li>
          <li>
            <input id="Q1C" type="radio" name="Q1" value="Q1C">
            <label for="Q1C">C. Le Chant du temps</label>
          </li>
        </ul>

      </fieldset>
        <div class="reponse">
            <p class="retroaction"><?= array_key_exists('Q1', $arrExpReponse) ? $arrExpReponse['Q1']['retroaction'] : ''; ?></p>
            <picture>PLACEHOLDER</picture>
            <p class="explication"><?= array_key_exists('Q1', $arrExpReponse) ? $arrExpReponse['Q1']['explication'] : ''; ?></p>
        </div>
        <p class="erreur" aria-live="assertive" aria-atomic="true">
            <?= array_key_exists('Q1', $arrErreurs) ? $arrErreurs['Q1'] : ''; ?>
        </p>
      <button type="button" class="btn_next">Inserer en javascriptProchaine question</button>
    </section>

    <section id="Q2">
      <fieldset>
        <legend>Quels sont les noms des trois divinités qui ont créé le Triforce ?</legend>
        <ul class="choixReponses">
          <li>
            <input id="Q2A" type="radio" name="Q2" value="Q2A">
            <label for="Q2A">A. Zelda, Sheik, Impa</label>
          </li>
          <li>
            <input id="Q2B" type="radio" name="Q2" value="Q2B">
            <label for="Q2B">B. Zelda, Link, Ganon</label>
          </li>
          <li>
            <input id="Q2C" type="radio" name="Q2" value="Q2C">
            <label for="Q2C">C. Saria, Ruto, Nabooru</label>
          </li>
          <li>
            <input id="Q2D" type="radio" name="Q2" value="Q2D">
            <label for="Q2D">C. Din, Nayru, Farore</label>
          </li>
        </ul>
      </fieldset>
        <div class="reponse">
            <p class="retroaction"><?= array_key_exists('Q2', $arrExpReponse) ? $arrExpReponse['Q2']['retroaction'] : ''; ?></p>
            <picture>PLACEHOLDER</picture>
            <p class="explication"><?= array_key_exists('Q2', $arrExpReponse) ? $arrExpReponse['Q2']['explication'] : ''; ?></p>
        </div>
        <p class="erreur" aria-live="assertive" aria-atomic="true">
            <?= array_key_exists('Q2', $arrErreurs) ? $arrErreurs['Q2'] : ''; ?>
        </p>
      <button type="button" class="btn_next">Prochaine question</button>
    </section>

    <section id="Q3">
      <fieldset>
        <legend>Quel est le nom de ce personnage ?</legend>
        <ul class="choixReponses">
          <li>
            <input id="Q3A" type="radio" name="Q3" value="Q3A">
            <label for="Q3A">A. Ooccoo</label>
          </li>
          <li>
            <input id="Q3B" type="radio" name="Q3" value="Q3B">
            <label for="Q3B">B. Cucco</label>
          </li>
          <li>
            <input id="Q3C" type="radio" name="Q3" value="Q3C">
            <label for="Q3C">C. Oocca</label>
          </li>
          <li>
            <input id="Q3D" type="radio" name="Q3" value="Q3D">
            <label for="Q3D">C. Aucunes de ces réponses</label>
          </li>
        </ul>
      </fieldset>
      <button type="button" class="btn_soumettre">Soumettre les résultats</button>
    </section>
    <div class="reponse">
        <p class="retroaction"><?= array_key_exists('Q3', $arrExpReponse) ? $arrExpReponse['Q3']['retroaction'] : ''; ?></p>
        <picture>PLACEHOLDER</picture>
        <p class="explication"><?= array_key_exists('Q3', $arrExpReponse) ? $arrExpReponse['Q3']['explication'] : ''; ?></p>
    </div>
    <p class="erreur" aria-live="assertive" aria-atomic="true">
        <?= array_key_exists('Q3', $arrErreurs) ? $arrErreurs['Q3'] : ''; ?>
    </p>
    <button id='validerQuiz' name='validerQuiz' type="submit">Valider mes choix</button>
    </form>

    <section class="pageResultat">
        Ajouter la section resultat en TS.
    </section>
</main>


<footer role="contentinfo">
  <small>Rose Provencher; Toutes les images appartiennent à Nintendo, 2018</small>
  <a href="">Voir les sources des images et les attributions</a>
</footer>

<!--balise script cdn à jour été 2018-->
<script
        src="https://code.jquery.com/jquery-3.3.1.min.js"
        integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
        crossorigin="anonymous"></script>

<!--balise script pour chargement local de la version installée avec Bower-->
<script>window.jQuery || document.write('<script src="node_modules/jquery/dist/jquery.min.js">\x3C/script>')</script>

<script src="node_modules/requirejs/require.js" data-main="assets/js/main.js"></script>

</body>

</html>