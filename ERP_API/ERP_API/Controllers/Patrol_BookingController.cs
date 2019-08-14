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
    public class Patrol_BookingController : ApiController
    {
        private INF370Entities db = new INF370Entities();

        // GET: api/Patrol_Booking
        public IQueryable<Patrol_Booking> GetPatrol_Booking()
        {
            return db.Patrol_Booking;
        }

        // GET: api/Patrol_Booking/5
        [ResponseType(typeof(Patrol_Booking))]
        public IHttpActionResult GetPatrol_Booking(int id)
        {
            Patrol_Booking patrol_Booking = db.Patrol_Booking.Find(id);
            if (patrol_Booking == null)
            {
                return NotFound();
            }

            return Ok(patrol_Booking);
        }

        // PUT: api/Patrol_Booking/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutPatrol_Booking(int id, Patrol_Booking patrol_Booking)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != patrol_Booking.Patrol_Booking_ID)
            {
                return BadRequest();
            }

            db.Entry(patrol_Booking).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Patrol_BookingExists(id))
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

        // POST: api/Patrol_Booking
        [ResponseType(typeof(Patrol_Booking))]
        public IHttpActionResult PostPatrol_Booking(Patrol_Booking patrol_Booking)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Patrol_Booking.Add(patrol_Booking);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = patrol_Booking.Patrol_Booking_ID }, patrol_Booking);
        }

        // DELETE: api/Patrol_Booking/5
        [ResponseType(typeof(Patrol_Booking))]
        public IHttpActionResult DeletePatrol_Booking(int id)
        {
            Patrol_Booking patrol_Booking = db.Patrol_Booking.Find(id);
            if (patrol_Booking == null)
            {
                return NotFound();
            }

            db.Patrol_Booking.Remove(patrol_Booking);
            db.SaveChanges();

            return Ok(patrol_Booking);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool Patrol_BookingExists(int id)
        {
            return db.Patrol_Booking.Count(e => e.Patrol_Booking_ID == id) > 0;
        }
    }
}