const express = require('express');
const router = express.Router();
const mysql = require('mysql');


/*
create connection
*/
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'taskmanager'
});
/*
connect
*/
db.connect((err) => {
    if(err){
        //throw err;
        console.log('Error connecting to MySql...');
        console.log(err);
    }
    console.log('MySql Connected...');
});
/*
Set Route for Tasks
*/
router.get('/tasks', function(req, res, next) {
  res.send('this is our tasks API');
});
module.exports = router;
/*
create DB
*/
router.get('/createdb', (req,res) => {
    let sql = 'CREATE DATABASE IF NOT EXISTS taskmanager';
    db.query(sql, (err, result) => {
        if(err) {
            console.log(err);
            res.json(err);
            //throw err;
        }else{
            console.log('Database created...');
            res.send('Database created...');  
        }

    });
});
/*
create task table
*/
router.get('/createtasktable', (req, res) => {
    let sql =   'CREATE TABLE IF not EXISTS tasks ('+
                'id int(3) NOT NULL AUTO_INCREMENT,'+
                'taskName varchar(50) NOT NULL,'+
                'groupId int(3) DEFAULT NULL,'+
                'date_time datetime NOT NULL,'+
                'PRIMARY KEY (id),'+
                'KEY idx_taskName (taskName)'+
                ') ';
    db.query(sql, (err, result) => {
        if(err) {
            console.log(err.code);
            res.send({ success: false, message: 'failed to create tasks table', error: err.code });  
            //throw err;
        }else{
            console.log('Task table created...');
            res.send('Task table created...');
        }
    });
});
/*
create group table
*/
router.get('/createtasktable', (req, res) => {
    let sql =   'CREATE TABLE IF not EXISTS groupt ('+
                'id int(3) NOT NULL AUTO_INCREMENT,'+
                'groupName varchar(50) NOT NULL,'+
                'groupColor varchar(6) DEFAULT NULL,'+
                'PRIMARY KEY (id),'+
                'UNIQUE KEY groupName (groupName),'+
                'UNIQUE KEY groupColor (groupColor),'+
                'KEY idx_groupName (groupName)'+
            ')';
    db.query(sql, (err, result) => {
        if(err) {
            console.log(err.code);
            res.send({ success: false, message: 'failed to create group table', error: err.code });    
            //throw err;
        }else{
            console.log('Group table created...');
            res.send('Group table created...');
        }
    });
});
/*
Select groups
*/
router.get('/getgroups', (req, res) => {
    let sql =   'SELECT groupt.id, groupt.groupName, count(tasks.groupId) AS tasksPerGroup , groupt.groupColor ' +
                'FROM tasks RIGHT JOIN groupt ' +
                'ON groupt.id = tasks.groupId ' +
                'GROUP BY groupt.id';    
    let query = db.query(sql, (err, result) => {
        if(err) {
            console.log(err.code);
            res.send({ success: false, message: 'selection failed', error: err.code });    
            //throw err;
        }else{
            console.log('Select Groups...');
            res.json(result);
        }
    });
});
/*
Insert group
*/
router.post('/addgroup', (req, res) => {
    let group = req.body; //get data
    var name  = escape(req.body.groupName); //remove bad charachters
    var color = escape(req.body.groupColor); 
    color = color.slice(3); //remove changed chars by escape

    if(group.groupName){
        let sql = 'INSERT INTO groupt(groupName, groupColor) VALUES ("'+ name +'","'+ color +'")';
        let query = db.query(sql, (err, result) => {
            if(err){
                if(err.code === "ER_DUP_ENTRY"){
                    console.log(err.code);
                    res.json({ success: false, message: 'entry already exists', error: err.code });                         
                }else{
                    console.log(err.code);
                    res.json({ success: false, message: 'error inserting into group', error: err.code });                        
                }
            }else{
                console.log('Insert Group...');
                res.json(result);               
            }    
        });
    }else{
        res.status(400);
        res.json({
            "error":"Bad Data"
        });
    }
});
/*
Update group
*/
router.post('/editgroup/', (req, res) => {
    var id    = escape(req.body.id); 
    var name  = req.body.groupName;
    var color = escape(req.body.groupColor); 
   
    let sql = 'UPDATE groupt SET groupName="'+ name +'", groupColor="'+ color.slice(3) +'" WHERE id='+ id;    
    let query = db.query(sql, (err, result) => {
        if(err) {
            console.log(err.code);
            res.json({ success: false, message: 'update failed', error: err.code }); 
            //throw err;
        }else{
            console.log('Update Group...');
            res.json(result);  
        }
    });
});
/*
Delete group
*/
router.delete('/deletegroup/:id', (req, res) => {
    var id      = req.params.id;    
    let sql = 'DELETE FROM groupt WHERE groupName = ?'; 
    let query = db.query(sql, id, (err, result) => {
        if(err){
            if(err.code === "ER_ROW_IS_REFERENCED_2"){
                console.log(err.code);
                res.json({ success: false, message: 'entry is being referenced', error: err.code });                        
            }else{
                console.log(err.code);
                res.json({ success: false, message: 'error deleting group', error: err.code });                        
            }
        }else{
            console.log('Delete Group...');
            res.json(result);           
        }   
    });
});
/*
Select tasks
*/
router.get('/gettasks', (req, res) => {
    let sql =   'SELECT tasks.id, '+
                'tasks.taskName, '+
                'groupt.groupColor, '+
                'DATE_FORMAT(tasks.date_time, \'%X-%m-%d\') AS date, '+
                'TIME(tasks.date_time) AS time, '+
                'DATEDIFF( CURRENT_DATE(),tasks.date_time) AS datediff '+
                'FROM `tasks` INNER JOIN groupt ON tasks.groupId = groupt.id';    
    let query = db.query(sql, (err, result) => {
        if(err) {
            console.log(err.code);
            res.send({ success: false, message: 'selection failed', error: err.code });    
            //throw err;
        }else{
            console.log('Select Tasks...');
            res.json(result);
        }
    });
});
/*
Select task
*/
router.get('/gettask/:id', (req, res) => {
    var id = escape(req.params.id);    
    let sql = 'SELECT * FROM tasks WHERE id = ?';    
    let query = db.query(sql, id, (err, result) => {
        if(err) {
            console.log(err.code);
            res.send({ success: false, message: 'selection failed', error: err.code });    
            //throw err;
        }else{
            console.log('Select Task...');
            res.json(result);
        }
    });
});
/*
Add task
*/
router.post('/addtask', (req, res) => {
    let task = req.body;
    console.log(task);
    if(task.taskName || task.date_time){
        let sql = 'INSERT INTO tasks SET ?';    
        let query = db.query(sql, task,  (err, result) => {
            if(err) {                
                if(err.code === "ER_DUP_ENTRY"){
                    console.log(err.code);
                    res.json({ success: false, message: 'entry already exists', error: err.code });    
                    //throw err;
                }else{
                    console.log(err.code);
                    res.json({ success: false, message: 'error inserting task', error: err.code });    
                    //throw err;
                }
            }else{
                result.message = 'Task Added!!';
                console.log('Add Task...');
                res.json(result);
            }
        });
    }else{
        res.status(400);
        console.log(task);
        res.json({
            "error":"Bad Data"
        });
    }
});
/*
Update task
*/
router.post('/updatetask/', (req, res) => {
    var editData = req.body;    
    let sql = 'UPDATE tasks SET taskName="'+ editData.taskName +'", date_time="'+ editData.date_time +'" WHERE id='+ editData.id;      
    let query = db.query(sql, (err, result) => {
        if(err) {
            console.log(err.code);
            res.send({ success: false, message: 'updating task failed', error: err.code });    
            //throw err;
        }else{
            console.log('Update Task...');
            res.send('Task updated...');
        }
    });
});
/*
Delete task
*/
router.delete('/deletetask/:id', (req, res) => {
    var id = escape(req.params.id);  
    console.log(id);  
    let sql = 'DELETE FROM tasks WHERE id = ?';    
    let query = db.query(sql, id, (err, result) => {
        if(err) {
            console.log(err.code);
            res.send({ success: false, message: 'deleting task failed', error: err.code });    
            //throw err;
        }else{
            console.log('Delete Task...');
            res.send('Task deleted...');
        }
    });
});
/*
Select shared projects
*/
router.get('/getshrdprj', (req, res) => {
    let sql = 'SELECT * FROM sharedprojects ORDER BY sharedprojects.sharedprojectname ASC';    
    let query = db.query(sql, (err, result) => {
        if(err) {
            console.log(err.code);
            res.send({ success: false, message: 'selecting shared projects failed', error: err.code });    
            //throw err;
        }else{
            console.log('Select shared projects...');
            res.json(result);
        }
    });
});
/*
Select list of tasks for a project
*/
router.get('/getsharedtask/:id', (req, res) => {
    var id      = escape(req.params.id);    
    let sql = 'SELECT sharedprojects.sharedprojectname, sharedtasks.sharedtaskname, sharedtasks.sharedtaskdate, sharedtasks.sharedtasktime' +
              ' FROM sharedprojects INNER JOIN sharedtasks ON sharedprojects.id = sharedtasks.projectID WHERE sharedprojects.id = ?';    
    let query = db.query(sql, id, (err, result) => {
        if(err) {
            console.log(err.code);
            res.send({ success: false, message: 'selecting list of tasks for a project failed', error: err.code });    
            //throw err;
        }else{
            console.log('Select list of tasks for a project...');
            res.json(result);
        }
    });
});
/*
Select shared users
*/
router.get('/getshrdusrs', (req, res) => {
    let sql = 'SELECT * FROM sharedusers ORDER BY sharedusers.user_name ASC';    
    let query = db.query(sql, (err, result) => {
        if(err) {
            console.log(err.code);
            res.send({ success: false, message: 'selecting shared users failed', error: err.code });    
            //throw err;
        }else{
            console.log('Select shared users...');
            res.json(result);
        }
    });
});
/*
Select shared tasks from project
*/
router.get('/getshrdprojtasks', (req, res) => {
    let sql = 'SELECT sharedtasks.id, sharedprojects.sharedprojectname, sharedtasks.sharedtaskname, DATE_FORMAT(sharedtasks.sharedtaskdate, \'%X-%m-%d\') AS sharedtaskdate, sharedtasks.sharedtasktime '+
    'FROM sharedtasks '+
    'JOIN sharedprojects ON sharedtasks.projectID = sharedprojects.id ORDER BY `sharedprojects`.`sharedprojectname` ASC';    
    let query = db.query(sql, (err, result) => {
        if(err) {
            console.log(err.code);
            res.send({ success: false, message: 'selecting list of tasks from a project failed', error: err.code });    
            //throw err;
        }else{
            console.log('Select list of tasks from a project...');
            res.json(result);
        }
    });
});
/*
Select whom is the project shared with sort by name
*/
router.get('/getshrdusrsproj', (req, res) => {
    let sql = 'SELECT  shareduserstoproj.id, sharedusers.user_name, sharedprojects.sharedprojectname '+
    'FROM sharedusers '+
    'JOIN shareduserstoproj ON sharedusers.id = shareduserstoproj.usernameID '+
    'JOIN sharedprojects ON shareduserstoproj.projectID = sharedprojects.id '+
    'ORDER BY sharedusers.user_name ASC';    
    let query = db.query(sql, (err, result) => {
        if(err) {
            console.log(err.code);
            res.send({ success: false, message: 'selecting whom is the project shared with sort by name failed', error: err.code });    
            //throw err;
        }else{
            console.log('Select whom is the project shared with sort by name...');
            res.json(result);
        }
    });
});
/*
Select who belongs to what project sort by name
*/
router.get('/getshrdusrsproj/:id', (req, res) => {
    var id      = escape(req.params.id);  
    let sql = 'SELECT shareduserstoproj.id, sharedusers.user_name, sharedprojects.sharedprojectname '+
                'FROM sharedusers '+
                'JOIN shareduserstoproj ON sharedusers.id = shareduserstoproj.usernameID '+
                'JOIN sharedprojects ON shareduserstoproj.projectID = sharedprojects.id '+
                'WHERE shareduserstoproj.usernameID = ? '+
                'ORDER BY sharedusers.user_name ASC';    
    let query = db.query(sql, id, (err, result) => {
        if(err) {
            console.log(err.code);
            res.send({ success: false, message: 'selecting who belongs to what project sort by name failed', error: err.code });    
            //throw err;
        }else{
            console.log('Select who belongs to what project sort by name...');
            res.json(result);
        }
    });
});
/*
Select what shared tasks a user has
*/
router.get('/getshrdusrtsk/:id', (req, res) => {
    var id      = escape(req.params.id);    
    let sql = 'SELECT shareduserstoproj.id, sharedusers.user_name, sharedprojects.sharedprojectname, sharedtasks.sharedtaskname, sharedtasks.sharedtaskdate, sharedtasks.sharedtasktime '+
                'FROM sharedusers '+
                'JOIN shareduserstoproj ON sharedusers.id = shareduserstoproj.usernameID '+
                'JOIN sharedprojects ON shareduserstoproj.projectID = sharedprojects.id '+
                'JOIN sharedtasks ON sharedprojects.id = sharedtasks.projectID '+
                'WHERE shareduserstoproj.usernameID = ? '+
                'ORDER BY sharedprojects.sharedprojectname ASC';    
    let query = db.query(sql, id, (err, result) => {
        if(err) {
            console.log(err.code);
            res.send({ success: false, message: 'selecting what shared tasks a user has failed', error: err.code });    
            //throw err;
        }else{
            console.log('Select what shared tasks a user has...');
            res.json(result);
        }
    });
});
/*
Insert sharedproject
*/
router.post('/addshrdprj', (req, res) => {
    let shrdprj = req.body; //get data

    if(shrdprj.sharedprojectname){
        let sql = 'INSERT INTO sharedprojects SET ?';
        let query = db.query(sql, shrdprj, (err, result) => {
            if(err){
                if(err.code === "ER_DUP_ENTRY"){
                    console.log(err.code);
                    res.json({ success: false, message: 'entry already exists', error: err.code });    
                }else{
                    console.log(err.code);
                    res.json({ success: false, message: 'error inserting shared project', error: err.code });    
                }                            
            }else{
                console.log('Add Task...');
                result.message = 'New Project Added';
                res.json(result);  
            } 
        });
    }else{
        res.status(400);
        res.json({
            "error":"Bad Data"
        });
    }
});
/*
Delete shared project
*/
router.delete('/deleteshrdproject/:id', (req, res) => {
    var id      = escape(req.params.id);  
    console.log(id);  
    let sql = 'DELETE FROM sharedprojects WHERE id = ?';    
    let query = db.query(sql, id, (err, result) => {
        if(err) {
            if(err.code === "ER_ROW_IS_REFERENCED_2"){
                console.log(err.code);
                res.json({ success: false, message: 'entry is being referenced', error: err.code });                        
                //throw err;
            }else{
                console.log(err.code);
                res.json({ success: false, message: 'deleting shared project failed', error: err.code });
                }            
        }else{
            console.log('Delete Shared Project...');
            res.json(result);
        }
    });
});
/*
Add shared task
*/
router.post('/addsharedtask', (req, res) => {
    let task = req.body;
    console.log(task);
    if(task.sharedtaskName && task.sharedtaskdate && task.sharedtasktime && task.projectID){
        let sql = 'INSERT INTO sharedtasks SET ?';    
        let query = db.query(sql, task,  (err, result) => {
            if(err){
                if(err.code === "ER_DUP_ENTRY"){
                    console.log(err.code);
                    res.send({ success: false, message: 'entry already exists', error: err.code });    
                }else{
                    console.log(err.code);
                    res.send({ success: false, message: 'error inserting shared task', error: err.code });    
                }                            
            }else{
                console.log('Add Shared Task...');
                res.send('Shared Task added...');  
            } 
        });
    }else{
        res.status(400);
        console.log(task);
        res.json({
            "error":"Bad Data"
        });
    }
});
/*
Delete shared task
*/
router.delete('/deleteshrdtask/:id', (req, res) => {
    var id      = escape(req.params.id);  
    console.log(id);  
    let sql = 'DELETE FROM sharedtasks WHERE id = ?';    
    let query = db.query(sql, id, (err, result) => {
        if(err) {
            console.log(err.code);
            res.send({ success: false, message: 'deleting shared task failed', error: err.code });    
            //throw err;
        }else{
            console.log('Delete Shared Task...');
            res.send('Shared Task deleted...');
        }
    });
});
/*
Assign shared Link
*/
router.post('/assignshrdlink', (req, res) => {
    let name = req.body;
    if(name.usernameID && name.projectID){
            let sql = 'INSERT INTO shareduserstoproj( usernameID, projectID) VALUES ('+ name.usernameID +', '+ name.projectID +')';
            let query = db.query(sql, (err, result) => {
                if(err){
                    if(err.code === "ER_DUP_ENTRY"){
                        console.log(err.code);
                        res.send({ success: false, message: 'entry already exists', error: err.code });    
                    }else{
                        console.log(err.code);
                        res.send({ success: false, message: 'error inserting shared link', error: err.code });    
                    }                            
                }else{
                    console.log('Add Shared Link...');
                    res.send('Shared Link added...');  
                } 
        });
    }else{
        res.status(400);
        console.log(name);
        res.json({"error":"Bad Data"});
    }
});
/*
Delete shared user to project link
*/
router.delete('/deleteshrdlink/:id', (req, res) => {
    var id      = escape(req.params.id);   
    let sql = 'DELETE FROM shareduserstoproj WHERE id = ?';   
    console.log(sql);  
    let query = db.query(sql, id, (err, result) => {
        if(err) {
            console.log(err.code);
            res.send({ success: false, message: 'deleting shared link failed', error: err.code });    
            //throw err;
        }else{
            console.log('Delete Shared Link...');
            res.send('Shared Link deleted...');
        }
    });
});
/*
Add shared user 
*/
router.post('/addshrduser', (req, res) => {
    let name = req.body;

    if(name.user_name){
        let sql = 'INSERT INTO sharedusers SET ?';    
            let query = db.query(sql, name,  (err, result) => {
                if(err){
                    if(err.code === "ER_DUP_ENTRY"){
                        console.log(err.code);
                        res.json({ success: false, message: 'entry already exists', res: {affectedRows : 0} , error: err.code});    
                    }else{
                        console.log(err.code);
                        res.json({ success: false, message: 'error inserting shared user', res: {affectedRows : 0} , error: err.code });    
                    }                            
                }else{
                    console.log('Add Shared User...');
                    res.json({ success: true, message: 'Inserting shared user', res:result});      
                } 
        });
    }else{        
        res.status(400);
        console.log(name);
        res.json({
            "error":"Bad Data"
        });            
    }
});
/*
Delete shared user 
*/
router.delete('/deleteshrduser/:id', (req, res) => {
    var id = escape(req.params.id);  
    console.log(id);  
    let sql = 'DELETE FROM sharedusers WHERE id = ?';    
    let query = db.query(sql, id, (err, result) => {
        if(err){
            if(err.code === "ER_ROW_IS_REFERENCED_2"){
                console.log(err.code);
                res.json({ success: false, message: 'entry is being referenced', error: err.code });                        
            }else{
                console.log(err.code);
                res.json({ success: false, message: 'deleting shared user failed', error: err.code });                        
            }
        }else{
            console.log('Delete Group...');
            res.json(result);           
        }  
    });
});