import json
import requests
import os


PEXELS_API_KEY = os.environ["PEXELS_API_KEY"]

def get_photo(manufacturer, name):
    headers = {"Authorization": PEXELS_API_KEY}
    params = {
        "per_page": 1,
        "query": f"{manufacturer.name} {name}",
    }
    url = "https://api.pexels.com/v1/search"
    response = requests.get(url, params=params, headers=headers)
    content = json.loads(response.content)
    print("CONTENT", content)
    print("PARAMS",params)
    print("MFGGGGGGGGGG",manufacturer.name)
    print("NAME",name)
    try:
        return {"picture_url": content["photos"][0]["src"]["original"]}
    except (KeyError, IndexError):
        return {"picture_url": None}
