from connect import connect_to_db

def get_vulns_by_class():
    r = connect_to_db('redis.json');
    pip = r.pipeline()
    pip.lrange('vulns_class', 0, -1)
    vulns = pip.execute()
    Z=0;
    for vuln in vulns[0]:
        pip = r.pipeline()
        pip.keys(pattern='commit:*:*:%s'%vuln)
        commit = pip.execute()
        Y = 0;
        for c in commit[0]:
            cm_info = c.split(':')
            pip = r.pipeline()
            pip.hget(c,'vuln?')
            pip.hget('repo:%s:%s:n'%(cm_info[1], cm_info[2]), 'mined')
            cm = pip.execute()
            if(cm[0]=='Y' and cm[0] =='Y'):
                Y+=1;
                Z+=1;

        RESULTS['benchmark'].append({
            'class': vuln,
            'no': Y
        })
    #print(RESULTS)
    return RESULTS


def get_vulns_by_class3():
    r = connect_to_db('redis.json');
    pip = r.pipeline()
    pip.lrange('vulns_class', 0, -1)
    vulns = pip.execute()
    RESULTS = {'benchmark':[]}
    rest = {};
    for vuln in vulns[0]:
        pip = r.pipeline()
        pip.keys(pattern='commit:*:*:%s'%vuln)
        commit = pip.execute()

        if vuln not in rest.keys():
            rest[vuln] = 0;

        for c in commit[0]:
            cm_info = c.split(':')
            pip = r.pipeline()
            pip.hget(c,'vuln?')
            pip.hget(c,'change_to')
            pip.hget('repo:%s:%s:n'%(cm_info[1], cm_info[2]), 'mined')
            cm = pip.execute()

            # if change_to is not empty and the class belongs to the ones in the db (except CVE) and were already choosen
            if(cm[1] is not None and cm[1] in vulns[0] and cm[0] == 'Y' and cm[2] == 'Y'):
                if cm[1] not in rest:
                    rest[cm[1]] = 0;
                rest[cm[1]] +=1;
            elif(cm[0]=='Y' and cm[2] == 'Y'):
                rest[vuln] += 1;

    rest['sde'] += rest['sha1']
    del rest['sha1']

    order = ['injec', 'auth', 'xss', 'bac', 'smis', 'sde', 'iap', 'csrf', 'ucwkv', 'upapi', 'ml', 'cl', 'rl', 'over', 'pathtrav', 'dos', 'misc']

    for k in order:
        RESULTS['benchmark'].append({
            'class': k,
            'no': rest[k]
        })
    return RESULTS

def get_vulns_by_class_mined():
    r = connect_to_db('redis.json');
    vuln_class = ['misc', 'sde', 'iap', 'ucwkv', 'upapi', 'over', 'smis', 'bac', 'sha1', 'xss', 'pathtrav', 'rl', 'ml', 'auth','dos','csrf','cl', 'injec']
    RESULTS = {'mined': []}
    Z=0;
    for vuln in vuln_class:

        pip = r.pipeline()
        pip.keys(pattern='commit:*:*:%s'%vuln)
        commit = pip.execute()
        Y = 0;
        for c in commit[0]:
            cm_info = c.split(':')
            pip = r.pipeline()
            pip.hget(c,'vuln?')
            pip.hget('repo:%s:%s:n'%(cm_info[1], cm_info[2]), 'mined')
            v = pip.execute()
            if v[0] == '' and v[1] == 'Y':
                Y+=1;
                Z+=1;

        RESULTS['mined'].append({
            'class': vuln,
            'no': Y
        })

    print(Z)
    return RESULTS

def get_vulns_by_lang():
    r = connect_to_db('redis.json');
    RESULTS = {'benchbylang': []}
    pip = r.pipeline()
    pip.keys(pattern='commit:*:*:*')
    commit = pip.execute()
    Y = 0;
    dic = {};
    for c in commit[0]:
        cm_info = c.split(':')
        pip = r.pipeline()
        pip.hget(c,'vuln?')
        pip.hget(c,'lang')
        pip.hget('repo:%s:%s:n'%(cm_info[1], cm_info[2]), 'mined')
        cm = pip.execute()

        if(cm[0]=='Y' and cm[2] == 'Y'):
            if cm[1] not in dic:
                dic[cm[1]] = 1;
            else:
                dic[cm[1]] += 1;
            Y+=1;

    for key,value in dic.items():
        RESULTS['benchbylang'].append({
            'lang': key,
            'no': value
        })
    print(Y)
    return RESULTS

def get_vulns_by_year():
    r = connect_to_db('redis.json');
    RESULTS = {'benchbyyear': []}
    pip = r.pipeline()
    pip.keys(pattern='commit:*:*:*')
    commit = pip.execute()
    dic = {};
    for c in commit[0]:
        cm_info = c.split(':')
        pip = r.pipeline()
        pip.hget(c,'vuln?')
        pip.hget(c,'year')
        pip.hget(c,'change_to')
        pip.hget('repo:%s:%s:n'%(cm_info[1], cm_info[2]), 'mined')
        cm = pip.execute()
        if(cm[0]=='Y' and cm[3] == 'Y'):
            if cm[1] not in dic:
                dic[cm[1]] = 1;
            else:
                dic[cm[1]] += 1;

    for key,value in dic.items():
        RESULTS['benchbyyear'].append({
            'year': key,
            'no': value
        })
    return RESULTS

def get_no_mined_projects():
    r = connect_to_db('redis.json');

    pip = r.pipeline()
    pip.keys(pattern='repo:*:*:n')
    projs = pip.execute()

    Y = 0;
    C = 0;
    dic = {};
    for c in projs[0]:
        pip = r.pipeline()
        pip.hget(c,'mined')
        pip.hget(c,'commits')
        cm = pip.execute()
        print(cm)
        if(cm[0]=='Y' and cm[1] > '1'):
            Y+=1;
            C+=int(cm[1]);

    RESULTS = {'mined_proj': Y, 'commits': C}

    return RESULTS

def get_no_vulns():
    r = connect_to_db('redis.json');
    pip = r.pipeline()
    pip.lrange('vulns_class', 0, -1)
    vulns = pip.execute()
    Z=0;
    for vuln in vulns[0]:
        pip = r.pipeline()
        pip.keys(pattern='commit:*:*:%s'%vuln)
        commit = pip.execute()
        for c in commit[0]:
            pip = r.pipeline()
            pip.hget(c,'vuln?')
            cm = pip.execute()
            if(cm[0]=='Y'):
                Z+=1;

    RESULTS = {'no_vulns': Z}
    return RESULTS

def get_no_vulns_from_mined_repos():
    r = connect_to_db('redis.json');
    pip = r.pipeline()
    pip.lrange('vulns_class', 0, -1)
    vulns = pip.execute()
    Z=0;
    for vuln in vulns[0]:
        pip = r.pipeline()
        pip.keys(pattern='commit:*:*:%s'%vuln)
        commit = pip.execute()
        for c in commit[0]:
            cm_info = c.split(':')
            pip = r.pipeline()
            pip.hget(c,'vuln?')
            pip.hget('repo:%s:%s:n'%(cm_info[1], cm_info[2]), 'mined')
            cm = pip.execute()
            if(cm[0]=='Y' and cm[1] == 'Y'):
                Z+=1;

    RESULTS = {'no_vulns': Z}
    return RESULTS
