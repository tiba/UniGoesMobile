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
(function($) {
    /**
     * erfasst den aktuellen user-agent und speichert diesen in einem Cookie ab
     */
    $(document).ready(function() {
        
        var config = {
            nn: 'index.php',
            schueler: 'landing_anfaenger_neu.html',
            quitschie: 'index.php',
            student: 'landing_studis_neu.html',
            dozent: 'landing_angestellter.html'
            
        };
        var setUserAgent = false;
        if(!$.cookie("agent")){
            var ua = navigator.userAgent.toLowerCase();
            var isAndroid = ua.indexOf("android") > -1;
            if(isAndroid){
                //wenn es sich um ein android Gerät handelt, verwende android
                $.cookie("agent","android");
            }else{
                //verwende IOS-Styles für alle anderen Geräte
                $.cookie("agent","ios");
            }
            setUserAgent = true;
        }
        
        //entsprechende Klasse im Body hinzufügen
        $('body').addClass($.cookie("agent"));
        var l = location;
        //auf die entsprechende Startseite der Zielgruppe weiterleiten
        if(!setUserAgent && l.pathname === $('base').attr('href')+'website.html'){
            var audience = $.cookie('audience');
            if( audience && config[audience]){
               $(location).attr('href',$('base').attr('href')+config[audience]);
            }else{
                $(location).attr('href',$('base').attr('href')+"index.php");
            }
        }
        //Wenn useragent gesetzt wurde (d.h. erster Besuch!) einstellungen anzeigen
        if(setUserAgent){
            setTimeout(function(){$('#settings-icon a').trigger('click')},500);
        }
        

    });

})(jQuery);