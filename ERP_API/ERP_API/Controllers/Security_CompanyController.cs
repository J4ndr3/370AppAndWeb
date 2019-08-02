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
    public class Security_CompanyController : ApiController
    {
        private INF370Entities db = new INF370Entities();

        // GET: api/Security_Company
        public IQueryable<Security_Company> GetSecurity_Company()
        {
            return db.Security_Company;
        }

        // GET: api/Security_Company/5
        [ResponseType(typeof(Security_Company))]
        public IHttpActionResult GetSecurity_Company(int id)
        {
            Security_Company security_Company = db.Security_Company.Find(id);
            if (security_Company == null)
            {
                return NotFound();
            }

            return Ok(security_Company);
        }

        // PUT: api/Security_Company/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutSecurity_Company(int id, Security_Company security_Company)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != security_Company.Security_ID)
            {
                return BadRequest();
            }

            db.Entry(security_Company).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Security_CompanyExists(id))
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

        // POST: api/Security_Company
        [ResponseType(typeof(Security_Company))]
        public IHttpActionResult PostSecurity_Company(Security_Company security_Company)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Security_Company.Add(security_Company);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = security_Company.Security_ID }, security_Company);
        }

        // DELETE: api/Security_Company/5
        [ResponseType(typeof(Security_Company))]
        public IHttpActionResult DeleteSecurity_Company(int id)
        {
            Security_Company security_Company = db.Security_Company.Find(id);
            if (security_Company == null)
            {
                return NotFound();
            }

            db.Security_Company.Remove(security_Company);
            db.SaveChanges();

            return Ok(security_Company);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool Security_CompanyExists(int id)
        {
            return db.Security_Company.Count(e => e.Security_ID == id) > 0;
        }
    }
}