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
    public class TrackingsController : ApiController
    {
        private INF370Entities db = new INF370Entities();

        public List<dynamic> GetTrackings()
        {
            // GET: api/Patrol_Log
            try
            {
                db.Configuration.ProxyCreationEnabled = false;
                List<Tracking> tracking = db.Trackings.Include(zz => zz.Patrol_Log).ToList();
                List<dynamic> toReturn = new List<dynamic>();
                foreach (Tracking Item in tracking)
                {
                    dynamic m = new ExpandoObject();
                    m.Patrol_Log_ID = Item.Patrol_Log_ID;
                    m.Tracking_ID = Item.Tracking_ID;
                    m.Lattitude = Item.Lattitude;
                    m.Longitude = Item.Longitude;
                    
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

        // GET: api/Trackings/5
        [ResponseType(typeof(Tracking))]
        public IHttpActionResult GetTracking(int id)
        {
            Tracking tracking = db.Trackings.Find(id);
            if (tracking == null)
            {
                return NotFound();
            }

            return Ok(tracking);
        }

        // PUT: api/Trackings/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTracking(int id, Tracking tracking)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tracking.Tracking_ID)
            {
                return BadRequest();
            }

            db.Entry(tracking).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TrackingExists(id))
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

        // POST: api/Trackings
        [ResponseType(typeof(Tracking))]
        public IHttpActionResult PostTracking(List<Tracking> track)
        {
            foreach (var tracking in track)
            {
                db.Configuration.ProxyCreationEnabled = false;
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                db.Trackings.Add(tracking);
                db.SaveChanges();
            }

            return CreatedAtRoute("DefaultApi", new { id = track.Last().Tracking_ID }, track.Last());
        }

        // DELETE: api/Trackings/5
        [ResponseType(typeof(Tracking))]
        public IHttpActionResult DeleteTracking(int id)
        {
            Tracking tracking = db.Trackings.Find(id);
            if (tracking == null)
            {
                return NotFound();
            }

            db.Trackings.Remove(tracking);
            db.SaveChanges();

            return Ok(tracking);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TrackingExists(int id)
        {
            return db.Trackings.Count(e => e.Tracking_ID == id) > 0;
        }
    }
}