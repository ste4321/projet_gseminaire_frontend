import pandas as pd

# Liste brute des noms (copiez ici votre liste réelle)
noms = [
    "ANDRIAMANANTENA Nambinintsoa François",
    "ANDRIAMPARANIAINA Mario",
    "RAFANOMEZANTSOA Jean Bosco",
    "HERIARISOA Ange Marien",
    "RAFANOMEZANTSOA Tojo Fitiavana Ambinintsoa Patrick",
    "RAKOTONDRANAIVO Naly Andriantsoa Luc",
    "RAKOTOVAHINY Hasina Xavier",
    "RANDRIAMANJATO Loharanosoa Santatra Hermann",
    "RANDRIAMAROLAHY Fetraniaina Ruffin",
    "RANDRIANANTENAINA Jean Claude",
    "RANDRIANARIMANGA Sidonni",
    "RASOLOFONIRINA Jean Etienne",
    "RANDRIANAVISOA Andry Michel",
    "RANJARASOA Alain",
    "RAZAFIMAHATRATRA Olivier",
    "RAZAFINTSEHENO Fanomezana Christian",
    "RANDRIAMAMINIAINA Josaphat",
    "MANANJARAMANOHISOA Domi Chatrian",
    "MIANDRITINA Roger",
    "RAFANOMEZANTSOA Stéphaélphin",
    "RAHAJANIRINA Pascal",
    "RANDRIAMANANTENASOA Lucien",
    "RANDRIAMANORINTSOA Herizoniaina Dominique Jean Claude",
    "RANDRIANAMBININA Deranasandratra Michel Candessi",
    "RANOMENJANAHARY Mamy Toussaint",
    "ANDRIAMAMONJY Miharizo Fortunat",
    "ANDRIAMAMPIANINA Lala Herman",
    "ANDRIATSILAVINA Nomenjanahary Dieu Donné",
    "RAKOTOARIMALALA Jean Chrysostome",
    "RANDRIANARISOA Jean Olivier",
    "RANDRIANANTENAINA Rijasoa Léonce",
    "RANDRIANIAINA Jean Nandrasana Théo",
    "RAKOTOARISOA Ralph",
    "RANDRIAMANDRANTO Tojosoa Jean Michel",
    "ANDRIAMANOHIFIONONANA Valimbavaka Isaia Jacob",
    "TODISOA Jean Fernand Charlot",
    "FANILOAINA Pierre Célestin",
    "LINE Naivoson Faralahy",
    "RAFANOMEZANTSOA Rolland",
    "SOLOFONIAINA Lala Vincent Will-bert",
    "RAFANOMEZANTSOA Gildas",
    "RANDRIAMAHATODY Harimbola Germain",
    "BEATREFINA Jacques Alion",
    "RATOLONJANAHARY Falimanana Jean Baptiste",
    "BEANARANA Jean Chrystola",
    "BEMANJARY Izidine",
    "RANDRIANIRINA Frédéric",
    "RAZAFINDRATSARA Ornellis Romario",
    "TOTO Sapherno",
    "TSIMANOVA Jean Assedras",
    "TSITOHAINA Jean Fridolin",
    "RAZAFINDRAMARO Jean Bertrent",
    "RANDRIANANTENAINA Sylvain",
    "RAMANANTENASOA Louis Fréderic",
    "RANDRIAMAROTIANA Joseph Simon",
    "PINGONA Matthieu Angelot",
    "MANJAKAVELO Jean Deflot",
    "RAFANOMEZANTSOA Didier Emile",
    "RASOLONDRAIBE Ralaivao Jean Baptiste",
    "RANDRIAMANANTOANINA Jean Christian",
    "RAKOTONINDRINA Fanorisoa Jean Fréderic",
    "RAFINDRAHASY Soloniaina Alexandre",
    "RANDRIANARIVELO Jonah",
    "FETRANOMENARIJAONA Louis Léonard",
    "RANDRIANANTENAINA Bertrand",
    "RAKOTOARIJAONA Tinasoa Pierre",
    "RAFALIMANANA Fanomezantsoa Fidèle",
    "RAMANANDRAISOA Andriamialison Germain",
    "RAKOTOMALALA Etienne Brillant",
    "RAKOTOMANANA Fanomezantsoa Frédéric",
    "NDRATO Nirina Jean Rolland Pierre",
    "RAMANAMPISOA Julien Clément",
    "MAHAIMANANA Thierry",
    "ANDRIAMANDAMINA Patric Roujou",
    "RANDRIAMANANTENA Tojoniaina Erick Anderson",
    "NJARA Marcel",
    "RAZAFIMAHATRATRA Basile",
    "MAHAZO MILA Benoit",
    "ANDRIANARIMALALA Mbolatiana Hasina",
    "RASOLOMALALA Léon Jules",
    "FANIRIANTSOA Solonjanahary Joelson",
    "RAZANATSIRA Rado Fabien Bernard",
    "RANDRIANANTENAINA Sebastien",
    "RANDRIAMIANTSOA Etienne Fulgence",
    "RANDRIANTSOA Émile",
    "ANJARAFAOMEZATSOA Sitrakiniaina"
]

# Fonction de génération d'email unique
def generer_email(nom, existants):
    base = (
        nom.lower()
        .replace("é", "e")
        .replace("è", "e")
        .replace("ê", "e")
        .replace("à", "a")
        .replace("â", "a")
        .replace("ô", "o")
        .replace("î", "i")
        .replace("ï", "i")
        .replace(" ", ".")
        .replace("’", "")
        .replace("'", "")
    )
    base = "".join(c for c in base if c.isalnum() or c == ".")
    email = f"{base}@gstf.com"
    compteur = 1
    while email in existants:
        email = f"{base}{compteur}@gstf.com"
        compteur += 1
    existants.add(email)
    return email

# Générer les emails
emails_existants = set()
donnees = []
for nom in noms:
    email = generer_email(nom, emails_existants)
    donnees.append({"nom_prenom": nom, "email": email})

# Création du DataFrame
df = pd.DataFrame(donnees)

# Exporter au format Excel
df.to_excel("etudiants_email.xlsx", index=False)

print("✅ Fichier 'etudiants_email.xlsx' généré avec succès.")
