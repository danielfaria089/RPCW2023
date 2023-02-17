import json
import sys

def ordCidade(c):
    return c['nome']

f = open("mapa.json")
data = json.load(f)
cidades = data['cidades']
cidades.sort(key=ordCidade)
ligacoes= data['ligações']

idToCity= {c['id']:c['nome'] for c in cidades}

page= """
<!DOCTYPE html>
<html>
    <head>
        <title>Mapa Virtual</title>
        <meta charset="utf-8"/>
    </head>
    <body>
        <h1>Mapa Virtual</h1>
        <table>
            <tr>
                <td width="30%" valign="top">
                    <h3>Índice</h3>
                    <a name="indice"/>
                    <!-- Lista com o índice -->
                </td>
                <td width="70%">
                    <!-- Lista das infos das cidades -->
                </td>
            </tr>
        </table>
    </body>
</html>
"""

def geraIndice(c):
    return f"""
                        <li>
                            <a href="#{c['id']}">{c['nome']}</a> 
                        </li>"""

def geraCidadeInfo(c):
    #Se for destino ou origem de alguma ligação, gera uma lista com os pares e a distância
    ligacoesCidade= [l for l in ligacoes if l['origem'] == c['id'] or l['destino'] == c['id']]

    ligacoesTuplos=[]

    for l in ligacoesCidade:
        if c["id"]!=l["origem"]:
            ligacoesTuplos.append((l["origem"],l["distância"]))
        else:
            ligacoesTuplos.append((l["destino"],l["distância"]))

    ligacoesTuplos.sort(key=lambda x: idToCity[x[0]])

    ligacoesCidadeInfo=""

    for l in ligacoesTuplos:
        ligacoesCidadeInfo+=f"""
                        <li><a href="#{l[0]}">{idToCity[l[0]]}</a>: {l[1]} KM</li>
        """
            

    return f"""
                    <a name="{c['id']}"/>
                    <h3>{c['nome']}</h3>
                    <p><b>população:</b> {c['população']}</p>
                    <p><b>descrição:</b> {c['descrição']}</p>
                    <p><b>distrito:</b> {c['distrito']}</p>
                    <p><b>Ligações:</b>
                    <ul>
                    {ligacoesCidadeInfo}
                    </ul>
                    </p>
                    <address>[<a href="#indice">Voltar ao índice</a>]</address>
                    <center>
                        <hr width="80%"/>
                    </center>
    """

indice = "".join([geraIndice(c) for c in cidades])
indice = f"""<ul>
                        {indice}
                    </ul>"""

cidadesInfo = "".join([geraCidadeInfo(c) for c in cidades])
cidadesInfo = f"""<ul>
                        {cidadesInfo}
                    </ul>"""

page = page.replace("<!-- Lista com o índice -->", indice)
page = page.replace("<!-- Lista das infos das cidades -->", cidadesInfo)

sys.stdout = open('mapa.html', 'w')

print(page)