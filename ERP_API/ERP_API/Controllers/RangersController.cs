using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using ERP_API.Models;
using System.Dynamic;
using System.Web.Http.Cors;

namespace ERP_API.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class RangersController : ApiController
    {
        private INF370Entities db = new INF370Entities();

        // GET: api/Rangers
        public List<dynamic> GetRangers()
        {
            db.Configuration.ProxyCreationEnabled = false;
            List<Ranger> Level = db.Rangers.Include(zz => zz.User_Role).Include(zz => zz.Medical_Aid).Include(zz => zz.Organisation).Include(zz => zz.Gender).Include(zz => zz.Access_Level).ToList();
            List<dynamic> toReturn = new List<dynamic>();
            foreach (Ranger Item in Level)
            {
                dynamic m = new ExpandoObject();
                m.RID = Item.ID_Number;
                m.ID = Item.Ranger_ID;
                m.Name = Item.Name;
                m.Surname = Item.Surname;
                m.Cell = Item.Cell;
                m.Points = Item.Points;
                m.Status = Item.Status;
                m.Email = Item.Email;
                m.User_Role = Item.User_Role.Description;
                m.Gender = Item.Gender.Description;
                m.Organisation = Item.Organisation.Description;
                m.Blood = Item.Blood_Type;
                m.Report = Item.Access_Level.Report;
                m.Web = Item.Access_Level.Web;
                m.Write = Item.Access_Level.Write;
                m.App = Item.Access_Level.App;
                toReturn.Add(m);
            }
            return toReturn;

        }

        // GET: api/Rangers/5
        [ResponseType(typeof(Ranger))]
        public IHttpActionResult GetRanger(int id)
        {
            db.Configuration.ProxyCreationEnabled = false;
            Ranger ranger = db.Rangers.Find(id);
            if (ranger == null)
            {
                return NotFound();
            }

            return Ok(ranger);
        }

        // PUT: api/Rangers/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutRanger(int id, Ranger ranger)
        {
            db.Configuration.ProxyCreationEnabled = false;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != ranger.Ranger_ID)
            {
                return BadRequest();
            }

            db.Entry(ranger).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RangerExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Rangers
        [ResponseType(typeof(Ranger))]
        public IHttpActionResult PostRanger(Ranger ranger)
        {
            ranger.Password = ranger.Password.Substring(0, 19);
            var email = ranger.Email;
            var cell = ranger.Cell;
            var RangerID = ranger.ID_Number;
            db.Configuration.ProxyCreationEnabled = false;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (db.Rangers.Where(zz=>zz.Cell==cell || zz.Email == email|| zz.ID_Number == RangerID).FirstOrDefault() == null )
            {
                db.Rangers.Add(ranger);
                db.SaveChanges();
            }
            else
            {
                return Ok(7);
            }
            

            return CreatedAtRoute("DefaultApi", new { id = ranger.Ranger_ID }, ranger);
        }

        // DELETE: api/Rangers/5
        [ResponseType(typeof(Ranger))]
        public IHttpActionResult DeleteRanger(int id)
        {
            db.Configuration.ProxyCreationEnabled = false;
            Ranger ranger = db.Rangers.Find(id);
            if (ranger == null)
            {
                return NotFound();
            }

            db.Rangers.Remove(ranger);
            db.SaveChanges();

            return Ok(ranger);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool RangerExists(int id)
        {
            return db.Rangers.Count(e => e.Ranger_ID == id) > 0;
        }
        [System.Web.Http.Route("api/Rangers/UpdatePoints")]
        [HttpGet]
        public HttpResponseMessage UpdatePoints([FromUri] Ranger userDet)
        {
            var points = userDet.Points;
            db.Configuration.ProxyCreationEnabled = false;
            bool UseInDb = false;
            if (db.Rangers.Where(zz => zz.Ranger_ID == userDet.Ranger_ID).Count() == 1)
            {
                UseInDb = true;
            }
            if (UseInDb)
            {
                userDet = db.Rangers.Where(zz => zz.Ranger_ID == userDet.Ranger_ID).FirstOrDefault();
                RefreshGUID(userDet, points);
                userDet = db.Rangers.Where(zz => zz.Ranger_ID == userDet.Ranger_ID).FirstOrDefault();
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
        public void RefreshGUID(Ranger use, int points)
        {
            db.Configuration.ProxyCreationEnabled = false;
            use.Points = use.Points - points;

            var u = db.Rangers.Where(zz => zz.Ranger_ID == use.Ranger_ID).FirstOrDefault();
            db.Entry(u).CurrentValues.SetValues(use);
            db.SaveChanges();

        }
    }
}