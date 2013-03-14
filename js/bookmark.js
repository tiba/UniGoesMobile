// Array Remove - By John Resig (MIT Licensed) (http://stackoverflow.com/questions/500606/javascript-array-delete-elements)
Array.prototype.remove = function(from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};
/**
 * Bookmark funktionen
 * @param {type} $
 * @returns {undefined}
 * 
 */
(function($) {
        /**
         * Liste der Shortcuts pro Zielgruppe
         * @type type
         */
        var shortcuts ={
          nn:[{title:'Startseite',url:'index.php'},
              {title:'Vorlesungsverzeichnis',url:'vorlesungsverzeichnis.html'},
                {title:'Studienberatung',url:'studienberatung.html'},
                {title:'Studienangebot',url:'studienangebot.html'},
                   {title:'StudIP',url:'www.intelec.uni-passau.de'},
       {title:'Hisqis',url:'qisserver.uni-passau.de/qisserver/rds?state=user&type=0'},
                 {title:'Bibliothek',url:'http://www.ub.uni-passau.de/index.html', target:'_blank'},
                {title:'Studentenwerk',url:'www.stwno.de/joomla/de/'},
            {title:'Forschungseinrichtungen',url:'forschungseinrichtungen.html'},
                      {title:'Formulare',url:'formulare.html'},
               {title:'Campus Passau Blog',url:'blog.uni-passau.de'}],
            
          schueler:[{title:'Startseite schueler',url:'landing_anfaenger.html'},
              {title:'Studienberatung',url:'studienberatung.html'},
                {title:'Studienangebot',url:'studienangebot.html'},
                {title:'Studentenwerk',url:'www.stwno.de/joomla/de/'},
                 {title:'Formulare',url:'formulare.html'},
              {title:'Vorlesungsverzeichnis',url:'vorlesungsverzeichnis.html'},
                   {title:'Bibliothek',url:'www.ub.uni-passau.de/index.html'},
                {title:'Campus Passau Blog',url:'blog.uni-passau.de'}],
               
            student:[{title:'Startseite student',url:'landing_studis.html'},
                {title:'Studienberatung',url:'studienberatung.html'},
                {title:'Studienangebot',url:'studienangebot.html'},
                    {title:'Formulare',url:'formulare.html'},
              {title:'Vorlesungsverzeichnis',url:'vorlesungsverzeichnis.html'},
                  {title:'Bibliothek',url:'www.ub.uni-passau.de/index.html'},
              {title:'Campus Passau Blog',url:'blog.uni-passau.de'}],
            
            dozent:[{title:'Startseite dozent',url:'landing_angestellter.html'},
                {title:'Vorlesungsverzeichnis',url:'vorlesungsverzeichnis.html'},
                     {title:'Studienangebot',url:'studienangebot.html'},
                   {title:'StudIP',url:'www.intelec.uni-passau.de'},
         {title:'Hisqis',url:'qisserver.uni-passau.de/qisserver/rds?state=user&type=0'},
                 {title:'Bibliothek',url:'www.ub.uni-passau.de/index.html'},
            {title:'Forschungseinrichtungen',url:'forschungseinrichtungen.html'},
                      {title:'Formulare',url:'formulare.html'},
               {title:'Campus Passau Blog',url:'blog.uni-passau.de'}]
             
        };
    
    /**
     * Fülle Bookmarkliste aus HTML5 local storage und registriere handler für Aktionen
     * ausserdem werden die Schnellzugriffe abhängig von der gewählten Zielgruppe gefüllt
     */
    $(document).ready(function() {
        populateList();
        populateShortcuts();
        /*
         * Clickhandler für Bookmark anlegne/löschen
         */
        $('#add-favorite-icon a').click(function() {
            var favorite = getCurrentTitleAndUrl();
            storeData(favorite);
            updateIcon();
            populateList();
            return false;

        });
        updateIcon();
    });
    
    function updateIcon(data,favorite){
        if(isStored(loadData(),getCurrentTitleAndUrl())>-1){
            $('#add-favorite-icon').addClass('saved');

        }else{
            $('#add-favorite-icon').removeClass('saved');
        }
    }
    
    /**
     * fülle shortcutliste abhängig von der gewählten Nutzergruppe
     * @returns {undefined}
     */
    function populateShortcuts(){
        var audience =  $.cookie('audience');
        if(!audience) audience = 'nn';
        var links = shortcuts[audience];
        
        $("#shortcuts nav").remove();
        $("#shortcuts").append("<nav><ul></ul></nav>");
        $.each(links, function(i, e) {
           var $shortcuts =$("#shortcuts nav ul");
           $shortcuts.append('<li><a ' + (e.target?('target="'+e.target+'"'):'') + 'href="' + e.url + '" title="' + e.title + '">' + e.title + '</a></li>');

        });
       
        
    }
    
    /**
     * füllt #favorites mit liste der gespeicherten Bookmarks
     * @returns {undefined}
     */
    function populateList() {
        var links = loadData();
        $("#favorites nav").remove();
        $('#add-favorite-icon').removeClass('active');
        $("#favorites").append("<nav><ul></ul></nav>");
        var currentPage = getCurrentTitleAndUrl();
        $.each(links, function(i, e) {
            addFavoriteToList(e);
        });
        $("#favorites nav a.delete").click(function() {
            storeData({url: $(this).attr('href')});
            populateList();
            updateIcon();
            //return false, sonst würde man tatsächlich noch dem Link folgen;	
            return false;
        });
    }
    
    /**
     * Fügt einen Favoriteneintrag zur HTML-Lsite hinzu
     * @param {type} e
     * @returns {undefined}
     */
    function addFavoriteToList(e) {
        $("#favorites nav ul").append('<li><a href="' + e.url + '" title="' + e.title + '">' + e.title + '</a><a class="delete" href="' + e.url + '" title="Löschen"></a></li>');

    }
    
    /**
     * Speichert ein bookmark im HTML5 local storage
     * @param {type} favorite
     * @returns {undefined}
     */
    function storeData(favorite) {
        var data = loadData();
        var stored = isStored(data, favorite);
        if (stored > -1) {
            data.remove(stored);
        } else {
            data.push(favorite);
            //TODO: Ihre Seite wurde zu den Favoriten hinzugefügt Meldung einblenden
        }
        saveData(data);
    }
    
    /**
     * überprüft, ob eine URL schon gespeichert ist
     * @param {type} data
     * @param {type} element
     * @returns {unresolved}
     */
    function isStored(data, element) {
        var found = -1;

        $.each(data, function(i, e) {
            if (e.url === element.url) {
                found = i;
            }
        });
        return found;
    }

    /**
     * Liefert Titel und URL der aktuellen Seite zurück
     * @returns {_L13.getCurrentTitleAndUrl.Anonym$1}
     */
    function getCurrentTitleAndUrl() {
        var url = window.location.pathname;
        var title = document.title || $('h1:first').text();
        return {title: title, url: url};
    }
    
    /**
     * speichert die Liste der URLs im HTML5 local storage 
     * @param {type} data
     * @returns {undefined}
     */
    function saveData(data) {
        if (typeof(Storage) !== "undefined")
        {
            localStorage.favorites = JSON.stringify(data);
        }
    }
    
    
    /**
     * liefert das Array aus dem HTML5 local storage zurück
     * @returns {@exp;JSON@call;parse}
     */
    function loadData() {
        var content = '[{"title":"Favoriten nicht verfügbar",url:"#"}]';
        if (typeof(Storage) !== "undefined")
        {
            if (!localStorage.favorites)
            {
                localStorage.favorites = JSON.stringify([]);

            }
            content = localStorage.favorites;
        }

        return JSON.parse(content);
    }
    ;



})(jQuery);