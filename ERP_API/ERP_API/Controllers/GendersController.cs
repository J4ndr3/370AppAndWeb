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
    public class GendersController : ApiController
    {
        private INF370Entities db = new INF370Entities();

        // GET: api/Genders
        public List<dynamic> GetGenders()
        {
            try
            {
                db.Configuration.ProxyCreationEnabled = false;
                List<Gender> Gender = db.Genders.ToList();
                List<dynamic> toReturn = new List<dynamic>();
                foreach (Gender Item in Gender)
                {
                    dynamic m = new ExpandoObject();
                    m.ID = Item.Gender_ID;
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

        // GET: api/Genders/5
        [ResponseType(typeof(Gender))]
        public IHttpActionResult GetGender(int id)
        {
            db.Configuration.ProxyCreationEnabled = false;
            Gender gender = db.Genders.Find(id);
            if (gender == null)
            {
                return NotFound();
            }

            return Ok(gender);
        }

        // PUT: api/Genders/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutGender(int id, Gender gender)
        {
            db.Configuration.ProxyCreationEnabled = false;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != gender.Gender_ID)
            {
                return BadRequest();
            }

            db.Entry(gender).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GenderExists(id))
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

        // POST: api/Genders
        [ResponseType(typeof(Gender))]
        public IHttpActionResult PostGender(Gender gender)
        {
            db.Configuration.ProxyCreationEnabled = false;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Genders.Add(gender);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = gender.Gender_ID }, gender);
        }

        // DELETE: api/Genders/5
        [ResponseType(typeof(Gender))]
        public IHttpActionResult DeleteGender(int id)
        {
            db.Configuration.ProxyCreationEnabled = false;
            Gender gender = db.Genders.Find(id);
            if (gender == null)
            {
                return NotFound();
            }

            db.Genders.Remove(gender);
            db.SaveChanges();

            return Ok(gender);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool GenderExists(int id)
        {
            return db.Genders.Count(e => e.Gender_ID == id) > 0;
        }
    }
}