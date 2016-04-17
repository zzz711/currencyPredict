import urllib.request
import json
import codecs
import datetime

now = datetime.datetime.now()

data = [] 
dates = []
diction = {}
#url = "http://api.fixer.io/"

for year in range(2000, 2001):#,  now.year + 1):
	for month in range(1, 13):
		#url = "http://api.fixer.io/"
		url = "http://apilayer.net/api/historical?access_key=dc0ab941b0c142a23dc01ba57144f346&date=" 
		mnth = month
		if(month < 10):
			mnth = "0" + str(month)
		else:
			mnth = str(month)
			
		url = url  + str(year) + "-" + mnth + "-01"
		
		if(year == now.year and month > now.month):
			break 
		
		req = urllib.request.urlopen(url).read().decode('utf8')
		sn = json.loads(req)
		dates.append( str(year) + "-" + mnth + "-01")
		data.append(sn)
		
diction["dates"] = dates

usd = []
cad = []
#aud = []
#gbp = []
#nzd = []
#jpy = []
cny = [] #china

for datas in data:
	usd.append(datas["quotes"]["USDUSD"])
	cad.append(datas["quotes"]["USDCAD"])
	cny.append(datas["quotes"]["USDCNY"])
	#aud.append(datas["rates"]["AUD"])
	#gbp.append(datas["rates"]["GBP"])
	#nzd.append(datas["rates"]["NZD"])
	#jpy.append(datas["rates"]["JPY"])
	

diction["rates"] = {}
#diction["rates"]["usd"] = usd
#diction["rates"]["cad"] = cad
diction["rates"]["cny"] = cny
#diction["rates"]["aud"] = aud
#diction["rates"]["gbp"] = gbp
#diction["rates"]["nzd"] = nzd
#diction["rates"]["jpy"] = jpy


print(diction)

#print(data[0]["rates"]["USD"])

#diciton["rate"]["usd"] = data["rates"]["USD"]

#diction["usd"] = data[

#req = urllib.request.urlopen("http://api.fixer.io/2000-01-03").read().decode('utf8')
#reader = codecs.getreader("utf-8")
#for jsn in data:
#        print(jsn["rates"]["USD"])


# GET THE USD FEDERAL FUNDS RATE
print("USD FEDERAL FUNDS RATE:")
federalFundsReq = urllib.request.urlopen("https://www.quandl.com/api/v3/datasets/FRED/FEDFUNDS.json").read().decode('utf8')
federalFunds = json.loads(federalFundsReq)
for month in federalFunds['dataset']['data'] :
	diction["exchange"]["usd"] = month[1]
#        print(month)

#diction

# GET THE RMB CHINA PBOC RATE
print("RMB PBOC RATE:")
pcobReq = urllib.request.urlopen("https://www.quandl.com/api/v3/datasets/FRED/FEDFUNDS.json").read().decode('utf8')
pcobRate = json.loads(pcobReq)
for month in pcobRate['dataset']['data']:
	diction["exchange"]["pboc"] = month[1]
#        print(month[1])        
        

 
 
 
 
 
 
 
 
