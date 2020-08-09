import cPickle as pickle
import pprint

data = [{'name':'b1twis3','role':'user'}]

#Serialize
data_p = pickle.dumps(data)
pprint.pprint(data_p)

#Unserialize/unpickle
data_load = pickle.loads(data_p)
pprint.pprint(data_load)
