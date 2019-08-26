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
using System.Web.Http.Cors;
using System.Dynamic;

namespace ERP_API.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class Incident_ImageController : ApiController
    {
        private INF370Entities db = new INF370Entities();

        // GET: api/Incident_Image
        public List<dynamic> GetIncident_Image()
        {
            try
            {
                db.Configuration.ProxyCreationEnabled = false;
                List<Incident_Image> IMG = db.Incident_Image.Include(zz=>zz.Incident).ToList();
                List<dynamic> toReturn = new List<dynamic>();
                foreach (Incident_Image Item in IMG)
                {
                    dynamic m = new ExpandoObject();
                    m.Incident_Image_ID = Item.Incident_Image_ID;
                    m.Incident_ID = Item.Incident.Incident_ID;
                    m.Patrol_Log_ID = Item.Patrol_Log_ID;
                    m.Image = Item.Image;
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

   
        // GET: api/Incident_Image/5
        [ResponseType(typeof(Incident_Image))]
        public IHttpActionResult GetIncident_Image(int id)
        {
            db.Configuration.ProxyCreationEnabled = false;
            Incident_Image incident_Image = db.Incident_Image.Find(id);
            if (incident_Image == null)
            {
                return NotFound();
            }

            return Ok(incident_Image);
        }

        // PUT: api/Incident_Image/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutIncident_Image(int id, Incident_Image incident_Image)
        {
            db.Configuration.ProxyCreationEnabled = false;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != incident_Image.Patrol_Log_ID)
            {
                return BadRequest();
            }

            db.Entry(incident_Image).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Incident_ImageExists(id))
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

        // POST: api/Incident_Image
        [ResponseType(typeof(Incident_Image))]
        public IHttpActionResult PostIncident_Image(List<Incident_Image> incident_Image)
        {
            foreach (var tracking in incident_Image)
            {
                db.Configuration.ProxyCreationEnabled = false;

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                db.Incident_Image.Add(tracking);

                try
                {
                    db.SaveChanges();
                }
                catch (DbUpdateException)
                {
                    if (Incident_ImageExists(tracking.Patrol_Log_ID))
                    {
                        return Conflict();
                    }
                    else
                    {
                        throw;
                    }
                }
            }
            return CreatedAtRoute("DefaultApi", new { id = incident_Image.Last().Patrol_Log_ID }, incident_Image);
        }

        // DELETE: api/Incident_Image/5
        [ResponseType(typeof(Incident_Image))]
        public IHttpActionResult DeleteIncident_Image(int id)
        {
            db.Configuration.ProxyCreationEnabled = false;
            Incident_Image incident_Image = db.Incident_Image.Find(id);
            if (incident_Image == null)
            {
                return NotFound();
            }

            db.Incident_Image.Remove(incident_Image);
            db.SaveChanges();

            return Ok(incident_Image);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool Incident_ImageExists(int id)
        {
            return db.Incident_Image.Count(e => e.Patrol_Log_ID == id) > 0;
        }
    }
}