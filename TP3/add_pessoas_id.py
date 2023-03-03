import json
import math

f = open("dataset-extra1.json")
pessoas = json.load(f)
f.close()

pad=int(math.log10(len(pessoas['pessoas'])))+1

for index, p in enumerate(pessoas['pessoas']):
    p['id'] = "p" + f'{str(index).zfill(pad)}'

f = open("dataset-extra1.json", "w")
json.dump(pessoas, f)
f.close()

print("adicionados " + str(index+1) + " identificadores.")