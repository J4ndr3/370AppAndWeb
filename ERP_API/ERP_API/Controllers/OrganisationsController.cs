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
    public class OrganisationsController : ApiController
    {
        private INF370Entities db = new INF370Entities();

        // GET: api/Organisations
        public List<dynamic> GetOrganisations()
        {
            try
            {
                db.Configuration.ProxyCreationEnabled = false;
                List<Organisation> Org = db.Organisations.ToList();
                List<dynamic> toReturn = new List<dynamic>();
                foreach (Organisation Item in Org)
                {
                    dynamic m = new ExpandoObject();
                    m.ID = Item.Organisation_ID;
                    m.Descriprion = Item.Description;
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

        // GET: api/Organisations/5
        [ResponseType(typeof(Organisation))]
        public IHttpActionResult GetOrganisation(int id)
        {
            db.Configuration.ProxyCreationEnabled = false;
            Organisation organisation = db.Organisations.Find(id);
            if (organisation == null)
            {
                return NotFound();
            }

            return Ok(organisation);
        }

        // PUT: api/Organisations/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutOrganisation(int id, Organisation organisation)
        {
            db.Configuration.ProxyCreationEnabled = false;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != organisation.Organisation_ID)
            {
                return BadRequest();
            }

            db.Entry(organisation).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrganisationExists(id))
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

        // POST: api/Organisations
        [ResponseType(typeof(Organisation))]
        public IHttpActionResult PostOrganisation(Organisation organisation)
        {
            db.Configuration.ProxyCreationEnabled = false;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Organisations.Add(organisation);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = organisation.Organisation_ID }, organisation);
        }

        // DELETE: api/Organisations/5
        [ResponseType(typeof(Organisation))]
        public IHttpActionResult DeleteOrganisation(int id)
        {
            db.Configuration.ProxyCreationEnabled = false;
            Organisation organisation = db.Organisations.Find(id);
            if (organisation == null)
            {
                return NotFound();
            }

            db.Organisations.Remove(organisation);
            db.SaveChanges();

            return Ok(organisation);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool OrganisationExists(int id)
        {
            return db.Organisations.Count(e => e.Organisation_ID == id) > 0;
        }
    }
}