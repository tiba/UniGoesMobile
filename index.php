<?php
		/**
		*
		* Dieses Skritpt leitet Anfragen auf die Website der Uni-Passau weiter und transformiert das Ergebnis mittels
		* XSLT, bevor es die Website dann ausgibt.
		* Die Requests werden per .htaccess alle auf diese Datei umgeleitet
		* 
		*/

		// url und xslt knofiguration für website versionen vor und nach relaunch
		$urls = array(
				'old' => 'http://old.uni-passau.de',
				'new' => 'http://www.uni-passau.de'
		);
		$xslts = array(
				'old' => 'transform.xslt',
				'new' => 'transform_relaunch.xslt'
		);
		$mode = 'new';//zu 'old' wechseln, falls alte version der Uni-passau geladen werden soll
		//Anfrage-URI holen, und das UniGoesMobile Unterverzeichnis entfernen
        $url = $_SERVER['REQUEST_URI'];//$_REQUEST['path'];
        $url = str_replace('/UniGoesMobile','',$url);
        
        
        //$targetUrl = 'http://old.uni-passau.de';
        //abfrage für Suche: die läuft über eine andere Subdomain...
        if(strpos($url,"cgi-bin/search.cgi")!== false){
        	$data = file_get_contents('http://websearch.uni-passau.de/' . $url);
        }else{
        	$data = file_get_contents($urls[$mode] . $url);
        }
		//Website von http://www.uni-passau.de holen
        if($mode == 'new'){
        	$data = utf8_decode($data);	
        
        }
        //http://www.php.net/manual/de/xsl.examples.php#103134http://www.php.net/manual/de/xsl.examples.php#103134
        //XSLT Processor initialisieren
		$xslt = new XSLTProcessor();
		//PHP funktionen in xslt verfügbar machen (um z.b. urls auszutauschen
		$xslt->registerPHPFunctions();
		//Website der Uni Passau als DOM-Document laden (durch das vorangestellte @ werden Warnungen nicht ausgegeben
        $dom = @DOMDocument::loadHTML( $data);
        
		//XSLT Stylesheet laden
        $xsl =new DOMDocument();
        $xsl->loadXML(file_get_contents($xslts[$mode]));
		$xslt->importStylesheet($xsl);
		
		//Transformation durchf�hren
        $data = $xslt->transformToXml($dom);
	//Universität Passau im title entfepOpEval: functrnen
        $data = str_replace("Universität Passau: ", "", $data);	
		//anschliessend noch URLs austauschen (ginge auch in XSLT, w�re dort aber deutlich mehr Aufwand
		//update 8.4.13: nach relaunch vorsichtshalber mal alte und neue links austauschen!
        $data = str_replace('href="' . $xslts['old'] . '"','href="http://www.zitroneneis.org/UniGoesMobile/"',$data);
        $data = str_replace('href="' . $xslts['new'] . '"','href="http://www.zitroneneis.org/UniGoesMobile/"',$data);
		
		//Eingebundene Bilder sind auf der Website der uni-passau relativ eingebunden. Diese werden hier 
		//absolut eingebunden damit der Traffic f�r die Bilder nicht durch diesen Server geschleust wird
        //$data = str_replace('img src="','img src="http://www.uni-passau.de/',$data);
		
		//Ausgabe der transformierten Daten
        echo $data;
?>
