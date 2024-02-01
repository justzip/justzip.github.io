// Attendez que le document soit prêt
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Lorsque l'appareil est prêt, initialisez Quagga
    Quagga.init({
        inputStream: {
            name: 'Live',
            type: 'LiveStream',
            target: document.querySelector('#interactive'), // Élément HTML pour afficher le flux vidéo
        },
        decoder: {
            readers: ['ean_reader', 'ean_8_reader'], // Types de codes-barres à scanner (ajoutez d'autres types si nécessaire)
        },
    }, function (err) {
        if (err) {
            console.error(err);
            return;
        }
        // Démarrez la capture vidéo en direct lorsque Quagga est initialisé
        Quagga.start();
    });

    // Écoutez l'événement de détection de code-barres
    Quagga.onDetected(function (result) {
        const code = result.codeResult.code; // Code-barres détecté

        // Affichez le code-barres détecté sur l'écran
        displayBarcode(code);

        // Arrêtez la capture vidéo après la détection d'un code-barres
        Quagga.stop();
    });

    // Écoutez l'événement du bouton "Redémarrer"
    document.querySelector('#restartBtn').addEventListener('click', function () {
        // Redémarrez la capture vidéo en direct
        Quagga.start();
        // Effacez le code-barres précédent de l'écran
        clearBarcode();
    });
}

// Fonction pour afficher le code-barres détecté
function displayBarcode(code) {
    const barcodeDiv = document.querySelector('#barcodeValue');
    barcodeDiv.textContent = 'Code-barres détecté : ' + code;
}

// Fonction pour effacer le code-barres affiché
function clearBarcode() {
    const barcodeDiv = document.querySelector('#barcodeValue');
    barcodeDiv.textContent = '';
}
