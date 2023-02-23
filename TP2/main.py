#Objetivo: Desmembrar o ficheiro xml, criando um ficheiro para cada membro

from bs4 import BeautifulSoup
import lxml
import os

def elemRefToHtml(elem, i):
    identi=elem.find('identi').text.strip()
    return f"""
        <li>
            <a href="/{str(i)}"> {identi} </a>
        </li>"""

#Abrir o ficheiro xml
with open('arq.xml', 'r') as ficheiro:
    soup = BeautifulSoup(ficheiro,"lxml")
    
    #Criar uma lista com todos os elementos 'arqelem'
    lista = soup.find_all('arqelem')

    #Criar uma pasta para os ficheiros
    if(not os.path.exists('arqs')):
        os.mkdir('arqs')

    lista.sort(key=lambda x: x.find('identi').text.strip())
    #Para cada elemento da lista, criar um ficheiro com o seu conteudo
    for i in range(len(lista)):
        with open('arqs/arq' + str(i+1) + '.xml', 'w') as ficheiro:
            ficheiro.write(str(lista[i]))

    #Fazer o index.html
    with open('index.html', 'w') as ficheiro:
        page="""<!DOCTYPE html>
<html>
    <head>
        <title>Sítios Arqueológicos</title>
        <meta charset="utf-8"/>
    </head>
    <body style="background-color:#f2f2eb">
        <h1>Sítios Arqueológicos</h1>
        <h2>Elementos</h2>
        <table>
            <tr>
                <td>
                    <ul>"""
        
        for i, elem in enumerate(lista):
            page += elemRefToHtml(elem, i+1)

        page += """
                    </ul>
                </td>
            </tr>
        </table>
    </body>
</html>"""
        ficheiro.write(page)
