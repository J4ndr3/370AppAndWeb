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
    public class ReservesController : ApiController
    {
        private INF370Entities db = new INF370Entities();
        
        // GET: api/Reserves
        public List<dynamic> GetReserves()
        {
            db.Configuration.ProxyCreationEnabled = false;
            List<Reserve> Reserve = db.Reserves.ToList();
            List<dynamic> toReturn = new List<dynamic>();
            foreach (Reserve Item in Reserve)
            {
                dynamic m = new ExpandoObject();
                m.ID = Item.Reserve_ID;
                m.Description = Item.Description;
                m.Name = Item.Name;
                m.Lat = Item.Lat;
                m.Lng = Item.Lng;
                toReturn.Add(m);
            }
            return toReturn;
        }

        // GET: api/Reserves/5
        [ResponseType(typeof(Reserve))]
        public IHttpActionResult GetReserve(int id)
        {
            db.Configuration.ProxyCreationEnabled = false;
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
            db.Configuration.ProxyCreationEnabled = false;
            try
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
                        return Ok(1);
                    }
                    else
                    {
                        throw;
                    }
                }

                return StatusCode(HttpStatusCode.NoContent);
            }
            catch
            {
                return Ok(2);
            }
        }

        // POST: api/Reserves
        [ResponseType(typeof(Reserve))]
        public IHttpActionResult PostReserve(Reserve reserve)
        {
            db.Configuration.ProxyCreationEnabled = false;
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
            db.Configuration.ProxyCreationEnabled = false;
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