# Secbench

Secbench is a database of real security vulnerabilities mined from Github. We mined 238 projects - accounting to more than 1M commits - for 16 different vulnerability [patterns](https://tqrg.github.io/secbench/patterns.html), yielding a Database with 602 real security vulnerabilities. 

The patterns were used for mining commits' messages. Every time the tool caught a pattern, it saved the sample on the cloud and the informations attached (e.g., sha, url, type of security vulnerability) on the database. As we can see on Fig.![alt](https://github.com/TQRG/secbench/blob/master/static/images/methodology.png?raw=true), after saving the data there is an evaluation process (\ref{sec:evaluation}) to validate whether the caught sample is really the fix of a security vulnerability or not. If approved, the sample's information is updated on the database and, consequently, the test case (\ref{sec:structure}) is added to the final database.


## Versions

* [v.0.0.1](https://console.cloud.google.com/storage/browser/v0_0_1/?project=secbench-161618)
Patterns: TOP 10 OSWAP 2017, Memory Leak, Overflow, Resourse Leaks, Denial-of-Service, Path Traversal, Miscellaneous


## License
MIT License, see [license.txt](https://github.com/TQRG/secbench/blob/master/license.txt) for more information.
