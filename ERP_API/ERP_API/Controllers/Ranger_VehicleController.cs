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
    public class Ranger_VehicleController : ApiController
    {
        private INF370Entities db = new INF370Entities();

        // GET: api/Ranger_Vehicle
        public IQueryable<Ranger_Vehicle> GetRanger_Vehicle()
        {
            return db.Ranger_Vehicle;
        }

        // GET: api/Ranger_Vehicle/5
        [ResponseType(typeof(Ranger_Vehicle))]
        public IHttpActionResult GetRanger_Vehicle(int id)
        {
            Ranger_Vehicle ranger_Vehicle = db.Ranger_Vehicle.Find(id);
            if (ranger_Vehicle == null)
            {
                return NotFound();
            }

            return Ok(ranger_Vehicle);
        }

        // PUT: api/Ranger_Vehicle/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutRanger_Vehicle(int id, Ranger_Vehicle ranger_Vehicle)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != ranger_Vehicle.Vehicle_ID)
            {
                return BadRequest();
            }

            db.Entry(ranger_Vehicle).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Ranger_VehicleExists(id))
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

        // POST: api/Ranger_Vehicle
        [ResponseType(typeof(Ranger_Vehicle))]
        public IHttpActionResult PostRanger_Vehicle(Ranger_Vehicle ranger_Vehicle)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Ranger_Vehicle.Add(ranger_Vehicle);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (Ranger_VehicleExists(ranger_Vehicle.Vehicle_ID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = ranger_Vehicle.Vehicle_ID }, ranger_Vehicle);
        }

        // DELETE: api/Ranger_Vehicle/5
        [ResponseType(typeof(Ranger_Vehicle))]
        public IHttpActionResult DeleteRanger_Vehicle(int id)
        {
            Ranger_Vehicle ranger_Vehicle = db.Ranger_Vehicle.Find(id);
            if (ranger_Vehicle == null)
            {
                return NotFound();
            }

            db.Ranger_Vehicle.Remove(ranger_Vehicle);
            db.SaveChanges();

            return Ok(ranger_Vehicle);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool Ranger_VehicleExists(int id)
        {
            return db.Ranger_Vehicle.Count(e => e.Vehicle_ID == id) > 0;
        }
    }
}