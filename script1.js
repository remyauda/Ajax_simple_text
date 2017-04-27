/**
 * 
 */
function loadFile(file) {
  
    var xhr = new XMLHttpRequest();//on instancie l'objet XMLHttpRequest

    // On souhaite juste récupérer le contenu du fichier, la méthode GET suffit amplement :
    xhr.open('GET', file);//on précise le fichier sur le serveur (souvent un fichier php) que l'on ouvre et qui va nous générer un fichier de données (au format xml, JSON, texte...).
                          //Ici, on fait simple: plutôt que de contacter un fichier php qui va nous générer un fichier de données (ici au format texte), on contacte directement un fichier texte écrit à l'avance: file1.txt ou file2.txt
    xhr.send(null); // La requête est prête, on envoie tout au fichier sur le serveur que l'on a spécifié avec open()!
    
    xhr.addEventListener('readystatechange', function() { // On est ici dans un mode asynchrone 

        if (xhr.readyState === XMLHttpRequest.DONE && (xhr.status === 200 || xhr.status === 0)) { // Si le fichier de donnéees (au format xml, JSON, texte...) généré par le fichier serveur a bien été reçu et ce, sans erreur...(ici on a contacté directement le fichier de données)
        //si le fichier de données a bien été reçu, il se stocke dans la propriété responseXML si le fichier de données est au format xml et dans la propriété responseText s'il s'agit d'un autre format.
            document.getElementById('fileContent').innerHTML = '<span>' + xhr.responseText + '</span>'; // On l'affiche les données qui ont été stockées dans la propriété responseText!

        } else if (xhr.readyState === XMLHttpRequest.DONE && xhr.status != 200) { // En cas d'erreur !
        
            alert('Une erreur est survenue !\n\nCode :' + xhr.status + '\nTexte : ' + xhr.statusText);//on affiche une erreur avec l'id de l'erreur et le texte de l'erreur

        }

    });


}

(function() { // Comme d'habitude, une IIFE pour éviter les variables globales

    var inputs = document.getElementsByTagName('input'),//on met l'input dans une variable grâce au DOM
        inputsLen = inputs.length;//on définit une varible avec la longueur du tableau input (donc le nombre d'input dans le html)

    for (var i = 0; i < inputsLen; i++) {//pour tous les input du html...

        inputs[i].addEventListener('click', function() {//on leur définit un événement de type onclick
            loadFile(this.value); // À chaque clique, un fichier associé au bouton sera chargé dans la page grâce à la fonction que l'on a définit.
        });

    }

})();