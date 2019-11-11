#!/usr/bin/python3

print('open http://localhost:12345/gameboy_tiles_maker.html')

from http.server import SimpleHTTPRequestHandler, HTTPServer

class StoreHandler(SimpleHTTPRequestHandler):
    def do_POST(self):
        if self.path == '/save':
            length = self.headers['content-length']
            data = self.rfile.read(int(length))

            with open('save.json', 'w') as fh:
                fh.write(data.decode())

            self.send_response(200)
        else:
            super().do_POST(self)


server = HTTPServer(('', 12345), StoreHandler)
server.serve_forever()