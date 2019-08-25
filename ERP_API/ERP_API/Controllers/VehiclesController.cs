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
    public class VehiclesController : ApiController
    {
        private INF370Entities db = new INF370Entities();

        // GET: api/Vehicles
        public List<dynamic> GetVehicle()
        {
            List<dynamic> toReturn = new List<dynamic>();
            try
            {
                db.Configuration.ProxyCreationEnabled = false;
                List<Vehicle> cars = db.Vehicles.Include(zz=>zz.Model).
                    Include(zz=>zz.Model.Make).Include(zz=>zz.Vehicle_Type)
                    .ToList();

                foreach (Vehicle Item in cars)
                {
                    dynamic m = new ExpandoObject();
                    m.Vehicle_ID = Item.Vehicle_ID;
                    m.Registration = Item.Registration;
                    m.Colour = Item.Colour;
                    m.Model_ID = Item.Model.Model_ID;
                    m.Model = Item.Model.Model1;
                    m.MakeID = Item.Model.Make_ID;
                    m.Make = Item.Model.Make.Name;
                    m.TypeID = Item.Vehicle_Type.Vehicle_Type_ID;
                    m.Status = Item.Status;

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


        // GET: api/Vehicles/5
        [ResponseType(typeof(Vehicle))]
        public IHttpActionResult GetVehicle(int id)
        {
            db.Configuration.ProxyCreationEnabled = false;
            Vehicle vehicle = db.Vehicles.Find(id);
            if (vehicle == null)
            {
                return NotFound();
            }

            return Ok(vehicle);
        }

        // PUT: api/Vehicles/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutVehicle(int id, Vehicle vehicle)
        {
            db.Configuration.ProxyCreationEnabled = false;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != vehicle.Vehicle_ID)
            {
                return BadRequest();
            }

            db.Entry(vehicle).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VehicleExists(id))
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

        // POST: api/Vehicles
        [ResponseType(typeof(Vehicle))]
        public IHttpActionResult PostVehicle(Vehicle vehicle)
        {
            db.Configuration.ProxyCreationEnabled = false;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Vehicles.Add(vehicle);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = vehicle.Vehicle_ID }, vehicle);
        }

        // DELETE: api/Vehicles/5
        [ResponseType(typeof(Vehicle))]
        public IHttpActionResult DeleteVehicle(int id)
        {
            Vehicle vehicle = db.Vehicles.Find(id);
            if (vehicle == null)
            {
                return NotFound();
            }

            db.Vehicles.Remove(vehicle);
            db.SaveChanges();

            return Ok(vehicle);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool VehicleExists(int id)
        {
            return db.Vehicles.Count(e => e.Vehicle_ID == id) > 0;
        }
    }
}