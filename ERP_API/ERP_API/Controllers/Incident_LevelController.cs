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
    public class Incident_LevelController : ApiController
    {
        private INF370Entities db = new INF370Entities();

        // GET: api/Incident_Level
        public IQueryable<Incident_Level> GetIncident_Level()
        {
            return db.Incident_Level;
        }

        // GET: api/Incident_Level/5
        [ResponseType(typeof(Incident_Level))]
        public IHttpActionResult GetIncident_Level(int id)
        {
            Incident_Level incident_Level = db.Incident_Level.Find(id);
            if (incident_Level == null)
            {
                return NotFound();
            }

            return Ok(incident_Level);
        }

        // PUT: api/Incident_Level/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutIncident_Level(int id, Incident_Level incident_Level)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != incident_Level.Incident_Level_ID)
            {
                return BadRequest();
            }

            db.Entry(incident_Level).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Incident_LevelExists(id))
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

        // POST: api/Incident_Level
        [ResponseType(typeof(Incident_Level))]
        public IHttpActionResult PostIncident_Level(Incident_Level incident_Level)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Incident_Level.Add(incident_Level);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = incident_Level.Incident_Level_ID }, incident_Level);
        }

        // DELETE: api/Incident_Level/5
        [ResponseType(typeof(Incident_Level))]
        public IHttpActionResult DeleteIncident_Level(int id)
        {
            Incident_Level incident_Level = db.Incident_Level.Find(id);
            if (incident_Level == null)
            {
                return NotFound();
            }

            db.Incident_Level.Remove(incident_Level);
            db.SaveChanges();

            return Ok(incident_Level);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool Incident_LevelExists(int id)
        {
            return db.Incident_Level.Count(e => e.Incident_Level_ID == id) > 0;
        }
    }
}