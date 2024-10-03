from flask import Flask, jsonify, request
from flask_cors import CORS
import random
import datetime
import json
import mysql.connector

# Initialize Flask App
app = Flask(__name__)

# Configure CORS
CORS(app, resources={r"/api/*": {"origins": ["http://localhost:5175", "http://localhost:8080"]}})

# Database connection
def get_db_connection():
    return mysql.connector.connect(
        host='localhost',
        user='your_username',  # Replace with your actual DB username
        password='your_password',  # Replace with your actual DB password
        database='your_database'  # Replace with your actual DB name
    )

# Helper Functions

# Generate Fake CPR
def generate_fake_cpr(gender=None, dob=None):
    if dob:
        date_part = dob.strftime('%d%m%y')
    else:
        start_date = datetime.date(1900, 1, 1)
        end_date = datetime.date.today()
        dob = start_date + datetime.timedelta(days=random.randint(0, (end_date - start_date).days))
        date_part = dob.strftime('%d%m%y')

    sequence_number = random.randint(0, 9999)
    sequence_str = f'{sequence_number:04}'
    last_digit = int(sequence_str[-1])
    
    if gender == 'M' and last_digit % 2 == 0:
        sequence_number += 1
    elif gender == 'F' and last_digit % 2 != 0:
        sequence_number += 1
    
    sequence_str = f'{sequence_number % 10000:04}'
    cpr = f'{date_part}{sequence_str}'
    return cpr, dob

# Generate Fake Name
def generate_fake_name():
    with open('person-names.json', 'r', encoding='utf-8') as f:
        names_data = json.load(f)
    person = random.choice(names_data)
    return {
        'first_name': person['first_name'],
        'last_name': person['last_name'],
        'gender': person['gender']
    }

# Generate Name with Date of Birth
def generate_fake_name_with_dob():
    name_info = generate_fake_name()
    dob = generate_random_dob()
    name_info['date_of_birth'] = dob.strftime('%Y-%m-%d')
    return name_info

# Generate CPR, Name, and Gender
def generate_fake_cpr_name():
    name_info = generate_fake_name()
    cpr, dob = generate_fake_cpr(gender=name_info['gender'])
    return {
        'cpr': cpr,
        'first_name': name_info['first_name'],
        'last_name': name_info['last_name'],
        'gender': name_info['gender']
    }

# Generate Full Identity Data
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

# Generate Random Date of Birth
def generate_random_dob():
    start_date = datetime.date(1900, 1, 1)
    end_date = datetime.date.today()
    return start_date + datetime.timedelta(days=random.randint(0, (end_date - start_date).days))

# Generate Fake Address
def generate_fake_address():
    street = ''.join(random.choices('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', k=random.randint(5, 15)))
    number = f"{random.randint(1, 999)}{random.choice(['', chr(random.randint(65, 90))])}"
    floor = random.choice(['st'] + [str(i) for i in range(1, 100)])
    door_options = ['th', 'mf', 'tv'] + [str(i) for i in range(1, 51)] + [f"{chr(random.randint(97, 122))}{random.randint(1, 99)}", f"{chr(random.randint(97, 122))}-{random.randint(1, 999)}"]
    door = random.choice(door_options)

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT postnr, postnavn FROM postnumre ORDER BY RAND() LIMIT 1")
    result = cursor.fetchone()
    conn.close()
    postal_code, town = result

    return {
        'street': street,
        'number': number,
        'floor': floor,
        'door': door,
        'postal_code': postal_code,
        'town': town
    }

# Generate Fake Mobile Phone Number
def generate_fake_phone_number():
    valid_prefixes = ['2', '30', '31', '40', '41', '42', '50', '51', '52', '53', '60', '61', '71', '81', '91', '92', '93', '342'] + \
                     [str(i) for i in range(344, 350)] + \
                     ['356', '357', '359', '362'] + \
                     [str(i) for i in range(365, 367)] + \
                     ['389', '398', '431', '441', '462', '466', '468', '472', '474', '476', '478'] + \
                     [str(i) for i in range(485, 487)] + \
                     [str(i) for i in range(488, 490)] + \
                     [str(i) for i in range(493, 497)] + \
                     [str(i) for i in range(498, 500)] + \
                     ['542', '543', '545', '551', '552', '556'] + \
                     [str(i) for i in range(571, 575)] + \
                     ['577', '579', '584'] + \
                     [str(i) for i in range(586, 588)] + \
                     ['589'] + \
                     [str(i) for i in range(597, 599)] + \
                     ['627', '629', '641', '649', '658'] + \
                     [str(i) for i in range(662, 666)] + \
                     ['667'] + \
                     [str(i) for i in range(692, 695)] + \
                     ['697'] + \
                     [str(i) for i in range(771, 773)] + \
                     [str(i) for i in range(782, 784)] + \
                     [str(i) for i in range(785, 787)] + \
                     [str(i) for i in range(788, 790)] + \
                     ['826', '827', '829']

    prefix = random.choice(valid_prefixes)
    remaining_digits = 8 - len(prefix)
    number = f"{prefix}{''.join([str(random.randint(0, 9)) for _ in range(remaining_digits)])}"
    return number

# Generate Full Person Data
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

# Flask API Endpoints

@app.route('/api/cpr', methods=['GET'])
def api_generate_cpr():
    gender = request.args.get('gender')
    cpr, _ = generate_fake_cpr(gender=gender)
    return jsonify({'cpr': cpr})

@app.route('/api/person', methods=['GET'])
def api_generate_person():
    person = generate_full_person_data()
    return jsonify(person)

# Run the Flask App
if __name__ == '__main__':
    app.run(debug=True)
