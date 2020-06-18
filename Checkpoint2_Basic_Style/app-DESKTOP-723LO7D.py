from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
@app.route('/index')
@app.route('/home')
def index():
    myName = 'Isaac'
    title = 'Home'
    return render_template('index.html', name=myName, title=title)

@app.route('/inspiration')
def inspiration():
    title = 'Inspiration'
    return render_template('inspiration.html', inspiration=inspiration)

@app.route('/loadData')
def loadData():
    return 'Success'

if __name__ =="__main__":
    app.run(debug=True)
