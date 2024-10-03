from flask import Flask, jsonify, request
from flask_cors import CORS
import random
import datetime
import json

# Create a new Flask application instance
app = Flask(__name__)

# Configure CORS to allow specific origin
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})

# Sample data for postal codes and towns
postal_codes_and_towns = [
    ('1000', 'Copenhagen'),
    ('2000', 'Frederiksberg'),
    # Add more sample postal codes and towns as needed
]

# Function Definitions

def generate_fake_cpr(gender=None, dob=None):
    if dob:
        date_part = dob.strftime('%d%m%y')
    else:
        start_date = datetime.date(1900, 1, 1)
        end_date = datetime.date.today()
        dob = start_date + datetime.timedelta(days=random.randint(0, (end_date - start_date).days))
        date_part = dob.strftime('%d%m%y')

    while True:
        sequence_number = random.randint(0, 9999)
        sequence_str = f'{sequence_number:04}'
        last_digit = int(sequence_str[-1])

        if gender == 'M' and last_digit % 2 != 0:
            break  # Male and last digit is odd
        elif gender == 'F' and last_digit % 2 == 0:
            break  # Female and last digit is even
        elif gender is None:
            break  # No gender specified

    cpr = f'{date_part}{sequence_str}'
    return cpr, dob

def generate_fake_name():
    # If person-names.json exists, load from file; else use sample data
    try:
        with open('person-names.json', 'r', encoding='utf-8') as f:
            names_data_local = json.load(f)
    except FileNotFoundError:
        # Use sample data
        names_data_local = [
            {'first_name': 'John', 'last_name': 'Smith', 'gender': 'M'},
            {'first_name': 'Jane', 'last_name': 'Doe', 'gender': 'F'},
            # Add more sample names as needed
        ]
    person = random.choice(names_data_local)
    return {
        'first_name': person['first_name'],
        'last_name': person['last_name'],
        'gender': person['gender']
    }

def generate_random_dob():
    start_date = datetime.date(1900, 1, 1)
    end_date = datetime.date.today()
    return start_date + datetime.timedelta(days=random.randint(0, (end_date - start_date).days))

def generate_full_identity_data():
    name_info = generate_fake_name()
    cpr, dob = generate_fake_cpr(gender=name_info['gender'])
    return {
        'cpr': cpr,
        'first_name': name_info['first_name'],
        'last_name': name_info['last_name'],
        'gender': name_info['gender'],
        'date_of_birth': dob.strftime('%Y-%m-%d')
    }

def generate_fake_address():
    street = ''.join(random.choices('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', k=random.randint(5, 15)))
    number = f"{random.randint(1, 999)}{random.choice(['', chr(random.randint(65, 90))])}"
    floor = random.choice(['st'] + [str(i) for i in range(1, 100)])
    door_options = ['th', 'mf', 'tv'] + [str(i) for i in range(1, 51)] + [
        f"{chr(random.randint(97, 122))}{random.randint(1, 99)}",
        f"{chr(random.randint(97, 122))}-{random.randint(1, 999)}"
    ]
    door = random.choice(door_options)

    # Select a random postal code and town from sample data
    postal_code, town = random.choice(postal_codes_and_towns)

    return {
        'street': street,
        'number': number,
        'floor': floor,
        'door': door,
        'postal_code': postal_code,
        'town': town
    }

def generate_fake_phone_number():
    valid_prefixes = ['2', '30', '31', '40', '41', '42', '50', '51', '52', '53', '60', '61', '71', '81', '91', '92', '93'] + \
                     [str(i) for i in range(344, 350)] + ['356', '357', '359', '362'] + \
                     [str(i) for i in range(365, 367)] + ['389', '398']
    prefix = random.choice(valid_prefixes)
    remaining_digits = 8 - len(prefix)
    number = f"{prefix}{''.join([str(random.randint(0, 9)) for _ in range(remaining_digits)])}"
    return number

def generate_full_person_data():
    identity = generate_full_identity_data()
    address = generate_fake_address()
    phone_number = generate_fake_phone_number()
    person_data = {
        **identity,
        'address': address,
        'phone_number': phone_number
    }
    return person_data

# Route Definitions

@app.route('/api/cpr', methods=['GET'])
def api_generate_cpr():
    gender = request.args.get('gender')
    cpr, _ = generate_fake_cpr(gender=gender)
    return jsonify({'cpr': cpr})

@app.route('/api/person', methods=['GET'])
def api_generate_person():
    person = generate_full_person_data()
    return jsonify(person)

@app.route('/api/persons/<int:count>', methods=['GET'])
def api_generate_persons_bulk(count):
    if count < 2 or count > 100:
        return jsonify({'error': 'Count must be between 2 and 100'}), 400
    persons = [generate_full_person_data() for _ in range(count)]
    return jsonify(persons)

# Run the Flask App
if __name__ == '__main__':
    app.run(debug=True)
