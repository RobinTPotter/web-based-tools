#!/usr/bin/python3

"""Simple subclass of http.server to action a POST to save file."""

print('open http://localhost:12345/gameboy_tiles_maker.html')

import json, os
from http.server import SimpleHTTPRequestHandler, HTTPServer

class StorageHandler(SimpleHTTPRequestHandler):
    """A tweak to Simple Handler if POST to save then dangerously save data to file."""

    def do_POST(self):
        """If url is save, dump contnet to save.json."""
        if self.path == '/save':
            length = self.headers['content-length']
            data = self.rfile.read(int(length))
            #print(data)
            filename = json.loads(data)['file']
            with open(filename, 'w') as fh:
                fh.write(data.decode())

            self.send_response(200)
            self.end_headers()       
            self.wfile.write(b'Saved!')
        else:
            print('hohoho')
            self.send_response(200)
            self.end_headers()       
            self.wfile.write(b'Hi!')


server = HTTPServer(('', 12345), StorageHandler)
server.serve_forever()