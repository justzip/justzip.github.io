<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Scanner de Code-Barres</title>
    <script src="https://cdn.jsdelivr.net/npm/quagga@0.12.1/dist/quagga.min.js"></script>
</head>

<body>
    <h1>Scanner de Code-Barres</h1>
    <button id="startScanner">Démarrer le Scanner</button>
    <p id="result">Code-barres scanné : </p>

    <script>
        document.getElementById("startScanner").addEventListener("click", function () {
            // Vérifier si le navigateur prend en charge l'accès à la caméra
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                // Demander la permission d'accéder à la caméra
                navigator.mediaDevices.getUserMedia({ video: true })
                    .then(function (stream) {
                        // Configuration de QuaggaJS
                        Quagga.init({
                            inputStream: {
                                constraints: {
                                    width: 640,
                                    height: 480,
                                    facingMode: "environment" // Utilisation de la caméra arrière (facultatif)
                                }
                            },
                            locator: {
                                patchSize: "medium",
                                halfSample: true
                            },
                            numOfWorkers: 4,
                            decoder: {
                                readers: ["ean_reader"] // Type de code-barres à scanner (EAN-13)
                            },
                            locate: true
                        }, function (err) {
                            if (err) {
                                console.error(err);
                                return;
                            }
                            // Démarrer la capture vidéo en direct
                            Quagga.start();
                        });

                        // Événement de détection de code-barres
                        Quagga.onDetected(function (result) {
                            const code = result.codeResult.code; // Code-barres détecté
                            const resultElement = document.querySelector("#result");

                            // Afficher le code-barres détecté sur la page
                            resultElement.textContent = "Code-barres scanné : " + code;

                            // Arrêter la capture vidéo après la détection du code-barres (facultatif)
                            Quagga.stop();
                        });
                    })
                    .catch(function (error) {
                        // L'utilisateur a refusé l'autorisation ou une erreur s'est produite
                        console.error("Erreur d'accès à la caméra : ", error);
                    });
            } else {
                console.error("Accès à la caméra non pris en charge par ce navigateur.");
            }
        });
    </script>
</body>

</html>
