---


---

<h1 id="mqtt-tp">MQTT TP</h1>
<h2 id="pré-requis-">Pré-requis :</h2>
<ul>
<li><strong>matériel</strong>
<ul>
<li>carte esp8266</li>
<li>capteur de distance</li>
</ul>
</li>
<li><strong>Logiciel</strong>
<ul>
<li>nodejs</li>
<li>php</li>
<li>mysql</li>
<li>mosquitto</li>
</ul>
</li>
</ul>
<h1 id="getting-started">Getting started</h1>
<ul>
<li>Installer un serveur php/mysql en local<br>
installer mosquitto qui fera office de broker mqtt</li>
<li>sur mac :
<blockquote>
<p>brew install mosquitto</p>
</blockquote>
</li>
<li>sur windows :
<blockquote>
<p><a href="http://www.eclipse.org/downloads/download.php?file=/mosquitto/binary/win32/mosquitto-1.4.8-install-win32.exe">http://www.eclipse.org/downloads/download.php?file=/mosquitto/binary/win32/mosquitto-1.4.8-install-win32.exe</a></p>
</blockquote>
</li>
</ul>
<p>tester mosquitto :</p>
<blockquote>
<p>mosquitto_sub -t topic_name</p>
</blockquote>
<p>envoyer une trame mosquitto :</p>
<blockquote>
<p>mosquitto_pub -h localhost -t topic_name -m message</p>
</blockquote>
<p>Lancer le client mqtt :</p>
<blockquote>
<p>npm install</p>
</blockquote>
<blockquote>
<p>node index.js #topic_name sensor/movements</p>
</blockquote>
<h2 id="fonctionnement-de-la-solution">fonctionnement de la solution</h2>
<div class="mermaid"><svg xmlns="http://www.w3.org/2000/svg" id="mermaid-svg-qoVPGxFeJQECRtMg" height="100%" width="100%" style="max-width:850px;" viewBox="-50 -10 850 301"><g></g><g><line id="actor644" x1="75" y1="5" x2="75" y2="290" class="actor-line" stroke-width="0.5px" stroke="#999"></line><rect x="0" y="0" fill="#eaeaea" stroke="#666" width="150" height="65" rx="3" ry="3" class="actor"></rect><text x="75" y="32.5" style="text-anchor: middle;" dominant-baseline="central" alignment-baseline="central" class="actor"><tspan x="75" dy="0">esp</tspan></text></g><g><line id="actor645" x1="275" y1="5" x2="275" y2="290" class="actor-line" stroke-width="0.5px" stroke="#999"></line><rect x="200" y="0" fill="#eaeaea" stroke="#666" width="150" height="65" rx="3" ry="3" class="actor"></rect><text x="275" y="32.5" style="text-anchor: middle;" dominant-baseline="central" alignment-baseline="central" class="actor"><tspan x="275" dy="0">mqttClient</tspan></text></g><g><line id="actor646" x1="475" y1="5" x2="475" y2="290" class="actor-line" stroke-width="0.5px" stroke="#999"></line><rect x="400" y="0" fill="#eaeaea" stroke="#666" width="150" height="65" rx="3" ry="3" class="actor"></rect><text x="475" y="32.5" style="text-anchor: middle;" dominant-baseline="central" alignment-baseline="central" class="actor"><tspan x="475" dy="0">server</tspan></text></g><g><line id="actor647" x1="675" y1="5" x2="675" y2="290" class="actor-line" stroke-width="0.5px" stroke="#999"></line><rect x="600" y="0" fill="#eaeaea" stroke="#666" width="150" height="65" rx="3" ry="3" class="actor"></rect><text x="675" y="32.5" style="text-anchor: middle;" dominant-baseline="central" alignment-baseline="central" class="actor"><tspan x="675" dy="0">web</tspan></text></g><defs><marker id="arrowhead" refX="5" refY="2" markerWidth="6" markerHeight="4" orient="auto"><path d="M 0,0 V 4 L6,2 Z"></path></marker></defs><defs><marker id="crosshead" markerWidth="15" markerHeight="8" orient="auto" refX="16" refY="4"><path fill="black" stroke="#000000" stroke-width="1px" d="M 9,2 V 6 L16,4 Z" style="stroke-dasharray: 0, 0;"></path><path fill="none" stroke="#000000" stroke-width="1px" d="M 0,1 L 6,7 M 6,1 L 0,7" style="stroke-dasharray: 0, 0;"></path></marker></defs><g><text x="175" y="93" class="messageText" style="text-anchor: middle;">send sensor value</text><line x1="75" y1="100" x2="275" y2="100" class="messageLine0" stroke-width="2" stroke="black" marker-end="url(#arrowhead)" style="fill: none;"></line></g><g><text x="375" y="128" class="messageText" style="text-anchor: middle;">insert value in mysql DB</text><line x1="275" y1="135" x2="475" y2="135" class="messageLine1" stroke-width="2" stroke="black" marker-end="url(#arrowhead)" style="stroke-dasharray: 3, 3; fill: none;"></line></g><g><text x="375" y="163" class="messageText" style="text-anchor: middle;">success</text><line x1="475" y1="170" x2="275" y2="170" class="messageLine1" stroke-width="2" stroke="black" marker-end="url(#crosshead)" style="stroke-dasharray: 3, 3; fill: none;"></line></g><g><text x="575" y="198" class="messageText" style="text-anchor: middle;">display graph with sensor values</text><line x1="475" y1="205" x2="675" y2="205" class="messageLine0" stroke-width="2" stroke="black" marker-end="url(#arrowhead)" style="fill: none;"></line></g><g><rect x="0" y="225" fill="#eaeaea" stroke="#666" width="150" height="65" rx="3" ry="3" class="actor"></rect><text x="75" y="257.5" style="text-anchor: middle;" dominant-baseline="central" alignment-baseline="central" class="actor"><tspan x="75" dy="0">esp</tspan></text></g><g><rect x="200" y="225" fill="#eaeaea" stroke="#666" width="150" height="65" rx="3" ry="3" class="actor"></rect><text x="275" y="257.5" style="text-anchor: middle;" dominant-baseline="central" alignment-baseline="central" class="actor"><tspan x="275" dy="0">mqttClient</tspan></text></g><g><rect x="400" y="225" fill="#eaeaea" stroke="#666" width="150" height="65" rx="3" ry="3" class="actor"></rect><text x="475" y="257.5" style="text-anchor: middle;" dominant-baseline="central" alignment-baseline="central" class="actor"><tspan x="475" dy="0">server</tspan></text></g><g><rect x="600" y="225" fill="#eaeaea" stroke="#666" width="150" height="65" rx="3" ry="3" class="actor"></rect><text x="675" y="257.5" style="text-anchor: middle;" dominant-baseline="central" alignment-baseline="central" class="actor"><tspan x="675" dy="0">web</tspan></text></g></svg></div>

