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
    public class Vehicle_TypeController : ApiController
    {
        private INF370Entities db = new INF370Entities();

        // GET: api/Vehicle_Type
        public IQueryable<Vehicle_Type> GetVehicle_Type()
        {
            return db.Vehicle_Type;
        }

        // GET: api/Vehicle_Type/5
        [ResponseType(typeof(Vehicle_Type))]
        public IHttpActionResult GetVehicle_Type(int id)
        {
            Vehicle_Type vehicle_Type = db.Vehicle_Type.Find(id);
            if (vehicle_Type == null)
            {
                return NotFound();
            }

            return Ok(vehicle_Type);
        }

        // PUT: api/Vehicle_Type/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutVehicle_Type(int id, Vehicle_Type vehicle_Type)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != vehicle_Type.Vehicle_Type_ID)
            {
                return BadRequest();
            }

            db.Entry(vehicle_Type).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Vehicle_TypeExists(id))
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

        // POST: api/Vehicle_Type
        [ResponseType(typeof(Vehicle_Type))]
        public IHttpActionResult PostVehicle_Type(Vehicle_Type vehicle_Type)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Vehicle_Type.Add(vehicle_Type);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = vehicle_Type.Vehicle_Type_ID }, vehicle_Type);
        }

        // DELETE: api/Vehicle_Type/5
        [ResponseType(typeof(Vehicle_Type))]
        public IHttpActionResult DeleteVehicle_Type(int id)
        {
            Vehicle_Type vehicle_Type = db.Vehicle_Type.Find(id);
            if (vehicle_Type == null)
            {
                return NotFound();
            }

            db.Vehicle_Type.Remove(vehicle_Type);
            db.SaveChanges();

            return Ok(vehicle_Type);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool Vehicle_TypeExists(int id)
        {
            return db.Vehicle_Type.Count(e => e.Vehicle_Type_ID == id) > 0;
        }
    }
}