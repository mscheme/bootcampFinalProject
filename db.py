import psycopg2


con = psycopg2.connect(
    host = "aws-gt-dataviz-finalpg-001.cloqvwuqbywl.us-east-1.rds.amazonaws.com",
    database = "spotify_db",
    user = "postgres",
    password = "postgres",
)

cur = con.cursor()
cur.execute("select artists, name, year, popularity, valence, energy, cluster_label from tracks_wcluster")

rows = cur.fetchall()
data = []
for x in rows:
    data.append({
        "artist_name": x[0],
        "song_name": x[1],
        "year": x[2],
        "popularity": x[3],
        "mood" : x[4],
        "energy": x[5],
        "cluster_label": x[6]
    })

cur.close

# close the connection
con.close()