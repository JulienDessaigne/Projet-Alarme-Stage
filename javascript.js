var infosFEDD = [{
        "type": "detecteur incendie",
        "adresse": "",
        "lib": "",
        "zone": "",
        "bat": "1",
        "infoImportante": "",
        "idImage": "#",
        "x": 728,
        "y": 2034
    },
    {
        "type": "camera",
        "adresse": 1,
        "lib": "",
        "idImage": "#",
        "x": 1260,
        "y": 155,
        "rotation": 170
    },
    {
        "type": "detecteur intrusion",
        "adresse": "z1",
        "lib": "",
        "idImage": "#",
        "bat": "",
        "x": 980,
        "y": 1545
    },
    {
        "type": "sirene",
        "adresse": "",
        "lib": "",
        "idImage": "#",
        "x": 1248,
        "y": 314,
        "rotation": 270
    },
    {
        "type": "zone",
        "bat": "",
        "nom": "",
        "lib": "",
        "idImage": "#",
    }

]

var imageCourante = ""
var cameraDessin = false
var intruDessin = false
var evacDessin = false

//quand la page est bien chargé 
$(document).ready(function() {

    //Lorsque l'utilisateur click su le champ input et commence une recherche
    $("#tags").click(function() {

        //On récupère les valeurs des champs select afin de guider la suggestion de recherche
        var recherche = document.getElementById('recherche').value
        var batiment = document.getElementById("bat").value

        //Tab des infos à suggérer
        tags = [];

        //switch sur le batiment et la recherche, en fonction de ces paramêtres on adapte le tableau tags avec les valeurs à proposer ( attention : pour capteur incendie = uniquement le nom du capteur et pas son numéro !!)
        switch (batiment) {

            case "FEDD1":

                switch (recherche) {

                    case "intrusion":
                        for (var i = 0; i < infosFEDD.length; i++) {
                            if (infosFEDD[i].bat == "FEDD1" && infosFEDD[i].type == "detecteur intrusion") {
                                tags.push(infosFEDD[i].adresse)
                            }
                        }
                        break;

                    case "zone":
                        for (var i = 0; i < infosFEDD.length; i++) {
                            if (infosFEDD[i].bat == "FEDD1" && infosFEDD[i].type == "zone") {
                                tags.push(infosFEDD[i].nom)
                            }
                        }
                        break;

                    case "capteur":
                        for (var i = 0; i < infosFEDD.length; i++) {
                            if (infosFEDD[i].bat == "FEDD1" && infosFEDD[i].type == "detecteur incendie") {
                                tags.push(infosFEDD[i].lib)
                            }
                        }
                        break;

                    case "tous":
                        for (var i = 0; i < infosFEDD.length; i++) {
                            if (infosFEDD[i].bat == "FEDD1") {
                                if (infosFEDD[i].type == "detecteur incendie") {
                                    tags.push(infosFEDD[i].adresse.substring(1, 3).toString())
                                }
                                if (infosFEDD[i].type == "detecteur intrusion") {
                                    tags.push(infosFEDD[i].adresse)

                                }
                                if (infosFEDD[i].type == "zone") {
                                    tags.push(infosFEDD[i].nom)
                                }
                            }
                        }
                        break;

                }
                break;

            case "FEDD2":

                switch (recherche) {

                    case "intrusion":
                        for (var i = 0; i < infosFEDD.length; i++) {
                            if (infosFEDD[i].bat == "FEDD2" && infosFEDD[i].type == "detecteur intrusion") {
                                tags.push(infosFEDD[i].adresse)
                            }
                        }
                        break;

                    case "zone":
                        for (var i = 0; i < infosFEDD.length; i++) {
                            if (infosFEDD[i].bat == "FEDD2" && infosFEDD[i].type == "zone") {
                                tags.push(infosFEDD[i].nom)
                            }
                        }
                        break;

                    case "capteur":
                        for (var i = 0; i < infosFEDD.length; i++) {
                            if (infosFEDD[i].bat == "FEDD2" && infosFEDD[i].type == "detecteur incendie") {
                                tags.push(infosFEDD[i].lib)
                            }
                        }
                        break;

                    case "tous":
                        for (var i = 0; i < infosFEDD.length; i++) {
                            if (infosFEDD[i].bat == "FEDD2") {
                                if (infosFEDD[i].type == "detecteur incendie") {
                                    tags.push(infosFEDD[i].adresse.substring(1, 3).toString())
                                }
                                if (infosFEDD[i].type == "detecteur intrusion") {
                                    tags.push(infosFEDD[i].adresse)

                                }
                                if (infosFEDD[i].type == "zone") {
                                    tags.push(infosFEDD[i].nom)
                                }
                            }
                        }
                        break;

                }
                break;

            default:
                break;

        }

        //Quand l'utilisateur commence à écrire, on lui propose des choix de recherche
        $("#tags").autocomplete({
            source: tags

        });
    });
    //Action à effectuer à la selection de chaque bouton
    $("#FEDD1_RDC").off().click(
        function() {

            dessinerImage(imgFEDD1_RDC)

        });

    $("#FEDD1_etage").off().click(
        function() {

            dessinerImage(imgFEDD1_etage)

        });

    $("#FEDD2_RDC").off().click(
        function() {

            dessinerImage(imgFEDD2_RDC)

        });

    $("#FEDD2_etage").off().click(
        function() {

            dessinerImage(imgFEDD2_etage)

        });

    $("#intrusion").off().click(

        function() {

            dessinerDetecteurIntrusion()

        }
    )
    $("#camera").off().click(

        function() {

            dessinerCamera()

        }
    )

});

