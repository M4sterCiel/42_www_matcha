#!/bin/sh
path=$(cd $( dirname ${BASH_SOURCE[0]}) && pwd )/matcha_seed.sql;

cd /Applications/mampstack-7.1.27-2/mysql/bin;

./mysql < $path -u root -pazerty123;

echo "Database deployed!"



