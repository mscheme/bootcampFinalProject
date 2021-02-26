import psycopg2


con = psycopg2.connect(
    host = "aws-gt-dataviz-finalpg-001.cloqvwuqbywl.us-east-1.rds.amazonaws.com",
    database = "spotify_db",
    user = "postgres",
    password = "postgres",
)

cur = con.cursor()
cur.execute("select artists, name, year, popularity, valence, energy from tracks limit 20")

rows = cur.fetchall()
data = []
for x in rows:
    data.append({
        "artist_name": x[0],
        "song_name": x[1],
        "year": x[2],
        "popularity": x[3],
        "mood" : x[4],
        "energy": x[5]
    })

cur.close

# close the connection
con.close()