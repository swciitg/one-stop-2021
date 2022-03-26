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

    imgList = []
    for img in soup.select("img"):
        imgList.append(img["src"])
    imgList.pop(0)

    return imgList


# Sample use case of the function
# imgList = get_images_with_headers('Pizza')
# print(imgList)
