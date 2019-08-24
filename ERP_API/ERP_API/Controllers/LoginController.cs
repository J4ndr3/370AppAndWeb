using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ERP_API.Models;
using System.Web.Http.Cors;
using System.Dynamic;

namespace ERP_API.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class LoginController : ApiController
    {
        private INF370Entities db = new INF370Entities();
        [System.Web.Http.Route("api/Login/Login")]
        [HttpGet]
        public HttpResponseMessage Login([FromUri] Ranger userDet)
        {
            db.Configuration.ProxyCreationEnabled = false;
            bool UseInDb = false;
            if (db.Rangers.Where(zz => zz.Email == userDet.Email && zz.Password == userDet.Password).Count() == 1)
            {
                UseInDb = true;
            }
            if (UseInDb)
            {
                userDet = db.Rangers.Where(zz => zz.Email == userDet.Email).FirstOrDefault();
                RefreshGUID(userDet);
                userDet = db.Rangers.Where(zz => zz.Email == userDet.Email).FirstOrDefault();
                List<dynamic> uselit = new List<dynamic>();
                dynamic user1 = new ExpandoObject();
                user1.GUID = userDet.GUID;
                user1.Correct = true;
                uselit.Add(user1);
                var response1 = Request.CreateResponse(HttpStatusCode.OK, uselit);
                response1.Headers.Add("Access-Control-Allow-Origin", "*");
                return response1;

            }
            else
            {
                var response = Request.CreateResponse(HttpStatusCode.OK, "Access not allowed");
                response.Headers.Add("Access-Control-Allow-Origin", "*");
                return response;
            }

        }
        public void RefreshGUID(Ranger use)
        {
            db.Configuration.ProxyCreationEnabled = false;
            use.GUID = Guid.NewGuid();
            use.GUID_Exp = DateTime.Now.AddMinutes(30);
            var guids = db.Rangers.Where(zz => zz.GUID == use.GUID).Count();
            if (guids > 0)
                RefreshGUID(use);
            else
            {
                var u = db.Rangers.Where(zz => zz.Email == use.Email).FirstOrDefault();
                db.Entry(u).CurrentValues.SetValues(use);
                db.SaveChanges();
            }
        }
        [System.Web.Http.Route("api/Login/LogedIn")]
        [HttpGet]
        public HttpResponseMessage LogedIn([FromUri] Ranger user)
        {
            db.Configuration.ProxyCreationEnabled = false;
            if (db.Rangers.Where(zz => zz.Email == user.Email && zz.Email == user.Email).Count() == 1)
            {
                List<dynamic> uselit = new List<dynamic>();
                dynamic user1 = new ExpandoObject();
                user1.Logedin = true;
                uselit.Add(user1);
                var response1 = Request.CreateResponse(HttpStatusCode.OK, uselit);
                response1.Headers.Add("Access-Control-Allow-Origin", "*");
                return response1;
            }
            else
            {
                var response = Request.CreateResponse(HttpStatusCode.OK, "Access not allowed");
                response.Headers.Add("Access-Control-Allow-Origin", "*");
                return response;
            }
        }

    }
}

