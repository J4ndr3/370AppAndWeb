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
    public class IncidentsController : ApiController
    {
        private INF370Entities db = new INF370Entities();

        // GET: api/Incidents
        public List<dynamic> GetIncidents()
        {

            db.Configuration.ProxyCreationEnabled = false;
            List<Incident> incidents = db.Incidents.Include(zz=>zz.Incident_Type).
                Include(zz=>zz.Incident_Status).
                Include(zz=>zz.Incident_Type.Incident_Level).ToList();
            List<dynamic> toReturn = new List<dynamic>();
            foreach (Incident Item in incidents)
            {
                dynamic m = new ExpandoObject();
                m.ID = Item.Incident_ID;
                m.Description = Item.Description;
                m.Type = Item.Incident_Type.Description;
                m.Type_ID = Item.Incident_Type_ID;
                m.Level = Item.Incident_Type.Incident_Level.Description;
                m.StatID = Item.Incident_Status_ID;
                toReturn.Add(m);
            }
            return toReturn;
        }

        // GET: api/Incidents/5
        [ResponseType(typeof(Incident))]
        public IHttpActionResult GetIncident(int id)
        {
            db.Configuration.ProxyCreationEnabled = false;
            Incident incident = db.Incidents.Find(id);
            if (incident == null)
            {
                return NotFound();
            }

            return Ok(incident);
        }

        // PUT: api/Incidents/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutIncident(int id, Incident incident)
        {
            db.Configuration.ProxyCreationEnabled = false;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != incident.Incident_ID)
            {
                return BadRequest();
            }

            db.Entry(incident).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!IncidentExists(id))
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

        // POST: api/Incidents
        [ResponseType(typeof(Incident))]
        public IHttpActionResult PostIncident(Incident incident)
        {
            db.Configuration.ProxyCreationEnabled = false;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Incidents.Add(incident);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = incident.Incident_ID }, incident);
        }

        // DELETE: api/Incidents/5
        [ResponseType(typeof(Incident))]
        public IHttpActionResult DeleteIncident(int id)
        {
            Incident incident = db.Incidents.Find(id);
            if (incident == null)
            {
                return NotFound();
            }

            db.Incidents.Remove(incident);
            db.SaveChanges();

            return Ok(incident);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool IncidentExists(int id)
        {
            return db.Incidents.Count(e => e.Incident_ID == id) > 0;
        }
    }
}