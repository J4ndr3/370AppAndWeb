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
    public class Patrol_MarkerController : ApiController
    {
        private INF370Entities db = new INF370Entities();

        // GET: api/Patrol_Marker
        public List<dynamic> GetPatrol_Marker()
        {
            List<Patrol_Marker> Level = db.Patrol_Marker.Include(zz => zz.Patrol_Log).Include(zz => zz.Ranger).ToList();
            List<dynamic> toReturn = new List<dynamic>();
            foreach (Patrol_Marker Item in Level)
            {
                dynamic m = new ExpandoObject();

                m.Name = Item.Ranger.Name;
                m.Surname = Item.Ranger.Surname;
                m.Cell = Item.Ranger.Cell;
                m.Points = Item.Ranger.Points;
                m.Checkin = Item.Patrol_Log.Checkin;
                m.Checkout = Item.Patrol_Log.Checkout;
                m.Passed = Item.Date_Time_Passed;

                toReturn.Add(m);
            }
            return toReturn;
        }

        // GET: api/Patrol_Marker/5
        [ResponseType(typeof(Patrol_Marker))]
        public IHttpActionResult GetPatrol_Marker(int id)
        {
            Patrol_Marker patrol_Marker = db.Patrol_Marker.Find(id);
            if (patrol_Marker == null)
            {
                return NotFound();
            }

            return Ok(patrol_Marker);
        }

        // PUT: api/Patrol_Marker/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutPatrol_Marker(int id, Patrol_Marker patrol_Marker)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != patrol_Marker.Patrol_Log_ID)
            {
                return BadRequest();
            }

            db.Entry(patrol_Marker).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Patrol_MarkerExists(id))
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

        // POST: api/Patrol_Marker
        [ResponseType(typeof(Patrol_Marker))]
        public IHttpActionResult PostPatrol_Marker(Patrol_Marker patrol_Marker)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Patrol_Marker.Add(patrol_Marker);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (Patrol_MarkerExists(patrol_Marker.Patrol_Log_ID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = patrol_Marker.Patrol_Log_ID }, patrol_Marker);
        }

        // DELETE: api/Patrol_Marker/5
        [ResponseType(typeof(Patrol_Marker))]
        public IHttpActionResult DeletePatrol_Marker(int id)
        {
            Patrol_Marker patrol_Marker = db.Patrol_Marker.Find(id);
            if (patrol_Marker == null)
            {
                return NotFound();
            }

            db.Patrol_Marker.Remove(patrol_Marker);
            db.SaveChanges();

            return Ok(patrol_Marker);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool Patrol_MarkerExists(int id)
        {
            return db.Patrol_Marker.Count(e => e.Patrol_Log_ID == id) > 0;
        }
    }
}