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
    public class AuditsController : ApiController
    {
        private INF370Entities db = new INF370Entities();
        // GET: api/Audits
        public List<dynamic> GetAudits()
        {
            List<dynamic> toReturn = new List<dynamic>();
            try
            {
                db.Configuration.ProxyCreationEnabled = false;
                List<Audit> Level = db.Audits.ToList();
                foreach (Audit Item in Level)
                {
                    dynamic m = new ExpandoObject();
                    m.Audit_ID = Item.Audit_ID;
                  
                }
                return toReturn;
            }
            catch (Exception err)
            {
                toReturn.Add("Not readable");
                return toReturn;
            }
        }

        // GET: api/Audits/5
        [ResponseType(typeof(Audit))]
        public IHttpActionResult GetAudit(int id)
        {
            Audit audit = db.Audits.Find(id);
            if (audit == null)
            {
                return NotFound();
            }

            return Ok(audit);
        }

        // PUT: api/Audits/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutAudit(int id, Audit audit)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != audit.Audit_ID)
            {
                return BadRequest();
            }

            db.Entry(audit).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AuditExists(id))
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

        // POST: api/Audits
        [ResponseType(typeof(Audit))]
        public IHttpActionResult PostAudit(Audit audit)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Audits.Add(audit);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = audit.Audit_ID }, audit);
        }

        // DELETE: api/Audits/5
        [ResponseType(typeof(Audit))]
        public IHttpActionResult DeleteAudit(int id)
        {
            Audit audit = db.Audits.Find(id);
            if (audit == null)
            {
                return NotFound();
            }

            db.Audits.Remove(audit);
            db.SaveChanges();

            return Ok(audit);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AuditExists(int id)
        {
            return db.Audits.Count(e => e.Audit_ID == id) > 0;
        }
    }
}