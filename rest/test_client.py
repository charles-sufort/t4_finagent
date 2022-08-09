import http.client
import json

conn = http.client.HTTPConnection("127.0.0.1:9000")
ction = {"dictionary":{"C1":[["BANK OF AMERICA, NATIONAL ASSOCIATION","Student loan","Private student loan","NA","NA"]],"C2":[["BANK OF AMERICA, NATIONAL ASSOCIATION","Student loan","Non-federal student loan","NA","NA"]]},"name":"T"}
data = {"ction":ction,"name":"lemma"}
headers = {"Content-type":"application/json"}
data = json.dumps(data)
#conn.request("POST","/data/dataform/process",data,headers)
#r1 = conn.getresponse().read().decode('utf-8')
#print(r1)
conn.request("POST","/data/dataform/get",data,headers)
r1 = json.loads(conn.getresponse().read().decode('utf-8'))
print(r1)


