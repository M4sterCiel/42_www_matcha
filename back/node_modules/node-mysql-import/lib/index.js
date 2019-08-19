const mysql = require('mysql');
const path = require('path');
const cp = require('child_process');

module.exports = function(hostname, port, username, password, database, file ){

    this.pool = null;
    this.mysqlBaseDir = null;
    this.mysqlExecutable = null;

    this.init = function(){
        console.log('initialize');

        return new Promise(function(resolve, reject){

            // check
            if(hostname != '127.0.0.1' && hostname != 'localhost')
            {
                reject('This module only works on locally installed databases');
            }

            this.pool = mysql.createPool({
                connectionLimit: 10,
                host: hostname,
                port: port,
                user: username,
                password: password,
                multipleStatements: true 
            });

            this.pool.getConnection((error, connection) => {
                if (error) {
                    reject(error)
                }
                else
                {
                    resolve('true');
                }
            });

        });
    }    

    this.dropDatabaseIfExists = function(){
        console.log('drop database')

        return new Promise(function(resolve, reject){
            // WE USE DIRECT QUERY BECAUSE THE MYSQL MODULE DOES NOT PROPERLY HANDLE QUOTATION MARKS WITH THIS TYPE OF QUERY
            this.pool.query('DROP DATABASE IF EXISTS ' + database, function(error, result){
                console.dir(result)
                if(error)
                {
                    reject(error);
                }
                else
                {
                    resolve(result);
                }
            });
        });

    }

    this.createDatabaseIfDoesNotExist = function(){
        console.log('create database')
        return new Promise(function (resolve, reject) {
            // WE USE DIRECT QUERY BECAUSE MYSQL MODULE DOES NOT PROPERLY HANDLE QUOTATION MARKS
            this.pool.query('CREATE DATABASE IF NOT EXISTS ' + database, function (error, result) {
                console.dir(result)
                if (error) {
                    reject(error);
                }
                else {
                    resolve(result);
                }
            });
        });        
    }


    this.execute = function(){
        return new Promise(function(resolve, reject){

            this.pool.query('SHOW VARIABLES LIKE ?', ['basedir'], function (error, result) {
                if(error)
                {
                    reject(error);
                }
                else
                {
                    if(result.length == 0)
                    {
                        reject('MySQL was not found');
                    }
                    else
                    {
                        var command = null;

                        this.mysqlBaseDir = result[0]['Value'];

                        if (process.platform === "win32")
                        {
                            this.mysqlExecutable = path.resolve(this.mysqlBaseDir, 'bin/mysql.exe');
                            command = '"{executable}" -u{username} -p{password} {database} < {file}';
                        }
                        else
                        {
                            this.mysqlExecutable = 'mysql';
                            command = '{executable} -u{username} -p{password} {database} < {file}';
                        }

                        command = command.replace('{executable}', this.mysqlExecutable);
                        command = command.replace('{username}', username);
                        command = command.replace('{password}', password);
                        command = command.replace('{database}', database);
                        command = command.replace('{file}', file);

                        cp.exec(command, function(error, stdout, stderr){
                            if(error)
                            {
                                reject(error)
                            }
                            else
                            {
                                // final check
                                this.pool.query('USE ' + database +';SHOW TABLES;', function(checkerr, checkresults){
                                    if(checkerr)
                                    {
                                        reject(checkerr);
                                    }
                                    else
                                    {
                                        if(checkresults.length == 2)
                                        {
                                            resolve('success, database was imported')
                                        }
                                        else
                                        {
                                            reject('fail, unknown import error, see console output for info');
                                        }
                                    }
                                })
                            }
                        });
                        
                    }
                    
                }
            });


        })

    }

}