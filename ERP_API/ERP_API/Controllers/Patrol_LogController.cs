﻿using System;
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
    public class Patrol_LogController : ApiController
    {
        private INF370Entities db = new INF370Entities();

        // GET: api/Patrol_Log
        public IQueryable<Patrol_Log> GetPatrol_Log()
        {
            return db.Patrol_Log;
        }

        // GET: api/Patrol_Log/5
        [ResponseType(typeof(Patrol_Log))]
        public IHttpActionResult GetPatrol_Log(int id)
        {
            Patrol_Log patrol_Log = db.Patrol_Log.Find(id);
            if (patrol_Log == null)
            {
                return NotFound();
            }

            return Ok(patrol_Log);
        }

        // PUT: api/Patrol_Log/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutPatrol_Log(int id, Patrol_Log patrol_Log)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != patrol_Log.Patrol_Log_ID)
            {
                return BadRequest();
            }

            db.Entry(patrol_Log).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Patrol_LogExists(id))
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

        // POST: api/Patrol_Log
        [ResponseType(typeof(Patrol_Log))]
        public IHttpActionResult PostPatrol_Log(Patrol_Log patrol_Log)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Patrol_Log.Add(patrol_Log);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = patrol_Log.Patrol_Log_ID }, patrol_Log);
        }

        // DELETE: api/Patrol_Log/5
        [ResponseType(typeof(Patrol_Log))]
        public IHttpActionResult DeletePatrol_Log(int id)
        {
            Patrol_Log patrol_Log = db.Patrol_Log.Find(id);
            if (patrol_Log == null)
            {
                return NotFound();
            }

            db.Patrol_Log.Remove(patrol_Log);
            db.SaveChanges();

            return Ok(patrol_Log);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool Patrol_LogExists(int id)
        {
            return db.Patrol_Log.Count(e => e.Patrol_Log_ID == id) > 0;
        }
    }
}