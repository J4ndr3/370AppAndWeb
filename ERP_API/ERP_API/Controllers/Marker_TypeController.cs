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
    public class Marker_TypeController : ApiController
    {
        private INF370Entities db = new INF370Entities();

        // GET: api/Marker_Type
        public IQueryable<Marker_Type> GetMarker_Type()
        {
            return db.Marker_Type;
        }

        // GET: api/Marker_Type/5
        [ResponseType(typeof(Marker_Type))]
        public IHttpActionResult GetMarker_Type(int id)
        {
            Marker_Type marker_Type = db.Marker_Type.Find(id);
            if (marker_Type == null)
            {
                return NotFound();
            }

            return Ok(marker_Type);
        }

        // PUT: api/Marker_Type/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutMarker_Type(int id, Marker_Type marker_Type)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != marker_Type.Marker_Type_ID)
            {
                return BadRequest();
            }

            db.Entry(marker_Type).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Marker_TypeExists(id))
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

        // POST: api/Marker_Type
        [ResponseType(typeof(Marker_Type))]
        public IHttpActionResult PostMarker_Type(Marker_Type marker_Type)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Marker_Type.Add(marker_Type);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = marker_Type.Marker_Type_ID }, marker_Type);
        }

        // DELETE: api/Marker_Type/5
        [ResponseType(typeof(Marker_Type))]
        public IHttpActionResult DeleteMarker_Type(int id)
        {
            Marker_Type marker_Type = db.Marker_Type.Find(id);
            if (marker_Type == null)
            {
                return NotFound();
            }

            db.Marker_Type.Remove(marker_Type);
            db.SaveChanges();

            return Ok(marker_Type);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool Marker_TypeExists(int id)
        {
            return db.Marker_Type.Count(e => e.Marker_Type_ID == id) > 0;
        }
    }
}