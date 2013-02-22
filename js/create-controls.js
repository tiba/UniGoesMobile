//Variablen-Definition für spezielle Elemente (wie z.B. "more-icon"/"more-container), die mit dem more-button zu tun haben 
//dadurch auch var.-Def. für buttons zu weiteren Aktionsmöglichkeiten (wie z.B. Favoriten anzeigen, Eigenschaften usw.),
//da sie eventuell aus Platzgründen im more-button ausgelagert werden müssen:

var config = {
		ios:{
			moreIconPlacement : ".ios #auxbar",
			moreIconSelector : ".ios #more-icon", 
			variableContainer : ".ios #auxbar",
			overflowContainer : ".ios #more-container",
			contentPaneIcons : ["#content-icon a",  "#shortcuts-icon a", "#favorites-icon a", "#settings-icon a","#search-icon a"],
			overlayPaneIcons : ["#menu-icon a"]
			
			},
		android:{
			moreIconPlacement : ".android #mainbar .relative",
			moreIconSelector : ".android #more-icon", 
			variableContainer : ".android #mainbar .relative",
			overflowContainer : ".android #more-container",
			contentPaneIcons : ["#add-favorite-icon a", "#shortcuts-icon a", "#favorites-icon a", "#settings-icon a"],
			overlayPaneIcons : ["#search-icon a", '#more-icon a']
			}	
	}



//Standard-Platzierung für Div-Elemente:

var cconfig = [
		{target:".android #mainbar .relative",element:".android #logo-icon"},
		{target:".android #mainbar .relative",element:".android #sitetitle"},

//TODO: Reihenfolge für nächsten Absatz richtig festlegen!!More-icon muss immer ganz rechts bleiben
		{target:".android #mainbar .relative",element:".android #search-icon"},
		{target:".android #mainbar .relative",element:".android #add-favorite-icon"},
		
		{target:".android #mainbar .relative",element:".android #settings-icon"},	
		{target:".android #mainbar .relative",element:".android #favorites-icon"},
		{target:".android #mainbar .relative",element:".android #shortcuts-icon"},
		{target:".android #mainbar .relative",element:".android #more-icon"},	
		
		{target:".android #auxbar",element:".android #menu-icon"},
		{target:".android #auxbar",element:".android #content-icon"},

		{target:".android #overlay-pane", element:".android #search-area"},
		{target:".android #overlay-pane", element:".android #more-container"},			
		
		{target:".ios #mainbar .relative",element:".ios #logo-icon"},
		{target:".ios #mainbar .relative",element:".ios #sitetitle"},		
		{target:".ios #mainbar .relative",element:".ios #add-favorite-icon"},
		{target:".ios #mainbar .relative",element:".ios #menu-icon"},
		{target:".ios #auxbar",element:".ios #content-icon"},
		
		{target:".ios #auxbar",element:".ios #search-icon"},		
		{target:".ios #auxbar",element:".ios #shortcuts-icon"},
		{target:".ios #auxbar",element:".ios #favorites-icon"},
		{target:".ios #auxbar",element:".ios #settings-icon"},
		{target:".ios #more-container",element:".ios #less-icon"},
		
		{target:".ios #content-pane", element:".ios #search-area"},
		{target:".ios #overlay-pane", element:".ios #navigation-menu"},		
		{target:".ios #auxbar",element:".ios #more-container"}
	];
	


