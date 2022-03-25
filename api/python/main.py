import requests
from bs4 import BeautifulSoup


def get_images_with_headers(query):
    params = {
        "q": query,
        "tbm": "isch",
        "content-type": "image/png",
    }

    html = requests.get("https://www.google.com/search", params=params)
    soup = BeautifulSoup(html.text, 'html.parser')

    for img in soup.select("img"):
        print(img["src"])


get_images_with_headers('pizza')
