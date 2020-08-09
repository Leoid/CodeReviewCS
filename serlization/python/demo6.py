import yaml

users = [{'a':'test'},{'name': 'b1twis3', 'user': 'admin'}]
ser = yaml.dump(users)
print(ser)

unser = yaml.load(ser)
print(unser)
