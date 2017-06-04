# Secbench

Secbench is a database of real security vulnerabilities mined from Github. We mined 238 projects - accounting to more than 1M commits - for 16 different vulnerability [patterns](https://tqrg.github.io/secbench/patterns.html), yielding a database with 602 real security vulnerabilities. 

Our main goal with this approach is the identification and extraction of real security vulnerabilities fixed/patched by real developers. We started with the identification of several security patterns to use on our [mining tool](https://github.com/TQRG/secbench-mining-tool). To understand what would be the most popular patterns on Github, we based ourselves on Github searches and Top 10 OSWAP 2017. Thereafter, we kept adding more patterns and we still have place for many more. The patterns were used for mining commits' messages. As we can see on the figure below, after saving the data there is an evaluation process to validate whether the caught sample is really the fix of a security vulnerability or not. If approved, the sample's information is updated on the database and, consequently, the test case is added to the final database.

![alt](https://github.com/TQRG/secbench/blob/master/static/images/methodology.png?raw=true)

### Test Cases Structure

Every time a pattern is found in a commit by the mining tool, a test case is created. The test case has $3$ folders: Vfix with the non-vulnerable source code from the commit where the pattern was caught (child), Vvul with the vulnerable source code from the previous commit (parent) which we consider the real vulnerability; and, Vdiff with two folders, added and deleted, where the added lines to fix the vulnerability and the deleted lines that represent the security vulnerability are stored (as we can see in the figure below).

![alt](https://github.com/TQRG/secbench/blob/master/static/images/test_case.png?raw=true)

### Database

The database is available 13 different languages: Ruby, Java, Scala, Php, C, Objc, Objc++, Python, Swift, Groovy, C++, JavaScript, and others (which include xml).

* A1 - injec (97)

| Language | Ruby | Java | Scala | Php | C | Python | Swift |
| --- | --- | --- | --- | --- | --- | --- | --- |
| #vulns | 10 | 6 | 3 | 63 | 6 | 8 | 1 |

* A2 - auth (44)

| Language | Ruby | Java | Php | Scala | C | Python |
| --- | --- | --- | --- | --- | --- | --- | 
| #vulns | 7 | 1 | 29 | 1 | 2 | 4 |

* A3 - xss (141)

| Language | Ruby | Java | Php | JavaScript | Groovy | Python |
| --- | --- | --- | --- | --- | --- | --- | 
| #vulns | 15 | 3 | 104 | 12 | 3 | 4 |

* A4 - bac (2)

| Language | Php | Python |
| --- | --- | --- | 
| #vulns | 1 | 1 | 

* A5 - smis (9)

| Language | Ruby | Php | Python | Others
| --- | --- | --- | --- | --- |
| #vulns | 3 | 4 | 1 | 1 |

* A6 - sde (17)

| Language | Ruby | Java | JavaScript | Php | C | Python | Others |
| --- | --- | --- | --- | --- | --- | --- | --- |
| #vulns | 2 | 1 | 1 | 7 | 3 | 2 | 1 |

* A7 - iap (14)

| Language | Ruby | Php | JavaScript | Python | C |
| --- | --- | --- | --- | --- | --- |
| #vulns | 2 | 7 | 2 | 2 | 1 |

* A8 - csrf (32)

| Language | Ruby | Php | JavaScript | Python |
| --- | --- | --- | --- | --- |
| #vulns | 3 | 27 | 1 | 2 |

* A9 - ucwkv (22)

| Language | Ruby | Php | JavaScript | Others |
| --- | --- | --- | --- | --- |
| #vulns | 10 | 3 | 1 | 8 |

* A10 - upapi (2)

| Language | Ruby | Python |
| --- | --- | --- | 
| #vulns | 1 | 1 | 

* Others - ml (77)

| Language | Ruby | JavaScript | Objc++ | C | Python | Objc | C++ | Others |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| #vulns | 16 | 2 | 7 | 29 | 1 | 15 | 6 | 1 |

* Others - over (15)

| Language | Scala | Java | C | Objc |
| --- | --- | --- | --- | --- |
| #vulns | 1 | 4 | 8 | 2 |

* Others - dos (38)

| Language | Ruby | Objc++ | C | Python | Php | C++ | Java | Objc |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| #vulns | 8 | 1 | 18 | 1 | 2 | 5 | 1 | 2 |

* Others - pathtrav (15)

| Language | Ruby | Java | Php |
| --- | --- | --- | --- |
| #vulns | 3 | 1 | 11 |

* Others - misc (72)

| Language | Ruby | Java | Python | Php | C | Others
| --- | --- | --- | --- | --- | --- | --- |
| #vulns | 8 | 2 | 10 | 29 | 22 | 1 |

##### Versions

Soon...
<!--* [v.0.0.1](https://console.cloud.google.com/storage/browser/v0_0_1/?project=secbench-161618)
Patterns: TOP 10 OSWAP 2017, Memory Leak, Overflow, Resourse Leaks, Denial-of-Service, Path Traversal, Miscellaneous-->

##### MORE INFO 
* TBA

# License
MIT License, see [license.txt](https://github.com/TQRG/secbench/blob/master/license.txt) for more information.
