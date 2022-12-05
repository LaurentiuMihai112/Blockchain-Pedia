import random
import time

import requests as requests

SORT_AND_FILTERS_KEYS = [
    ('marketCap', 0, 100000000),
    ('marketCap', 100000000, 300000000),
    ('marketCap', 300000000, 500000000),
    ('marketCap', 500000000, 1000000000),
    ('marketCap', 1000000000, None),
    ('powerConsumption', 0, 1000),
    ('powerConsumption', 1000, 2000),
    ('powerConsumption', 2000, 3000),
    ('powerConsumption', 3000, 5000),
    ('powerConsumption', 5000, None),
    ('pricePerTransaction', 0, 100000000),
    ('pricePerTransaction', 100000000, 200000000),
    ('pricePerTransaction', 200000000, 300000000),
    ('pricePerTransaction', 300000000, 4000000000),
    ('pricePerTransaction', 400000000, 5000000000),
    ('pricePerTransaction', 500000000, 10000000000),
    ('pricePerTransaction', 1000000000, None),
    ('transactionCount', 0, 100000000),
    ('transactionCount', 100000000, 200000000),
    ('transactionCount', 200000000, 300000000),
    ('transactionCount', 300000000, 4000000000),
    ('transactionCount', 400000000, 5000000000),
    ('transactionCount', 500000000, 10000000000),
    ('transactionCount', 1000000000, None),
]
orders = ['asc', 'desc']


def main():
    for i in range(1000):
        order = orders[i % 2]
        index = random.randint(0, len(SORT_AND_FILTERS_KEYS) - 1)
        filter_key = SORT_AND_FILTERS_KEYS[index][0]
        sort_key = SORT_AND_FILTERS_KEYS[index][0]
        min_val = SORT_AND_FILTERS_KEYS[index][1]
        max_val = SORT_AND_FILTERS_KEYS[index][2]
        x = requests.get(
            f'http://127.0.0.1:8000/blockchains?order={order}&filter={filter_key}&min={min_val}&max={max_val}&sort={sort_key}')
        time.sleep(1)
        print(x)


if __name__ == '__main__':
    main()
