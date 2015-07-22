'use strict';

var User = module.parent.require('./user');
var Topic = module.parent.require('./topics');
var db = module.parent.require('./database');
var SocketAdmins = module.parent.require('./socket.io/admin');
var SocketPlugins = module.parent.require('./socket.io/plugins');
//var postTools = module.parent.require('./postTools');

var emailrestrictor = {};


  emailrestrictor.init = function(params, callback) {
    var middleware = params.middleware,
    controllers = params.controllers;
    controllers.getEmailRestrictor = function (req, res, next) {
      // Renderiza la plantilla
      res.render('emailrestrictoradmin', {});
    };
    //Creamos las direcciones para poder ver los registros
    params.router.get('/admin/emailrestrictor', middleware.buildHeader, controllers.getEmailRestrictor);
    params.router.get('/api/admin/emailrestrictor', controllers.getEmailRestrictor);
    callback();
  };

  emailrestrictor.getAuth = function(data, callback)
  {
    //console.log('Data: ');
    // console.log(data.res.socket._peername.address);
    //console.log(data.res.req.ip);

      
      db.getObject('emailrestrictor', function(err, res){
        //console.log(res);
        var restrictions = res.data ? res.data.split(" ") : [];

        for(var i=0;i<restrictions.length;i++)
        {
          if(data.userData.email.indexOf(restrictions[i]) >= 0)
          {
            return callback("ERROR: Email invelido", data);
          }
        }
        db.getObject('emailiprestrictor', function(err, ips){
          var restrictions = ips.data ? ips.data.split(" ") : [];
          var ip = data.res.req.ip; //data.res.socket._peername.address;

          for(var i=0;i<restrictions.length;i++)
          {
            if(ip == restrictions[i])
            {
              console.log("Intento de registro desde ip bloqueada "+ip);
              return callback("ERROR: IP invalida", data);
            }
          }
          return callback(null, data);
        });
      });
  }

  emailrestrictor.addNavigation = function(custom_header, callback) {
    // Añadimos al menu de admin el acceso a ver los registros
    custom_header.plugins.push({
      route: '/emailrestrictor',
      icon: '',
      name: 'EmailRestrictor'
    });

    callback(null, custom_header);
  }


  // LLamadas por sockets
  SocketAdmins.getEmailRestrictions = function (socket, data, callback) {
    //console.log('received socket');
    // Recivimos la peticion para mostrar las detecciones (al hacer por sockets de admin, solo se responden
    // las peticiones de admins!)
    db.getObject('emailrestrictor', callback);
  };

  SocketAdmins.setEmailRestrictions = function (socket, data, callback) {
    //console.log(data);
    // Deteccion de multicuenta por cookie, me viene por sockets
    db.setObject('emailrestrictor', data, function(err, d){
      //console.log(err);
      callback(err, d);
    });
  };

  SocketAdmins.getIPRestrictions = function (socket, data, callback) {
    //console.log('received socket');
    // Recivimos la peticion para mostrar las detecciones (al hacer por sockets de admin, solo se responden
    // las peticiones de admins!)
    db.getObject('emailiprestrictor', callback);
  };

  SocketAdmins.setIPRestrictions = function (socket, data, callback) {
    //console.log(data);
    // Deteccion de multicuenta por cookie, me viene por sockets
    db.setObject('emailiprestrictor', data, function(err, d){
      //console.log(err);
      callback(err, d);
    });
  };

module.exports = emailrestrictor;
