#!/usr/bin/python3

"""Simple subclass of http.server to action a POST to save file."""

print('open http://localhost:12345/mental.html')

import json, os, urllib.parse
from http.server import SimpleHTTPRequestHandler, HTTPServer

things = {'www': [], 'ebi': [] }

with open('mental.html') as f:
    template = f.read()

class StorageHandler(SimpleHTTPRequestHandler):
    
    """A tweak to Simple Handler if POST to save then dangerously save data to file."""
    def do_GET(self):
        print('started get')
        self.send_response(200)
        self.end_headers()
        output = str(template)
        output = output.replace('HERE_WWW','<br />'.join(things['www']))
        output = output.replace('HERE_EBI','<br />'.join(things['ebi']))
        print('about to write')
        self.wfile.write(output.encode())  
    
    def do_POST(self):
        """If url is save, dump contnet to save.json."""
        route = self.path.split('?')[-1]
        length = int(self.headers['content-length'])
        data = self.rfile.read(length).decode().split('=')[-1]
        data = urllib.parse.unquote_plus(data.strip())
        if len(data)>1:
            if route in things:
                things[route].append(data)

        self.do_GET()


server = HTTPServer(('', 12345), StorageHandler)
server.serve_forever()