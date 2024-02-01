document.addEventListener('DOMContentLoaded', function () {
    // Configuration initiale de Quagga pour le scan de codes-barres
    Quagga.init({
        inputStream: {
            name: "Live",
            type: "LiveStream",
            target: document.querySelector('#interactive'), // Cible l'élément pour le flux vidéo
            constraints: {
                facingMode: "environment", // Préfère la caméra arrière sur les appareils mobiles
            },
        },
        decoder: {
            readers: ["ean8_reader", "ean13_reader"], // Spécifie les types de codes-barres à lire
        },
    }, function (err) {
        if (err) {
            console.error(err);
            alert('Error starting Quagga:\n' + err.message);
            return;
        }
        // Affichage d'un message console une fois l'initialisation réussie
        console.log("Initialization finished. Ready to start");
        Quagga.start();
    });

    // Écoute des scans réussis et affichage du code dans un champ input
    Quagga.onDetected(function (data) {
        var code = data.codeResult.code;
        console.log("Barcode detected and read:", code);
        document.getElementById('barcode').value = code; // Affiche le code-barres détecté
    });
});

// Fonction pour arrêter Quagga, peut être utilisée si nécessaire
function stopQuagga() {
    Quagga.stop();
}

// Gestion du redémarrage de Quagga via un bouton, si inclus dans l'interface utilisateur
document.getElementById('restartBtn').addEventListener('click', function () {
    Quagga.start(); // Redémarre Quagga pour un nouveau scan
});
