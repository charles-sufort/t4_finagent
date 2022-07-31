import unittest

import http.client, urllib.parse
import json



class TestAPI(unittest.TestCase):
    def test_ctions(self):
        conn = http.client.HTTPConnection("127.0.0.1:9000")
        ction = {"dictionary":{"C1":[["na","na","na","na"]],"C2":[["na","na","na","na"]]},"name":"T"}
        headers = {"Content-type":"application/json"}
        data = json.dumps(ction)
        conn.request("POST","/ction/add/",data,headers)
        test_dict = {"message":"saved"}
        test_s = json.dumps(test_dict)
        r1_js = json.loads(conn.getresponse().read().decode("utf-8"))
        self.assertTrue(len(r1_js.keys()) == 1)
        self.assertTrue(r1_js["message"] == "saved")
        conn.request("GET","/ction/get_all/")
        r2 = json.loads(conn.getresponse().read().decode("utf-8"))
        print(r2)
        self.assertTrue(len(r2.keys()) == 1)
        self.assertTrue(len(r2["message"]) == 1)
        self.assertTrue(r2["message"][0] == "T")
        name = {"name":"T"}
        data = json.dumps(name)
        conn.request("POST","/ction/get/",data,headers)
        r3 = json.loads(conn.getresponse().read().decode("utf-8"))['ction']
        r3_keys = set((r3.keys()))
        keys_test = set({"C1","C2"})
        print(r3_keys)
        self.assertTrue(r3_keys == keys_test)

    def test_termlist(self):
        conn = http.client.HTTPConnection("127.0.0.1:9000")
        termlist = {"name":"fin1","terms":["bank","card","credit"]}
        data = json.dumps(termlist)
        headers = {"Content-type":"application/json"}
        conn.request("POST",'/termlist/add/',data,headers)
        test_dict = {"message":"saved"}
        test_s = json.dumps(test_dict)
        r1_js = json.loads(conn.getresponse().read().decode("utf-8"))
        self.assertTrue(len(r1_js.keys()) == 1)
        self.assertTrue(r1_js["message"] == "saved")
        name = {"name":"fin1"}
        conn.request("GET",'/termlist/get_all/')
        r2 = json.loads(conn.getresponse().read().decode('utf-8'))
        termlists = r2['termlists']
        self.assertTrue(len(termlists) == 1)
        self.assertTrue(termlists[0] == "fin1")
        conn.request("POST","/termlist/get/",data,headers)
        r3 = json.loads(conn.getresponse().read().decode("utf-8"))
        self.assertTrue(len(r3.keys()) == 1)
        self.assertTrue(len(r3["termlist"]) == 3)
        terms = termlist["terms"]
        for i in range(3):
            self.assertTrue(terms[i] == r3['termlist'][i])

    def test_avg_query(self):
        pass

    def test_api(self):
        conn = http.client.HTTPConnection("127.0.0.1:9000")
        ction = {"dictionary":{"C1":[["Student loan","Private student loan","NA","NA"]],"C2":[["Money transfers","International money transfer","NA","NA"]]},"name":"T"}
        data = {"ction":ction,"query_type":"lemmas", "max_n":8}
        headers = {"Content-type":"application/json"}
        data = json.dumps(data)
        conn.request("POST","/data/query/",data,headers)
        r1 = json.loads(conn.getresponse().read().decode('utf-8'))
        print(r1)

    def test_query(self):
        conn = http.client.HTTPConnection("127.0.0.1:9000")
        ction = {"dictionary":{"C1":[["Prepaid card","NA","NA","NA"]]},"name":"T"}
        data = {"ction":ction,"query_type":"lemmas", "max_n":8}
        headers = {"Content-type":"application/json"}
        data = json.dumps(data)
        conn.request("POST","/data/query/",data,headers)
        r1 = json.loads(conn.getresponse().read().decode('utf-8'))
        print(r1)


        


if __name__ == '__main__':
    unittest.main()


