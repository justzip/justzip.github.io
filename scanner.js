// Attendez que le document soit chargé
document.addEventListener('DOMContentLoaded', function () {
    // Vérifiez si le navigateur prend en charge l'accès à la caméra
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Affichez un message à l'utilisateur pour demander l'autorisation
        const permissionMessage = document.createElement('p');
        permissionMessage.textContent = 'Ce site web souhaite accéder à la caméra pour scanner des codes-barres.';
        document.body.appendChild(permissionMessage);

        // Ajoutez un bouton pour autoriser l'accès à la caméra
        const allowCameraAccessButton = document.createElement('button');
        allowCameraAccessButton.textContent = 'Autoriser l\'accès à la caméra';
        document.body.appendChild(allowCameraAccessButton);

        // Lorsque l'utilisateur clique sur le bouton pour autoriser l'accès
        allowCameraAccessButton.addEventListener('click', function () {
            // Demandez la permission d'accéder à la caméra
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(function (stream) {
                    // L'utilisateur a donné l'autorisation
                    // Vous pouvez maintenant activer le scanner de code-barres
                    activateBarcodeScanner(stream);
                })
                .catch(function (error) {
                    // L'utilisateur a refusé l'autorisation ou une erreur s'est produite
                    console.error('Erreur d\'accès à la caméra :', error);
                });
        });
    } else {
        console.error('Accès à la caméra non pris en charge par ce navigateur.');
    }

    // Fonction pour activer le scanner de code-barres
    function activateBarcodeScanner(stream) {
        // Supprimez le message et le bouton de demande d'autorisation
        const permissionMessage = document.querySelector('p');
        const allowCameraAccessButton = document.querySelector('button');
        permissionMessage.remove();
        allowCameraAccessButton.remove();

        // Configurez QuaggaJS pour le scanner de code-barres
        Quagga.init({
            inputStream: {
                name: 'Live',
                type: 'LiveStream',
                target: document.querySelector('#interactive'), // Élément HTML pour afficher le flux vidéo de la caméra
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

            // Affichez le code-barres détecté sur la page web
            const barcodeResultElement = document.createElement('p');
            barcodeResultElement.textContent = 'Code-barres scanné : ' + code;
            document.body.appendChild(barcodeResultElement);

            // Arrêtez la capture vidéo après la détection d'un code-barres
            Quagga.stop();
        });
    }
});
