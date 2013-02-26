<?php
		/**
		*
		* Dieses Skritpt leitet Anfragen auf die Website der Uni-Passau weiter und transformiert das Ergebnis mittels
		* XSLT, bevor es die Website dann ausgibt.
		* Die Requests werden per .htaccess alle auf diese Datei umgeleitet
		* 
		*/
		//Anfrage-URI holen, und das UniGoesMobile Unterverzeichnis entfernen
        $url = $_SERVER['REQUEST_URI'];//$_REQUEST['path'];
        $url = str_replace('/UniGoesMobile','',$url);
		//Website von http://www.uni-passau.de holen
        $data = file_get_contents('http://uni-passau.de/' . $url);
        //http://www.php.net/manual/de/xsl.examples.php#103134http://www.php.net/manual/de/xsl.examples.php#103134
        //XSLT Processor initialisieren
		$xslt = new XSLTProcessor();
		//Website der Uni Passau als DOM-Document laden (durch das vorangestellte @ werden Warnungen nicht ausgegeben
        $dom = @DOMDocument::loadHTML( $data);
        
		//XSLT Stylesheet laden
        $xsl =new DOMDocument();
        $xsl->loadXML(file_get_contents('transform.xslt'));
		$xslt->importStylesheet($xsl);
		
		//Transformation durchführen
        $data = $xslt->transformToXml($dom);
		
		//anschliessend noch URLs austauschen (ginge auch in XSLT, wäre dort aber deutlich mehr Aufwand
        $data = str_replace('http://www.uni-passau.de/','http://www.zitroneneis.org/UniGoesMobile/',$data);
		//Eingebundene Bilder sind auf der Website der uni-passau relativ eingebunden. Diese werden hier 
		//absolut eingebunden damit der Traffic für die Bilder nicht durch diesen Server geschleust wird
        $data = str_replace('src="','src="http://www.uni-passau.de/',$data);
		
		//Ausgabe der transformierten Daten
        echo $data;
?>
