import requests
from publicador import RabbitmqPublisher
#Código para consumir api e mandar para a exchange

lat = -19.9241
lon = -43.9348
response = requests.get(f'https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,rain,snowfall,snow_depth,visibility,wind_speed_10m,uv_index,is_day&forecast_days=1').json()

rabbitmq_publisher = RabbitmqPublisher()
rabbitmq_publisher.send_message(response)