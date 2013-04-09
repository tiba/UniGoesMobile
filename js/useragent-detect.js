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