//fonction permettant d'aiguiller la recherche afin d'utiliser la bonne fonction qui retournera soit une zone soit un capteur
function getInfosRecherche() {

    //on récupère les inputs envoyés par le formulaire
    var val = document.querySelector('input').value;
    var recherche = document.getElementById('recherche').value
    var batiment = document.getElementById("bat").value

    // On vérifie si tous les champs sont remplis pour commencer la recherche
    if (recherche != "") {


        if (batiment != "") {

            if (val != "") {

                var resultat = Object
                resultat = null

                // En fonction du choix de recherche (zone, capteur, intrusion ou Tous) on utilise une fonction différente et on retourne un résultat 
                switch (recherche) {

                    case "zone":
                        //on change notre variable val afin de la rendre en minuscule et d'enlever les espaces inutiles
                        val = val.replace(/ /g, "").toLowerCase()
                        if (val.substring(0, 2) == "zd") {

                            resultat = getZoneByNom(val, batiment)

                        }
                        break;

                    case "capteur":
                        //On test si le capteur rentré est composé de lettre (minuscule, majuscule et accent) affin de savoir si on cherche un capteur par son nom ou son numéro
                        if (/^\s*[A-Za-zéèàê ]{3}/gm.test(val)) {
                            //on change notre variable val afin de la rendre en minuscule, d'enlever les espaces inutiles, on enleve les accents et les caractère spéciaux
                            val = val.replace(/ /g, "").toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").replace(/[-|.]/gm, "")
                            resultat = getDetecteurByLib(val, batiment)

                        } else {


                            // Si le capteur rentré est un numéro, on test si il est bien composé de chiffre
                            if (/^[0-9]*$/gm.test(val)) {

                                resultat = getDetecteurByAdresse(val, batiment)

                            }
                        }
                        break;
                    case "intrusion":
                        // On test si le nom du capteur d'intrusion commence par un "Z" ou un "z" suivi de chiffres
                        if (/^[z|Z][0-9]*$/gm.test(val)) {
                            // On change notre variable afin de la rendre en minuscule et d'enlever les espaces inutiles
                            val = val.replace(/ /g, "").toLowerCase()
                            resultat = getIntrusionByNom(val, batiment)
                        }
                        break;

                        // Dans le cas Tous, on recherche quelle information est rentré en utilisant les conditions des case précédents
                    case "tous":

                        if (/^[z|Z][0-9]*$/gm.test(val)) {
                            val = val.replace(/ /g, "").toLowerCase()
                            resultat = getIntrusionByNom(val, batiment)

                        } else if (val.replace(/ /g, "").toLowerCase().substring(0, 2) == "zd") {
                            val = val.replace(/ /g, "").toLowerCase()
                            resultat = getZoneByNom(val, batiment)
                        } else if (/^\s*[A-Za-zéèàê ]{3}/gm.test(val)) {
                            val = val.replace(/ /g, "").toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").replace(/[-|.]/gm, "")
                            resultat = getDetecteurByLib(val, batiment)


                        } else if (/^[0-9]*$/gm.test(val)) {

                            resultat = getDetecteurByAdresse(val, batiment)
                        } else {


                        }
                        break;


                }

                // Initialisation des variables pour l'affichage du résultat de la recheche
                var image = null
                var idImage = ""

                //Si le résultat n'est pas null
                if (resultat != null) {



                    //switch suivant idImage on assigne le nom de l'image à la variable image
                    switch (resultat.idImage) {

                        case "#imgFEDD1_RDC":
                            image = imgFEDD1_RDC
                            break;

                        case "#imgFEDD1_etage":
                            image = imgFEDD1_etage
                            break;

                        case "#imgFEDD2_RDC":
                            image = imgFEDD2_RDC
                            break;

                        case "#imgFEDD2_etage":
                            image = imgFEDD2_etage
                            break;
                        default:
                            break;
                    }

                    //Si la variable image n'est pas null suite au switch
                    if (image != null) {

                        // On dessine l'image dans le canvas grace à la fonction dessinerImage(), on reset le canvas d'infoRecherche et on l'affiche. On récupère l'image de la recherche et on l'affecte à la variable imageCourante 
                        imageCourante = idImage;
                        dessinerImage(image);
                        $("#infoRecherche").show();
                        resetCanvas();

                        //switch sur le type de notre résultat
                        switch (resultat.type) {

                            case "zone":
                                //Si c'est une zone on affiche ses informations et on dessine la zone sur l'image
                                afficherInfoZone(resultat);
                                dessinerZone(resultat)

                                break
                            case "detecteur intrusion":
                                //Si c'est un detecteur d'intrusion on dessine tous les détecteurs, on affiche ses informations et on dessine une fleche sur le capteur concerné par la recherche
                                dessinerDetecteurIntrusion()
                                afficherInfoIntrusion(resultat)
                                dessinerFleche(resultat);
                                break
                            case "detecteur incendie":
                                //Si c'est un capteur incendie, on récupère ses infos et on les affiches, on affiche la zone du capteur ainsi qu'un fleche sur le capteur
                                infosCapteur = getInfoByCapteur(resultat);
                                afficherInfoIncendie(infosCapteur);
                                nom = infosCapteur.numZone.replace(/ /g, "")

                                //On affiche la zone si le capteur trouvé n'est pas un capteur déclencheur manuel
                                if (nom.substring(0, 3) !== "ZDM") {
                                    bat = batiment
                                    infoZone = { nom, bat }
                                    dessinerZone(infoZone);

                                }

                                dessinerFleche(resultat);

                                break;

                            default:
                                break;
                        }

                        //Apparition du bouton permettant d'afficher le plan d'évacuation du batiment affiché
                        $("#boutonEvac").show();

                    } else {

                        console.log("erreur idImage")
                        return
                    }


                    // Message d'erreur suivant toutes les conditions de la fonction afin d'aider l'utilisateur
                } else {

                    switch (recherche) {

                        case "capteur":

                            msgErreur("Le nom / num\u00e9ro de capteur n'existe pas");
                            break;
                        case "intrusion":
                            msgErreur("Le detecteur d'intrusion saisi n'existe pas");
                            break;

                        case "zone":
                            msgErreur("Le zone saisie n'existe pas");
                            break;
                        case "tous":
                            msgErreur("L'information saisie n'existe pas")
                    }

                }
            } else {

                msgErreur("Veuillez saisir une information \u00e0 rechercher")

            }
        } else {

            msgErreur("Veuillez saisir un b\u00e2timent")

        }
    } else {

        msgErreur("Veuillez saisir une option de recherche")

    }
}




