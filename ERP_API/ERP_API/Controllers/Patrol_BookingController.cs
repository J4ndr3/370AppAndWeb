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
using System.Web.Http.Cors;
using System.Dynamic;

namespace ERP_API.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class Patrol_BookingController : ApiController
    {
        private INF370Entities db = new INF370Entities();

        // GET: api/Patrol_Booking
        public List<dynamic> GetPatrol_Booking()
        {
            List<dynamic> toReturn = new List<dynamic>();
            try
            {
                db.Configuration.ProxyCreationEnabled = false;
                List<Patrol_Booking> bookings = db.Patrol_Booking.Include(zz => zz.Ranger).Include(xx => xx.Reserve).Include(cc => cc.Vehicle).ToList();
                foreach (Patrol_Booking Item in bookings)
                {
                    dynamic m = new ExpandoObject();
                    m.Patrol_Booking_ID = Item.Patrol_Booking_ID;
                    m.Vehicle_ID = Item.Vehicle_ID;
                    m.Registration = Item.Vehicle.Registration;
                    m.Ranger_ID = Item.Ranger_ID;
                    m.Name = db.Rangers.Where(zz=>zz.Ranger_ID == Item.Ranger_ID).Select(zz=>zz.Name).FirstOrDefault() + " " + db.Rangers.Where(zz => zz.Ranger_ID == Item.Ranger_ID).Select(zz => zz.Surname).FirstOrDefault();
                    if (Item.Passenger_ID != null) {
                        m.Passenger = db.Rangers.Where(zz => zz.Ranger_ID == Item.Passenger_ID).Select(x => x.Name).FirstOrDefault();
                        m.PassSurname = db.Rangers.Where(zz => zz.Ranger_ID == Item.Passenger_ID).Select(x => x.Surname).FirstOrDefault(); ;
                    }
                    else
                    {
                        m.Passenger = "None";
                    }
                    m.Reserve = Item.Reserve.Name;
                    m.Start_Time = Item.Start_Time;
                    m.End_Time = Item.End_Time;
                    toReturn.Add(m);
                }
                return toReturn;
            }
            catch (Exception err)
            {
                toReturn.Add("Not readable");
                return toReturn;
            }


        }
        // GET: api/Patrol_Booking/5
        [ResponseType(typeof(Patrol_Booking))]
        public IHttpActionResult GetPatrol_Booking(int id)
        {
            db.Configuration.ProxyCreationEnabled = false;
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
            db.Configuration.ProxyCreationEnabled = false;
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