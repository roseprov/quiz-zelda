<?php
/**
 * NOTE: cette page n'est utilisée que dans le cas d'une expérience utilisateur SANS JavaScript
 */
if (isset($_GET['validerQuiz'])) {
    // si tout est OK on affiche les résultats du Quiz
    // et un bouton (un lien en fait) pour recommencer
    //Associer le fichier JSON
    $strDonneesJSON = file_get_contents("assets/js/objJSONquiz.json");
    $arrJSON = json_decode($strDonneesJSON,true);

    $intPointage = 0;
    $intRepCorrectes = 0;

    for($i=1;$i<=3;$i++){
        if(strval($_GET['Q'.$i]) == strval($arrJSON['bonnesReponses'][$i-1])){
            $intPointage += intval($arrJSON['pointsReponse'][$i-1]);
            $intRepCorrectes++;
        }
    }
}

?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>Resultats - Quiz The Legend of Zelda</title>
    <link rel="stylesheet" href="assets/css/styles.css">
</head>
<body>
<header role="banner">
    <a href="index.html">
        <span class="icone"></span>
        <p class="title">Le quiz « légendaire » de la série <span class="zelda">The Legend of Zelda</span></p>
    </a>
</header>
<main>
    <h1 hidden>Résultats</h1>
    <p>Vous avez terminé le quiz !</p>

    <div>
        <p>Vous avez obtenu <?= $intPointage ?> rupees !</p>
        <p><?= $intRepCorrectes ?> sur 3 questions de réussi !</p>
    </div>

    <a href="quiz.html" class="bouton">Recommencer le quiz</a>
</main>

<footer class="footer" role="contentinfo">
    <small>Rose Provencher; Toutes les images appartiennent à Nintendo, 2018</small>
    <a href="attributions.html">Voir les sources des images et les attributions</a>
</footer>

</body>
</html>