///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Les fonctions suivantes parcourent la BdD json jusqu'a ce que l'information recherchée soit trouvé///////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Récupère la zone grâce à son nom
function getZoneByNom(val, batiment) {

    var zone = null
    for (var i = 0; i < infosFEDD.length; i++) {

        if (infosFEDD[i].type == "zone" && infosFEDD[i].bat == batiment) {
            nom = infosFEDD[i].nom.replace(/ /g, "").toLowerCase()
            if (nom == val) {

                zone = infosFEDD[i];
                break

            }
        }


    }
    return zone

}

//Récupère le detecteur grâce à son adresse, l'adresse du detecteur sera uniquement son numéro dans le batiment. Ex : si un capteur a pour adresse 003 01.1.03, son numéro sera 3
function getDetecteurByAdresse(val, batiment) {

    var capteur = null
    for (var i = 0; i < infosFEDD.length; i++) {

        if (infosFEDD[i].type == "detecteur incendie" && infosFEDD[i].bat == batiment) {

            adresse = parseInt(infosFEDD[i].adresse.substring(1, 3))

            if (adresse == val) {

                capteur = infosFEDD[i];
                break

            }

        }

    }

    return capteur

}

// Récupère le detecteur incendie grâce à son libellé 
function getDetecteurByLib(val, batiment) {
    var capteur = null
    for (var i = 0; i < infosFEDD.length; i++) {

        lib = infosFEDD[i].lib.replace(/ /g, "").toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").replace(/[-|.]/gm, "")

        if (lib == val && infosFEDD[i].type == "detecteur incendie" && infosFEDD[i].bat == batiment) {
            capteur = infosFEDD[i];
            break
        }

    }

    return capteur

}

