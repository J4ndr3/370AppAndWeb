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
using System.Web.Http.Cors;
using System.Dynamic;

namespace ERP_API.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class Incident_ImageController : ApiController
    {
        private INF370Entities db = new INF370Entities();

        // GET: api/Incident_Image
        private List<dynamic> getIMG(int ID)
        {
            List<dynamic> dynamicImages = new List<dynamic>();
            try
            {
                List<Incident_Image> imageList = db.Incident_Image.Where(zz => zz.Patrol_Log_ID == ID).ToList();
                foreach (Incident_Image img in imageList)
                {
                    dynamic item = new ExpandoObject();
                    item.ID = img.Incident_Image_ID;
                    item.Image = img.Image;
                    dynamicImages.Add(item);
                }
                return dynamicImages;
            }
            catch
            {
                dynamicImages.Add("Not readable");
                return dynamicImages;
            }

        }


        // GET: api/Incident_Image/5
        [ResponseType(typeof(Incident_Image))]
        public IHttpActionResult GetIncident_Image(int id)
        {
            db.Configuration.ProxyCreationEnabled = false;
            Incident_Image incident_Image = db.Incident_Image.Find(id);
            if (incident_Image == null)
            {
                return NotFound();
            }

            return Ok(incident_Image);
        }

        // PUT: api/Incident_Image/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutIncident_Image(int id, Incident_Image incident_Image)
        {
            db.Configuration.ProxyCreationEnabled = false;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != incident_Image.Patrol_Log_ID)
            {
                return BadRequest();
            }

            db.Entry(incident_Image).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Incident_ImageExists(id))
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

        // POST: api/Incident_Image
        [ResponseType(typeof(Incident_Image))]
        public IHttpActionResult PostIncident_Image(Incident_Image incident_Image)
        {
            db.Configuration.ProxyCreationEnabled = false;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Incident_Image.Add(incident_Image);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (Incident_ImageExists(incident_Image.Incident_Image_ID))
                {
                    return Conflict();
                }
                else
                {
                    return BadRequest("Photo could not be uploaded");
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = incident_Image.Incident_Image_ID }, incident_Image);
        }

        // DELETE: api/Incident_Image/5
        [ResponseType(typeof(Incident_Image))]
        public IHttpActionResult DeleteIncident_Image(int id)
        {
            db.Configuration.ProxyCreationEnabled = false;
            Incident_Image incident_Image = db.Incident_Image.Find(id);
            if (incident_Image == null)
            {
                return NotFound();
            }

            db.Incident_Image.Remove(incident_Image);
            db.SaveChanges();

            return Ok(incident_Image);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool Incident_ImageExists(int id)
        {
            return db.Incident_Image.Count(e => e.Patrol_Log_ID == id) > 0;
        }
    }
}