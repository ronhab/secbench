from connect import connect_to_db
import operator

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
    Y = 0;
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
                Y+=1;
            elif(cm[0]=='Y' and cm[2] == 'Y'):
                rest[vuln] += 1;
                Y+=1;

    rest['sde'] += rest['sha1']
    del rest['sha1']

    order = ['injec', 'auth', 'xss', 'bac', 'smis', 'sde', 'iap', 'csrf', 'ucwkv', 'upapi', 'ml', 'rl', 'over', 'pathtrav', 'dos', 'misc']

    count = 0;
    for k in order:
        per = round((float(rest[k])/Y)*100, 1);
        count+=per;
        RESULTS['benchmark'].append({
            'class': k,
            'no': rest[k],
            'per': per
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

    others = 0;
    sorted_x = sorted(dic.items(), key=operator.itemgetter(1),reverse=True)
    print(sorted_x)
    for i in sorted_x:
        per = round((float(i[1])/Y)*100, 1);
        #if i[0] == 'others':
        #    others = i[1];
        #else:
        RESULTS['benchbylang'].append({
                'lang': i[0],
                'no': i[1],
                'per':per
            })

    #RESULTS['benchbylang'].append({
    #    'lang': 'others',
    #    'no': others,
    #    'per':round((float(others)/Y)*100, 1)
    #})
    return RESULTS


def get_CVES():
    r = connect_to_db('redis.json');
    RESULTS = {'cves': []}
    pip = r.pipeline()
    pip.keys(pattern='commit:*:*:*')
    commit = pip.execute()
    Y = 0; Z=0;
    dic = {};
    CVE = [];

    for c in commit[0]:
        cm_info = c.split(':')
        pip = r.pipeline()
        pip.hget(c,'vuln?')
        pip.hget(c,'lang')
        pip.hget(c,'code')
        pip.hget('repo:%s:%s:n'%(cm_info[1], cm_info[2]), 'mined')
        cm = pip.execute()

        if(cm[0]=='Y' and cm[3] == 'Y' and cm[2] is not None):
            #print(cm[2])
            if cm[2] not in CVE and cm[2]!='':
                CVE.append(cm[2])
                Y+=1;
            if cm[2]!='':
                Z+=1;
    print(CVE)

get_CVES();

def get_lang():
    r = connect_to_db('redis.json');
    pip = r.pipeline()
    pip.keys(pattern='repo:*:*:n')
    projs = pip.execute()
    RESULTS = {'languages': []}
    dic = {}
    Y = 0;
    for p in projs[0]:
        pinf = p.split(':')
        pip = r.pipeline()
        pip.hget(p,'mined')
        pip.keys(pattern='lang:%s:%s'%(pinf[1],pinf[2]))
        p_info = pip.execute()

        if(p_info[0] == 'Y'):
            pip = r.pipeline()
            pip.hgetall('lang:%s:%s'%(pinf[1],pinf[2]))
            lang = pip.execute()
            print(lang)
            Y+=1;
            print(p)
            print(lang)
            for i,v in lang[0].iteritems():
                if i not in dic:
                    dic[i] = 0;
                dic[i]+=int(v)
                Y+=int(v)

    for key,value in dic.items():
            per = round((float(value)/Y)*100, 2);
            RESULTS['languages'].append({
                'lang': key,
                'no': value,
                'per': per
            })

    print(RESULTS)
    print(Y)


    return RESULTS

get_lang();

def get_projs_stats():
    r = connect_to_db('redis.json');
    RESULTS = {'stats': []}
    pip = r.pipeline()
    pip.keys(pattern='repo:*:*:n')
    projs = pip.execute()
    Y = 0; Z=0;
    dic = {};
    CVE = [];
    final_found_vulns = 0;
    final_no_vulns = 0;
    found_vulns=0;
    no_vulns= 0;
    mined_projs = [];
    for p in projs[0]:
        pip = r.pipeline()
        pip.hget(p,'mined')
        cm = pip.execute()

        if(cm[0]=='Y'):
            cm_info = p.split(':')
            pip = r.pipeline()
            pip.keys(pattern='commit:%s:%s:*'%(cm_info[1], cm_info[2]))
            commits = pip.execute()
            n_vuln=0;
            for c in commits[0]:
                if r.hget(c, 'vuln?') == 'Y':
                    n_vuln+=1;



            if len(commits[0]) > 0:
                mined_projs.append(p);


    print(mined_projs)
    for p in mined_projs:
        proj_info = p.split(':');
        pip = r.pipeline()
        pip.keys(pattern='commit:%s:%s:*'%(proj_info[1], proj_info[2]))
        commits = pip.execute()
        n_vuln=0;
        for c in commits[0]:
            if r.hget(c, 'vuln?') == 'Y':
                n_vuln+=1;

        if(n_vuln > 0):
            final_found_vulns+=1;
        else:
            final_no_vulns+=1;


    print(final_found_vulns)
    print(final_no_vulns)
            #RESULTS['stats'].append({
            #    'repos': ('%s_%s')%(cm_info[1],cm_info[2]),
            #    'no': len(commits[0])
            #})
get_projs_stats();
def get_vulns_by_year():
    r = connect_to_db('redis.json');
    RESULTS = {'benchbyyear': []}
    pip = r.pipeline()
    pip.keys(pattern='commit:*:*:*')
    commit = pip.execute()
    dic = {};
    Y=0;
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
            Y+=1;

    sorted_x = sorted(dic.items(), key=operator.itemgetter(0))

    for i in sorted_x:
        per = round((float(i[1])/Y)*100, 1);
        RESULTS['benchbyyear'].append({
            'year': i[0],
            'no': i[1],
            'per': per
        })
    return RESULTS

def get_commits_vulns():
    r = connect_to_db('redis.json');
    pip = r.pipeline()
    pip.keys(pattern='repo:*:*:n')
    projs = pip.execute()
    RESULTS = {'corr1': []}

    for p in projs[0]:
        Y = 0;
        pinf = p.split(':')
        pip = r.pipeline()
        pip.hget(p,'mined')
        pip.hget(p,'commits')
        pip.keys(pattern='commit:%s:%s:*'%(pinf[1],pinf[2]))
        p_info = pip.execute()

        if(p_info[0] == 'Y'):
            for c in p_info[2]:
                v = r.hget(c, 'vuln?')
                if (v == 'Y'):
                    Y+=1;
            RESULTS['corr1'].append({
                'commits': int(p_info[1]),
                'vulns': Y,
                'all':len(p_info[2]),
                'id':('%s_%s'%(pinf[1],pinf[2]))
                })
    #print(RESULTS)
    return RESULTS

def get_commits_years_dev():
    r = connect_to_db('redis.json');
    pip = r.pipeline()
    pip.keys(pattern='repo:*:*:n')
    projs = pip.execute()
    RESULTS = {'corr2': []}

    for p in projs[0]:
        Y = 0;
        pinf = p.split(':')
        pip = r.pipeline()
        pip.hget(p,'mined')
        pip.hget(p,'dev_time')
        pip.keys(pattern='commit:%s:%s:*'%(pinf[1],pinf[2]))
        p_info = pip.execute()


        if(p_info[0] == 'Y'):
            year = float(p_info[1])/525600;
            for c in p_info[2]:
                v = r.hget(c, 'vuln?')
                if (v == 'Y'):
                    Y+=1;

            RESULTS['corr2'].append({
                'time': year,
                'all':len(p_info[2]),
                'id':('%s_%s'%(pinf[1],pinf[2]))
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
