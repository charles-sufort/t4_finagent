import http.client, urllib.parse
import json


class Client:
    def ction_get(self):
        conn = http.client.HTTPConnection("127.0.0.1:9000")
        name = {"name":"T1"}
        headers = {"Content-type":"application/json"}
        data = json.dumps(name)
        conn.request("POST","/ction/get/",data,headers)
        test_dict = {"message":"saved"}
        test_s = json.dumps(test_dict)
        r1_js = json.loads(conn.getresponse().read().decode("utf-8"))
        print(r1_js)
        conn.close()

    def get_tree(self):
        conn = http.client.HTTPConnection("127.0.0.1:9000")
        headers = {"Content-type":"application/json"}
        data = json.dumps({"name":"BANK OF AMERICA, NATIONAL ASSOCIATION"})
        conn.request("POST","/data/company/tree",data,headers)

        r1_js = json.loads(conn.getresponse().read().decode("utf-8"))
        print(list(r1_js["datatree"]["nodes"]["Credit reporting"].keys()))
        conn.close()

    def process_company_dataform(self,company,dataform):
        conn = http.client.HTTPConnection("127.0.0.1:9000")
        data = json.dumps({"company":"BANK OF AMERICA, NATIONAL ASSOCIATION","dataform":"lemma"})
        headers = {"Content-type":"application/json"}
        conn.request("POST","/data/company/dataform/process",data,headers)
        r1_js = json.loads(conn.getresponse().read().decode("utf-8"))
        print(r1_js)

    def company_dataform_status(self,company,dataform):
        conn = http.client.HTTPConnection("127.0.0.1:9000")
        data = json.dumps({"company":"BANK OF AMERICA, NATIONAL ASSOCIATION","dataform":"lemma"})
        headers = {"Content-type":"application/json"}
        conn.request("POST","/data/company/dataform/status",data,headers)
        r1_js = json.loads(conn.getresponse().read().decode("utf-8"))
        print(r1_js)

    def scan_company_dataform(self,company,dataform):
        conn = http.client.HTTPConnection("127.0.0.1:9000")
        data = json.dumps({"company":"BANK OF AMERICA, NATIONAL ASSOCIATION","dataform":dataform})
        headers = {"Content-type":"application/json"}
        conn.request("POST","/data/company/dataform/process/scan",data,headers)
        r1_js = json.loads(conn.getresponse().read().decode("utf-8"))
        print(r1_js)


    def scan_company_dataform_status(self,company,dataform):
        conn = http.client.HTTPConnection("127.0.0.1:9000")
        data = json.dumps({"company":"BANK OF AMERICA, NATIONAL ASSOCIATION","dataform":dataform})
        headers = {"Content-type":"application/json"}
        conn.request("POST","/data/company/dataform/process/scan/status",data,headers)
        r1_js = json.loads(conn.getresponse().read().decode("utf-8"))
        print(r1_js)


    def get_company_dataform_progress(self,company,dataform):
        conn = http.client.HTTPConnection("127.0.0.1:9000")
        data = json.dumps({"company":"BANK OF AMERICA, NATIONAL ASSOCIATION","dataform":dataform})
        headers = {"Content-type":"application/json"}
        conn.request("POST","/data/company/dataform/process/progress",data,headers)
        r1_js = json.loads(conn.getresponse().read().decode("utf-8"))
        print(r1_js)


    def scan_company_dataform_get(self,company,dataform):
        conn = http.client.HTTPConnection("127.0.0.1:9000")
        data = json.dumps({"company":"BANK OF AMERICA, NATIONAL ASSOCIATION","dataform":dataform})
        headers = {"Content-type":"application/json"}
        conn.request("POST","/data/company/dataform/process/scan/get",data,headers)
        r1_js = json.loads(conn.getresponse().read().decode("utf-8"))
        print(r1_js)



company = "BANK OF AMERICA, NATIONAL ASSOCIATION"
dataform = "lemma"
client = Client()
#client.process_company_dataform(company,dataform)
client.get_company_dataform_progress(company,dataform)

#client.scan_company_dataform(company,dataform)
#client.scan_company_dataform_status(company,dataform)
#client.scan_company_dataform_get(company,dataform)


#conn = http.client.HTTPConnection("127.0.0.1:9000")
##test_dict = {"message":"saved"}
#test_s = json.dumps(test_dict)                                               
###r1_js = json.loads(conn.getresponse().read().decode("utf-8"))                #ction = {"dictionary":{"C1":[["na","na","na","na"]],"C2":[["na","na","na","na"]]},"name":"T"}
#print(r1_js)                                                                 #conn.request("GET","/ction/get_all/")
#conn.close()                                                                 #r2 = conn.getresponse()
#print(r2.read())
#conn.close()
#




