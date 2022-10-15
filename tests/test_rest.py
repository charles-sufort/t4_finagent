import http.client, urllib.parse
import json


#conn = http.client.HTTPConnection("127.0.0.1:9000")
#ction = {"dictionary":{"C1":[["na","na","na","na"]],"C2":[["na","na","na","na"]]},"name":"T"}
#headers = {"Content-type":"application/json"}
#data = json.dumps(ction)
#conn.request("POST","/ction/add/",data,headers)
#test_dict = {"message":"saved"}
#test_s = json.dumps(test_dict)
#r1_js = json.loads(conn.getresponse().read().decode("utf-8"))
#print(r1_js)
#conn.close()

#conn = http.client.HTTPConnection("127.0.0.1:9000")
#name = {"name":"T1"}
#headers = {"Content-type":"application/json"}
#data = json.dumps(name)
#conn.request("POST","/ction/get/",data,headers)
#test_dict = {"message":"saved"}
#test_s = json.dumps(test_dict)
#r1_js = json.loads(conn.getresponse().read().decode("utf-8"))
#print(r1_js)
#conn.close()


conn = http.client.HTTPConnection("127.0.0.1:9000")
headers = {"Content-type":"application/json"}
data = json.dumps({"name":"BANK OF AMERICA, NATIONAL ASSOCIATION"})
conn.request("POST","/data/company/tree",data,headers)

r1_js = json.loads(conn.getresponse().read().decode("utf-8"))
print(list(r1_js["datatree"]["nodes"]["Credit reporting"].keys()))
conn.close()

#conn = http.client.HTTPConnection("127.0.0.1:9000")
#headers = {"Content-type":"application/json"}
#data = {"company":"BANK OF AMERICA, NATIONAL ASSOCIATION","dataform":"lemma"}
#conn.request("POST","/data/company/dataform/process/get",data,headers)
#test_dict = {"message":"saved"}
#test_s = json.dumps(test_dict)                                               
##conn = http.client.HTTPConnection("127.0.0.1:9000")
#r1_js = json.loads(conn.getresponse().read().decode("utf-8"))                #ction = {"dictionary":{"C1":[["na","na","na","na"]],"C2":[["na","na","na","na"]]},"name":"T"}
#print(r1_js)                                                                 #conn.request("GET","/ction/get_all/")
#conn.close()                                                                 #r2 = conn.getresponse()
#print(r2.read())
#conn.close()
#


