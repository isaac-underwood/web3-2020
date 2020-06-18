from flask import Flask, render_template
from mongoengine import *
from pymongo import MongoClient
import csv
import os
from flask_cors import CORS
from werkzeug.exceptions import HTTPException, InternalServerError

app = Flask(__name__)
CORS(app)
app.config.from_object('config')
connect()  # Connect to database

countries = {}


# The Country document defines a Country collection to hold a list of
# their names and data from Gapminder
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
    for file in os.listdir(app.config['FILES_FOLDER']):
        filename = os.fsdecode(file)
        path = os.path.join(app.config['FILES_FOLDER'],filename)
        f = open(path)
        r = csv.DictReader(f)
        d = list(r)
        for data in d:
            country_ = Country() # a blank placeholder country
            dict = {} # a blank placeholder data dict
            for key in data: # iterate through the header keys
                if key == "country":
                    # check if this country already exists in the db
                    if not Country.objects(name=data[key]).count():
                        country_.name = data[key] # if the country does not exist, we can use the new blank country we created above, and set the name
                    else: 
                        country_ = Country.objects(name=data[key]).first()
                        dict = country_.data
                    # if the country already exists, replace the blank country with the existing country from the db, and replace the blank dict with the current country's 
                    # data      
                else:
                    f = filename.replace(".csv","") # we want to trim off the ".csv" as we can't save anything with a "." as a mongodb field name
                    if f in dict: # check if this filename is already a field in the dict
                        dict[f][key] = data[key] # if it is, just add a new subfield which is key : data[key] (value)
                    else:
                        dict[f] = {key:data[key]} # if it is not, create a new object and assign it to the dict
                # add the data dict to the country
                country_.data = dict
            # save the country
            country_.save()
    return 'Success', 200


# Gets all country objects or a specified country object and returns them
@app.route('/countries', methods=['GET'])
@app.route('/countries/<country_name>', methods=['GET'])
def getCountries(country_name=None):
    # If no country_name is specified, return all country objects
    if country_name is None:
        return Country.objects.to_json(), 200
    # country_name was passed in, get and return individual country
    else:
        # Use first_or_404 to raise a 404 if country object
        # with given name doesn't exist
        c = Country.objects.get(name=country_name)
        return c.to_json(), 200


# Updates a given country's data, must supply a country_name and the new data
@app.route('/countries/update/<country_name>/<new_data>', methods=['PUT'])
def updateCountry(country_name, new_data):
    # Get the country object with given name
    country_ = Country.objects.get(name=country_name)
    # Update the country's data
    country_.data = new_data
    return 'Successfully updated ' + country_name, 200


# Finds country object by its name and deletes it from country table
@app.route('/countries/delete/<country_name>', methods=['DELETE'])
def deleteCountry(country_name):
    country_ = Country.objects.get(name=country_name)
    country_.delete()
    print(country_name + ' was deleted from the database.')
    return 'Country deleted', 200


@app.route('/test')
def showTest():
    title = 'Test'
    return render_template('test.html', title=title), 200


# Handle any 500 Server Errors
@app.errorhandler(InternalServerError)
def handle_500(e):
    return '500 Internal Server Error', 500


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=8080)
