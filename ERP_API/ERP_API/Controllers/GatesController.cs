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
    public class GatesController : ApiController
    {
        private INF370Entities db = new INF370Entities();

        // GET: api/Gates
        public List<dynamic> GetGates()
        {
            try
            {
                db.Configuration.ProxyCreationEnabled = false;
                List<Gate> Gate = db.Gates.Include(zz => zz.Reserve).ToList();
                List<dynamic> toReturn = new List<dynamic>();
                foreach (Gate Item in Gate)
                {
                    dynamic m = new ExpandoObject();
                    m.ID = Item.Gate_ID;
                    m.Descriprion = Item.Descriprion;
                    m.Reserve = Item.Reserve.Name;
                    m.Lattitude = Item.Lattitude;
                    m.Longitude = Item.Longitude;
                    m.Name = Item.Name;
                    toReturn.Add(m);
                }
                return toReturn;
            }
            catch (Exception err)
            {
                List<dynamic> toReturn = new List<dynamic>();
                toReturn.Add("Not readable");
                return toReturn;
            }
            
            
        }

        // GET: api/Gates/5
        [ResponseType(typeof(Gate))]
        public IHttpActionResult GetGate(int id)
        {

            db.Configuration.ProxyCreationEnabled = false;
            Gate gate = db.Gates.Find(id);
            if (gate == null)
            {
                return Ok(1);
            }

            return Ok(gate);
        }

        // PUT: api/Gates/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutGate(int id, Gate gate)
        {
            db.Configuration.ProxyCreationEnabled = false;
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                if (id != gate.Gate_ID)
                {
                    return BadRequest();
                }

                db.Entry(gate).State = EntityState.Modified;

                try
                {
                    db.SaveChanges();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!GateExists(id))
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

        // POST: api/Gates
        [ResponseType(typeof(Gate))]
        public IHttpActionResult PostGate(Gate gate)
        {
            db.Configuration.ProxyCreationEnabled = false;
            try
            {
                //if (db.Gates.)
                //{
                //    return Ok(1);
                //}
                //else
                //{
                    if (!ModelState.IsValid)
                    {
                        return BadRequest(ModelState);
                    }
                    db.Gates.Add(gate);
                    db.SaveChanges();
                    return CreatedAtRoute("DefaultApi", new { id = gate.Gate_ID }, gate);
                //}
            }
            catch
            {
                return Ok(2);
            }
            
            
            
        }

        // DELETE: api/Gates/5
        [ResponseType(typeof(Gate))]
        public IHttpActionResult DeleteGate(int id)
        {
            try
            {
                db.Configuration.ProxyCreationEnabled = false;
                Gate gate = db.Gates.Find(id);
                if (gate == null)
                {
                    return Ok(1);
                }

                db.Gates.Remove(gate);
                db.SaveChanges();

                return Ok(gate);
            }
            catch
            {
                return Ok(2);
            }
            
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool GateExists(int id)
        {
            return db.Gates.Count(e => e.Gate_ID == id) > 0;
        }
    }
}