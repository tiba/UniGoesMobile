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
                <title>
                    <xsl:value-of select="//title"/>
                </title>
                <meta charset="utf-8"/>
                <!--navigation in ios verstecken -->
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <!--<link rel="stylesheet" type="text/css" href="cssv1/reset.css" media="all"/>-->
                <link rel="stylesheet" type="text/css" href="cssv1/bootstrap.css" media="all"/>
                <link rel="stylesheet" type="text/css" href="cssv1/content.css" media="all"/>
                <link rel="stylesheet" type="text/css" href="cssv1/menu.css" media="all"/>
                <link rel="stylesheet" type="text/css" href="cssv1/styles.css" media="all"/>

                <link rel="stylesheet" type="text/css" href="cssv1/ios_styles.css" media="all"/>
                <link rel="stylesheet" type="text/css" href="cssv1/android_styles.css" media="all"/>
            
                <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>

                <script type="text/javascript" src="js/jquery.stayinwebapp.js"></script>

                <script src="js/overthrow.js"></script>
                <script src="js/jquery.cookie.js"></script>
                <script src="js/useragent-detect.js"></script>
                <script src="js/create-controls.js"></script>
                <script type="text/javascript" src="js/bookmark.js"></script>
            
                <base href="/UniGoesMobile/"/>
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
                            <ul>
                            	
                                <xsl:for-each select="//ul[@class='topmenu']/li">
                                    
                                    <li>
                                        <xsl:if test="@class='top-activ'">
                                            <xsl:attribute name="class">active sub</xsl:attribute>
                                        </xsl:if>
                                        <xsl:apply-templates select="a"/>
                                        <xsl:if test="@class='top-activ'">
                                            <xsl:apply-templates select="//div[@id='left']/div[@class='mainnav']/ul"/>
                                        </xsl:if>
                                        <!-- Menü rendern, wenn kein a tag im li ist, das passiert nur auf fakultätsseiten, wo es oben kein Menü gibt! -->
                                        <xsl:if test="not(a)">
                                            <xsl:apply-templates select="//div[@id='left']/div[@class='mainnav']/ul"/>
                                        </xsl:if>
                                    </li>
                                </xsl:for-each>
                                
                            </ul>
                           
                        </nav>
                    </div>
                    <div class="up-page-content-localnav" id="shortcuts">
                        <!--todo: textverfassen-->
                        <nav>
						
                        </nav>
                    </div>
                    <div  id="favorites">
                        <p>Hier finden Sie Ihre gespeicherten Seiten der Uni-Passau</p>
                    </div>

                    <div class="" id="settings">
                        <h2>
                            Einstellungen
                        </h2>
                        <form>

                            <p class="bodytext">
                                Damit Sie sich auf der mobilen Website der Uni-Passau so gut wie möglich
                                zurecht finden, bitten wir Sie um einige Angaben.<br/>

                            </p>
                            <div class="select">
                                <!--TODO: optinoen anpassen-->
                                <label for="targetaudience">Ich bin...</label>
                                <select name="targetaudience" class="targetaudience" id="targetaudience">
                                    <option value="nn">[keine Angabe]</option>
                                    <option value="schueler">neu an der Uni Passau</option>
                                    <option value="student">schon länger an der Uni Passau</option>
                                    <!--<option value="dozent">bin hier angestellt</option>-->
                                </select>
                            </div>

                            <p class="bodytext">Mit dieser Angabe, erhalten Sie eine speziell auf Sie
                                zugeschnittene Startseite, sowie für Sie relevante Links unter dem Punkt
                                "Direktzugriff".</p>
                            <div class="select">
                                <label for="targetdevice">Ich habe ein ...</label>
                                <select name="targetdevice" class="targetdevice" id="targetdevice">
                                    <option value="">[keine Angabe]</option>
                                    <option value="ios">IPhone/IPad/IPod</option>
                                    <option value="android">Android-Gerät (Nexus 4, Samsung Galaxy, ...)</option>
                            
                                </select>
                            </div>

                            <p class="bodytext">Damit Sie sich möglichst schnell bei uns zurecht
                                finden, präsentieren wir Ihnen je nach Ihrem Smartphone-Typ
                                ein angepasstes User-Interface. In der Regel wird dies automatisch
                                erkannt, wenn Sie aber mal das jeweils andere UI sehen wollen, können
                                Sie dies hier entsprechend ändern</p>
                
                            <input type="submit" class="button btn" value="speichern"/>
                            <p class="bodytext">
                                Nach dem Speichern werden Sie auf Ihre neue Startseite weitergeleitet.
                                Sie können Ihre Einstellungen jederzeit ändern, indem Sie 
                                "Einstellungen" (Schraubenschlüssel-Symbol <img src="/images/settings_tab1.png/"/>) klicken.
                    
                            </p>
                            <a href="#" id="deletesettings">Einstellungen löschen</a>
                        </form>
               
                    </div>
                </div>
                <div id="footer">
                    <div id="copyright" class="">
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
					
                </div>
					
                <div id="auxbar">	
                </div>	

                <div id="controls">
                    <div id="logo-icon" class="icon">
                        <a href="/UniGoesMobile/">
                            <img src="/UniGoesMobile/images/logo.png" alt="Logo Universität Passau" />
                        </a>
                    </div>
					
                    <div id="sitetitle" class="label">
                        <xsl:value-of select="//title"/>
                    </div>		
					
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
					
                    <div id="bookmark-status" class="status">   
                        <p class="bodytext">
                            Ihre Favoriten wurden aktualisiert
                        </p>            
                        <a href="javascript:return false;" class="button btn confirm">Ok</a>
                        
                    </div>
                </div>
                <div id="overlay-pane">
				
                </div>
                <div id="elements">
                    <div id="search-area" class="container">		
                        <form action="/cgi-bin/search.cgi" id="search" name="searchform" method="get">
                            <input name="q" type="search" class="search" id="Suche" placeholder="Suchbegriff" />
                        </form>
                    </div>  
                </div>
                                
            </body>
        </html>

    </xsl:template>
   
    <!-- menüklassen ersetzen -->
    <xsl:template match="//li/@class[.='menu1-lev1-actifsub']|//li/@class[.='menu1-lev2-actifsub']|//li/@class[.='menu1-lev3-actifsub']">
        <xsl:attribute name="class">active sub</xsl:attribute>
    </xsl:template>

    <xsl:template match="//li/@class[.='menu1-lev1-curifsub']|//li/@class[.='menu1-lev2-curifsub']|//li/@class[.='menu1-lev3-curifsub']">
        <xsl:attribute name="class">current sub</xsl:attribute>
    </xsl:template>
    
    <!--buttons für Seitennavigation-->
    <xsl:template match="//p[@class='pagebrowser']/span/a/@class">
        <xsl:attribute name="class">btn</xsl:attribute>
    </xsl:template>
    <xsl:template match="//div[@class='browseLinksWrap']/a">
        <a>
        <xsl:attribute name="class">btn</xsl:attribute>
        <xsl:apply-templates select="@*|node()"/>
        </a>
    </xsl:template>
    <xsl:template match="//div[@class='browseLinksWrap']/span/@class">
        <xsl:attribute name="class">btn disabled</xsl:attribute>
    </xsl:template>
    <xsl:template match="//p[@class='pagebrowser']/span/b/@class ">
        <xsl:attribute name="class">btn disabled</xsl:attribute>
    </xsl:template>

    <!--<xsl:template match="//p[@class='pagebrowser']/span/b">
        <b>
            <xsl:attribute name="class">btn</xsl:attribute>
            <xsl:copy>
                <xsl:apply-templates select="@*|node()"/>
            </xsl:copy>
        </b>
    </xsl:template>-->
   
    <!-- bildpfade umbiegen -->
    <xsl:template match="//img">
        <img title="{@title}" alt="{@alt}" width="{@width}" height="{@width}" src="http://www.uni-passau.de/{@src}"/>
    </xsl:template>
    
    <xsl:template match="//input[@type='submit']">
        <xsl:copy>
            <xsl:attribute name="class">btn</xsl:attribute>
            <xsl:apply-templates select="@*|node()"/>
        </xsl:copy>
    </xsl:template>

    <!-- identitäts-Template: kopiert 1-zu-1 den input -->
    <xsl:template match="@*|node()">
        <xsl:copy>
            <xsl:apply-templates select="@*|node()"/>
        </xsl:copy>
    </xsl:template>


</xsl:stylesheet>