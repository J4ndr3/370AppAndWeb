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
    public class TrackingsController : ApiController
    {
        private INF370Entities db = new INF370Entities();

        // GET: api/Trackings
        public IQueryable<Tracking> GetTrackings()
        {
            return db.Trackings;
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
        public IHttpActionResult PostTracking(Tracking tracking)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Trackings.Add(tracking);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = tracking.Tracking_ID }, tracking);
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