import urllib.request
import json
import codecs

req = urllib.request.urlopen("http://api.fixer.io/2000-01-03").read().decode('utf8')
#reader = codecs.getreader("utf-8")
jsn = json.loads(req)
print(jsn)

