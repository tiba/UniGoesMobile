/***************************************************************
 *  Copyright notice
 *
 *  (c) 2012-2013 Christine Beier (tinabeier@web.de)
 *  All rights reserved
 *
 *  This script is part of the master thesis "Die mobile Website der 
 *  Universität Passau -- Kommunikationskonzept und Usability-Test 
 *  eines selbst entwickelten Prototypen". The prototype is free software; 
 *  you can redistribute it and/or modify it under the terms of the 
 *  GNU Lesser General Public License as published by the Free Software 
 *  Foundation; either version 3 of the License, or any later version.
 *  The GNU Lesser General Public License can be found at
 * 
 *  http://www.gnu.org/licenses/lgpl.txt.
 *
 *  This script is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  This copyright notice MUST APPEAR in all copies of the script!
 ***************************************************************/

//
////Variablen-Definition für spezielle Elemente (wie z.B. "more-icon"/"more-container), die mit dem more-button zu tun haben 
//dadurch auch var.-Def. für buttons zu weiteren Aktionsmöglichkeiten (wie z.B. Favoriten anzeigen, Eigenschaften usw.),
//da sie eventuell aus Platzgründen im more-button ausgelagert werden müssen:

var config = {
    ios: {
        moreIconPlacement: " #auxbar",
        moreIconSelector: " #more-icon",
        variableContainer: " #auxbar",
        overflowContainer: " #more-container",
        sizeThreashold: 850,
        contentPaneIcons: ["#content-icon a", "#shortcuts-icon a", "#favorites-icon a", "#settings-icon a", "#search-icon a"],
        overlayPaneIcons: ["#menu-icon a", "#add-favorite-icon a"],
        buttonTargets: [{target: " #mainbar", element: " #logo-icon"},
            {target: " #mainbar", element: " #sitetitle"},
            {target: " #mainbar", element: " #add-favorite-icon"},
            {target: " #mainbar", element: " #menu-icon"},
            {target: " #auxbar", element: " #content-icon"},
            {target: " #auxbar", element: " #search-icon"},
            {target: " #auxbar", element: " #shortcuts-icon"},
            {target: " #auxbar", element: " #favorites-icon"},
            {target: "#auxbar", element: " #settings-icon"},
            {target: "#more-container", element: " #less-icon"},
            {target: "#content-pane", element: " #search-area"},
            {target: "#overlay-pane", element: " #navigation-menu", condition: "small"},
            {target: "#content-pane", element: " #navigation-menu", condition: "large"},
            {target: "#overlay-pane", element: " #bookmark-status"},
            {target: "#auxbar", element: " #more-container"}]

    },
    android: {
        moreIconPlacement: " #mainbar",
        moreIconSelector: " #more-icon",
        variableContainer: " #mainbar",
        overflowContainer: " #more-container",
        contentPaneIcons: ["#menu-icon a", "#content-icon a", "#shortcuts-icon a", "#favorites-icon a", "#settings-icon a"],
        overlayPaneIcons: ["#search-icon a", '#more-icon a', "#add-favorite-icon a"],
        sizeThreashold: 850,
        buttonTargets: [
            {target: " #mainbar", element: " #logo-icon"},
            {target: " #mainbar", element: " #sitetitle"},
            {target: " #mainbar", element: " #search-icon"},
            {target: " #mainbar", element: " #content-icon", condition: "large"},
            {target: " #mainbar", element: " #add-favorite-icon"},
            {target: " #mainbar", element: " #shortcuts-icon"},
            {target: " #mainbar", element: " #favorites-icon"},
            {target: " #mainbar", element: " #settings-icon"},
            {target: " #auxbar", element: " #menu-icon"},
            {target: " #auxbar", element: " #content-icon", condition: "small"},
            {target: " #overlay-pane", element: " #search-area"},
            {target: " #overlay-pane", element: " #more-container"},
            {target: "#overlay-pane", element: " #bookmark-status"}
        ]
    }
};
//Standard-Platzierung für Div-Elemente:
//Anmerkung: Reihenfolge der Elemente hat Bedeutung für die Platzierung

