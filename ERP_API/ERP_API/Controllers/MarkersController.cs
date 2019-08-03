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
    public class MarkersController : ApiController
    {
        private INF370Entities db = new INF370Entities();

        // GET: api/Markers
        public IQueryable<Marker> GetMarkers()
        {
            return db.Markers;
        }

        // GET: api/Markers/5
        [ResponseType(typeof(Marker))]
        public IHttpActionResult GetMarker(int id)
        {
            Marker marker = db.Markers.Find(id);
            if (marker == null)
            {
                return NotFound();
            }

            return Ok(marker);
        }

        // PUT: api/Markers/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutMarker(int id, Marker marker)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != marker.Marker_ID)
            {
                return BadRequest();
            }

            db.Entry(marker).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MarkerExists(id))
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

        // POST: api/Markers
        [ResponseType(typeof(Marker))]
        public IHttpActionResult PostMarker(Marker marker)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Markers.Add(marker);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = marker.Marker_ID }, marker);
        }

        // DELETE: api/Markers/5
        [ResponseType(typeof(Marker))]
        public IHttpActionResult DeleteMarker(int id)
        {
            Marker marker = db.Markers.Find(id);
            if (marker == null)
            {
                return NotFound();
            }

            db.Markers.Remove(marker);
            db.SaveChanges();

            return Ok(marker);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool MarkerExists(int id)
        {
            return db.Markers.Count(e => e.Marker_ID == id) > 0;
        }
    }
}