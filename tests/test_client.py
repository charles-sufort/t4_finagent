import http.client
import json

conn = http.client.HTTPConnection("127.0.0.1:9000")
ction = {"dictionary":{"C1":[["BANK OF AMERICA, NATIONAL ASSOCIATION","Student loan","Private student loan","Getting a loan","Fraudulent loan"]],"C2":[["BANK OF AMERICA, NATIONAL ASSOCIATION","Student loan","Federal student loan servicing","Dealing with your lender or servicer","Received bad information about your loan"]]},"name":"T"}
#data = {"ction":"Test3","dataform":"lemma","key":"lemma"}
data = {"dataform":"lemma","name":"lems1","terms":["want","credit"]}
data2 = {"dataform":"lemma","name":"lems1"}


headers = {"Content-type":"application/json"}
data = json.dumps(data2)
#conn.request("POST","/data/dataform/process",data,headers)
#
#
#r1 = conn.getresponse().read().decode('utf-8')
#print(r1)
#conn.request("POST","/data/company/dataform/check",data,headers)

conn.request("GET","/data/company/get_all")


r1 = json.loads(conn.getresponse().read().decode('utf-8'))

print(len(r1["companies"]))
companies = r1["companies"]
companies.sort()
print(companies)



