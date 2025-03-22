from flask import Flask, jsonify
from flask_cors import CORS
from faker import Faker
import random
import os

app = Flask(__name__)
CORS(app)
fake = Faker()

# Liste d'universités réalistes
universities = [
    "Harvard University", "Stanford University", "MIT",
    "University of California, Berkeley", "Oxford University",
    "Cambridge University", "Princeton University", "Yale University"
]

@app.route('/generate', methods=['GET'])
def generate_identity():
    try:
        identity = {
            "full_name": fake.name(),
            "address": fake.address().replace("\n", ", "),
            "email": fake.email(),
            "phone": fake.phone_number(),
            "birthdate": fake.date_of_birth(minimum_age=18, maximum_age=90).strftime("%Y-%m-%d"),
            "social_security_number": fake.ssn(),
            "credit_card_number": fake.credit_card_number(card_type="visa"),
            "credit_card_expiry": fake.credit_card_expire(),
            "credit_card_cvv": random.randint(100, 999),
            "job": fake.job(),
            "company": fake.company(),
            "education": random.choice(universities),
            "profile_picture": f"https://api.multiavatar.com/{fake.first_name()}.png",
            "signature": f"https://dummyimage.com/200x100/000/fff&text={fake.first_name()}",
            "social_media": {
                "twitter": f"https://twitter.com/{fake.user_name()}",
                "facebook": f"https://facebook.com/{fake.user_name()}",
                "instagram": f"https://instagram.com/{fake.user_name()}"
            },
            "password": fake.password(length=12),
            "bank_statement": f"IBAN: {fake.iban()} - Bank: {fake.company()} Bank"
        }
        return jsonify(identity)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    # Récupère le port depuis la variable d'environnement ou utilise 5000 par défaut
    port = int(os.environ.get("PORT", 5000))
    # Lance l'application en écoutant sur toutes les interfaces réseau (0.0.0.0)
    app.run(debug=True, host="0.0.0.0", port=port)