(function($) {
	$(document).ready(function(){
		var device = $.cookie('agent');


		//Div-Elemente nehmen Standard-Platzierung ein
		
		$.each(cconfig,function(key,value){
				$(value.target).append($(value.element));			
			});


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
			var curWidth = 0;
			//breiten zusammenzählen, unsichtbare elemente nicht berücksichtigen (benötigt man spezielle für den more-container!)
			$.each($(config[device].variableContainer + " > *:visible"), function(key, div){
				
					curWidth += $(div).width();
								
			});
			
			if(maxWidth<curWidth ){
				var element = $(config[device].moreIconSelector);
				element = element[0];
				
				//Schritt 2: 			
			
				curWidth = 0;
				$(config[device].variableContainer).append(element);
				var elWidth = $(element).width()
				$.each($(config[device].variableContainer + " > *"), function(key, div){
					curWidth += $(div).width();
					if(curWidth>maxWidth-elWidth && div!=element){


						//Anmerkung: curWidth repräsentiert ab hier nicht mehr die tatsächliche Breite, macht aber nichts,
						//da alle elemente ab jetzt in den overflowContainer kommen.
						
						$(config[device].overflowContainer).append($(div));						
						}								
				});
				
			}		
		
		
//Klasse "active" für geklickte Buttons setzen:

		$(".button").click(function(){
			$(".button").removeClass("active");
			$(this).addClass("active");		
			});			


		$("#search-icon a").click(function(){
		
		//der Fokus wird auf das Eingabefeld gelegt, damit mobile User gleich die richtige Tastaturanzeige bekommen:			

			$("#search-area input[type='search']").focus();		
			return true;
			});	


//Folgender Code nur für android relevant, weil die search-area bei ios ein content-pane darstellt:
		
		if(device=='android'){

		//beim Klick auf das search-icon wird das Suchfeld aktiviert und durch den style sichtbar gemacht:		

		$("#search-icon a").click(function(){
			$("#search-area").addClass("active");				


			return false;
			});	
		}


//beim Klicken auf den more-button wird ein Auswahlmenü mit weiteren Aktionsmöglichkeiten aktiviert und 
//durch den style sichtbar gemacht:

		$("#more-icon a").click(function(){
			$("#more-container").addClass("active");		
			});		

	
//wenn der more-button in ios bereits geklickt wurde, der user aber wieder zurück möchte, 
//wird das more-Auswahlmenü wieder deaktiviert und so wieder die Standard-Anzeige der tabbar sichtbar: 			

		$("#less-icon a").click(function(){
			$("#more-container").removeClass("active");			
			});		

			
//aktuell geklicktes Element bekommt die Klasse active, die anderen nicht(nur aktive content-pane-Elemente 
//haben den style sichtbar):			

		$.each(config[device].contentPaneIcons,function(k,v){

		//die Variable contentPane enthält den Wert des hrefs der Icons und diese sind gleichzeitig die ids der Elemente in der content-pane
		//dadurch kann man die contentPanes sichtbar und unsichtbar machen

			var currentContentPane = $(v).attr("href");
			$(v).click(function(){
				$("#content-pane > div").removeClass("active");
				$(currentContentPane).addClass("active");
				//overlays ausblenden (falls etwas sichtbar ist), wenn angezeigter content wechselt!		
				$("#overlay-pane").hide();			
			});
				 					 			
		});

		$.each(config[device].overlayPaneIcons,function(k,v){

		//die Variable overlayPane ...TODO: weiterschreiben!

			var currentOverlayPane = $(v).attr("href");
			$(v).click(function(){
				$("#overlay-pane > div").removeClass("active");
				$(currentOverlayPane).addClass("active");

				
				//eventhandler unterbrechen, damit das click event nicht weiter propagiert wird
				$(currentOverlayPane).click(function(){return false;});
				$("#overlay-pane").show();				
			});
				 					 			
		});

		
		if(device=='ios'){		
			//scrollen im Hauptmenü-popup auch auf älteren browsern ermöglichen
			$('#navigation-menu nav').addClass('overthrow');
			
			//bei ios einen close-button und einen popup-menü-Pfeil zu allen popups (divs in der overlay-pane) hinzufügen:
			$("#overlay-pane > div").append('<a class="close" title="close"></a>');
			$('#overlay-pane, #overlay-pane .close').click(function(){
				$('#overlay-pane > div').removeClass('active');
				$('#overlay-pane').hide();			
			});
		
		}else if(device=='android'){
				
		}	
	

//clickevent ausführen, um Inhalt anzuzeigen:

		$("#content-icon a").trigger("click");
		
		//scrollen auch auf älteren browsern ermöglichen
		$('body').addClass('overthrow-enabled');
		$('#content-pane').addClass('overthrow')
			/*.height($(window).height()-$('#auxbar').height()-$('#mainbar').height()-$('#auxbar').css('padding-top')-$('#mainbar').css('padding-top')-$('#auxbar').css('padding-bottom')-$('#mainbar').css('padding-bottom'))
			.width($(window).width());*/
		
			
	}); 
	
	function getContainerWidth(device){

			return $(config[device].variableContainer).width();		
	}
		
 })(jQuery);