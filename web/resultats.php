<?php
/**
 * NOTE: cette page n'est utilisée que dans le cas d'une expérience utilisateur SANS JavaScript
 */
$intPointage = 0;
$intRepCorrectes = 0;

if (isset($_GET['validerQuiz'])) {
    // si tout est OK on affiche les résultats du Quiz
    // et un bouton (un lien en fait) pour recommencer
    //Associer le fichier JSON
    $strDonneesJSON = file_get_contents("assets/js/objJSONquiz.json");
    $arrJSON = json_decode($strDonneesJSON,true);

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
<body class="bg_resultats">
<div class="main-container">
<header role="banner" class="header">
    <div class="conteneur">
        <a href="index.html" class="titre">
            <span class="icones">
                <span class="icone-logo"></span>
            </span>
            <p class="title">Le quiz légendaire de la série <span class="zelda">The Legend of Zelda</span></p>
        </a>
    </div>
</header>
<main class="conteneur">
    <div class="pageResultats">
    <div class="containerResultats">
        <h1 hidden>Résultats</h1>
        <p class="titreResultat">Vous avez terminé le quiz!</p>
        <div class="information">
            <p>Vous avez obtenu <?= $intPointage ?> rupees!</p>
            <p><?= $intRepCorrectes ?> sur 3 questions de réussi!</p>
        </div>
        <div class="btnRecommencer">
            <a href="quiz.html" class="bouton">Recommencer le quiz</a>
        </div>
    </div>
    </div>
</main>

<footer class="footer" role="contentinfo">
    <span class="creditPhoto"><a href="www.jeffbrowngraphics.com">Art de Jeff Brown (www.jeffbrowngraphics.com)</a></span>
    <div class="fond">
        <small>Rose Provencher; Toutes les images appartiennent à © Nintendo, 2018</small>
        <a href="attributions.html" class="attributions">Voir les sources des images/médias et les attributions</a>
    </div>
</footer>
</div>
</body>
</html>


