import http.server
import os

class CleanURLHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Support clean URLs (e.g. /about -> about.html)
        # and redirect from .html URL to clean URL (e.g. /about.html -> /about).
        raw_path = self.path
        path = raw_path.split('?')[0].split('#')[0]

        if path == '/':
            self.path = '/index.html'
        elif path.endswith('/'):
            index_path = path + 'index.html'
            if os.path.isfile(self.translate_path(index_path)):
                self.path = index_path
        elif path.endswith('.html'):
            local_file = self.translate_path(path)
            if os.path.isfile(local_file):
                # Redirect to clean URL form
                clean_target = path[:-5] or '/'
                self.send_response(301)
                self.send_header('Location', clean_target)
                self.end_headers()
                return
        elif '.' not in os.path.basename(path):
            html_path = path + '.html'
            if os.path.isfile(self.translate_path(html_path)):
                self.path = html_path

        super().do_GET()

if __name__ == '__main__':
    port = 8000
    server = http.server.HTTPServer(('', port), CleanURLHandler)
    print(f'Serving at http://localhost:{port}')
    server.serve_forever()
