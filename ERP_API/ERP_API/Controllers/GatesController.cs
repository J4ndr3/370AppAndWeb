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
    public class GatesController : ApiController
    {
        private INF370Entities db = new INF370Entities();

        // GET: api/Gates
        public IQueryable<Gate> GetGates()
        {
            return db.Gates;
        }

        // GET: api/Gates/5
        [ResponseType(typeof(Gate))]
        public IHttpActionResult GetGate(int id)
        {
            Gate gate = db.Gates.Find(id);
            if (gate == null)
            {
                return NotFound();
            }

            return Ok(gate);
        }

        // PUT: api/Gates/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutGate(int id, Gate gate)
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
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Gates
        [ResponseType(typeof(Gate))]
        public IHttpActionResult PostGate(Gate gate)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Gates.Add(gate);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = gate.Gate_ID }, gate);
        }

        // DELETE: api/Gates/5
        [ResponseType(typeof(Gate))]
        public IHttpActionResult DeleteGate(int id)
        {
            Gate gate = db.Gates.Find(id);
            if (gate == null)
            {
                return NotFound();
            }

            db.Gates.Remove(gate);
            db.SaveChanges();

            return Ok(gate);
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