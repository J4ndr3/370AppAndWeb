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
    public class RangersController : ApiController
    {
        private INF370Entities db = new INF370Entities();

        // GET: api/Rangers
        public IQueryable<Ranger> GetRangers()
        {
            return db.Rangers;
        }

        // GET: api/Rangers/5
        [ResponseType(typeof(Ranger))]
        public IHttpActionResult GetRanger(int id)
        {
            Ranger ranger = db.Rangers.Find(id);
            if (ranger == null)
            {
                return NotFound();
            }

            return Ok(ranger);
        }

        // PUT: api/Rangers/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutRanger(int id, Ranger ranger)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != ranger.Ranger_ID)
            {
                return BadRequest();
            }

            db.Entry(ranger).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RangerExists(id))
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

        // POST: api/Rangers
        [ResponseType(typeof(Ranger))]
        public IHttpActionResult PostRanger(Ranger ranger)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Rangers.Add(ranger);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = ranger.Ranger_ID }, ranger);
        }

        // DELETE: api/Rangers/5
        [ResponseType(typeof(Ranger))]
        public IHttpActionResult DeleteRanger(int id)
        {
            Ranger ranger = db.Rangers.Find(id);
            if (ranger == null)
            {
                return NotFound();
            }

            db.Rangers.Remove(ranger);
            db.SaveChanges();

            return Ok(ranger);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool RangerExists(int id)
        {
            return db.Rangers.Count(e => e.Ranger_ID == id) > 0;
        }
    }
}