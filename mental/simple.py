#!/usr/bin/python3

"""Simple subclass of http.server to action a POST then redirect to itself as GET."""

print('open http://localhost:12345/mental.html')

import json, os, urllib.parse
from http.server import SimpleHTTPRequestHandler, HTTPServer

things = {'www': [], 'ebi': [] }

# template page
with open('mental.html') as f:
    template = f.read()

class RubbishHandler(SimpleHTTPRequestHandler):
    
    """A tweak to Simple Handler if POST to save then dangerously save data to file."""
    def do_GET(self):
        self.log_message('started get')
        self.send_response(200)
        self.end_headers()
        output = str(template)
        output = output.replace('HERE_WWW','<br />'.join(things['www']))
        output = output.replace('HERE_EBI','<br />'.join(things['ebi']))
        self.log_message('about to write')
        self.wfile.write(output.encode())  
    
    def do_POST(self):
        route = self.path.split('?')[-1]
        length = int(self.headers['content-length'])
        
        # only one parameter comes through from a textarea
        data = self.rfile.read(length).decode().split('=')[-1]
        
        # remove all the encoding + %2C etc
        data = urllib.parse.unquote_plus(data.strip())
        self.log_message(data)
        if len(data)>1:
            if route in things:
                things[route].append(data)
        
        self.send_response(301)
        self.send_header('Location','mental.html')
        self.end_headers()


server = HTTPServer(('', 12345), RubbishHandler)
server.serve_forever()
