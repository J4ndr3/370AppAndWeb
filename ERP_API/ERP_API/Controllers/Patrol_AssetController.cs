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
    public class Patrol_AssetController : ApiController
    {
        private INF370Entities db = new INF370Entities();

        // GET: api/Patrol_Asset
        public IQueryable<Patrol_Asset> GetPatrol_Asset()
        {
            return db.Patrol_Asset;
        }

        // GET: api/Patrol_Asset/5
        [ResponseType(typeof(Patrol_Asset))]
        public IHttpActionResult GetPatrol_Asset(int id)
        {
            Patrol_Asset patrol_Asset = db.Patrol_Asset.Find(id);
            if (patrol_Asset == null)
            {
                return NotFound();
            }

            return Ok(patrol_Asset);
        }

        // PUT: api/Patrol_Asset/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutPatrol_Asset(int id, Patrol_Asset patrol_Asset)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != patrol_Asset.Patrol_Log_ID)
            {
                return BadRequest();
            }

            db.Entry(patrol_Asset).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Patrol_AssetExists(id))
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

        // POST: api/Patrol_Asset
        [ResponseType(typeof(Patrol_Asset))]
        public IHttpActionResult PostPatrol_Asset(Patrol_Asset patrol_Asset)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Patrol_Asset.Add(patrol_Asset);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (Patrol_AssetExists(patrol_Asset.Patrol_Log_ID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = patrol_Asset.Patrol_Log_ID }, patrol_Asset);
        }

        // DELETE: api/Patrol_Asset/5
        [ResponseType(typeof(Patrol_Asset))]
        public IHttpActionResult DeletePatrol_Asset(int id)
        {
            Patrol_Asset patrol_Asset = db.Patrol_Asset.Find(id);
            if (patrol_Asset == null)
            {
                return NotFound();
            }

            db.Patrol_Asset.Remove(patrol_Asset);
            db.SaveChanges();

            return Ok(patrol_Asset);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool Patrol_AssetExists(int id)
        {
            return db.Patrol_Asset.Count(e => e.Patrol_Log_ID == id) > 0;
        }
    }
}