from flask import Flask, render_template
from mongoengine import *
import csv
import os

app = Flask(__name__)
app.config.from_object('config')
connect()

countries = {}
class Country(Document):
    name = StringField()

@app.route('/')
@app.route('/index')
@app.route('/home')
def index():
    myName = 'Isaac'
    title = 'Home'
    return render_template('index.html', name=myName, title=title), 200

@app.route('/inspiration')
def inspiration():
    title = 'Inspiration'
    return render_template('inspiration.html', inspiration=inspiration, title=title), 200

@app.route('/loadData')
def loadData():
    return 'Success', 200

@app.route('/countries', methods=['GET'])
@app.route('/countries/<country_name>', methods=['GET'])
def getCountries(country_name=None):
    country_ = Country(name='New Zealand')
    country_.save()
    # for file in os.listdir(app.config['FILES_FOLDER']):
    #     filename = os.fsdecode(file)
    #     path = os.path.join(app.config['FILES_FOLDER'],filename)
    #     f = open(path)
    #     r = csv.reader(f)
    #     d = list(r)
    #     for data in d:
    #         print(data)
    return 'test', 200


@app.route('/countries/<country_name>', methods=['PUT', 'DELETE'])
def updateCountry(country_name):
    if self.checkCountryExists(country_name) is True:
        if request.method is 'PUT': # Check request method
            return 'Country updated', 200
        return 'Country deleted', 200 # Not PUT, so is DELETE
    return 'Country not found', 404

@app.route('/countries/new', methods=['POST'])
def addCountry():
    # country = request.form.get('country') # Get form data, then obtain country_id to check if country already exists before creating it
    # self.checkCountryExists()
    # return 'Country already exists'
    country_ = Country(name='New Zealand')
    country_.save()
    return 'Country added', 200

def checkCountryExists(c):
    # Loop through countries and check if c_id is present in any country name
    return any(Country.name is c for c in Country.objects)

if __name__ =="__main__":
    app.run(debug=True, host='0.0.0.0', port=8080)
