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
    public class Incident_TypeController : ApiController
    {
        private INF370Entities db = new INF370Entities();

        // GET: api/Incident_Type
        public List<dynamic> GetIncident_Type()
        {
            try
            {
                db.Configuration.ProxyCreationEnabled = false;
            List<Incident_Type> Types = db.Incident_Type.Include(zz=>zz.Incident_Level).ToList();
            List<dynamic> toReturn = new List<dynamic>();
            foreach (Incident_Type Item in Types)
            {
                dynamic m = new ExpandoObject();
                m.ID = Item.Incident_Type_ID;
                m.Description = Item.Description;
                m.Level = Item.Incident_Level.Description;
                m.Incident_Level_ID = Item.Incident_Level.Incident_Level_ID;
                toReturn.Add(m);
            }
            return toReturn;
            }
            catch (Exception err)
            {
                List<dynamic> toReturn = new List<dynamic>();
                toReturn.Add("Not readable");
                return toReturn;
            }

        }

        // GET: api/Incident_Type/5
        [ResponseType(typeof(Incident_Type))]
        public IHttpActionResult GetIncident_Type(int id)
        {
            db.Configuration.ProxyCreationEnabled = false;
            Incident_Type incident_Type = db.Incident_Type.Find(id);
            if (incident_Type == null)
            {
                return NotFound();
            }

            return Ok(incident_Type);
        }

        // PUT: api/Incident_Type/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutIncident_Type(int id, Incident_Type incident_Type)
        {
            db.Configuration.ProxyCreationEnabled = false;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != incident_Type.Incident_Type_ID)
            {
                return BadRequest();
            }

            db.Entry(incident_Type).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Incident_TypeExists(id))
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

        // POST: api/Incident_Type
        [ResponseType(typeof(Incident_Type))]
        public IHttpActionResult PostIncident_Type(Incident_Type incident_Type)
        {
            db.Configuration.ProxyCreationEnabled = false;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Incident_Type.Add(incident_Type);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = incident_Type.Incident_Type_ID }, incident_Type);
        }

        // DELETE: api/Incident_Type/5
        [ResponseType(typeof(Incident_Type))]
        public IHttpActionResult DeleteIncident_Type(int id)
        {
            db.Configuration.ProxyCreationEnabled = false;
            Incident_Type incident_Type = db.Incident_Type.Find(id);
            if (incident_Type == null)
            {
                return NotFound();
            }

            db.Incident_Type.Remove(incident_Type);
            db.SaveChanges();

            return Ok(incident_Type);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool Incident_TypeExists(int id)
        {
            return db.Incident_Type.Count(e => e.Incident_Type_ID == id) > 0;
        }
    }
}