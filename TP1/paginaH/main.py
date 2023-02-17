import json
import sys

f = open("pontos.json")
pontos = json.load(f)
categorias=[]

for p in pontos:
    for c in p['categorias']:
        if c not in categorias:
            categorias.append(c)

categorias.sort()

page= """
<!DOCTYPE html>
<html>
    <head>
        <title>Budapest:Points of interest</title>
        <meta charset="utf-8"/>
    </head>
    <body style="background-color:#f2f2eb">
        <h1>Budapest</h1>
        Budapest is the capital and most populous city of Hungary. It is the ninth-largest city in the European Union by population within city limits and the second-largest city on the Danube river; the city has an estimated population of 1,752,286 over a land area of about 525 square kilometres (203 square miles). Budapest, which is both a city and county, forms the centre of the Budapest metropolitan area, which has an area of 7,626 square kilometres (2,944 square miles) and a population of 3,303,786; it is a primate city, constituting 33\% of the population of Hungary
        Throughout the city there are multiple points of interest, such as museums, monuments, churches, and other buildings. In this page you can find a list of the most visited ones (data from TripAdvisor).
        <h2>Points of interest</h2>
        <table>
            <tr>
                <td width="30%" valign="top">
                    <h2>Index</h2>
                    <a name="index"/>
                    <!-- Index -->
                </td>
                <td width="70%">
                    <!-- Points -->
                </td>
            </tr>
        </table>
    </body>
</html>
"""

def geraIndexPonto(p):
    return f"""
                        <li>
                            <a href="#{p['id']}">{p['nome']}</a> 
                        </li>"""

def geraIndexCategoria(c):
    id=c.replace(" ","_").lower()
    return f"""
                        <li>
                            <a href="#{id}">{c}</a> 
                        </li>"""

def geraPontoInfo(p):
    return f"""
                        <h4><a name="{p['id']}">{p['nome']}</a></h4>
                        <p>Description: {p['descricao']}</p>
                        <p>Categories: {', '.join(p['categorias'])}</p>
                        <p>Website: {'<a href="'+p['website']+'" target="_blank">Link</a>' if p['website'] is not None else "Not available"}</p>
                        <p>Rating(Trip Advisor): {p['classificacao']}</p>
                        <address>[<a href="#index">Back to Top</a>]</address>
                        <center>
                            <hr width="100%"/>
                        </center>
    """

def geraCategoriaInfo(c):
    id=c.replace(" ","_").lower()
    points=[p for p in pontos if c in p['categorias']]
    points.sort(key=lambda x: x['nome'])
    return f"""
                        <h4><a name="{id}">{c}</a></h4>
                        <ul>
                            {"".join([geraIndexPonto(p) for p in points])}
                        </ul>
                        <center>
                            <hr width="100%"/>
                        </center>
    """

index= f"""<h3>Categories</h3>
                    <ul>
                        {"".join([geraIndexCategoria(c) for c in categorias])}
                    </ul>
                    <h3>Points</h3>
                    <ul>
                        {"".join([geraIndexPonto(p) for p in pontos])}
                    </ul>
    """

points= f"""<h3>Categories</h3>
                    <ul>
                        {"".join([geraCategoriaInfo(c) for c in categorias])}
                    </ul>
                    <h3>Points</h3>
                    <ul>
                        {"".join([geraPontoInfo(p) for p in pontos])}
                    </ul>

"""

page=page.replace("<!-- Index -->",index)
page=page.replace("<!-- Points -->",points)

sys.stdout=open("index.html","w")
print(page)