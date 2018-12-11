// Dans Chrome, il manque encore quelques méthodes utiles du cache,
// cette prothèse d'émulation (alias polyfill) les ajoute.
importScripts('serviceworker-cache-polyfill.js');

// Et voici l'événement 'install'!
// Il ne survient qu'une fois, lorsque le navigateur
// voit pour la première fois cette version du ServiceWorker.
self.addEventListener('install', function(event) {

    if (self.skipWaiting) {
// Cette méthode permet au service worker de devenir le service worker actif sans attente
        self.skipWaiting();
    }
    // Nous passons une promesse à event.waitUntil pour signaler
    // combien de temps dure l'installation, et si elle échoue
    event.waitUntil(
        // Ouvrir le cache…
        caches.open('quiz').then(function(cache) {
            // et lui ajouter des ressources
            return cache.addAll([
                './',
                './index.html',
                './quiz.html',
                'assets/css/styles.css',
                'logging.js',
                'assets/js/main.js',
                'assets/js/Quiz.js',
                'assets/polices/CinzelDecorative-Bold.ttf',
                'assets/polices/CrimsonText-Bold.ttf',
                'assets/polices/CrimsonText-SemiBold.ttf',
                'assets/images/icones/pouch_ico.svg',
                'assets/images/icones/rupee_ico.svg',
                'assets/images/icones/triforce_ico.svg',
                'assets/images/bg_accueil_w360.jpg',
                'assets/images/bg_accueil_w640.jpg',
                'assets/images/bg_accueil_w800.jpg',
                'assets/images/bg_accueil_w1280.jpg',
                'assets/images/bg_accueil_w2560.jpg',
                'assets/images/bg_quiz.jpg',
                'assets/images/bg_resultat_w360.jpg',
                'assets/images/bg_resultat_w640.jpg',
                'assets/images/bg_resultat_w800.jpg',
                'assets/images/bg_resultat_w1280.jpg',
                'assets/images/bg_resultat_w2560.jpg',
                'assets/images/img_q1_rep_w200.png',
                'assets/images/img_q1_rep_w400.png',
                'assets/images/img_q1_w417.jpg',
                'assets/images/img_q1_w680.jpg',
                'assets/images/img_q2_rep_w161.png',
                'assets/images/img_q2_rep_w322.png',
                'assets/images/img_q2_w160.png',
                'assets/images/img_q2_w320.png',
                'assets/images/img_q2_w834.png',
                'assets/images/img_q3_rep_w264.png',
                'assets/images/img_q3_rep_w132.png',
                'assets/images/img_q3_w196.png',
                'assets/images/img_q3_w392.png',
            ]);
        })
    );
});

// L'événement fetch survient pour les rquêtes des pages
// qui se trouve dans la portée du ServiceWorker,
// ainsi que pour les requêtes de toutes les ressources incluses
// dans ces pages
self.addEventListener('fetch', function(event) {

    // Appeler event.respondWith signifie
    // que nous prenons la responsabilité de fournir une réponse.
    // Nous passons une promesse
    // qui est résolue par un objet Response
    event.respondWith(
        // D'abord nous regardons s'il y a quelque chose dans le cache
        // qui correspond à la requête
        caches.match(event.request).then(function(response) {
            // Si on trouve quelque chose, on le retourne,
            // sinon, si c'est null,
            // on passe la requête à fetch, qui utilisera le réseau.
            return response || fetch(event.request);
        })
    );
});
