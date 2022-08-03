# import json
# import requests
# import os

# from .models import AutomobileVO




# PEXELS_API_KEY = os.environ["PEXELS_API_KEY"]

# def get_photo():
#     headers = {"Authorization": PEXELS_API_KEY}
#     automobile = AutomobileVO.objects.all()
#     params = {
#         "per_page": 1,
#         "query": f"{automobile.model.manufacturer} {automobile.model} ",
#     }
#     url = "https://api.pexels.com/v1/search"
#     response = requests.get(url, params=params, headers=headers)
#     content = json.loads(response.content)
#     try:
#         return {"picture_url": content["photos"][0]["src"]["original"]}
#     except (KeyError, IndexError):
#         return {"picture_url": None}
