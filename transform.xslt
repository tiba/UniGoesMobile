<?xml version="1.0"?>
<xsl:stylesheet
        encoding="UTF-8"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">



    <xsl:output method="html" encoding="UTF-8"/>
	<!-- Grund-template: Rahmenstruktur des HTML-Dokuments. einzelne Bestandteile werden gefüllt -->
    <xsl:template match="/">
       
		<html>
			<head>
				<!--setze Titel der Quell-Seite-->
				<title><xsl:value-of select="//title"/></title>
				<meta charset="utf-8"/>
                                
				<link rel="stylesheet" type="text/css" href="cssv1/reset.css" media="all"/>
				<link rel="stylesheet" type="text/css" href="cssv1/content.css" media="all"/>
				<link rel="stylesheet" type="text/css" href="cssv1/menu.css" media="all"/>
				<link rel="stylesheet" type="text/css" href="cssv1/ios_styles.css" media="all"/>
				<link rel="stylesheet" type="text/css" href="cssv1/android_styles.css" media="all"/>
				<link rel="stylesheet" type="text/css" href="cssv1/styles.css" media="all"/>

				<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>


				<script src="js/jquery.cookie.js"></script>
				<script src="js/useragent-detect.js"></script>
				<script src="js/create-controls.js"></script>
				<script type="text/javascript" src="js/bookmark.js"></script>

				<script src="js/overthrow.js"></script>

				<meta name="viewport" content="initial-scale=1, , maximum-scale=1, , minimum-scale=1"/>
			
			</head>

			<body>
				<div id="content-pane">
					<div id="content" >
						<!-- FÜge Inhaltsbereich ein -->
						<xsl:apply-templates select="//div[@id='center']"/>
					</div>

					<div class="up-page-content-localnav" id="navigation-menu">
						
						<nav>
							<!-- Füge Navigation ein -->
							<xsl:apply-templates select="//div[@id='left']/div[@class='mainnav']"/>
						</nav>
					</div>
					<div class="up-page-content-localnav" id="shortcuts">
						<nav>
						
						</nav>
					</div>
					<div  id="favorites">
						<p>Hier finden Sie Ihre gespeicherten Seiten der Uni-Passau</p>
					</div>

					<div class="" id="settings">
						Hier kommen Einstellungen
					</div>
				</div>
				<div id="footer">
					<div id="copyright" class="label">
						<span>© 2013 Universität Passau
						</span>
					</div>
					<div id="impressum" class="">
						<a href="#" title="Impressum">
							<span>Impressum
							</span>
						</a>
					</div>
					<div id="contact" class="">
						<a href="#" title="Kontakt">
							<span>Kontakt
							</span>
						</a>
					</div>
				</div>
		
				<div id="mainbar">
					<div class="relative">				
					</div>
				</div>
					
				<div id="auxbar">	
				</div>	

				<div id="controls">
					<div id="logo-icon" class="icon">
							<a href=""><img src="images/logo.png" alt="Logo Universität Passau" />
							</a>
					</div>
					
					<div id="sitetitle" class="label"><xsl:value-of select="//title"/></div>		
					
					<div id="search-icon" class="button">
						<a href="#search-area" id="search-a" title="Suche">
							<span>Suche
							</span>
						</a>
					</div>
					
					<div id="add-favorite-icon" class="button">
						<a href="#bookmark-status" title="Seite merken">
							<span>Seite merken
							</span>
						</a>
					</div>	

						
					<div id="shortcuts-icon" class="button">
						<a href="#shortcuts" title="Direktzugriff">
							<span>Direktzugriff
							</span>
						</a>	
					</div>
					
					<div id="favorites-icon" class="button">
						<a href="#favorites" title="Favoriten">
							<span>Favoriten
							</span>
						</a>
					</div>
					
					<div id="more-icon" class="button">
						<a href="#more-container" title="Mehr" >
							<span>Mehr
							</span>
						</a>
					</div>		
					<div id="less-icon" class="button">
						<a href="#more-container" title="Mehr">
							<span>Mehr
							</span>
						</a>
					</div>
					
					<div id="menu-icon" class="button">
						<a href="#navigation-menu" title="Navigation">
							<span>Navigation
							</span>
						</a>
					</div>

					<div id="content-icon" class="button">
						<a href="#content" title="Inhalt">
							<span>Inhalt
							</span>
						</a>
					</div>	
					
					<div id="settings-icon" class="button">
						<a href="#settings" title="Einstellungen">
							<span>Einstellungen
							</span>
						</a>
					</div>	
					
					<div id="more-container" class="container">
							
					</div>	
					
					<div id="bookmark-status" class="status">Hier steht die Meldung zum Bookmark</div>
				</div>
				<div id="overlay-pane">
				
				</div>
				<div id="elements">
					<div id="search-area" class="container">		
						<form action="" id="search" name="searchform" method="post">
							<input type="search" class="search" id="Suche" placeholder="Suchbegriff" />
						</form>
					</div>  
				</div>
			</body>
		</html>

    </xsl:template>


	<!-- identitäts-Template: kopiert 1-zu-1 den input -->
	<xsl:template match="@*|node()">
		<xsl:copy>
			<xsl:apply-templates select="@*|node()"/>
		</xsl:copy>
	</xsl:template>


</xsl:stylesheet>