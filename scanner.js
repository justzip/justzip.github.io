// Importez la bibliothèque QuaggaJS
import Quagga from 'quagga';

// Configurez Quagga pour le scanner de codes-barres
Quagga.init({
    inputStream: {
        name: 'Live',
        type: 'LiveStream',
        target: document.querySelector('#interactive'), // L'élément HTML où afficher le flux vidéo
    },
    decoder: {
        readers: ['ean_reader', 'ean_8_reader'], // Types de codes-barres à scanner (vous pouvez ajouter d'autres types si nécessaire)
    },
});

// Définissez une fonction pour gérer la détection d'un code-barres
Quagga.onDetected((result) => {
    const code = result.codeResult.code; // Code-barres détecté

    // Affichez le code-barres détecté
    alert(`Code-barres détecté : ${code}`);

    // Vous pouvez également effectuer d'autres actions avec le code-barres détecté, par exemple, l'envoyer à un serveur, etc.

    // Arrêtez la capture vidéo après la détection d'un code-barres
    Quagga.stop();
});

// Démarrez Quagga pour la capture vidéo en direct
Quagga.start();
