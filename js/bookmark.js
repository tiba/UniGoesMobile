// Array Remove - By John Resig (MIT Licensed) (http://stackoverflow.com/questions/500606/javascript-array-delete-elements)
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

(function($) {
	
	$(document).ready(function(){
		populateList();
		$('#add-favorite-icon a').click(function(){
						var favorite = getCurrentTitleAndUrl();
						storeData(favorite);						
						populateList();
						return false;
						
			});
	});
		
		function populateList(){
			var links = loadData();
			$("#favorites nav").remove();
			$('#add-favorite-icon').removeClass('active');
			$("#favorites").append("<nav><ul></ul></nav>");
			var currentPage = getCurrentTitleAndUrl();
			$.each(links,function(i,e){
				addFavoriteToList(e);
				if(e.url == currentPage.url){
					$('#add-favorite-icon').addClass('active');
					
				}
			});
			$("#favorites nav a.delete").click(function(){
				storeData({url:$(this).attr('href')});		
				populateList();
				//return false, sonst würde man tatsächlich noch dem Link folgen;	
				return false;			
				});
		};
		
		function addFavoriteToList(e){
			$("#favorites nav ul").append('<li><a href="' + e.url + '" title="' + e.title + '">' + e.title + '</a><a class="delete" href="' + e.url + '" title="Löschen"></a></li>');			
			
		};		
		function storeData(favorite){
			var data = loadData();
			var stored = isStored(data, favorite);
			if(stored>-1){
				data.remove(stored);				
			}else{
				data.push(favorite);	
				//TODO: Ihre Seite wurde zu den Favoriten hinzugefügt Meldung einblenden
			}	
			saveData(data);
		};
		
		function isStored(data,element){
			var found = -1;
			
			$.each(data,function(i,e){
				if(e.url == element.url){
					found = i; 
				}
			});
			return found;
			}
		
		function getCurrentTitleAndUrl(){
			var url = window.location.pathname;
			var title = document.title || $('h1:first').text();
			return {title:title,url:url};			
		};
		
		function saveData(data){
			if(typeof(Storage)!=="undefined")
			{
				 	localStorage.favorites=JSON.stringify(data);		
 			}
		};
	
		function loadData(){
			var content = '[{"title":"Favoriten nicht verfügbar",url:"#"}]';
			if(typeof(Storage)!=="undefined")
			{
				if (!localStorage.favorites)
  				{
  					localStorage.favorites=JSON.stringify([]);
  					
  				}
				content = localStorage.favorites;		
 			}
			
			return JSON.parse(content);
			};
			
			
	
})(jQuery)