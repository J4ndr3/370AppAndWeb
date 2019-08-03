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
    public class ReservesController : ApiController
    {
        private INF370Entities db = new INF370Entities();

        // GET: api/Reserves
        public IQueryable<Reserve> GetReserves()
        {
            return db.Reserves;
        }

        // GET: api/Reserves/5
        [ResponseType(typeof(Reserve))]
        public IHttpActionResult GetReserve(int id)
        {
            Reserve reserve = db.Reserves.Find(id);
            if (reserve == null)
            {
                return NotFound();
            }

            return Ok(reserve);
        }

        // PUT: api/Reserves/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutReserve(int id, Reserve reserve)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != reserve.Reserve_ID)
            {
                return BadRequest();
            }

            db.Entry(reserve).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReserveExists(id))
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

        // POST: api/Reserves
        [ResponseType(typeof(Reserve))]
        public IHttpActionResult PostReserve(Reserve reserve)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Reserves.Add(reserve);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = reserve.Reserve_ID }, reserve);
        }

        // DELETE: api/Reserves/5
        [ResponseType(typeof(Reserve))]
        public IHttpActionResult DeleteReserve(int id)
        {
            Reserve reserve = db.Reserves.Find(id);
            if (reserve == null)
            {
                return NotFound();
            }

            db.Reserves.Remove(reserve);
            db.SaveChanges();

            return Ok(reserve);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ReserveExists(int id)
        {
            return db.Reserves.Count(e => e.Reserve_ID == id) > 0;
        }
    }
}