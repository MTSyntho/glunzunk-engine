# Python program to read
# json file

import json

# Opening JSON file
f = open('C:\\Users\\User\\Documents\\Glunzunk Engine\\projects.json')

# returns JSON object as
# a dictionary
data = json.load(f)

# Python program to convert JSON to Python
#import json

# JSON string
#employee ='{"id":"09", "name": "Nitin", "department":"Finance"}'

# Convert string to Python dict
data2 = json.loads(projekCount)
print(data2)

print(data2['projekCount'])


# https://www.geeksforgeeks.org/read-json-file-using-python/