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
    public class Access_LevelController : ApiController
    {
        private INF370Entities db = new INF370Entities();

        // GET: api/Access_Level
        public IQueryable<Access_Level> GetAccess_Level()
        {
            return db.Access_Level;
        }

        // GET: api/Access_Level/5
        [ResponseType(typeof(Access_Level))]
        public IHttpActionResult GetAccess_Level(int id)
        {
            Access_Level access_Level = db.Access_Level.Find(id);
            if (access_Level == null)
            {
                return NotFound();
            }

            return Ok(access_Level);
        }

        // PUT: api/Access_Level/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutAccess_Level(int id, Access_Level access_Level)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != access_Level.Access_ID)
            {
                return BadRequest();
            }

            db.Entry(access_Level).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Access_LevelExists(id))
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

        // POST: api/Access_Level
        [ResponseType(typeof(Access_Level))]
        public IHttpActionResult PostAccess_Level(Access_Level access_Level)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Access_Level.Add(access_Level);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = access_Level.Access_ID }, access_Level);
        }

        // DELETE: api/Access_Level/5
        [ResponseType(typeof(Access_Level))]
        public IHttpActionResult DeleteAccess_Level(int id)
        {
            Access_Level access_Level = db.Access_Level.Find(id);
            if (access_Level == null)
            {
                return NotFound();
            }

            db.Access_Level.Remove(access_Level);
            db.SaveChanges();

            return Ok(access_Level);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool Access_LevelExists(int id)
        {
            return db.Access_Level.Count(e => e.Access_ID == id) > 0;
        }
    }
}