(function($) {
    $(document).ready(function() {
        scrollTo(0,1);

        var device = $.cookie('agent');
        //elemente positionieren
        positionElements(config[device], device);
        //bei resize (auch geräterotation) Elemente positionieren
        $(window).resize(function() {
            //zuerst wieder alle events entfernen
            $('*').off('.createcontrols');
            positionElements(config[device], device);
            addEvents(config[device], device, true);
        });



        //scrollen auch auf älteren browsern ermöglichen:

        $('body').addClass('overthrow-enabled');
        //tabellen sind gerne mal zu breit, daher overthrow einbauen und maximalbreite auf 100% setzen
        $('table').addClass('overthrow').css('max-width','100%');
        $('#content-pane > div').addClass('overthrow');
        //automatische Höhen- und Breitenberechnung - wurde aber vorerst wieder auskommentiert, da bei Abstandsangaben 
        //für die content-pane Probbleme mit der Breite auftraten:		
        /*.height($(window).height()-$('#auxbar').height()-$('#mainbar').height()-$('#auxbar').css('padding-top')-$('#mainbar').css('padding-top')-$('#auxbar').css('padding-bottom')-$('#mainbar').css('padding-bottom'))
         .width($(window).width());*/

        //Zielgruppeneistellung
        $('#settings #targetaudience').val($.cookie('audience'));
        $('#settings #targetdevice').val($.cookie('agent'));
        $('#settings form').submit(function() {

            $.cookie('audience', $('#settings .targetaudience :selected').attr('value'));
            $.cookie('agent', $('#settings .targetdevice :selected').attr('value'));
            $(location).attr('href', $('base').attr('href') + 'website.html');
            return false;
        });
        
        $('#settings #deletesettings').on('click', function() {
            $.removeCookie('audience');
            $.removeCookie('agent');
            
            $(location).attr('href', $('base').attr('href') + 'website.html');
            return false;
        });


        //Plattformabhängige Einstellungen
        if (device === 'ios') {
            //scrollen im Hauptmenü-popup auch auf älteren browsern ermöglichen
            $('#navigation-menu nav').addClass('overthrow');
            $('#navigation-menu').removeClass('overthrow');
            //bei ios einen close-button und einen popup-menü-Pfeil zu allen popups (divs in der overlay-pane) hinzufügen:
            
            $.stayInWebApp();
        }
        else if (device === 'android') {
           

        }
        addEvents(config[device], device, false);
        $('#mainbar > div.button > a, #auxbar > div.button > a, #more-container > div.button > a').on('click.createcontrols', function() {
            return false;
        });
        //content-pane anzeigen!
        $("#content-icon a").trigger("click");
    });

    /**
     * Positioniert Elemente, wie Buttons und Inhaltsbereiche
     * Es gibt zwei Bereiche für Buttons, die mainbar und die auxbar.
     * und es gibt einen overflow-Bereiche, in den Elemente reinrutschen
     * wenn es zuviele werden.
     * Es gibt einen Bereich für Inhaltselemente und einen Für 
     * Overlay-Elemente
     * @param {object} config
     * @param {string} device
     * @returns {undefined}
     */
    function positionElements(config, device) {
        //Eventhandler, die in dieser funktion gesetzt werden, zuerst entfernen (wicthig für rotation/resize)
        //und alles in Ausgangssituation zurücksetzen (icons nach #elments verschieben)
        $('#elements').append($('#mainbar > div, #auxbar>div,#more-container > div'));
        //close buttons aus der Overlay pane entfernen (wenn welche vorhanden sind, wurden diese weiter unten hinugefügt)
        $('#overlay-pane .close').replaceWith('');

//Je nach display-orientation (portrait oder landscape) Divs an die richtigen Stellen schieben:		
//Schritt 1: Elemente erst alle in den variableContainer schmeißen 
//Schritt 2: danach die Elemente, die im variableContainer zu viel sind, entfernen und in den overflowContainer schmeißen
//Bsp. Schritt 1: bei Android werden erstmal alle mainbar-buttons in die mainbar (heißt bei android actionbar) eingefügt
//Bsp. Schritt 2: nach dem ersten Einfügen werden diejenigen Elemente, die nicht in die Breite der mainbar 
//passen, gleich wieder in den more-container ausgelagert. 
//Wenn man jetzt auf den more-button klickt, werden alle Elemente angezeigt, die nicht mehr in die mainbar gepasst haben.
//Anmerkung: die beschriebenen Schritte werden genauso bei der ios-Version vorgenommen, nur handelt es sich beim 
//variableContainer hier um die auxbar (heißt bei ios tabbar) und die zu platzierenden Elemente sind zum Teil andere.		

//Schritt 1:

        var maxWidth = getContainerWidth(device);
        //bildschirmbretie berechnen ("small" oder "large")
        var width = (config.sizeThreashold > $(window).width()) ? 'small' : 'large';
        var curWidth = 0;
        $.each(config.buttonTargets, function(key, value) {
            //es kann die Eigenschaft condition vorhanden sein. wenn vorhanden,
            //nur anwenden, wenn die condition der Größe entspricht
            if (!value.condition || value.condition === width) {
                $(value.target).append($(value.element));
            }
        });

        //Breiten zusammenzählen, unsichtbare Elemente nicht berücksichtigen (benötigt man speziell für den more-container!)
        $.each($(config.variableContainer + " > *:visible"), function(key, div) {
            curWidth += $(div).width();
        });

        //wenn nicht alle Elemente im dafür vorgesehenen Bereich platz haben, 
        //in den more-container verschieben
        if (maxWidth < curWidth) {

            var element = $(config.moreIconSelector);
            element = element[0];
            //Schritt 2: 			

            curWidth = 0;
            $(config.variableContainer).append(element);
            var elWidth = $(element).width();
            $.each($(config.variableContainer + " > *"), function(key, div) {
                curWidth += $(div).width();
                if (curWidth > maxWidth - elWidth && div !== element) {

//Anmerkung: curWidth repräsentiert ab hier nicht mehr die tatsächliche Breite, macht aber nichts,
//da alle elemente ab jetzt in den overflowContainer kommen.

                    $(config.overflowContainer).append($(div));
                }
            });
        }
    }

    /**
     * Fügt klick events hinzu, um den UI workflow zu erzeugen
     * @param {object} config
     * @param {string} device
     * @param {boolean} cancelEvents
     * @returns {undefined}
     */
    function addEvents(config, device, cancelEvents) {

         if(device==="android"){
             //in android muss der more-container verschwinden, nachdem man darin was geklickt hat...
            $('#more-container > div > a').on('click.createcontrols', function() {
                $('#overlay-pane > div').removeClass('active');
                $('#overlay-pane').hide();

            });
        }else if(device ==="ios"){
            
        }

        //aktuell geklicktes Element bekommt die Klasse active, die anderen nicht(nur aktive content-pane-Elemente 
        //haben den style sichtbar). die referenzierte content-pane wird sichtbar gemacht
        $.each(config.contentPaneIcons, function(k, v) {

            //die Variable contentPane enthält den Wert des hrefs der Icons und diese sind gleichzeitig die ids der Elemente 
            //in der content-pane dadurch kann man die contentPanes sichtbar und unsichtbar machen

            var currentContentPane = $(v).attr("href");
            $(v).on('click.createcontrols', function() {
                $("#content-pane > div").removeClass("active");
                $(currentContentPane).addClass("active");
                $(".button").removeClass("active");
                $(this).closest('.button').addClass("active");
            });
        });

        //event handler für overlay panes hinzufügen (hier bekommen die icons
        //KEINE active klasse, da overlays, nur temporär sind!)
        $.each(config.overlayPaneIcons, function(k, v) {

//die Variable overlayPane ...TODO: weiterschreiben!

            var currentOverlayPane = $(v).attr("href");
            $(v).on('click.createcontrols', function() {
                $("#overlay-pane > div").removeClass("active");
                $(currentOverlayPane).addClass("active");
                //eventhandler unterbrechen, damit das click event nicht weiter propagiert wird
                $("#overlay-pane").show();

            });
        });




        //beim Klicken auf den more-button wird ein Auswahlmenü mit weiteren Aktionsmöglichkeiten aktiviert und 
        //durch den style sichtbar gemacht:

        $("#more-icon a").on('click.createcontrols', function() {
            $("#more-container").addClass("active");

        });
        //wenn der more-button in ios bereits geklickt wurde, der user aber wieder zurück möchte, 
        //wird das more-Auswahlmenü wieder deaktiviert und so wieder die Standard-Anzeige der tabbar sichtbar: 			
        $("#less-icon a").on('click.createcontrols', function() {
            $("#more-container").removeClass("active");
        });

        //Suchfeld fokusieren, nach klick auf suchicon (damit gleich die Tastatur erscheint)
        $("#search-icon a").on('click.createcontrols', function() {
        //der Fokus wird auf das Eingabefeld gelegt, damit mobile User gleich die richtige Tastaturanzeige bekommen:			
            $("#search-area input[type='search']").focus();
        });




        $('#search-area input[type="search"]').on('click.createcontrols', function() {
            $(this).focus();
            return false;
        });
        //eventhandler für .close buttons hinzufegün
        $("#overlay-pane > div").append('<a class="close" title="Schliessen"></a>');
        $('#overlay-pane, #overlay-pane .close, #overlay-pane .confirm').on('click.createcontrols', function() {
            if($(this).is('#overlay-pane') || $(this).is('#overlay-pane .close') || $(this).is('#overlay-pane.confirm')){
                $('#overlay-pane > div').removeClass('active');
                $('#overlay-pane').hide();
                if($(this).is("a") && $(this).attr('href')=='#')
                    return false;
            }
        });

   

        if (cancelEvents) {
            //sämtliche Icons sollen nicht Ihr Ziel verfolgen, daher wird hier der event-handler unterbrochen
            $('#mainbar > div.button > a, #auxbar > div.button > a, #more-container > div.button > a').on('click.createcontrols', function() {
                return false;
            });
        }
    }

    /**
     * Liefert die Breite des Inhaltscontainers für icons zurück
     * @param {type} device
     * @returns {@exp;@call;$@call;width}
     */
    function getContainerWidth(device) {
        return $(config[device].variableContainer).width();
    }


})(jQuery);