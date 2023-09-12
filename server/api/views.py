import random
from django.shortcuts import render
from django.http import HttpResponse
import json
from datetime import datetime, timedelta

from bs4 import BeautifulSoup
import requests

# Create your views here.


def main(req):
    url = "http://www.allocine.fr/"
    r = requests.get(url)
    print(url, r.status_code)
    soup = BeautifulSoup(r.content, "html")
    links = []
    for elem in soup.find_all("a", attrs={"class": "meta-title meta-title-link"}):
        links.append(elem.get("href"))
    movie_links = ["http://www.allocine.fr" +
                   elem for elem in links if "film" in elem]

    title = []
    synopsis = []
    image = []
    for elem in movie_links:
        movie_r = requests.get(elem)
        content = BeautifulSoup(movie_r.content, "html")

        for movie in content.find_all("div", attrs={"class": "titlebar-title titlebar-title-lg"}):
            # Just like that
            title.append(movie.text)

        # Get the synopsis section
        for movie in content.find_all("section", attrs={"id": "synopsis-details"}):
            # Get the text of the synopsis
            for elem2 in movie.find_all("div", attrs={"class": "content-txt"}):
                # Just like that
                synopsis.append(elem2.text)

        images = content.find_all("img", attrs={"class": "thumbnail-img"})
        image.append(images[0].get('src'))

    return HttpResponse(json.dumps({'title': title, 'synopsis': synopsis, 'image': image, 'links': movie_links, 'data': 'here is my new data'}), content_type="application/json")


def data(req):
    date = []
    data = []
    for i in range(0, 7):
        day = datetime.now() - timedelta(days=i)
        date.append(day.strftime('%d/%m/%Y'))
        data.append(random.randint(10 * i, 100 * i))
    return HttpResponse(json.dumps({'data': data, 'date': date, }), content_type="application/json")
