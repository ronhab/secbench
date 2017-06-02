from flask import Flask, render_template, jsonify, request, url_for
from secbench_info import *

app = Flask(__name__)

@app.route('/benchmark/class',  methods=['GET'])
def vulns_by_class():
    return jsonify(get_vulns_by_class3());

@app.route('/benchmark/languages',  methods=['GET'])
def languages_commits():
    return jsonify(get_lang());

@app.route('/benchmark/lang',  methods=['GET'])
def vulns_by_lang():
    return jsonify(get_vulns_by_lang());

@app.route('/correlation/size',  methods=['GET'])
def commits_vulns():
    return jsonify(get_commits_vulns());

@app.route('/correlation/time',  methods=['GET'])
def time_vulns():
    return jsonify(get_commits_years_dev());

@app.route('/benchmark/year',  methods=['GET'])
def vulns_by_year():
    return jsonify(get_vulns_by_year());

@app.route('/benchmark/mined',  methods=['GET'])
def mined_projs():
    return jsonify(get_no_mined_projects());

@app.route('/benchmark/vulns',  methods=['GET'])
def no_vulns():
    return jsonify(get_no_vulns_from_mined_repos());

@app.route('/benchmark/vulnsmined',  methods=['GET'])
def vulns_mined():
    return jsonify(get_vulns_by_class_mined());

@app.route('/')
def index():
    return render_template('index2.html');

@app.route('/benchmark')
def benchmark():
        return render_template('benchmark.html');

@app.route('/correlation')
def correlation():
        return render_template('correlation.html');

@app.route('/results')
def results():
    return render_template('results.html');


if __name__ == '__main__':
    app.run(host='0.0.0.0',port=5000,debug=True)
