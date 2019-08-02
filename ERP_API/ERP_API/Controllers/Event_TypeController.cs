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
    public class Event_TypeController : ApiController
    {
        private INF370Entities db = new INF370Entities();

        // GET: api/Event_Type
        public IQueryable<Event_Type> GetEvent_Type()
        {
            return db.Event_Type;
        }

        // GET: api/Event_Type/5
        [ResponseType(typeof(Event_Type))]
        public IHttpActionResult GetEvent_Type(int id)
        {
            Event_Type event_Type = db.Event_Type.Find(id);
            if (event_Type == null)
            {
                return NotFound();
            }

            return Ok(event_Type);
        }

        // PUT: api/Event_Type/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutEvent_Type(int id, Event_Type event_Type)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != event_Type.Type_ID)
            {
                return BadRequest();
            }

            db.Entry(event_Type).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Event_TypeExists(id))
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

        // POST: api/Event_Type
        [ResponseType(typeof(Event_Type))]
        public IHttpActionResult PostEvent_Type(Event_Type event_Type)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Event_Type.Add(event_Type);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = event_Type.Type_ID }, event_Type);
        }

        // DELETE: api/Event_Type/5
        [ResponseType(typeof(Event_Type))]
        public IHttpActionResult DeleteEvent_Type(int id)
        {
            Event_Type event_Type = db.Event_Type.Find(id);
            if (event_Type == null)
            {
                return NotFound();
            }

            db.Event_Type.Remove(event_Type);
            db.SaveChanges();

            return Ok(event_Type);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool Event_TypeExists(int id)
        {
            return db.Event_Type.Count(e => e.Type_ID == id) > 0;
        }
    }
}