//Récupère le detecteur d'intrusion grâce à son nom
function getIntrusionByNom(val, batiment) {
    var intrusion = null
    for (var i = 0; i < infosFEDD.length; i++) {
        if (infosFEDD[i].type == "detecteur intrusion" && infosFEDD[i].bat == batiment) {
            adresse = infosFEDD[i].adresse.replace(/ /g, "").toLowerCase()

            if (adresse == val) {

                intrusion = infosFEDD[i];
                break

            }

        }

    }

    return intrusion

}




//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////// Les fonctions suivantes manipulent ou affichent les informations de la recherche effectué////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////

//fonction retourne les infos d'un capteur incendie
function getInfoByCapteur(capteur) {

    //initialisation des variables contenant les informations du capteur incendie
    var zone = "";
    var numZone = "";
    var libZone = "";
    var libCapteur = "";
    var infoImportante = "";

    //si la variable passé en paramètre est bien un objet 
    if (typeof capteur === "object") {

        //on récupère la zone que l'ont divise en deux parties (son numéro et son nom), on récupère le nom du capteur et les informations importantes
        zone = capteur.zone;
        numZone = zone.substring(0, 5);
        libZone = (zone.substring(5, zone.length)).trim();
        libCapteur = capteur.lib;
        infoImportante = capteur.infoImportante


    } else {


        console.log("La valeur n'est pas un object")
    }

    return { numZone, libZone, libCapteur, infoImportante };
}

//fonction affichant les infos de la recheche si c'est un detecteur incendie
function afficherInfoIncendie(info) {

    //remplissage du canvas infoRecherche avec les informations obtenues grâce à la fonction getInfoByCapteur()
    var ctx = $("#infoRecherche")[0].getContext("2d");
    ctx.font = "20px Calibri";
    ctx.fillStyle = "black"
    ctx.clearRect(0, 0, 600, 115);
    ctx.textAlign = "center";
    ctx.fillText("Zone : " + info["numZone"], 300, 25);
    ctx.fillText("Nom de la zone : " + info["libZone"], 300, 45);
    ctx.fillText("Nom du capteur : " + info["libCapteur"], 300, 65);
    if (info["infoImportante"] != "") {
        ctx.fillStyle = "red"
        ctx.fillText("Information Importante : ", 300, 85)
        ctx.fillText(info["infoImportante"], 300, 105)

    } else {

        ctx.fillText("Information Importante : aucune ", 300, 85)

    }


}

//Fonction affichant les infos de la recheche si c'est une zone
function afficherInfoZone(zone) {
    var ctx = $("#infoRecherche")[0].getContext("2d");
    ctx.font = "20px Calibri";
    ctx.fillStyle = "black"
    ctx.clearRect(0, 0, 600, 115);
    ctx.textAlign = "center";
    ctx.fillText("Zone : " + zone["nom"], 300, 50);
    ctx.fillText("Nom de la zone : " + zone["lib"], 300, 70);

}

//Fonction affichant les infos de la recherche si c'est un detecteur d'intrusion
function afficherInfoIntrusion(capteur) {
    var ctx = $("#infoRecherche")[0].getContext("2d");
    ctx.font = "20px Calibri";
    ctx.fillStyle = "black"
    ctx.clearRect(0, 0, 600, 115);
    ctx.textAlign = "center";
    ctx.fillText("Adresse : " + capteur["adresse"], 300, 50);
    ctx.fillText("Nom du detecteur: " + capteur["lib"], 300, 70);

}





