from flask import Flask

app = Flask(__name__)

@app.route('/testlogout')
def testlogout():
    return "Logout route works!"

if __name__ == '__main__':
    app.run()