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
    public class User_RoleController : ApiController
    {
        private INF370Entities db = new INF370Entities();

        // GET: api/User_Role
        public IQueryable<User_Role> GetUser_Role()
        {
            return db.User_Role;
        }

        // GET: api/User_Role/5
        [ResponseType(typeof(User_Role))]
        public IHttpActionResult GetUser_Role(int id)
        {
            User_Role user_Role = db.User_Role.Find(id);
            if (user_Role == null)
            {
                return NotFound();
            }

            return Ok(user_Role);
        }

        // PUT: api/User_Role/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutUser_Role(int id, User_Role user_Role)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != user_Role.User_Role_ID)
            {
                return BadRequest();
            }

            db.Entry(user_Role).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!User_RoleExists(id))
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

        // POST: api/User_Role
        [ResponseType(typeof(User_Role))]
        public IHttpActionResult PostUser_Role(User_Role user_Role)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.User_Role.Add(user_Role);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = user_Role.User_Role_ID }, user_Role);
        }

        // DELETE: api/User_Role/5
        [ResponseType(typeof(User_Role))]
        public IHttpActionResult DeleteUser_Role(int id)
        {
            User_Role user_Role = db.User_Role.Find(id);
            if (user_Role == null)
            {
                return NotFound();
            }

            db.User_Role.Remove(user_Role);
            db.SaveChanges();

            return Ok(user_Role);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool User_RoleExists(int id)
        {
            return db.User_Role.Count(e => e.User_Role_ID == id) > 0;
        }
    }
}