/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////// Les fonctions suivantes permettent de dessiner dans le canvas plan et dans le canvas infoRecherche//////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//dessine l'image dans le canvas plan
function dessinerImage(image) {
    cameraDessin = false
    intruDessin = false

    //on défini notre canvas, puis on adapte sa longueur et sa largeur à la taille de l'image
    var c = document.getElementById("plan");
    c.width = image.width
    c.height = image.height

    //définition du contexte et on efface le canvas image
    ctx = c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height)

    //on affiche l'image
    img = document.getElementById(image.id)
    $("#plan").hide(0);
    ctx.drawImage(img, 0, 0)
    $("#plan").toggle(500);
    imageCourante = "#" + image.id

    // on reset le canvas d'info, on dessine les sirènes sur la plan et on cache le bouton Evacuation et le canvas infoRecherche
    resetCanvas();
    dessinerSirene();
    $("#infoRecherche").hide();
    $("#boutonEvac").hide();



}

//dessine l'image courante avec les capteurs intru et caméras
function dessinerImageIntruCam(image) {

    //on défini notre canvas, puis on adapte sa longueur et sa largeur à la taille de l'image
    var c = document.getElementById("plan");
    c.width = image.width
    c.height = image.height

    //définition du contexte et on efface le canvas image
    ctx = c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height)

    //on affiche l'image
    img = document.getElementById(image.id)
    ctx.drawImage(img, 0, 0)
    $("#plan").show(500);

    imageCourante = "#" + image.id

    // on reset le canvas d'info, on dessine les sirènes sur la plan et on cache le bouton Evacuation
    resetCanvas();
    dessinerSirene();

    $("#boutonEvac").hide();


}

//dessine le plan d'évacuation
function dessinerPlanEvac() {
    if (!evacDessin) {
        //On assigne à la variable image le nom de l'image courant en fonction de celle ci
        if (imageCourante == "#imgFEDD2_etage") {

            image = "imgFEDD2_RDC_evac"
        } else {

            image = imageCourante.substring(1) + "_evac"
        }

        //on récupère largeur et longueur de l'image
        img = document.getElementById(image)

        //on défini notre canvas, puis on adapte sa longueur et sa largeur à la taille de l'image
        var c = document.getElementById("plan");
        c.width = img.width
        c.height = img.height
        ctx = c.getContext("2d");
        ctx.clearRect(0, 0, c.width, c.height)

        //On dessine le plan d'évacuation de l'image courate
        $("#plan").hide(0);
        ctx.drawImage(img, 0, 0)
        $("#plan").toggle(500);
        evacDessin = true

    } else {
        evacDessin = false
        getInfosRecherche()
    }


}

//dessine une fleche sur un capteur passé en paramêtre
function dessinerFleche(capteur) {
    var c = document.getElementById("plan");
    ctx = c.getContext("2d");
    ctx.strokeStyle = "#00AFEF"
    ctx.globalAlpha = 1

    if (capteur.type == "detecteur intrusion") {

        x = capteur.x + 30
        y = capteur.y + 18
    } else {

        x = capteur.x
        y = capteur.y

    }


    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(x + 10, y - 10)
    ctx.moveTo(x, y)
    ctx.lineTo(x + 10, y + 10)
    ctx.moveTo(x, y)
    ctx.lineTo(x + 100, y)
    ctx.closePath()
    ctx.lineWidth = 6
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    ctx.stroke()
}

//Fonction permettant de dessiner les detecteurs d'intrusions 
function dessinerDetecteurIntrusion() {

    //Si les detecteurs d'intrusions ne sont pas déjà dessiné, on cherche les detecteurs dont l'idImage est égale à la valeur de imageCourante. Quand trouvé on le dessine
    if (!intruDessin) {
        var c = document.getElementById("plan");
        ctx = c.getContext("2d");
        ctx.globalAlpha = 1
        for (var i = 0; i < infosFEDD.length; i++) {

            if (infosFEDD[i].type == "detecteur intrusion" && infosFEDD[i].idImage == imageCourante) {

                capteur = infosFEDD[i]
                ctx.drawImage(imgDetecteurIntrusion, capteur.x, capteur.y, 55, 35)



            }

        }

        //La valeur de cameraDessin passe a vrai
        intruDessin = true

    } else {
        // Si les detecteurs d'intrusions sont déjà dessinés on dessine l'image courante avec la fonction dessinerImageIntruCam() qui permet de ne pas avoir d'animation d'affichage
        switch (imageCourante) {

            case "#imgFEDD1_RDC":
                dessinerImageIntruCam(imgFEDD1_RDC)
                break;

            case "#imgFEDD1_etage":
                dessinerImageIntruCam(imgFEDD1_etage)
                break;

            case "#imgFEDD2_RDC":
                dessinerImageIntruCam(imgFEDD2_RDC)
                break;

            case "#imgFEDD2_etage":
                dessinerImageIntruCam(imgFEDD2_etage)
                break;
            default:
                break;

        }

        //intruDessin passe donc a faux
        intruDessin = false

        //Si les caméras étaient déjà dessiné on les redessines
        if (cameraDessin) {
            cameraDessin = false
            dessinerCamera()
        }

    }


}

