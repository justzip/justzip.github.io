// Attente que le DOM soit complètement chargé
document.addEventListener('DOMContentLoaded', function () {
    // Initialisation de Quagga pour le scan de codes-barres
    Quagga.init({
        inputStream: {
            name: "Live",
            type: "LiveStream",
            target: document.querySelector('#interactive'), // Spécifie où afficher la vidéo
            constraints: {
                facingMode: "environment" // Utilise la caméra arrière pour les appareils mobiles
            },
        },
        decoder: {
            readers: ["ean8_reader", "ean13_reader"], // Types de codes-barres à lire
        },
    }, function (err) {
        if (err) {
            console.error(err);
            return;
        }
        console.log("Initialization finished. Ready to start");
        Quagga.start();
    });

    // Gestion des scans réussis
    Quagga.onDetected(function (data) {
        var code = data.codeResult.code;
        console.log("Barcode detected and read:", code);
        document.getElementById('barcode').value = code; // Affiche le code-barres dans l'élément input
    });
});

// Fonction pour arrêter Quagga
function stopQuagga() {
    Quagga.stop();
}

// Ajout d'un écouteur d'événements sur le bouton de redémarrage pour redémarrer le scan
document.getElementById('restartBtn').addEventListener('click', function () {
    Quagga.start(); // Redémarre Quagga
});
