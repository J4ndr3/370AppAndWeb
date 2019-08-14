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
    public class MakesController : ApiController
    {
        private INF370Entities db = new INF370Entities();

        // GET: api/Makes
        public List<dynamic> GetMakes()
        {
            List<dynamic> toReturn = new List<dynamic>();
            try
            {
                db.Configuration.ProxyCreationEnabled = false;
                List<Make> cars = db.Makes.ToList();

                foreach (Make Item in cars)
                {
                    dynamic m = new ExpandoObject();
                    m.Make_ID = Item.Make_ID;
                    m.Name = Item.Name;

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

        // GET: api/Makes/5
        [ResponseType(typeof(Make))]
        public IHttpActionResult GetMake(int id)
        {
            Make make = db.Makes.Find(id);
            if (make == null)
            {
                return NotFound();
            }

            return Ok(make);
        }

        // PUT: api/Makes/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutMake(int id, Make make)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != make.Make_ID)
            {
                return BadRequest();
            }

            db.Entry(make).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MakeExists(id))
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

        // POST: api/Makes
        [ResponseType(typeof(Make))]
        public IHttpActionResult PostMake(Make make)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Makes.Add(make);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = make.Make_ID }, make);
        }

        // DELETE: api/Makes/5
        [ResponseType(typeof(Make))]
        public IHttpActionResult DeleteMake(int id)
        {
            Make make = db.Makes.Find(id);
            if (make == null)
            {
                return NotFound();
            }

            db.Makes.Remove(make);
            db.SaveChanges();

            return Ok(make);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool MakeExists(int id)
        {
            return db.Makes.Count(e => e.Make_ID == id) > 0;
        }
    }
}