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
    public class Medical_AidController : ApiController
    {
        private INF370Entities db = new INF370Entities();

        // GET: api/Medical_Aid
        public List<dynamic> GetMedical_Aid()
        {
            try
            {
                db.Configuration.ProxyCreationEnabled = false;
                List<Medical_Aid> Medic = db.Medical_Aid.ToList();
                List<dynamic> toReturn = new List<dynamic>();
                foreach (Medical_Aid Item in Medic)
                {
                    dynamic m = new ExpandoObject();
                    m.ID = Item.Medical_Aid_ID;
                    m.Descriprion = Item.Name;
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

        // GET: api/Medical_Aid/5
        [ResponseType(typeof(Medical_Aid))]
        public IHttpActionResult GetMedical_Aid(int id)
        {
            db.Configuration.ProxyCreationEnabled = false;
            Medical_Aid medical_Aid = db.Medical_Aid.Find(id);
            if (medical_Aid == null)
            {
                return NotFound();
            }

            return Ok(medical_Aid);
        }

        // PUT: api/Medical_Aid/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutMedical_Aid(int id, Medical_Aid medical_Aid)
        {
            db.Configuration.ProxyCreationEnabled = false;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != medical_Aid.Medical_Aid_ID)
            {
                return BadRequest();
            }

            db.Entry(medical_Aid).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Medical_AidExists(id))
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

        // POST: api/Medical_Aid
        [ResponseType(typeof(Medical_Aid))]
        public IHttpActionResult PostMedical_Aid(Medical_Aid medical_Aid)
        {
            db.Configuration.ProxyCreationEnabled = false;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Medical_Aid.Add(medical_Aid);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = medical_Aid.Medical_Aid_ID }, medical_Aid);
        }

        // DELETE: api/Medical_Aid/5
        [ResponseType(typeof(Medical_Aid))]
        public IHttpActionResult DeleteMedical_Aid(int id)
        {
            db.Configuration.ProxyCreationEnabled = false;
            Medical_Aid medical_Aid = db.Medical_Aid.Find(id);
            if (medical_Aid == null)
            {
                return NotFound();
            }

            db.Medical_Aid.Remove(medical_Aid);
            db.SaveChanges();

            return Ok(medical_Aid);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool Medical_AidExists(int id)
        {
            return db.Medical_Aid.Count(e => e.Medical_Aid_ID == id) > 0;
        }
    }
}