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
    data = DictField()

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
    # country_ = Country(name='New Zealand')
    # country_.save()
    # for file in os.listdir(app.config['FILES_FOLDER']):
    #     filename = os.fsdecode(file)
    #     path = os.path.join(app.config['FILES_FOLDER'],filename)
    #     f = open(path)
    #     r = csv.reader(f)
    #     d = list(r)
    #     for data in d:
    #         print(data)
    for file in os.listdir(app.config['FILES_FOLDER']):
        filename = os.fsdecode(file)
        path = os.path.join(app.config['FILES_FOLDER'],filename)
        f = open(path)
        r = csv.DictReader(f) 
        d = list(r)
        for data in d:
            country = Country() # a blank placeholder country
            dict = {} # a blank placeholder data dict
            print(data)
            for key in data: # iterate through the header keys
                if key == "country":
                    # check if this country already exists in the db
                    if not checkCountryExists(country):
                        country.name = data[key] # if the country does not exist, we can use the new blank country we created above, and set the name
                    else: 
                        # country = Country.objects.
                        country = Country.query.filter_by(name=data[key]).first()
                        dict = country.data
                    # if the country already exists, replace the blank country with the existing country from the db, and replace the blank dict with the current country's 
                    # data                
                else:
                    f = filename.replace(".csv","") # we want to trim off the ".csv" as we can't save anything with a "." as a mongodb field name
                    if f in dict: # check if this filename is already a field in the dict
                        dict[f][key] = data[key] # if it is, just add a new subfield which is key : data[key] (value)
                    else:
                        dict[f] = {key:data[key]} # if it is not, create a new object and assign it to the dict

                # add the data dict to the country
                country.data = dict
            # save the country
            country.save()
    return 'test', 200


@app.route('/countries/<country_name>', methods=['PUT', 'DELETE'])
def updateCountry(country_name):
    if checkCountryExists(country_name) is True:
        if request.method is 'PUT': # Check request method
            return 'Country updated', 200
        return 'Country deleted', 200 # Not PUT, so is DELETE
    return 'Country not found', 404

@app.route('/countries/new', methods=['POST'])
def addCountry():
    # country = request.form.get('country') # Get form data, then obtain country_id to check if country already exists before creating it
    # self.checkCountryExists()
    # return 'Country already exists', 404
    country_ = Country(name='New Zealand')
    country_.save()
    return 'Country added', 200

@app.route('/test')
def showTest():
    title = 'Test'
    return render_template('test.html', title=title), 200

def checkCountryExists(c):
    # Loop through countries and check if name is present in any country name
    return any(Country.name is c for c in Country.objects)

if __name__ =="__main__":
    app.run(debug=True, host='0.0.0.0', port=8080)
