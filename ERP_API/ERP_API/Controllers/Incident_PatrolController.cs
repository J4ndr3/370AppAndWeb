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
    public class Incident_PatrolController : ApiController
    {
        private INF370Entities db = new INF370Entities();

        // GET: api/Incident_Patrol
        public IQueryable<Incident_Patrol> GetIncident_Patrol()
        {
            return db.Incident_Patrol;
        }

        // GET: api/Incident_Patrol/5
        [ResponseType(typeof(Incident_Patrol))]
        public IHttpActionResult GetIncident_Patrol(int id)
        {
            Incident_Patrol incident_Patrol = db.Incident_Patrol.Find(id);
            if (incident_Patrol == null)
            {
                return NotFound();
            }

            return Ok(incident_Patrol);
        }

        // PUT: api/Incident_Patrol/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutIncident_Patrol(int id, Incident_Patrol incident_Patrol)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != incident_Patrol.Incident_ID)
            {
                return BadRequest();
            }

            db.Entry(incident_Patrol).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Incident_PatrolExists(id))
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

        // POST: api/Incident_Patrol
        [ResponseType(typeof(Incident_Patrol))]
        public IHttpActionResult PostIncident_Patrol(Incident_Patrol incident_Patrol)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Incident_Patrol.Add(incident_Patrol);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (Incident_PatrolExists(incident_Patrol.Incident_ID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = incident_Patrol.Incident_ID }, incident_Patrol);
        }

        // DELETE: api/Incident_Patrol/5
        [ResponseType(typeof(Incident_Patrol))]
        public IHttpActionResult DeleteIncident_Patrol(int id)
        {
            Incident_Patrol incident_Patrol = db.Incident_Patrol.Find(id);
            if (incident_Patrol == null)
            {
                return NotFound();
            }

            db.Incident_Patrol.Remove(incident_Patrol);
            db.SaveChanges();

            return Ok(incident_Patrol);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool Incident_PatrolExists(int id)
        {
            return db.Incident_Patrol.Count(e => e.Incident_ID == id) > 0;
        }
    }
}