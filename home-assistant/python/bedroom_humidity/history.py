import numpy as np
import pandas as pd
import matplotlib.pyplot as plt


# Load the data
temperature = pd.read_csv(
    "./temperature.csv", 
    usecols=["temperature", "last_changed"],
    parse_dates=True,
    index_col="last_changed"
)
humidity = pd.read_csv(
    "./humidity.csv", 
    usecols=["humidity", "last_changed"],
    parse_dates=True,
    index_col="last_changed"
)

# Resample temperature data to minute frequency (mean)
temperature_resampled = temperature.resample('1h').mean()
humidity_resampled = humidity.resample('1h').mean()

print(temperature_resampled)

# Merge the two DataFrames on the timestamp index
data = humidity_resampled.merge(temperature_resampled, how = "inner", on = "last_changed")
data = data[2:]
data.fillna(method='ffill', inplace=True)

print(data.index)

correlation = data['temperature'].corr(data['humidity'])
print(f"Korrelasjonskoeffisienten mellom temperatur og luftfuktighet er: {correlation:.2f}")

print(f"Gjennomsnittlig luftfoktighet: {np.average(data["humidity"])}")


fig, ax1 = plt.subplots(figsize=(12, 6))

ax1.set_xlabel('Date')
ax1.set_ylabel('Temperature (°C)', color='tab:red')
ax1.plot(data.index, data['temperature'], color='tab:red', label='Temperature')
ax1.tick_params(axis='y', labelcolor='tab:red')

ax2 = ax1.twinx()  
ax2.set_ylabel('Humidity (%)', color='tab:blue')  
ax2.plot(data.index, data['humidity'], color='tab:blue', label='Humidity')
ax2.tick_params(axis='y', labelcolor='tab:blue')

# Adding a vertical line at 2024-12-08 22:00
ax1.axvline(pd.Timestamp('2024-12-08 20:00'), color='green', linestyle='--', label='Event Time')

plt.title('Temperature and Humidity Over Time')
ax1.grid()

plt.show()
