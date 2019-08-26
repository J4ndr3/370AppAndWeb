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
    public class Incident_PatrolController : ApiController
    {
        private INF370Entities db = new INF370Entities();

        // GET: api/Incident_Patrol
        public List<dynamic> GetIncident_Patrol()
        {
            List<dynamic> toReturn = new List<dynamic>();
            try
            {
                db.Configuration.ProxyCreationEnabled = false;
                List<Incident_Patrol> incidents = db.Incident_Patrol.
                    Include(zz=> zz.Patrol_Log.Ranger).
                    Include(zz=>zz.Incident.Incident_Type).
                    Include(zz=>zz.Incident.Incident_Type.Incident_Level).
                    Include(zz=>zz.Incident.Incident_Status)
                    .Where(zz => zz.Incident.Incident_Status_ID == 2).
                   ToList();
                
                foreach (Incident_Patrol Item in incidents)
                {
                    dynamic m = new ExpandoObject();
                    m.ID = Item.Incident_ID;
                    m.Description = Item.Incident.Description;
                    m.Type = Item.Incident.Incident_Type.Description;
                    m.Level = Item.Incident.Incident_Type.Incident_Level.Description;
                    m.Status = Item.Incident.Incident_Status.Description;
                    m.StatID = Item.Incident.Incident_Status_ID;
                    m.Name = Item.Patrol_Log.Ranger.Name;
                    m.Surname= Item.Patrol_Log.Ranger.Surname;
                    m.Date = Item.Date.ToShortDateString();
                    m.Time =Item.Time;
                    m.Lat = Item.Lat;
                    m.lng = Item.Lng;
                    m.images = getIMG(Item.Incident_Patrol_ID);
                    toReturn.Add(m);
                }
                return toReturn;
            }
            catch(Exception err)
            {
                toReturn.Add("Not readable");
                return toReturn;
            }

        }

        private List<dynamic> getIMG(int ID)
        {
            List<dynamic> dynamicImages = new List<dynamic>();
            try
            {
                List<Incident_Image> imageList = db.Incident_Image.Where(zz => zz.Patrol_Log_ID == ID).ToList();
                foreach (Incident_Image img in imageList)
                {
                    dynamic item = new ExpandoObject();
                    item.ID =img.Incident_Image_ID;
                    item.Image = img.Image;
                    dynamicImages.Add(item);
                }
                return dynamicImages;
            }
            catch
            {
                dynamicImages.Add("Not readable");
                return dynamicImages;
            }
            
        }

        // GET: api/Incident_Patrol1
        [System.Web.Http.Route("api/Incident_Patrol/GetIncident_Patrol1")]
        public List<dynamic> GetIncident_Patrol1()
        {
            db.Configuration.ProxyCreationEnabled = false;
            //List<Incident_Patrol> Level = db.Incident_Patrol.Include(zz => zz.Incident).Include(zz => zz.Incident_Level).Include(zz => zz.Incident_Type).Include(zz => zz.Ranger).ToList();
            List<Incident_Patrol> incidents = db.Incident_Patrol.
                    Include(zz => zz.Patrol_Log.Ranger).
                    Include(zz => zz.Incident.Incident_Type).
                    Include(zz => zz.Incident.Incident_Type.Incident_Level).
                    Include(zz => zz.Incident.Incident_Status).
                   ToList();
            List<dynamic> toReturn = new List<dynamic>();
            foreach (Incident_Patrol Item in incidents)
            {
                dynamic m = new ExpandoObject();
                m.Lat = Item.Lat;
                m.Long = Item.Lng;
                m.Title = Item.Incident.Incident_Type.Description;
                m.Name = Item.Patrol_Log.Ranger.Name;
                m.Surname = Item.Patrol_Log.Ranger.Surname;
                m.Cell = Item.Patrol_Log.Ranger.Cell;
                m.Date = Item.Date.ToShortDateString();
                m.Time = Item.Time;
                m.Level = Item.Incident.Incident_Type.Incident_Level.Description;
                toReturn.Add(m);
            }
            return toReturn;
        }
        // GET: api/Incident_Patrol/5
        [ResponseType(typeof(Incident_Patrol))]
        public IHttpActionResult GetIncident_Patrol(int id)
        {

            db.Configuration.ProxyCreationEnabled = false;
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
            db.Configuration.ProxyCreationEnabled = false;
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