// Fonction permettant de dessiner les caméras de surveillance
function dessinerCamera() {

    //Si les caméras ne sont pas déjà dessiné, on cherche les caméras dont l'idImage est égale à la valeur de imageCourante. Quand trouvé on la dessine
    if (!cameraDessin) {
        var c = document.getElementById("plan");
        ctx = c.getContext("2d");
        ctx.globalAlpha = 1
        for (var i = 0; i < infosFEDD.length; i++) {

            if (infosFEDD[i].type == "camera" && infosFEDD[i].idImage == imageCourante) {

                capteur = infosFEDD[i]
                drawImageRot(imgCamera, capteur.x, capteur.y, 286, 167, capteur.rotation)



            }

        }
        //La valeur de cameraDessin passe a vrai
        cameraDessin = true


    } else { // Si les caméras sont déjà dessinées on dessine l'image courante avec la fonction dessinerImageIntruCam() qui permet de ne pas avoir d'animation d'affichage

        switch (imageCourante) {

            case "#imgFEDD1_RDC":
                dessinerImageIntruCam(imgFEDD1_RDC)
                break;

            case "#imgFEDD1_etage":
                dessinerImageIntruCam(imgFEDD1_etage)
                break;

            case "#imgFEDD2_RDC":
                dessinerImageIntruCam(imgFEDD2_RDC)
                break;

            case "#imgFEDD2_etage":
                dessinerImageIntruCam(imgFEDD2_etage)
                break;
            default:
                break;

        }
        //cameraDessin passe donc a faux 
        cameraDessin = false

        // Si les detecteurs d'intrusions étaient affiché on les redessines
        if (intruDessin) {
            intruDessin = false

            dessinerDetecteurIntrusion()
        }

    }


}

// Fonction permettant de dessiner les sirenes sur les plans
function dessinerSirene() {

    var c = document.getElementById("plan");
    ctx = c.getContext("2d");
    ctx.globalAlpha = 1

    for (var i = 0; i < infosFEDD.length; i++) {

        if (infosFEDD[i].type == "sirene" && infosFEDD[i].idImage == imageCourante) {

            capteur = infosFEDD[i]

            drawImageRot(imgSirene, capteur.x, capteur.y, 50, 50, capteur.rotation)



        }

    }

}

