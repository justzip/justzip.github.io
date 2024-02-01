<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Scanner de Code-Barres</title>
    <script src="chemin/vers/quagga.min.js"></script>
</head>

<body>
    <h1>Scanner de Code-Barres</h1>
    <video id="camera" style="width: 100%; max-width: 640px;"></video>
    <p id="result">Code-barres scanné : </p>

    <script>
        // Configuration de QuaggaJS
        Quagga.init({
            inputStream: {
                name: "Live",
                type: "LiveStream",
                target: document.querySelector("#camera")
            },
            decoder: {
                readers: ["ean_reader"] // Type de code-barres à scanner (EAN-13)
            }
        }, function (err) {
            if (err) {
                console.error(err);
                return;
            }
            // Démarrage de la capture vidéo en direct
            Quagga.start();
        });

        // Événement de détection de code-barres
        Quagga.onDetected(function (result) {
            const code = result.codeResult.code; // Code-barres détecté
            const resultElement = document.querySelector("#result");

            // Affichage du code-barres détecté sur la page
            resultElement.textContent = "Code-barres scanné : " + code;

            // Arrêt de la capture vidéo après la détection du code-barres (facultatif)
            Quagga.stop();
        });
    </script>
</body>

</html>
