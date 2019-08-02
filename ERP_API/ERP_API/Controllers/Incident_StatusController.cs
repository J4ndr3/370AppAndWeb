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

namespace ERP_API.Controllers
{
    public class Incident_StatusController : ApiController
    {
        private INF370Entities db = new INF370Entities();

        // GET: api/Incident_Status
        public IQueryable<Incident_Status> GetIncident_Status()
        {
            return db.Incident_Status;
        }

        // GET: api/Incident_Status/5
        [ResponseType(typeof(Incident_Status))]
        public IHttpActionResult GetIncident_Status(int id)
        {
            Incident_Status incident_Status = db.Incident_Status.Find(id);
            if (incident_Status == null)
            {
                return NotFound();
            }

            return Ok(incident_Status);
        }

        // PUT: api/Incident_Status/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutIncident_Status(int id, Incident_Status incident_Status)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != incident_Status.Incident_Status_ID)
            {
                return BadRequest();
            }

            db.Entry(incident_Status).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Incident_StatusExists(id))
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

        // POST: api/Incident_Status
        [ResponseType(typeof(Incident_Status))]
        public IHttpActionResult PostIncident_Status(Incident_Status incident_Status)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Incident_Status.Add(incident_Status);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = incident_Status.Incident_Status_ID }, incident_Status);
        }

        // DELETE: api/Incident_Status/5
        [ResponseType(typeof(Incident_Status))]
        public IHttpActionResult DeleteIncident_Status(int id)
        {
            Incident_Status incident_Status = db.Incident_Status.Find(id);
            if (incident_Status == null)
            {
                return NotFound();
            }

            db.Incident_Status.Remove(incident_Status);
            db.SaveChanges();

            return Ok(incident_Status);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool Incident_StatusExists(int id)
        {
            return db.Incident_Status.Count(e => e.Incident_Status_ID == id) > 0;
        }
    }
}