// Fonction permettant en fonction de la zone demandé par l'utilisateur, d'afficher celle-ci en couleur 
function dessinerZone(zone) {
    nom = zone.nom
    bat = zone.bat

    // Switch sur le batiment et la zone, appel la fonction correspondante présente dans le fichier dessinzone.js
    switch (bat) {

        case "FEDD1":

            switch (nom) {

                case "ZDM1":

                    for (var i = 0; i < infosFEDD.length; i++) {
                        if (infosFEDD[i].zone != undefined && infosFEDD[i].type == "detecteur incendie" && infosFEDD[i].bat == "FEDD1") {
                            if (infosFEDD[i].zone.substr(0, 4) == "ZDM1") {
                                dessinerFleche(infosFEDD[i])
                            }
                        }
                    }

                    break

                case "ZDM2":

                    for (var i = 0; i < infosFEDD.length; i++) {
                        if (infosFEDD[i].zone != undefined && infosFEDD[i].type == "detecteur incendie" && infosFEDD[i].bat == "FEDD1") {
                            if (infosFEDD[i].zone.substr(0, 4) == "ZDM2") {
                                dessinerFleche(infosFEDD[i])
                            }
                        }
                    }
                    break;

                case "ZDA3":

                    dessinerFEDD1ZDA3()
                    break

                case "ZDA4":

                    dessinerFEDD1ZDA4()
                    break

                case "ZDA5":

                    dessinerFEDD1ZDA5()
                    break

                case "ZDA6":

                    dessinerFEDD1ZDA6()
                    break

                case "ZDA7":

                    dessinerFEDD1ZDA7()
                    break

                case "ZDA8":

                    dessinerFEDD1ZDA8()
                    break

                case "ZDA9":

                    dessinerFEDD1ZDA9()
                    break

                case "ZDA10":

                    dessinerFEDD1ZDA10()
                    break

                case "ZDA11":

                    dessinerFEDD1ZDA11()
                    break

                case "ZDA12":

                    dessinerFEDD1ZDA12()
                    break

                case "ZDA13":

                    dessinerFEDD1ZDA13()
                    break
                case "ZDA14":

                    dessinerFEDD1ZDA14()
                    break
                case "ZDA15":

                    dessinerFEDD1ZDA15()
                    break
                case "ZDA16":

                    dessinerFEDD1ZDA16()
                    break

                case "ZDA17":

                    dessinerFEDD1ZDA17()
                    break
                case "ZDA18":

                    dessinerFEDD1ZDA18()
                    break

            }
            break

        case "FEDD2":
            switch (nom) {
                case "ZDM1":

                    for (var i = 0; i < infosFEDD.length; i++) {
                        if (infosFEDD[i].zone != undefined && infosFEDD[i].type == "detecteur incendie" && infosFEDD[i].bat == "FEDD2") {
                            if (infosFEDD[i].zone.substr(0, 4) == "ZDM1") {
                                dessinerFleche(infosFEDD[i])
                            }
                        }
                    }
                    break

                case "ZDM2":

                    for (var i = 0; i < infosFEDD.length; i++) {
                        if (infosFEDD[i].zone != undefined && infosFEDD[i].type == "detecteur incendie" && infosFEDD[i].bat == "FEDD2") {
                            if (infosFEDD[i].zone.substr(0, 4) == "ZDM2") {
                                dessinerFleche(infosFEDD[i])
                            }
                        }
                    }
                    break;

                case "ZDA3":

                    dessinerFEDD2ZDA3()
                    break

                case "ZDA4":

                    dessinerFEDD2ZDA4()
                    break

                case "ZDA5":

                    dessinerFEDD2ZDA5()
                    break

                case "ZDA6":

                    dessinerFEDD2ZDA6()
                    break

                case "ZDA7":

                    dessinerFEDD2ZDA7()
                    break

                case "ZDA8":

                    dessinerFEDD2ZDA8()
                    break

                case "ZDA9":

                    dessinerFEDD2ZDA9()
                    break

                case "ZDA10":

                    dessinerFEDD2ZDA10()
                    break

                case "ZDA11":

                    dessinerFEDD2ZDA11()
                    break

            }
            break

        default:
            break

    }


}

//Fonction écrivant dans le canvas infoRecherche un message d'erreur
function msgErreur(msg) {
    $("#infoRecherche").show()
    var ctx = $("#infoRecherche")[0].getContext("2d");
    ctx.font = "20px Calibri";
    ctx.fillStyle = "red"
    ctx.clearRect(0, 0, 600, 115);
    ctx.textAlign = "center";
    ctx.fillText(msg, 300, 60)


}

//Fonction effaçant le contenu du canvas infoRecherche
function resetCanvas() {
    var ctx = $("#infoRecherche")[0].getContext("2d");
    ctx.clearRect(0, 0, 600, 115);
}





//////////////////////////////
///////Autres fonctions///////
//////////////////////////////


// Fonction permettant une rotation d'un élément du canvas tout en conservant sa position. 
function drawImageRot(img, x, y, width, height, deg) {
    // Store the current context state (i.e. rotation, translation etc..)
    ctx.save()

    //Convert degrees to radian 
    var rad = deg * Math.PI / 180;

    //Set the origin to the center of the image
    ctx.translate(x + width / 2, y + height / 2);

    //Rotate the canvas around the origin
    ctx.rotate(rad);

    //draw the image    
    ctx.drawImage(img, width / 2 * (-1), height / 2 * (-1), width, height);

    // Restore canvas state as saved from above
    ctx.restore();
}
